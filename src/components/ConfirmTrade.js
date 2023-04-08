import React, {useContext, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import {IoIosArrowBack} from "react-icons/io"
import { UserContext } from "./UserContext"
import { AmountContext } from "./AmountContext"
import { UsersContext } from "../ProfileComponent/UsersContext"
import { GiftContext } from "../GiftComponent/GiftContext"
import { StackPriceContext } from "../Stack/StackPriceContext"


export default function ConfirmTrade(){
    const navigate = useNavigate()
    const {setUsers} = useContext(UsersContext)
    const {setPayment} = useContext(StackPriceContext)
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
    useEffect(()=>{
        setUsers(list.min ? pisellPrice : amountToPay)
    })

    useEffect(()=>{
        if (!trade ){
            navigate('/welcome')
        }
    },[trade, navigate])

    useEffect(() => {
        setPayment(pibuy)
    })

    return(
        <div>
            <div>
                <div className="flex justify-between text-white items-center fixed top-0 right-0 left-0 bg-blue-600 w-full p-2">
                    <Link to='/tradeCoin'>
                        <IoIosArrowBack size={20}/>
                    </Link>
                    <p>Confirm {trade === "buyprice" ? "Purchase" : "Sale"} of <span className="uppercase">{list.symbol}</span></p>
                    <p></p>
                </div>
                <div className="flex flex-col justify-center items-center px-5">
                    <div className="pt-20 pb-16">
                        <img className="w-20" src={list.image} alt="logo"/>
                    </div>
                    <div className="border w-full py-2 flex justify-center items-center border-x-0">
                        <p className="text-lg font-semibold tracking-wide">1 <span className="uppercase">{list.symbol}</span> at &#36; {list.min && trade === "buyprice" ? list.buy_price.toLocaleString() : list.min && trade === "sellprice" ? list.current_price : trade === "buyprice" ? buyprice : sellprice}</p>
                    </div>
                    <div className="flex w-full mt-5">
                        <p className="w-[50%]">You {trade === "buyprice" ? "Buy" : "Sell"}:</p>
                        <p>{tradeAmount} <span className="uppercase">{list.symbol}</span></p>
                    </div>
                    <div className="flex w-full mt-3">
                        <p className="w-[50%]">You {trade === "buyprice" ? "Pay" : "Get"}:</p>
                        <p>&#36; {list.min && trade === "buyprice" ? pibuyPrice : list.min && trade === "sellprice" ? pisellPrice : trade === "buyprice" && !list.min ? amountToRecieve : amountToPay}</p>
                    </div>
                    <Link to={trade === "buyprice" ? "/payment" : "/paymentaddress"}>
                        <button className=" mt-8 bg-blue-600 p-3 text-white outline-none">Proceed with {trade === "buyprice" ? "purchase" : "sale"}</button>
                    </Link>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}