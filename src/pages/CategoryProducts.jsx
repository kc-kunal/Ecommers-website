import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import loading from "../assets/Loading3.webm";
import { FaChevronLeft } from "react-icons/fa";
import ProductsListView from "../components/ProductsListView";

function CategoryProducts() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);

  const getFilterData = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      setSearchData(res.data.products); // ✅ only store products array
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilterData();
    window.scrollTo(0,0)
  }, [category]); // ✅ refetch on category change

  return (
    <div>
      {searchData.length > 0 ? (
        <div className="min-h-[50px] mt-10 mb-10 max-w-6xl mx-auto p-4">
          <button 
            onClick={() => navigate(-1)} // ✅ go back
            className="flex gap-1 items-center px-2 rounded-md py-1 font-semibold bg-gray-800 text-white"
          >
            <FaChevronLeft /> Back
          </button>

          {searchData.map((product) => (
            <ProductsListView key={product.id} products={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <video muted autoPlay loop>
            <source src={loading} />
          </video>
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
