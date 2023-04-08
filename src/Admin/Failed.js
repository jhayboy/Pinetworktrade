import React, {useEffect, useState} from 'react'
import { collection, onSnapshot,  query} from "firebase/firestore"
import db from "../components/firebase"

export default function Failed(){
    const [datal, setDatal] = useState([])
    const userId = localStorage.getItem("firebaseUserId")
    // if the id is not that of the admin let it go back to login
   

    

    
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
                    return(items.status === 'Failed' ? 
                    <div key={items.id} className="px-3 py-1 shadow-md border-black text-white text-sm flex flex-col gap-2 mb-3 -order-1">
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
                                <p className="text-red-500 ml-auto">{items.status}</p>
                            </div>
                        </div>
                    </div>
                    : "" )
                })}

            </div>
                
        </div>
    )
}