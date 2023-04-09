import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="text-white bg-black">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-1">
          Trade With PiTrade
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-3xl font-bold md:py-3">
          Grow with data.
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold">
            Fast, Reliable trading for
          </p>
          {/* <Typed
            className="text-gray-500 pl-3 md:text-5xl sm:text-4xl text-xl font-bold"
            strings={["PI", "CARDS", "BTC"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          /> */}
        </div>
        <div>
          <p className="pt-1 text-gray-500 text-xl font-bold px-4 sm:text-3xl">
            All kind of Crypto Currency & Giftcard 
          </p>
          <Link to="/login">
            <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black text-xl mt-2">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
