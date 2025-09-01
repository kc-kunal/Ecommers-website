import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import loading from '../assets/Loading4.webm'
import FilterSection from "../components/FilterSection";
import ProductsCard from "../components/ProductsCard";
import Pagination from "../components/Pagination";
import Lottie from 'lottie-react'
import notfound from '../assets/no data found json.json'
import MobileFilter from "../components/MobileFilter";

function Product() {
  const { data ,fetchAllProduct} = getData();
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");
  const [brand,setBrand] = useState("All");
  const [priceRange,setPriceRange] = useState([0,5000])
  const [page,setPage] =useState(1);  // this for page change 
  const [openFilter,setOpenFilter] = useState(false)
  useEffect(()=>{
    fetchAllProduct();
    window.scrollTo(0,0)
  },[])

  const handleCategoryChange = (e)=>{
       setCategory(e.target.value)
       setPage(1)
       setOpenFilter(false)
  }

  const handleBrandChange = (e)=>{
    setBrand(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }
   
  const pageHandler = (selectedPage)=>{
    setPage(selectedPage)
    window.scrollTo(0,0)
  }

  
  const filteredData = data?.filter((item)=>
    item.title?.toLowerCase().includes(search?.toLowerCase()) &&
    (item.category===category || category==="All") &&
    (item.brand===brand || brand==="All") &&
     item.price>=priceRange[0] && item.price<=priceRange[1]
  )

  const dynamicPage = Math.ceil(filteredData?.length/12)
  //console.log(filteredData)
  return (
    <div>
       {/* this filter for mobile device */}
            <MobileFilter  search={search} setSearch={setSearch} category={category} setCategory={setCategory} brand={brand} setBrand={setBrand} priceRange={priceRange} setPriceRange={setPriceRange} handleCategoryChange={handleCategoryChange} handleBrandChange={handleBrandChange} openFilter={openFilter} setOpenFilter={setOpenFilter}/>
      <div className="max-w-6xl mx-auto px-4 mb-10 ">
        {data?.length > 0 ?
         <>
         <div className="flex gap-7">
          {/* // this is filter for big device */}
            <FilterSection search={search} setSearch={setSearch} category={category} setCategory={setCategory} brand={brand} setBrand={setBrand} priceRange={priceRange} setPriceRange={setPriceRange} handleCategoryChange={handleCategoryChange} handleBrandChange={handleBrandChange} />
           
            {filteredData?.length>0?(<div>{/* //this is forcard on product */}
            <div className="grid md:grid-cols-4 grid-cols-2 gap-7 mt-10 ">
              {
                  filteredData?.slice(page*12-12,page*12).map((products,index)=>{
                    return <ProductsCard key={index} products={products}/>
                  })
              }
            </div>
            <Pagination pageHandler={pageHandler} page={page } dynamicPage={dynamicPage}/>
            </div>):(<div className="flex justify-center items-center md:w-[900px] md:h-[600px] mt-5">
                    <Lottie animationData={notfound} classID="w-[500px]" />
            </div>)}
            
           
        </div> 
         
         </>:
         <div className="flex justify-center items-center h-[400px]">
              <video muted autoPlay loop>
                <source src={loading} type="video/webm"/>
              </video>
          </div>}
      </div>
    </div>
  );
}

export default Product;
