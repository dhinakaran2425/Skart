import React from 'react';
import { assets } from '../assets/asserts';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  // Check if category is a string before calling toLowerCase
  const category = typeof product.category === 'string' ? product.category.toLowerCase() : '';

  // Rating logic (assuming product.rating is available)
  const rating = product.rating || 4; // Default to 4 stars if no rating available
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  return product && (
    <div 
      onClick={() => {
        navigate(`/products/${category}/${product._id}`);
        scrollTo(0, 0);
      }} 
      className="border border-gray-300 rounded-lg px-3 py-3 bg-white w-full"
    >
      <div className="group cursor-pointer flex items-center justify-center px-2">
        {/* Safeguard if product.image[0] is missing */}
        <img 
          className="group-hover:scale-105 transition-transform w-full max-w-[140px] h-auto object-contain" 
          src={product.image && product.image[0] ? product.image[0] : assets.default_image} 
          alt={product.name || 'Product image'} 
        />
      </div>

      <div className="text-sm text-gray-600 mt-3">
        <p>{product.category}</p>
        <p className="text-gray-800 font-semibold text-base truncate">{product.name}</p>

        <div className="flex items-center gap-1 mt-1">
          {/* Render filled and empty stars dynamically based on rating */}
          {Array(filledStars).fill('').map((_, i) => (
            <img 
              key={`filled-${i}`} 
              className="w-4 h-4" 
              src={assets.star_icon} 
              alt="star" 
            />
          ))}
          {Array(emptyStars).fill('').map((_, i) => (
            <img 
              key={`empty-${i}`} 
              className="w-4 h-4" 
              src={assets.star_dull_icon} 
              alt="star" 
            />
          ))}
          <p className="text-xs text-gray-500">({rating})</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="text-purple-600 font-medium text-base">
            {currency}{product.offerPrice}
            <span className="text-gray-400 text-sm line-through ml-1">{currency}{product.price}</span>
          </p>

          <div onClick={(e) => e.stopPropagation()}>
            {!cartItems[product._id] ? (
              <button 
                className="flex items-center gap-1 bg-purple-100 border border-purple-300 px-2 py-1 rounded text-sm text-purple-600"
                onClick={() => addToCart(product._id)}
              >
                <img src={assets.cart_icon} alt="cart" className="w-4 h-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-purple-100 px-2 py-1 rounded text-sm text-purple-700">
                <button onClick={() => removeFromCart(product._id)} className="px-2">-</button>
                <span>{cartItems[product._id]}</span>
                <button onClick={() => addToCart(product._id)} className="px-2">+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
