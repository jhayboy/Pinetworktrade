import React, { useContext, useState, useEffect} from "react"
// import {Link} from "react-router-dom"
import { PaystackButton } from 'react-paystack'
import {auth} from "../components/firebase"
import { TotalContext } from "./TotalContext"
import { PriceContext } from "./PriceContext"
import { QuantityContext } from "./QuantityContext"
// import { clearIndexedDbPersistence } from "firebase/firestore"

export default function Recieptdrop({values}){
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const publicKey = "pk_test_3d0512a0e2294a19429257c354e7829b15633cf8"

    useEffect (()=> {
        auth.onAuthStateChanged((user) => {
          setEmail(user.email)
        })
      })
    
    // const [next, setNext] = useState(true)
    const {totals} = useContext(TotalContext) 
    const {price} = useContext(PriceContext) 
    const {quantities} = useContext(QuantityContext) 

    const totalPurchase = totals * price.quantity
    const amount = totalPurchase * 100
    
    const date = new Date()
    const year = date.getFullYear() - 2000
    const month = date.getMonth() + 1
    const day = date.getDate()


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
        //   handleTrans() 
        //   navigate('/welcome')
        },
        onClose: () => alert("Thanks for the attempt, we hope you change your mind"),
      }
    return(
        <div className="flex flex-col justify-between  items-center w-full font-sans">
        
        <div className="w-full">
            <p className="pl-2">Summary</p>
            <div className="bg-white mt-3">
                <p className="text-sm pl-2 pt-3 mt-3">Transaction date: {`${day}.${month}.${year}`}</p>
                <div className="mt-3 py-1 border-x-0 border border-y-slate-600 flex justify-center items-center">
                    <p className="font-semibold">Overview</p>
                </div>
                <div className="flex justify-between items-center mt-2 px-2 py-5">
                    <div className="gap-3 flex flex-col text-sm">
                        <p>Giftcard:</p>
                        <p>Value (qty):</p>
                        <p>Deliver to:</p>
                        <p>Order amount:</p>
                        <p>Total amount:</p>
                    </div>
                    <div className="flex flex-col items-end gap-3 text-sm">
                        <p>{quantities.name}</p>
                        <p>${price.price} (x{price.quantity})</p>
                        <p>{values.email}</p>
                        <p> &#36;{totalPurchase.toLocaleString()}</p>
                        <p className="font-semibold text-blue-700"> &#36;{totalPurchase.toLocaleString()}</p>
                    </div>
                </div>
            </div>

        </div>
        <PaystackButton className="px-16 py-2 w-full rounded-lg text-white font-semibold mt-3 bg-blue-600" {...componentProps} />
        {/* <button className="px-16 py-2 w-full rounded-lg text-white font-semibold mt-3 bg-blue-600">Pay</button> */}
        
        {/* Buy and sell crypto section for Picoin */}

    
        </div>
        
    )
}