import React from "react";
import Human from "../assets/Humaaans - 3 Characters (1).png";

export default function Analytics() {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 ">
        <img className="w-[500px] mx-auto my-4" src={Human} alt="humans" />
        <div className="flex flex-col justify-center">
          <p className="text-[#00df9a] font-bold">Trade With PiTrade</p>
          <h1 className="md:text-4xl ms:text-3xl text-2xl font-bold py-2">
            Trading Made Easy
          </h1>
          <p>
          At PiTrade, we understand that buying and selling cryptocurrencies can 
          be a complex and challenging task. That's why we have created a user-friendly
          platform that makes it easy for you to buy and sell various cryptocurrencies
          such as Bitcoin, Ethereum, Litecoin, and some free mined crypto currency such as PiNetwork, CoreDao and many more. With our secure and fast 
          transactions, you can be sure that you're getting the best deals on the market.
          </p>
          <button className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 md:mx-0 mx-auto py-3">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
