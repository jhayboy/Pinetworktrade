import React, {useEffect, useState} from 'react'
import { collection, onSnapshot,  query, doc, setDoc} from "firebase/firestore"
import db from "../components/firebase"
import {MdOutlineCancel} from 'react-icons/md'

export default function Pending(){
    const [datal, setDatal] = useState([])
    const [status, setStatus] = useState(false)
    const [transaction, setTransaction] = useState([])
    const userId = localStorage.getItem("firebaseUserId")
    // if the id is not that of the admin let it go back to login
    const handleSuccess = (id) => {
        const docRef = doc(db, "Transaction", id)
        const payload = {
            unique: transaction.unique,
            amount: transaction.amount,
            coin: transaction.coin,
            date: transaction.date,
            month: transaction.month,
            email: transaction.email,
            price: transaction.price,
            sold: transaction.sold,
            time: transaction.time,
            timestamp: transaction.timestamp,
            year: transaction.year,
            status: "Successful"
        }
        setDoc(docRef, payload)
    }

    const handleFailed = (id) => {
        const docRef = doc(db, "Transaction", id)
        const payload = {
            unique: transaction.unique,
            amount: transaction.amount,
            coin: transaction.coin,
            date: transaction.date,
            email: transaction.email,
            month: transaction.month,
            price: transaction.price,
            sold: transaction.sold,
            time: transaction.time,
            timestamp: transaction.timestamp,
            year: transaction.year,
            status: "Failed"
        }
        setDoc(docRef, payload)
    }

    const handleCheck = (items) => {
        setTransaction(items)
        setStatus(true)
    }
    useEffect(() => {
        const q = query(collection(db, "Transaction"))
        const unsunscribe = onSnapshot(q, (querySnapshot) => {
            let transhistory = []
            querySnapshot.forEach((doc) => {
                transhistory.push({...doc.data(), id: doc.id})
            })
            setDatal(transhistory)
        })
        return () => unsunscribe()
    },[userId]);

    
    return(
        <div className='bg-[#010f24] h-screen py-5'>
            
            <div className='flex flex-col gap-5 mt-5 bg-[#0b212d]'>
                {datal.map((items) => {
                    return(items.status === 'pending' ? 
                    <div key={items.id} onClick={()=>handleCheck(items)} className="px-3 py-1 shadow-md border-black text-white text-sm flex flex-col gap-2 mb-3 -order-1">
                        <div>
                            <p>{items.sold === "bought" ? items.walletAd : items.email}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center items-center gap-3">
                                <div>
                                    <p>{items.sold} {items.amount}<span className="uppercase">{items.coin}</span></p>
                                    <div className='flex gap-3 items-center'>
                                        <p>{items.date} {items.month}, {items.year}</p>
                                        <p>{items.time}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p>&#36;{items.price}</p>
                                <p className="text-yellow-600 ml-auto">{items.status}</p>
                            </div>
                        </div>
                    </div>
                    : "" )
                })}

            </div>
                <div className={!status ? 'hidden' : 'w-full h-screen fixed top-0 bottom-0 flex justify-center items-center bg-black/20 px-8'}>
                    <div className='bg-white py-4 flex flex-col gap-3 justify-center items-center'>
                        <div className='flex flex-col'>
                            <MdOutlineCancel onClick={() => setStatus(!status)}/>
                            <div>
                                <p>Transaction id: {transaction.id}</p>
                                <p>Coin{transaction.coin}</p>
                            </div>
                        </div>
                        <p>What status does this transaction holds ?</p>
                        <div className='flex gap-3'>
                            <button onClick={() => handleSuccess(transaction.id)} className='bg-green-500 py-1 rounded-lg'>Successful</button>
                            <button onClick={() => handleFailed(transaction.id)} className='bg-red-500 py-1 rounded-lg'>Failed</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}