import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/asserts'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
  const { products } = useAppContext()
  const { category } = useParams()
  
  const searchCategory = categories.find((item) => item.path.toLowerCase() === category)

  // Filter products by category, ensuring category is a string before calling toLowerCase()
  const filteredProducts = products.filter((product) => {
    if (typeof product.category === 'string') {
      return product.category.toLowerCase() === category
    }
    return false; // If category is not a string, exclude the product
  })

  return (
    <div className='mt-35'>
      {searchCategory && (
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium'>{(searchCategory.text || '').toUpperCase()}</p>
          <div className='w-16 h-0.5 bg-purple-500 rounded-full'></div>
        </div>
      )}
      
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:grid-cols-5 mt-6'>
          {filteredProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[calc(50vh-2rem)]">
          <p className="text-lg text-purple-500 font-extrabold">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}

export default ProductCategory
