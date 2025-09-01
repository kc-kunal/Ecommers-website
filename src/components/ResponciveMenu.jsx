import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaCross, FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { Link, NavLink } from "react-router-dom";

function ResponciveMenu({ openNav, setOpenNav }) {
  const { user } = useUser();

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex   flex-col w-[75%] h-screen border text-black bg-white px-8 pb-8 pt-16 rounded-r-xl md:hidden transition-all shadow-md `}
    >
        <IoClose onClick={()=>setOpenNav(false)}  className="-mt-12 mb-5 w-7 h-7 ml-50 cursor-pointer" />
      <div>
        
        <div className="flex items-center justify-start gap-3">
          {user ? (
            <UserButton size={50} />
          ) : (
            <SignInButton className="h-12 w-12 bg-red-50">
              <FaUserCircle size={50} />
            </SignInButton>
          )}
          <div>
            {user ? (
              <div>
                <h1 className="text-lg font-bold text-gray-800 ">
                  Hello {user.firstName}
                </h1>
                <p className="text-sm text-slate-500">Premium User</p>
              </div>
            ) : (
              <div>
                <SignInButton className="bg-red-500 px-3 py-1 p-2 rounded-md text-white" />
              </div>
            )}
          </div>
        </div>
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link
              to={"/"}
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              {" "}
              <li>Home</li>
            </Link>
            <Link
              to={"/product"}
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Product</li>
            </Link>
            <Link
              to={"/about"}
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>About</li>
            </Link>
            <Link
              to={"/contact"}
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Contact</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ResponciveMenu;
