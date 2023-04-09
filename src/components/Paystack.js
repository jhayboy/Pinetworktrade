import React, {useState, useContext, useEffect} from "react"
import { PaystackButton } from 'react-paystack'
// import { StackPriceContext } from "../Stack/StackPriceContext"
import 'firebase/firestore';
import {doc, getDoc, addDoc, collection, serverTimestamp} from "firebase/firestore"
import db from "./firebase"
import {auth} from "./firebase"
import { GiftContext } from "../GiftComponent/GiftContext";
import { UserContext } from "./UserContext";
import { AmountContext } from "./AmountContext";
import { WalletContext } from "../GiftComponent/WalletContext";
import { useNavigate } from "react-router-dom";
// pk_live_dc52ed0c16dd74ec90c5c9400fe5b0dd2b6ccac2
// pk_test_3d0512a0e2294a19429257c354e7829b15633cf8

const Paystack = () =>{
  const navigate = useNavigate()
  const {walletad} = useContext(WalletContext)
  const {list} = useContext(UserContext)
  const {trade} = useContext(GiftContext)
  const {tradeAmount} = useContext(AmountContext)
  const sellmath = list.current_price + (60/100) * list.current_price
  const sellprice = sellmath.toLocaleString()
  const buymath = list.current_price + (67/100) * list.current_price
  const buyprice = buymath.toLocaleString()
  const totalsp = tradeAmount * sellmath
  const amountToPay = totalsp.toLocaleString()
  const totalbp =  tradeAmount *  buymath
  const amountToRecieve = totalbp.toLocaleString()
  const pibuy = tradeAmount * list.buy_price
  const pibuyPrice = pibuy.toLocaleString()
  const pisell = tradeAmount * list.current_price
  const pisellPrice = pisell.toLocaleString()
  // const {payment} = useContext(StackPriceContext)
  const userId = localStorage.getItem('firebaseUserId');
  const publicKey = "pk_live_dc52ed0c16dd74ec90c5c9400fe5b0dd2b6ccac2"
  const amount = pibuy * 100 // Remember, set in kobo!
  const divide = amount / 100
  const users = divide.toLocaleString()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [lock, setLock] = useState(true)
  const [main, setMain] = useState([])
  const Usersname = main.firstname + " " + main.lastname
  const sold = trade === 'buyprice' ? "bought" : "sold"
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
    const date = new Date();
    const monthNumber = date.getMonth();
    const monthName = monthNames[monthNumber];
    const today = date.getDate()
    const year = date.getFullYear()
    const [time, setTime] = useState(new Date());
    const [timeOfDay, setTimeOfDay] = useState('');
  

    useEffect(() => {
      if(!walletad){
        navigate('/welcome')
      }
    })

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    // console.log(timeOfDay)
    
    useEffect(() => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
      setTimeOfDay(hours < 12 ? 'AM' : 'PM');
    }, [time, setTimeOfDay]);
    const realtime = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

  const handleTrans = async()=>{
    // setTrans(false)
    const coin = list.symbol
    const docRef = await addDoc(collection(db, "Transaction"), {
        date: today,
        month: monthName,
        year: year,
        time: realtime,
        sold: sold,
        amount: tradeAmount,
        coin: coin,
        price: users,
        timestamp: serverTimestamp(),
        status: "pending",
        unique: userId,
        email: email,
        walletAd: walletad
    });
    console.log("Document written with ID: ", docRef.id)
}

  useEffect(() =>{
    if (name && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && phone) {
        setLock(false)
    } else{
        setLock(true)
    }
},[name, phone, email])

  useEffect (()=> {
    auth.onAuthStateChanged((user) => {
      setEmail(user.email)
    })
  })

    useEffect(()=>{
      async function fetch(){
          const docRef = doc(db, "profiledetails", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              setMain(docSnap.data());
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }  
      }
      fetch()
      
      
    })
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>{
      handleTrans() 
      navigate('/welcome')
    },
    onClose: () => alert("Thanks for the attempt, we hope you change your mind"),
  }
    return (
        <div className="flex flex-col items-center justify-center h-screen px-8 bg-[#010f24] text-white w-full">
          {/* <div className='flex justify-center items-center gap-1 text-white mb-3'>
            <p className='font-semibold text-2xl'>PiTrade</p>
          </div> */}

        {/* THE DETAILS FOR PURCHASE */}
        <div className="flex flex-col justify-center items-center w-full">
            <div className="">
                <img className="w-20" src={list.image} alt="logo"/>
            </div>
            <div className="border w-full py-2 flex justify-center items-center border-x-0">
                <p className="text-lg font-semibold tracking-wide">1 <span className="uppercase">{list.symbol}</span> at NGN {list.min && trade === "buyprice" ? list.buy_price.toLocaleString() : list.min && trade === "sellprice" ? list.current_price : trade === "buyprice" ? buyprice : sellprice}</p>
            </div>
            <div className="flex w-full mt-5">
                <p className="w-[50%]">You {trade === "buyprice" ? "Buy" : "Sell"}:</p>
                <p>{tradeAmount} <span className="uppercase">{list.symbol}</span></p>
            </div>
            <div className="flex w-full mt-3">
                <p className="w-[50%]">You {trade === "buyprice" ? "Pay" : "Get"}:</p>
                <p>NGN {list.min && trade === "buyprice" ? pibuyPrice : list.min && trade === "sellprice" ? pisellPrice : trade === "buyprice" && !list.min ? amountToRecieve : amountToPay}</p>
            </div>
            <PaystackButton disabled={lock} className="paystack-button bg-green-600 p-3 mt-5" {...componentProps} />
        </div>
                {/* END OF DETAILS OF PURCHASE */}

      {/* <h1 className="text-2xl font-bold mb-4 text-white">Contact Support</h1> */}
            <div className="w-full max-w-sm hidden">
                <div className="checkout-field md:flex md:items-center mb-6 hidden">
                  <div className="md:w-1/3">
                    <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Name
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      className="w-full px-1 py-2 text-black border-0 outline-0"
                      id="name"
                      value={Usersname}
                      onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                </div>
                
                <div className="checkout-field md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Email
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      className="w-full px-1 py-2 text-black border-0 outline-0"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                </div>
                
                <div className="checkout-field md:flex md:items-center mb-6 hidden">
                  <div className="md:w-1/3">
                    <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Phone
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      className="w-full px-1 py-2 text-black border-0 outline-0"
                      id="phone"
                      value={main.MobileNumber}
                      onChange={(e) => setPhone(e.target.value)}
                      />
                  </div>
                </div>

                
                 <PaystackButton disabled={lock} className="paystack-button bg-green-600 p-3" {...componentProps} />
            </div>
        </div>
    )
}

export default Paystack