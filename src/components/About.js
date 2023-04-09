import React from 'react' 
import Service from "../assets/service.webp"
import New from "../assets/Newjoin.png"
import Sabout from "../assets/Sabout.jpg";
import why from "../assets/why-[Converted].png"
import Vision from '../assets/vision.png'
import Navbar from './Navbar';
import {Link} from 'react-router-dom'

export default function About() {
    return(
        <div>
            <div className='bg-black/90 fixed top-0 left-0 right-0'>
              <Navbar/>
            </div>
            <div className='p-8 mt-20 flex flex-col gap-10'>
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 ">
                    <img className="w-[500px] mx-auto my-4" src={Sabout} alt="About us" />
                    <div className="flex flex-col justify-center">
                        <p className="text-[#00df9a] font-bold">Trade With PiTrade</p>
                        <h1 className="md:text-4xl ms:text-3xl text-2xl font-bold py-2">
                            Welcome To PiTrade
                        </h1>
                        <p>
                            where you can easily buy and sell cryptocurrencies and gift cards. 
                            Our platform is designed to make trading simple, fast, and secure, 
                            so you can get the best deals on the market.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col-reverse max-w-[1240px] mx-auto md:grid md:grid-cols-2 ">
                    <div className="flex flex-col justify-center">
                        <h1 className="md:text-4xl ms:text-3xl text-2xl font-bold py-2">
                             Our Mission
                        </h1>
                        <p>
                            Our mission is to empower people to take control of their finances and 
                            investments through cryptocurrency and gift card trading. 
                            We believe that everyone should have access to the benefits of 
                            blockchain technology, which includes low transaction fees, fast transactions, 
                            and decentralized control.
                        </p>
                    </div>
                    <img className="w-[300px] mx-auto my-4" src={Vision} alt="humans" />
                </div>
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 ">
                    <img className="w-[500px] mx-auto my-4" src={Service} alt="humans" />
                    <div className="flex flex-col justify-center">
                        <h1 className="md:text-4xl ms:text-3xl text-2xl font-bold py-2">
                            Our Services
                        </h1>
                        <p>
                            At our web application, we offer a range of services to meet your trading needs. 
                            Whether you're a seasoned trader or just getting started, we have everything you 
                            need to buy and sell cryptocurrencies and gift cards.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col-reverse max-w-[1240px] mx-auto md:grid md:grid-cols-2 ">
                    <div className="flex flex-col justify-center">
                        <h1 className="md:text-4xl ms:text-3xl text-2xl font-bold py-2">
                            Why Choose us?
                        </h1>
                        <p>
                          There are many reasons to choose our web application for your trading needs. Here are a few of the benefits of using our platform:<br/>

                          <span className='font-semibold'>Secure and fast transactions:</span> We use industry-standard security protocols and technologies to safeguard your data and ensure fast and reliable transactions.<br/><br/>

                          <span className='font-semibold'>User-friendly interface:</span> Our platform is designed to be easy to use, so you can complete transactions quickly and easily.<br/><br/>

                          <span className='font-semibold'>Dedicated customer support:</span> We have a team of dedicated support professionals who are available to answer your questions and help you with any issues you may have.<br/>
                        </p>
                    </div>
                    <img className="w-[500px] mx-auto my-4" src={why} alt="humans" />
                </div>


                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 ">
                    <img className="w-[500px] mx-auto my-4" src={New} alt="humans" />
                    <div className="flex flex-col justify-center">
                        <p className="text-[#00df9a] font-bold">Trade With PiTrade</p>
                        <h1 className="md:text-4xl ms:text-3xl text-2xl font-bold py-2">
                            Join Us Today
                        </h1>
                        <p>
                            If you're ready to start trading cryptocurrencies and gift cards, 
                            we invite you to join our platform today. Sign up now and become 
                            part of the global community of traders who are taking control of 
                            their financial futures.
                        </p>
                        <Link to='/login'>
                            <button className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 md:mx-0 mx-auto py-3">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
