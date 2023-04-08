import React, {useState, useEffect,useContext} from "react"
import {IoIosArrowBack} from "react-icons/io"
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from "./UserContext"
import { AmountContext } from "./AmountContext"
import { GiftContext } from "../GiftComponent/GiftContext"

export default function Trade(){
    const {trade} = useContext(GiftContext)
    const {list} = useContext(UserContext)
    const {setTradeAmount} = useContext(AmountContext)
    // getting the values of the input 
    const [amount, setAmount] = useState({quantity: ""})
    const [next, setNext] = useState(true)
    const navigate = useNavigate()
    // const [close, setClose] = useState(true)

   useEffect(()=>{
    if (!trade && !list){
        navigate('/welcome')
    }
   })
    useEffect(()=>{
        if(list.current_price <= 20 && trade === "sellprice" && amount.quantity >= 100){
            setNext(false)
        }
        if(list.current_price > 20 && trade === "sellprice" && amount.quantity > 0){
            setNext(false)
        }
       
        // if(list.name !== "PiCoin" && amount.quantity.length > 0){
        //     setNext(false)
        // }
        // if(list.name !== "PiCoin" && amount.quantity.length < 1){
        //     setNext(true)
        // }
        if(list.current_price <= 20 && trade === "sellprice" && amount.quantity < 1){
            setNext(true)
        }
        if(list.current_price > 20 && trade === "sellprice" && amount.quantity <= 0){
            setNext(true)
        }
        if (trade === "buyprice" && list.name === "PiCoin" &&  amount.quantity < 50){
            setNext(true)
        }
        if (trade === "buyprice" && list.name === "PiCoin" &&  amount.quantity >= 50){
            setNext(false)
        }
        // if (trade === "buyprice" && list.name !== "PiCoin" && list.current_price < 20 &&  amount.quantity >= 5){
        //     setNext(false)
        // }

        // THIS IS WHAT IS REMAINING THE BUYING OF OTHER COIN THAT IS NOT CORE OR PI
        // DECIDEING THE QUANTITY FOR OTHER COIN FOR NOW GO AND FIX THE SELL ING PRICE FOR OTHER COIN
        // THAT IS NOT CORE OR PI

        if (trade === "buyprice" && list.name === "Core Dao" &&  amount.quantity < 10){
            setNext(true)
        }
        if (trade === "buyprice" && list.name === "Core Dao" &&  amount.quantity >= 10){
            setNext(false)
        }
        setTradeAmount(amount.quantity)
    },[list.current_price, list.name, setTradeAmount, amount.quantity, trade])
    const handleChange = (event) =>{
        setAmount({...amount, [event.target.name]: event.target.value})
    }
    console.log(list.name)
    return(
        <div>
            <div className="flex justify-between text-white items-center fixed top-0 right-0 left-0 bg-blue-600 w-full p-2">                
                <Link to='/welcome'>
                  <IoIosArrowBack size={20}/>
                </Link>
                <p>{trade === "buyprice" ? "Buy" : "Sell"} <span className="uppercase">{list.symbol}</span></p>
                <p></p>
            </div>
            <div className="flex flex-col justify-center items-center px-8 mt-20">
                <p>How many {list.name} would you like to {trade === "buyprice" ? "Buy" : "trade"}?</p>
                <div className="flex justify-start items-center w-full border p-2 mt-5">
                    <img className="w-5" src={list.image} alt="logo"/>
                    <input 
                        onChange={handleChange} 
                        value={amount.quantity} 
                        type="number" 
                        name="quantity" 
                        className="outline-none border-0 ml-2 appearance-none" 
                        placeholder="Enter Amount"
                    />
                </div>
                {trade === "sellprice" && list.name === "PiCoin" ? <p className="mr-auto text-slate-400 mt-2">minimum of 100</p> : <p className="mr-auto text-slate-400 mt-2">{trade === "buyprice" ? list.min : ""}</p>}
                <Link to={trade === "buyprice" ? '/wallet' : '/confirmtrade'}>
                    <button disabled={next} className=" mt-5 bg-blue-600 p-3 text-white outline-none">Proceed with {trade === "buyprice" ? "purchase" : "sale"}</button>
                </Link>
            </div> 
        </div>
    )
}