import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import {Link}  from "react-router-dom"
import {BsCreditCard} from "react-icons/bs"
import {IoMdArrowDropup, IoMdArrowDropdown} from 'react-icons/io' 
import pidata from "./Pidata"
import { UserContext } from "./UserContext"
 import { GiftContext } from "../GiftComponent/GiftContext"


export default function Coinsmap(){
  const {setTrade} = useContext(GiftContext)
  const {setList} = useContext(UserContext)
  const [coins, setCoins] = useState(true)
  const [drop, setDrop] = useState(true)
  const [listed, setListed] = useState([])
  const [activeItem, setActiveItem] = useState([])
  const [pitiveItem, setPitiveItem] = useState([])
  const cals = activeItem.current_price + (0/100) * activeItem.current_price
  const sellprice = cals.toLocaleString() 
  const calb = activeItem.current_price + (0/100) * activeItem.current_price
  const buyprice = calb.toLocaleString()
  // const [mainItem, setMainItem] = useState([])
  // const [otherItem, setOtherItem] = useState([])

  // asigning coingecko link to a url variable
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'

  // setting the arrays to this onClick function
  const Bars = (item) =>{
    setActiveItem(item)
    setCoins(!coins)
  } 
  const Pidrop = (pitems) =>{
    setPitiveItem(pitems)
    setDrop(!drop)
  }

  const PiNetwork = ()=>{
    setList(pitiveItem)
    setTrade("sellprice")
  }
  const PiNetworkb = ()=>{
    setList(pitiveItem)
    setTrade("buyprice")
  }
  const Crypto = () =>{
    setList(activeItem)
    setTrade("sellprice")
  }
  const Cryptob = () =>{
    setList(activeItem)
    setTrade("buyprice")
  }
  useEffect(()=>{
    axios.get(url).then((response)=>{
      setListed(response.data)
      // console.log(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])
    return(
      <section>
              <div className="h-screen overflow-scroll scrollbar-hide md:h-screen px-8 pb-20 pt-32 dark:bg-[#010f24]">
                {pidata.map((pitems)=>{
                  return(
                    <div key={pitems.id} onClick={()=>Pidrop(pitems)} className="flex justify-between mt-8 pb-3 border border-t-0 border-x-0 border-b-slate-200 dark:border-b-slate-700 ">
                      <div className="flex justify-center items-center gap-2">
                        <div>
                          <img src={pitems.image} alt="pi" className="w-10 h-10 rounded-full"/>
                        </div>
                        <div>
                          <p className="font-semibold dark:text-white">{pitems.name}</p>
                          <p className="text-slate-600 font-semibold uppercase">{pitems.symbol}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {/* <p className="dark:text-white">&#36;{(pitems.current_price).toLocaleString()}</p> */}
                        <div className="flex justify-center items-center bg-[#00df9a]/25 px-1 rounded-md">
                          <IoMdArrowDropup className="text-[#00df9a]"/>
                          <p className="text-[#00df9a]">{pitems.percentage}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {listed.map((item) => {
                  return(
                    <div onClick={()=> Bars(item)} key={item.id} className="flex justify-between mt-8 pb-3 border border-t-0 border-x-0 border-b-slate-200 dark:border-b-slate-700 ">
                        <div className="flex justify-center items-center gap-2">
                          <div>
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full"/>
                          </div>
                          <div>
                            <p className="font-semibold dark:text-white">{item.name}</p>
                            <p className="text-slate-600 font-semibold uppercase">{
                            item.symbol}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          {/* <p className="dark:text-white">&#36;{(item.current_price).toLocaleString()}</p> */}
                          {/* <p className={item.price_change_percentage_24h > 0 ? "text-[#00df9a]" : "text-red-600"}>{item.price_change_percentage_24h.toFixed(2)}%</p> */}
                          <div className={item.price_change_percentage_24h > 0 ? "flex justify-center items-center bg-[#00df9a]/25 px-1 rounded-md" : "flex justify-center items-center bg-red-600/25 px-1 rounded-md"}>
                            {item.price_change_percentage_24h > 0 ? <IoMdArrowDropup className='text-[#00df9a]'/> : <IoMdArrowDropdown className="text-red-600"/>}
                            <p className={item.price_change_percentage_24h > 0 ? "text-[#00df9a]" : "text-red-600"}>{item.price_change_percentage_24h.toFixed(2)}%</p>
                          </div>
                        </div>
                    </div>
                  )
                })}
              </div>


              {/* overlay */}
              {!coins ? <div onClick={Bars} className="fixed bg-black/80 w-full h-screen top-0 z-10"></div> : ""}
              {/*Open coins summary and drop down for other crypto sales */}
              <div className={!coins ? "fixed bottom-0 right-0 left-0 bg-slate-200 p-8 top-52 z-10 rounded-t-3xl" : "fixed bottom-0 right-0 left-0 bg-slate-200 p-8 top-52 z-10 rounded-t-3xl hidden"}>
                <div className="flex flex-col justify-between  items-center w-full">
                  <div className="border-2 border-slate-400 border-t-0 border-x-0 w-full flex flex-col items-center justify-center pb-3">
                    <img src={activeItem.image} alt="coinImage" className="w-20 h-20 rounded-full mx-auto"/>
                    <div className="mt-8 text-center">
                      <p className="font-semibold text-center">&#36;{sellprice.toLocaleString()}</p>
                      <p className="text-sm">24 hrs Change <span className={activeItem.price_change_percentage_24h > 0 ? "text-[#00df9a]" : "text-red-600"}>{activeItem.price_change_percentage_24h}</span></p>
                    </div>
                  </div>
                  <div className="bg-white mt-8 w-full rounded-xl py-3 flex flex-col justify-center items-center ">
                    
                    <p className="font-semibold uppercase">1 {activeItem.symbol} ~ $ {sellprice}</p>
                  </div>

                  {/* Buy and sell crypto section for Picoin */}

                  <div className="flex gap-3">
                    <Link to='/tradeCoin' onClick={Cryptob} className="flex justify-center items-center mt-8 w-full gap-2">
                      <div className="flex flex-col bg-white justify-center items-center p-5 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center">
                          <BsCreditCard size={20} className="text-blue-600"/>
                        </div>
                        <p className="text-sm font-semibold">BUY</p>
                      </div>
                    </Link>

                    <Link to='/tradeCoin' onClick={Crypto} className="flex justify-center items-center mt-8 w-full gap-2">
                      <div className="flex flex-col bg-white justify-center items-center p-5 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center">
                          <BsCreditCard size={20} className="text-blue-600"/>
                        </div>
                        <p className="text-sm font-semibold">SELL</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>


              {!drop ? <div onClick={Pidrop} className="fixed bg-black/80 w-full h-screen top-0 z-10"></div> : ""}
              {/* drop down for pi sales */}
              <div className={!drop ? "fixed bottom-0 right-0 left-0 bg-slate-200 p-8 top-52 z-10 rounded-t-3xl" : "fixed bottom-0 right-0 left-0 bg-slate-200 p-8 top-52 z-10 rounded-t-3xl hidden"}>
                <div className="flex flex-col justify-between  items-center w-full">
                  <div className="border-2 border-slate-400 border-t-0 border-x-0 w-full flex flex-col items-center justify-center pb-3">
                    <img src={pitiveItem.image} alt='picoin' className="w-20 h-20 rounded-full mx-auto"/>
                    <div className="mt-8">
                      <p className="font-semibold text-center">&#36;{pitiveItem.current_price}</p>
                      <p className="text-sm">24 hrs Change <span className="text-[#00df9a]">{pitiveItem.percentage}</span></p>
                    </div>
                  </div>
                  <div className="bg-white mt-8 w-full rounded-xl py-3 flex flex-col justify-center items-center ">
                    <p className="font-semibold">1 {pitiveItem.name} ~ $ {pitiveItem.current_price}</p>
                  </div>
                  
                  {/* Buy and sell crypto section for Picoin */}

                  <div className="flex gap-3">
                    <Link to='/tradeCoin' onClick={PiNetworkb} className="flex justify-center items-center mt-8 w-full gap-2">
                      <div className="flex flex-col bg-white justify-center items-center p-5 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center">
                          <BsCreditCard size={20} className="text-blue-600"/>
                        </div>
                        <p className="text-sm font-semibold">BUY</p>
                      </div>
                    </Link>

                    <Link to='/tradeCoin' onClick={PiNetwork} className="flex justify-center items-center mt-8 w-full gap-2">
                      <div className="flex flex-col bg-white justify-center items-center p-5 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center">
                          <BsCreditCard size={20} className="text-blue-600"/>
                        </div>
                        <p className="text-sm font-semibold">SELL</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              

              {/* CLOSE OF COINS SUMMARY */}
            </section>
    )
}