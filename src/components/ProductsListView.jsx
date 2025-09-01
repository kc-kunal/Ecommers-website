import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getData } from '../context/DataContext';


function ProductsListView({ products }) {
    const navigate = useNavigate();
    const {addToCart} = getData();
  return (
    <div className='md:space-y-4 space-y-2 mt-2 rounded-md '>
      <div className='bg-gray-100 flex  items-center gap-7 p-2 rounded-md'>
        
        <img src={products.images[0]} alt={products.title} className="md:w-32 md:h-32 h-20 w-20 object-cover cursor-pointer rounded" onClick={()=>navigate(`/product/${products.id}`)}/>
        <div className='md:space-y-2 space-y-1'>
          <h3 className="font-bold w-full hover:text-red-400 md:text-lg  cursor-pointer">{products.title}</h3>
          <p className="font-semibold  flex items-center ">$<span className='md:text-3xl text-2xl'>{products.price}</span><span>(${products.discountPercentage}% off)</span></p>
          <p className='text-gray-700 text-sm '>Free delivery <span className='font-bold'>fri, 18 Apr</span> <br/> or fastest deliver <span  className='font-bold'>Tomorrow , 17 Apr</span></p>
          <button onClick={()=>addToCart(products)} className='bg-red-500 text-white rounded-md md:px-3 px-2 py-1 p-2'>Add to Cart</button>
        </div>
        
      </div>
    </div>
  )
}


export default ProductsListView