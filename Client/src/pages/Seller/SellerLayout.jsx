import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/asserts';
import { Link, NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

const SellerLayout = () => {
  const { setIsSeller , axios, navigate} = useAppContext();

  const logout = async() => {
    try {
      const {data}= await axios.get('/api/seller/logout')
        if (data.success) {
          toast.success(data.message);
          navigate('/');
        }else {
          toast.error(data.message);
        }
      
      
    } catch (error) {
      console.error(error.message);
      
    }
  };

  const sidebarLinks = [
    { name: 'Add Product', path: '/seller', icon: assets.add_icon },
    { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
    { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/seller">
          <img className="h-20 w-20" src={assets.Skart} alt="Skart Logo" />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-full min-h-[95vh] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === '/seller'}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-all ${
                  isActive
                    ? 'border-r-4 md:border-r-[6px] bg-purple-500/10 border-purple-500 text-purple-500'
                    : 'hover:bg-gray-100/90 border-white'
                }`
              }
            >
              <img className="w-6 h-6" src={item.icon} alt={`${item.name} Icon`} />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50 p-4">
          <Outlet /> {/* This will render the nested route */}
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
