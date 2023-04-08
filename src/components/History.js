import React from "react"
// import { collection, onSnapshot,  query,  where} from "firebase/firestore"
// import db from "./firebase"
import {GiBuyCard} from "react-icons/gi"


const History = ({datal}) => {
    // const [datal, setDatal] = useState([])

    // const userId = localStorage.getItem("firebaseUserId")
    // useEffect(() => {
    //     const q = query(collection(db, "Transaction"), where("unique", "==", userId))
    //     const unsunscribe = onSnapshot(q, (querySnapshot) => {
    //         let transhistory = []
    //         querySnapshot.forEach((doc) => {
    //             transhistory.push({...doc.data(), id: doc.id})
    //         })
    //         setDatal(transhistory)
    //     })
    //     return () => unsunscribe()
    // },[userId]);

   

    return(
        <div className="pt-40 pb-20 flex flex-col h-screen overflow-scroll">
             <div className={datal.length < 1 ? "flex px-3" : "hidden"}>
                <p>You have not transaction History</p>
            </div>
            {datal.map((items) => {
                return(
                    <div key={items.id} className="px-3 py-1 shadow-md border-black text-sm flex flex-col gap-2 mb-3 -order-1">
                        <div>
                            <p>{items.date} {items.month}, {items.year}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center items-center gap-3">
                                <div>
                                <GiBuyCard size={20} className="text-blue-500 "/>
                                </div>
                                <div>
                                    <p>{items.sold} {items.amount}<span className="uppercase">{items.coin}</span></p>
                                    <p>{items.time}</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p>&#36;{items.price}</p>
                                <p className={items.status === "pending" ? "text-yellow-600 ml-auto" : items.status === "Successful" ? "text-green-500 ml-auto" : "text-red-500 ml-auto"}>{items.status}</p>
                            </div>
                        </div>
                    </div>
                )
            })} 
           
        </div>
    )
}
export default History