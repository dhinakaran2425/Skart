import { React, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/asserts';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {
        user,
        setUser,
        setShowUserLogin,
        searchQuery,
        setSearchQuery,
        getCartCount,
        axios,
    } = useAppContext();

    const navigate = useNavigate();
    const location = useLocation();

    const logout = async () => {
        try {
            const { data } = await axios.get("/api/user/logout");
            if (data.success) {
                toast.success(data.message);
                setUser(null);
                window.location.reload(); // 🔁 Full reload on logout
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products");
        }
    }, [searchQuery]);

    const handleCartClick = () => {
        if (window.location.pathname === "/orders") {
            window.location.href = "/orders";
        } else {
            navigate("/orders", { state: { refresh: Date.now() } });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">
            <NavLink to="/" onClick={() => setOpen(false)}>
                <img className="h-20 w-20" src={assets.Skart} alt="Skart" />
            </NavLink>

            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>
                <NavLink to="/contact">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 hover:border-gray-400 focus-within:border-purple-500 px-4 py-1 rounded-full transition-colors">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M10.836 10.615 15 14.695" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="search"
                        className="w-64 py-1.5 bg-transparent outline-none placeholder-gray-500 focus:placeholder-gray-400"
                        placeholder="Search products"
                        aria-label="Search products"
                    />
                </div>
                <button onClick={handleCartClick} className="relative cursor-pointer group">
                    <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-violet-50 transition-all duration-300">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="transform group-hover:scale-105 transition-transform duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.5 8H17.5L16.25 15.5C16.137 16.3288 15.4017 17 14.5 17H9.5C8.59833 17 7.86299 16.3288 7.75 15.5L6.5 8Z"
                                className="stroke-gray-600 group-hover:stroke-violet-600"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 11V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V11"
                                className="stroke-gray-600 group-hover:stroke-violet-600"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {getCartCount() > 0 && (
                        <div className="absolute -top-1 -right-1 flex items-center justify-center">
                            <span className="absolute h-5 w-5 rounded-full bg-violet-400 opacity-75 animate-ping"></span>
                            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-xs font-medium text-white">
                                {getCartCount()}
                            </span>
                        </div>
                    )}
                </button>

                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-violet-500 hover:bg-violet-600 transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <div className="w-10 h-10 rounded-full">
                            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-md rounded-lg w-40">
                            <li onClick={() => navigate("myorders")} className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer">My Orders</li>
                            <li onClick={logout} className="px-4 py-2 text-red-600 hover:bg-red-500/10 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="sm:hidden flex items-center gap-6">
            <button onClick={handleCartClick} className="relative cursor-pointer group">
                    <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-violet-50 transition-all duration-300">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="transform group-hover:scale-105 transition-transform duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.5 8H17.5L16.25 15.5C16.137 16.3288 15.4017 17 14.5 17H9.5C8.59833 17 7.86299 16.3288 7.75 15.5L6.5 8Z"
                                className="stroke-gray-600 group-hover:stroke-violet-600"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 11V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V11"
                                className="stroke-gray-600 group-hover:stroke-violet-600"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {getCartCount() > 0 && (
                        <div className="absolute -top-1 -right-1 flex items-center justify-center">
                            <span className="absolute h-5 w-5 rounded-full bg-violet-400 opacity-75 animate-ping"></span>
                            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-xs font-medium text-white">
                                {getCartCount()}
                            </span>
                        </div>
                    )}
                </button>

                <button onClick={() => setOpen(!open)} aria-label="Menu">
                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
                        <rect width="21" height="1.5" rx=".75" fill="#426287" />
                        <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                        <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                    </svg>
                </button>
            </div>

            {open && (
                <div className="flex flex-col absolute top-[80px] left-0 w-full bg-white shadow-md py-4 gap-3 px-6 text-sm sm:hidden z-40">
                    <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                    {user && (
                        <NavLink to="/myorders" onClick={() => setOpen(false)}>My Orders</NavLink>
                    )}
                    <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
                    {!user ? (
                        <button onClick={() => { setOpen(false); setShowUserLogin(true); }} className="cursor-pointer px-6 py-2 mt-2 bg-violet-500 hover:bg-violet-600 transition text-white rounded-full text-sm">
                            Login
                        </button>
                    ) : (
                        <button onClick={() => { setOpen(false); logout(); }} className="cursor-pointer px-6 py-2 mt-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
