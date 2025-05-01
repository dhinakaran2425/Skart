import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([])
    const { currency, axios, user } = useAppContext()

    const fetchMyOrders = async () => {
        try {
            // Change to use query parameter instead of body
            const { data } = await axios.get(`/api/order/user/${user._id}`);
            if (data.success) {
                setMyOrders(data.orders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch orders');
        }
    }

    useEffect(() => {
        if(user){
            fetchMyOrders()
        }
    }, [user])

    return (
        <div className='mt-35'>
            <div className='flex flex-col items-center w-max'>
                <p className='text-3xl font-medium'>My Orders</p>
                <div className='w-20 h-0.5 bg-purple-500 rounded-full mt-2 ml-14'></div>
            </div>

            <div className="md:p-10 p-4 space-y-4">
                {myOrders.map((order, index) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-col gap-4 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
                        >
                            {/* Order Summary Header */}
                            <div className="flex justify-between items-start flex-wrap gap-4">
                                {/* Order Info */}
                                <div>
                                    <p className="font-medium text-sm">Order ID: {order._id}</p>
                                    <p className="text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    <p className="text-sm">Order Status: {order.status}</p>
                                    {/* <p className="text-sm">Payment: {order.isPaid ? "Paid" : "Pending"}</p> */}
                                    <p className="text-sm">Method: {order.paymentType}</p>
                                </div>

                                {/* Address + Total */}
                                <div className="text-sm">
                                    <p className="font-medium">
                                        {order.address.firstName} {order.address.lastName}
                                    </p>
                                    <p>
                                        {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}
                                    </p>
                                    <p className="font-extrabold mt-2">
                                        Total: <span className="text-red-500">{currency}{order.amount}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Product List */}
                            <div className="flex flex-col gap-4 border-t pt-4">
                                {order.items?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4 items-center border p-3 rounded-md bg-gray-50"
                                    >
                                        <img
                                            className="w-16 h-16 object-cover rounded"
                                            src={item.product.image[0]}
                                            alt={item.product.name}
                                        />
                                        <div className="flex flex-col text-sm">
                                            <p className="font-medium">{item.product.name}</p>
                                            <p className="text-xs text-gray-600">
                                                Category: <span className="text-purple-500">{item.product.category}</span>
                                            </p>
                                            <p className="text-xs">
                                                Quantity: <span className="font-medium text-black">{item.quantity}</span>
                                            </p>
                                            <p className="text-xs">
                                                Amount: <span className="font-semibold text-purple-600">{currency}{item.product.offerPrice * item.quantity}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
