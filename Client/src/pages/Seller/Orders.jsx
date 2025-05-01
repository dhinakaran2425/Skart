import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({}); // Track expanded orders
  const {currency } = useAppContext();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleExpand = (index) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gray-50">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-6 text-2xl font-semibold text-gray-800">All Orders</h2>

        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const isExpanded = expandedOrders[index];
              const visibleItems = isExpanded ? order.items : order.items.slice(0, 1);
              const showToggle = order.items.length > 1;


              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4"
                >
                  {/* Order Info */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium text-black">Order ID:</span> {order._id}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium text-black">Date:</span>{' '}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium text-black">Status:</span> {order.status}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium text-black">Method:</span> {order.paymentType}
                      </p>
                    </div>

                    {/* Address + Total */}
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-black">
                        {order.address.firstname} {order.address.lastname}
                      </p>
                      <p>
                        {order.address.street}, {order.address.city}, {order.address.state} -{' '}
                        {order.address.zipcode}, {order.address.country}
                      </p>
                      <p>{order.address.phone}</p>
                      <p className="font-bold text-red-500 mt-2">
                        Total: {currency}
                        {order.amount}
                      </p>
                    </div>
                  </div>

                  {/* Product Items */}
                  <div className="border-t pt-4 space-y-4">
                    {visibleItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 items-center bg-gray-100 p-3 rounded-md"
                      >
                        <img
                          src={item.product.image[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex flex-col text-sm">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-xs text-gray-600">
                            Category:{' '}
                            <span className="text-purple-600">{item.product.category}</span>
                          </p>
                          <p className="text-xs">
                            Quantity:{' '}
                            <span className="font-semibold text-black">{item.quantity}</span>
                          </p>
                          <p className="text-xs">
                            Amount:{' '}
                            <span className="text-purple-500 font-semibold">
                              {currency}
                              {item.product.offerPrice * item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}

                    {showToggle && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-sm text-purple-600 font-medium hover:underline"
                      >
                        {isExpanded ? 'View Less' : `View ${order.items.length - 1} More`}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
