import React from "react";
import { getData } from "../context/DataContext";
import ProductsCard from "../components/ProductsCard";
import Lottie from "lottie-react";
import emptycart from "../assets/Empty red.json";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebook } from "react-icons/lu";
import { MdDeliveryDining, MdShoppingBag } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function Cart({ location, getLocation }) {
  const { cartItem, updateQuantity, deleteItem } = getData();
  const { user } = useUser();
  const navigat = useNavigate();
  //   console.log(location);
  const totalPrice = cartItem.reduce((total, item) => total + item.price, 0);
  return (
    <div className="mx-auto mt-10 mb-10 max-w-6xl p-3 md:p-0">
      {cartItem?.length > 0 ? (
        <div>
          <h1 className="font-bold md:text-2xl text-xl ">My Cart ({cartItem.length})</h1>
          <div>
            <div>
              {cartItem?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-100 flex justify-between items-center md:p-5 mt-5 rounded-md"
                  >
                    <div className="flex items-center md:gap-5 gap-1">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="h-20 w-20"
                      />
                      <div>
                        <h1 className="md:w-[300px] w-[150px] line-clamp-2">{item.title}</h1>
                        <p className="text-red-500 font-bold md:text-xl ">
                          ₹ {item.price}/-
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-500 flex gap-4 text-xl text-white p-2 rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "decrease")
                        }
                        className="cursor-pointer"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "increase")
                        }
                        className="cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <div
                      onClick={() => deleteItem(item.id)}
                      className="hover:bg-white/60 p-2 rounded-full hover:shadow-2xl transition-all shadow-black/80"
                    >
                      <span className="text-red-500 text-2xl cursor-pointer">
                        <FaRegTrashAlt />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
              <div className="bg-gray-100 mt-5 p-7 rounded-md space-y-1">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery info
                </h1>
                <form
                  action="https://formspree.io/f/mnnbqgpb"
                  method="POST"
                  className="flex flex-col gap-1"
                >
                  <div className="flex flex-col space-y-1 w-full">
                    <label className="w-20">Name</label>
                    <input
                      name="User Name"
                      type="text"
                      required
                      defaultValue={user.fullName}
                      placeholder="Name"
                      className="border p-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label className="w-20">Address</label>
                    <input
                    name="Address"
                      type="text"
                      required
                      defaultValue={location.county}
                      placeholder="Address"
                      className="border p-2 rounded-md"
                    />
                  </div>
                  <div className="flex  flex-row gap-5 w-full">
                    <div className="flex flex-col space-y-1 w-full">
                      <label className="w-20">State</label>
                      <input
                       name="State"
                        type="text"
                        required
                        placeholder="State"
                        defaultValue={location.state}
                        className="border p-2 rounded-md w-40 md:w-full"
                      />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                      <label className="w-20">PostCode</label>
                      <input
                        name="PostCode"
                        required
                        type="text"
                        defaultValue={location.postcode}
                        placeholder="PostCode"
                        className="border p-2 rounded-md w-40 md:w-full"
                      />
                    </div>
                  </div>
                  <div className="flex  flex-row gap-5 w-full">
                    <div className="flex flex-col space-y-1 w-full">
                      <label className="w-20">Country</label>
                      <input
                        required
                        name="Country"
                        type="text"
                        defaultValue={location.country}
                        placeholder="Country"
                        className="border p-2 rounded-md w-40 md:w-full"
                      />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                      <label className="w-20">Phone no</label>
                      <input
                        required
                        name="Phone no"
                        type="text"
                        placeholder="Phone no"
                        className="border p-2 rounded-md w-40 md:w-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="p-2 px-3 py-1 rounded-md bg-red-500 text-white w-20 mt-2 cursor-pointer">
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={getLocation}
                      className="bg-red-500 rounded-md px-3 py-2 p-2  cursor-pointer mt-2 text-white"
                    >
                      Detect Loaction
                    </button>
                  </div>
                </form>
                {/* <span className="flex justify-center items-center text-gray-700 font-semibold">
                  ----------OR----------
                </span> */}
                {/* <div className="flex justify-center">
                  <button className="bg-red-500 rounded-md px-3 py-2  cursor-pointer text-white">
                    Detect Loaction
                  </button>
                </div> */}
              </div>
              <div className="bg-white border border-gray-100 shadow-xl p-7 h-max space-y-2 mt-4">
                <h1 className="text-gray-800 font-bold text-xl">Bill Detail</h1>
                <div className="flex justify-between items-center">
                  <h1 className="flex items-center gap-1 text-gray-700">
                    <span>
                      <LuNotebook />
                    </span>{" "}
                    items Total
                  </h1>
                  <p>₹{totalPrice}/-</p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex items-center gap-1 text-gray-700">
                    <span>
                      <MdDeliveryDining />
                    </span>{" "}
                    Delivery Charge
                  </h1>
                  <p className="text-red-500 font-semibold">
                    <span className="text-gray-700 line-through">₹33</span> Free
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex items-center gap-1 text-gray-700">
                    <span>
                      <MdShoppingBag />
                    </span>{" "}
                    Handling Charge
                  </h1>
                  <p className="text-red-500 font-semibold">₹10</p>
                </div>
                <hr className="text-gray-200 mt-2" />
                <div className="flex justify-between items-center">
                  <h1 className="flex items-center gap-1 font-semibold text-lg  text-gray-700">
                    Grand Total
                  </h1>
                  <p className="font-semibold">₹{totalPrice + 10}/-</p>
                </div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                  Apply Promo Code
                </h1>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter Code"
                    className="p-2 rounded-md border border-gray-200 w-full"
                  />
                  <button className="bg-white border border-gray-200 rounded-md px-3 py-1">
                    Apply
                  </button>
                </div>
                <button className="bg-red-500 text-white p-2 w-full rounded-md font-semibold">
                  Procced To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-5 flex-col md:h-[500px] ">
          <h1 className="text-4xl font-bold text-red-400 ">
            Ohh no! Your cart is empty{" "}
          </h1>
          <Lottie animationData={emptycart} className="w-full h-[300px] " />
          <button
            onClick={() => navigat("/product")}
            className="bg-red-500 mt-5 px-3 py-2 p-2 rounded-md cursor-pointer text-white font-semibold hover:shadow-2xl shadow-black transition-all hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
