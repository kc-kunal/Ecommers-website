import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { CgClose } from "react-icons/cg";
import { getData } from "../context/DataContext";
import ResponciveMenu from "./ResponciveMenu";
function Nav({ location,getLocation,openDropDown, setOpenDropDown }) {
  const {cartItem} =getData();
  const [openNav,setOpenNav] = useState();
 
  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  return (
    <div className="bg-white  py-3 shadow-2xl px-5 md:px-0">
      {/* Navbar */}
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">Z</span>eptro
              
            </h1>
          </Link>
          <div className="md:flex gap-1 cursor-pointer items-center text-gray-700 hidden">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? (
                <div className="-space-y-2">
                  <p>{location.county}</p> <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown onClick={() => toggleDropDown()} />
          </div>
          {/* drop down for set location */}
          {openDropDown ? (
            <div className="w-[230px] p-5 h-max shadow-xl z-50 bg-white fixed top-16 left-45 border-2 border-gray-100 rounded-md">
              <h1 className="font-semibold text-2xl mb-4 flex justify-between ">Set Location <span ><CgClose onClick={()=>toggleDropDown()}/></span></h1>
              <button onClick={()=>getLocation()} className="bg-red-500 px-2 py-1 text-white rounded-md hover:bg-red-400">Detect my location</button>
            </div>
          ) : null}
        </div>
        {/* Menu section */}
        <nav className="flex items-center gap-7">
          <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              {" "}
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/product"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Product</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          {/* Cart icon */}
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="w-7 h-7 " />
            <span className=" bg-red-500 rounded-full px-2 absolute -top-3 -right-3 text-white">
              {cartItem?.length}
            </span>
          </Link>
          {/* Signin button */}
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* // this nav menu button for small device  */}
          {
            openNav ? <HiMenuAlt3 onClick={()=>setOpenNav(false)} className="h-7 w-7 md:hidden" />:<HiMenuAlt1 onClick={()=>setOpenNav(true)}  className="h-7 w-7 md:hidden"/>

          }
        </nav>
      </div>
      <ResponciveMenu openNav={openNav} setOpenNav={setOpenNav}/>
    </div>
  );
}

export default Nav;
