import React, { useState, useEffect} from "react"
// import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from "./firebase"
import {useNavigate, Link} from "react-router-dom"
import { collection, onSnapshot,  query,  where} from "firebase/firestore"
import db from "./firebase"
// import {BsSearch} from "react-icons/bs"
// import {AiOutlineArrowUp} from "react-icons/ai"
// import {IoMdNotificationsOutline} from "react-icons/io"
import {MdAdd} from "react-icons/md"
import { FaReact} from "react-icons/fa"
import Coinsmap from "./Coinsmap"
import GiftCards from "./Giftcards"
import History from "./History"
import {CgProfile} from "react-icons/cg"
import {MdDarkMode} from "react-icons/md"
import {HiOutlineLogout} from "react-icons/hi"
import {BiSupport} from "react-icons/bi"


export default function Welcome(){
  const [darkMode, setDarkMode] = useState(true)
  // const [view, setView] = useState(true)
  // const [coins, setCoins] = useState(true)
  const [crypto, setCrypto] = useState(true)
  const [gift, setGift] = useState(true)
  const [history, setHistory] = useState(true)
  const [nav, setNav] = useState(false);
  const [datal, setDatal] = useState([])
  const [verified, setVerified] = useState()
  const userId = localStorage.getItem("firebaseUserId")


  // to load the history information before users gets to the component then assign it to a variable and pass it as props
  useEffect(() => {
    const q = query(collection(db, "Transaction"), where("unique", "==", userId))
    const unsunscribe = onSnapshot(q, (querySnapshot) => {
        let transhistory = []
        querySnapshot.forEach((doc) => {
            transhistory.push({...doc.data(), id: doc.id})
        })
        setDatal(transhistory)
    })
    return () => unsunscribe()
  },[userId]);

 
  

  const handlegift = () => {
    setGift(false)
    setCrypto(false)
    setHistory(true)
  };
  const handlecoin = () => {
    setCrypto(true)
    setGift(true)
    setHistory(true)
  };
  const handleHistory = () => {
    setHistory(false)
    setCrypto(false)
    setGift(true)
  }
 
  useEffect(()=>{
        
    auth.onAuthStateChanged((user) => {
        if (!user){
          navigate('/login')
        }
        if (user) {
          setVerified(user.emailVerified)
        }
    })
    
  })


  const handleClick = () =>{
    setDarkMode(!darkMode)
  }

  const navigate = useNavigate()
  const getOut = () =>{
    auth.signOut()
    navigate('/login')
  }

    return(
        <div className={darkMode ? "dark" : ""}>
            <div className="">
            
            <section className=" dark:bg-[#0b212d] bg-white fixed top-0 right-0 left-0">
              <div className="w-full flex justify-center items-center py-4 px-5">
                <div className="text-black flex justify-center items-center dark:text-white">
                  <FaReact className="dark:text-white" size={25}/>
                  <p className="text-lg font-semibold">PiTrade</p>
                </div>
                <div></div>
              </div>
              {nav ? <div onClick={() => setNav(!nav)} className="fixed bg-black/80 w-full h-screen top-0 z-10 ease-in-out duration-500"></div> : ""}
              <div
                className={
                  !nav
                    ? "fixed left-[-100%]"
                    : "bg-[#010f24] fixed left-0 top-0 z-10 w-[75%] border-r border-r-gray-900 h-full ease-in-out duration-500 md:left-[-100%]"
                }
              >
                <div className="flex items-center text-white m-4 pt-3">
                  <FaReact className="text-white" size={25}/>
                  <p>React</p>
                </div>
                <ul className="uppercase p-4 text-white">
                  
                  <li className="p-4 border-b border-gray-600">About</li>
                  <Link to='/emailsupport'>
                    <li className="p-4 border-b border-gray-600">Contact</li>
                  </Link>
                </ul>
              </div>
              <div className="flex justify-between items-center py-8 px-8 dark:bg-[#010f24]">
                <div className="flex gap-8 text-slate-400">
                  <div onClick={handlecoin} className={!crypto ? "" : "border-[3px] border-t-0 border-x-0 border-b-[#00df9a]"}>
                    <p className={!crypto ? "" : "text-[#00df9a] font-semibold"}>Coins</p>
                  </div>
                  <div onClick={handlegift} className={!gift ? "border-[3px] border-t-0 border-x-0 border-b-[#00df9a]" : ""}>
                    <p className={!gift ? "text-[#00df9a] font-semibold" : ""}>GiftCards</p>
                  </div>
                  <div onClick={handleHistory} className={!history ? "border-[3px] border-t-0 border-x-0 border-b-[#00df9a]" : ""}>
                    <p className={!history ? "text-[#00df9a] font-semibold" : ""}>History</p>
                  </div>
                </div>
                
                <div className="w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center ">
                  <MdAdd/>
                </div>
              </div>
            </section>
            <div className="flex justify-between items-center fixed py-4 bottom-0 right-0 left-0 px-5 dark:bg-[#0b212d] bg-white shadow text-slate-600">
              <Link to='/profile'>
                <CgProfile size={30}/>
                {verified === false ? <div className="bg-red-500 rounded-full w-3 h-3 absolute top-3"></div> : ""}
              </Link>
              <Link to='/emailsupport'>
                <BiSupport size={30}/>
              </Link>
              <MdDarkMode size={30} onClick={handleClick}/>
              <HiOutlineLogout size={30} onClick={getOut}/>
            </div>

           {/* mapping through Data */}
            {crypto ? <Coinsmap/> : !gift ? <GiftCards/> :  <History datal={datal}/>  }
      
            </div>
        </div>
    )
}
// {user.name}