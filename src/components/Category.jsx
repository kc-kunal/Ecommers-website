import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom';

function Category() {
    const {data} = getData();
    const navigate = useNavigate();
     const getUniqueCategory = (data,property)=>{
          let newVal = data?.map((curElem)=>{
              return curElem[property]
          })
          newVal = [...new Set(newVal)]
          return newVal
      }
  
      const categoryOnlyData = getUniqueCategory(data,"category")
      const brandOnlyData = getUniqueCategory(data,"brand")
  return (
    <div className='bg-[#101829]'>
        <div className='max-w-7xl mx-auto flex gap-5 items-center justify-center flex-wrap  py-7 px-4'>
              {
                categoryOnlyData?.map((item,index)=>{
                    return<div key={index}>
                           <button onClick={()=>navigate(`/category/${item}`)} className='text-white bg-gradient-to-r from-red-500 to-purple-500 px-3 py-1 rounded-md cursor-pointer hover:scale-105 transition-all ' >{item}</button>
                         </div>
                })
              }
        </div>
    </div>
  )
}

export default Category