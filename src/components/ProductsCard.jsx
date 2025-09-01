import React from 'react'
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { getData } from '../context/DataContext';



function ProductsCard({products}) {
  const navigate = useNavigate()
  const {addToCart,cartItem} = getData();

  const gotoCart = ()=>{
    navigate(`/product/${products.id}`)
  }
     //console.log(cartItem);
  return (
    <div className='w-[200px] border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max flex justify-center items-center flex-col gap-2'>
        <img onClick={()=>gotoCart()} src={products.images[0]} className='bg-gray-100 aspect-square w-[150px] h-[150px]'/>
        <h1 className='line-clamp-2  font-semibold'>{products.title.slice(0,17)+" ..."}</h1>
        <p className='font-bold  text-lg text-gray-800'>₹ {products.price}/-</p>
        <button onClick={()=>addToCart(products)} className='bg-red-500 px-3 p-1  rounded-md w-full cursor-pointer flex gap-2 font-semibold justify-center items-center text-lg text-white'><IoCartOutline className='w-6 h-6' />
Add to Cart</button>
    </div>
  )
}

export default ProductsCard;