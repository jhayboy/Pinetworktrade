import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import {Link} from 'react-router-dom'

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">PiTrade.</h1>
      <ul className="hidden md:flex">
        <Link to='/'>
          <li className="px-4 hover:text-[#00df9a] cursor-pointer">Home</li>
        </Link>


        <Link to='/about'>
          <li className="px-4 hover:text-[#00df9a] cursor-pointer">About</li>
        </Link>


        <Link to='/emailsupport'>
          <li className="px-4 hover:text-[#00df9a] cursor-pointer">Contact</li>
        </Link>
      </ul>
      <div onClick={handleNav} className="block cursor-pointer md:hidden">
        {!nav ? <AiOutlineMenu size={30} /> : <AiOutlineClose size={30} />}
      </div>
      <div
        className={
          !nav
            ? "fixed left-[-100%]"
            : "bg-black fixed left-0 top-0 w-[60%] border-r border-r-gray-900 h-full ease-in-out duration-500 md:left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4 pt-3">
          PiTrade.
        </h1>
        <ul className="uppercase p-4">
          <Link to='/'>
            <li className="p-4 border-b border-gray-600">Home</li>
          </Link>
          <Link to='/about'>
            <li className="p-4 border-b border-gray-600">About</li>
          </Link>
          <Link to='/emailsupport'>
            <li className="p-4">Contact</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

