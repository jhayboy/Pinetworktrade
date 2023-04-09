import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaGithubSquare,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full bg-black mx-auto border-0 py-16 px-4 grid lg:grid-col-3 lg:flex gap-5 text-gray-300">
      <div className="lg:w-[40%]">
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">PiTrade.</h1>
        <p className="py-4">
          lorem, ipsum jack and jill that went ontop the hill did not get a pale
          of water nut he broke his leg and he carry last for class
        </p>
        <div className="flex md:w-[75%] my-6 justify-between">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className="lg:col-span-3 flex justify-between mt-6 w-full">
        <div>
          <h6 className="font-medium text-gray-400">Solutions</h6>
          <ul>
            <li className="py-2 text-sm">Analytics</li>
            <li className="py-2 text-sm">Marketing</li>
            <li className="py-2 text-sm">Commerce</li>
            <li className="py-2 text-sm">Insights</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Support</h6>
          <ul>
            <li className="py-2 text-sm">Pricing</li>
            <li className="py-2 text-sm">Documentation</li>
            <li className="py-2 text-sm">Guides</li>
            <li className="py-2 text-sm">API Status</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Company</h6>
          <ul>
            <li className="py-2 text-sm">About</li>
            <li className="py-2 text-sm">Blog</li>
            <li className="py-2 text-sm">Jobs</li>
            <li className="py-2 text-sm">Careers</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Legal</h6>
          <ul>
            <li className="py-2 text-sm">Claims</li>
            <li className="py-2 text-sm">Policy</li>
            <li className="py-2 text-sm">Terms</li>
          </ul>
        </div>
      </div>
      <div>&copy</div>
    </div>
  );
}
