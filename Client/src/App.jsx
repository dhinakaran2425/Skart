import React from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/Seller/SellerLogin'
import SellerLayout from './pages/Seller/SellerLayout'
import AddProduct from './pages/Seller/AddProduct'
import ProductList from './pages/Seller/ProductList'
import Orders from './pages/Seller/Orders'
import Loading from './components/Loading.jsx'
import Contact from './pages/Contact.jsx'

const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  const {showUserLogin, isSeller} =useAppContext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div className={`${isSellerPath ? " " : "px-4 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />}/> 
          <Route path="/products/:category" element={<ProductCategory />}/> 
          <Route path="/products/:category/:id" element={<ProductDetails />}/>
          <Route path="/orders" element={<Cart />}/> 
          <Route path='/contact' element={<Contact/>}/>
          <Route path="/add-address" element={<AddAddress />}/>
          <Route path="/myorders" element={<MyOrders />}/>
          <Route path="/loader" element={<Loading />}/>    
          <Route path="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct/> : null} />
            <Route index path="product-list" element={<ProductList />} />
            <Route index path="orders" element={<Orders />} />
          </Route>  
        </Routes>
      </div>
      {isSellerPath ? null : <Footer/>}
    </div>
  )
}

export default App
