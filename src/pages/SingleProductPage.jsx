import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loading from "../assets/Loading4.webm";
import Beadkrums from "../components/Beadkrums";
import { IoCartOutline, IoHandLeft, IoStar } from "react-icons/io5";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { getData } from "../context/DataContext";

function SingleProductPage() {
  const {addToCart} =getData()
  const param = useParams();
  const [singleProduct, setSingleProduct] = useState();
  const [slideImg, setSlideImg] = useState(0); // this for slide img
  // this for slide im function
  const preImg = () => {
    if (slideImg > 0) {
      setSlideImg(slideImg - 1);
    } else {
      setSlideImg(singleProduct.images.length - 1); // loop back to last
    }
  };

  const nextImg = () => {
    if (slideImg < singleProduct.images.length - 1) {
      setSlideImg(slideImg + 1);
    } else {
      setSlideImg(0); // loop back to first
    }
  };
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${param.id}`);
      const product = res.data;
      setSingleProduct(product);
      //console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  //  const originalPrice = Math.round(singleProduct.price + (singleProduct.price*singleProduct.discountPercentage
  // / 100))
  // console.log(originalPrice);
  useEffect(() => {
    getSingleProduct();
  }, []);
  return (
    <div>
      {singleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Beadkrums title={singleProduct.title} />
          <div className="md:max-w-6xl mx-auto md:p-6 md:grid grid-cols-2 gap-10 space-y-3 flex items-center flex-col md:flex-row">
            {/* product image */}
            <div className="w-full   bg-white border-1 border-gray-200 shadow-black/40 shadow-2xl rounded-lg flex justify-center items-center p-10">
              {singleProduct.images.length === 1 ? (
                ""
              ) : (
                <FaCaretLeft
                  onClick={() => preImg()}
                  className="text-black/40 h-10 w-10 cursor-pointer"
                />
              )}
              <div>
                <img
                  src={singleProduct.images[slideImg]}
                  alt={singleProduct.title}
                  className="w-full  object-cover rounded-md "
                />
              </div>
              {singleProduct.images.length === 1 ? (
                ""
              ) : (
                <FaCaretRight
                  onClick={() => nextImg()}
                  className="text-black/40 h-10 w-10"
                />
              )}
            </div>
            {/* product detail  */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl text-xl font-bold text-gray-800">
                {singleProduct.title}
              </h1>
              <div className="text-gray-700 font-semibold">
                {singleProduct?.brand.toUpperCase()} /{" "}
                {singleProduct?.category.toUpperCase()} / {singleProduct.sku}
              </div>
              <p className="md:text-2xl text-xl font-bold text-red-500 flex gap-2 items-center">
                ₹ {singleProduct.price}/-{" "}
                <span className="line-through text-gray-700">
                  {" "}
                  ₹
                  {Math.round(
                    singleProduct.price +
                      (singleProduct.price * singleProduct.discountPercentage) /
                        100
                  )}
                </span>{" "}
                <span className="bg-red-500 rounded-full px-3 py-2 text-white md:text-xl text-sm">
                  {" "}
                  {singleProduct.discountPercentage} % Discount
                </span>
              </p>
              <p className="text-gray-600">{singleProduct.description}</p>
              <div className="flex flex-col text-gray-600">
                <p>
                <label>Return Policy :- </label>
                {singleProduct.returnPolicy}
              </p>
              <p>
                <label>Delivered in :- </label>
                {singleProduct.shippingInformation}
              </p> 
              </div>
              {/* // quntity selectore */}
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium text-sm">
                  Quntity
                </label>
                <input
                  type="number"
                  min={1}
                  value={1}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none ring-2 ring-red-500 "
                />

                {/* //rating ui  */}
                <div className="flex items-center gap-2 bg-green-500 text-white font-bold px-3 py-1 rounded-lg w-fit">
                  <span>{singleProduct.rating}</span>
                  <IoStar className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* button add to cart */}
              <div className="flex items-center gap-5">
                <button onClick={()=>addToCart(singleProduct)} className="bg-red-500 rounded-md px-6 py-2 text-white flex gap-4">
                  <IoCartOutline className="w-6 h-6" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <video muted autoPlay loop>
            <source src={loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
}

export default SingleProductPage;
