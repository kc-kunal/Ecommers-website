import React from "react";
import { getData } from "../context/DataContext";

function FilterSection({search,setSearch,category,setCategory,priceRange,setPriceRange,brand,setBrand,handleCategoryChange,handleBrandChange}) {
  const { categoryOnlyData, brandOnlyData } = getData();
  //nsole.log(brandOnlyData);
  return (
    <div className="bg-gray-100 mt-10 p-4 h-max rounded-md border-2 border-gray-200 hidden md:block">
      <input
        type="text"
        placeholder="Serch"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="bg-white border-gray-200 border-2 rounded-md p-2"
      />

      {/* // category only data  */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-5">
        {categoryOnlyData?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input type="checkbox" name={item} checked={category===item} value={item} onChange={handleCategoryChange} />
              <button className="cursor-pointer uppercase">
                {item}
              </button>
            </div>
          );
        })}
      </div>
       {/* // brand only data  */}
      <h1 className="mt-5 font-semibold text-xl">Brand</h1>
      <select className="mt-5 border-2 border-gray-200 p-2 rounded-md w-full" value={brand} onChange={handleBrandChange}>
         {
          brandOnlyData?.map((item,index)=>{
            return <option key={index} value={item}>{item?.toUpperCase()}</option>
          })
         }
      </select>

      {/* its for range */}
      <h1 className="mt-5 font-semibold text-xl">Price Range</h1>
      <div className="flex flex-col gap-3 mt-3 ">
         <label>Price range :- ₹{priceRange[0]} - ₹{priceRange[1]} </label>
         <input type="range" min="0" max="5000" value={priceRange[1]} onChange={(e)=>setPriceRange([priceRange[0],Number(e.target.value)])}></input>
      </div>
      <button className="px-3 py-1 bg-red-500 border-2 text-white mt-5 border-gray-200 rounded-md w-full " onClick={()=>{setCategory("All"); setBrand("All"); setSearch(""); setPriceRange([0,5000])}}>Reset Filter</button>
    </div>
  );
}

export default FilterSection;
