import React, {useState, useContext, useEffect} from "react"
import {IoIosArrowBack} from "react-icons/io"
import {MdOutlineCancel} from "react-icons/md"
import {BsCheckCircle} from "react-icons/bs"
import {Link} from "react-router-dom"
import { GiftContext } from "../GiftComponent/GiftContext"
import {FiUpload} from "react-icons/fi"
import {FaReact} from "react-icons/fa"
import {BsCheckCircleFill} from "react-icons/bs"
import {GiCancel} from "react-icons/gi"
import Recieptdrop from "../GiftComponent/Recieptdrop"
import { SellContext } from "../GiftComponent/SellContext"
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import {addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore"
import {auth} from "./firebase"
import db from "./firebase"



export default function Trade({cardsellprice, cardbuyprice}){
    const {sell} = useContext(SellContext)  /*8the total of the giftcars*/
    const {trade} = useContext(GiftContext)
    const[success, setSuccess] = useState(false)
    const [icons, setIcons] = useState(true)
    const [summary, setSummary] = useState(false)
    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState()
    const userId = localStorage.getItem("firebaseUserId")
    const sold = trade === "buy" ? "Bought" : "Sold"
    // getting the values of the input 
    const [values, setValues] = useState({email: ""})
    const [next, setNext] = useState(true)
    // const [close, setClose] = useState(true)
    const cardprice = trade === "sell" ? cardsellprice : cardbuyprice
    const [time, setTime] = useState(new Date());
    const realtime = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []); 

    const date = new Date();
    const monthNumber = date.getMonth();
    const monthName = monthNames[monthNumber];
    const today = date.getDate()
    const year = date.getFullYear()

    // TRANSACTION HISTORY FOR GIFTCARD
    const handleTrans = async()=>{
        const docRef = await addDoc(collection(db, "Transaction"), {
            date: today,
            month: monthName,
            year: year,
            time: realtime,
            sold: sold,
            amount: cardprice,
            price: sell,
            timestamp: serverTimestamp(),
            status: "pending",
            unique: userId,
            email: currentUser
        });
        console.log("Document written with ID: ", docRef.id, sell)
    }
    useEffect(()=>{
        
        auth.onAuthStateChanged((user) => {
            if (user){
                setCurrentUser(user.email)
                
            }
        })
        
    },[userId])





    
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    useEffect(()=>{
        if(validateEmail(values.email)){
            setIcons(false)
            setNext(false)
        } else {
            setIcons(true)
        }
        if (values.email.length < 1){
            setVisible(false)
        }
        if (values.email.length > 0){
            setVisible(true)
        }
    },[values.email])
  

    useEffect(()=>{
       if (summary){
        setTimeout(()=>{
            setLoading(false)
        }, 4000)
       }
    })
    const [imageUpload, setImageUpload] = useState([]);
    // SETTING AMOUNT TO ITEMS SO WE CAN USE ITEMS.PRICE IN THE SUCCESS PAGE
    const [amp, setAmp] = useState([])  
    const [usersEmail, setUsersEmail] = useState("")
    const [profile, setProfile] = useState([])
    
  
    useEffect(() =>{
        onSnapshot(doc(db, "bankinfo", userId), (doc) => {
            // console.log(doc.data());
            const datal = doc.data()
            setProfile(datal)
        });
    })
    useEffect(()=>{
        auth.onAuthStateChanged((user) =>{
            setUsersEmail(user)
        })
    })

    const uploadImage = () => {
        if (imageUpload.length < 1)return;
        // pushing all the images at once
        const pushImages = () => {
          Promise.all(
            imageUpload.map(async (imagine) => {
              const imageRef = ref(storage, `imageUpload/${usersEmail + "name"}`); 
              await uploadBytes(imageRef, imagine);
              console.log(imagine)
            })
          );
        };
        // waiting for all the images to upload befor it show alert message
        pushImages();
        setSummary(true);
    };

    const handleImageUpload = (e) => {
        // selecting the images two or more
        const selectedFiles = e.target.files;
        // creating another array and specifying the images
        const result = Object.keys(selectedFiles).map((key) => selectedFiles[key])
        const selectedFilesArray = Array.from(selectedFiles)
        const imagesArray = selectedFilesArray.map((files)  => {
          return URL.createObjectURL(files)
        })
    
        for (let i = 0; i < imagesArray.length; i++){
          amp[i] = imagesArray[i]
        }
        setImageUpload(result);
      };

   
    
    const handleChange = (event) =>{
        setValues({...values, [event.target.name]: event.target.value})
    }

    const handleClick = () =>{
      setSuccess(true)
    }
    return(
        <div>
            <div className="flex justify-between text-white items-center fixed top-0 right-0 left-0 bg-blue-600 w-full p-2">                
                <Link to='/welcome'>
                  <IoIosArrowBack size={20}/>
                </Link>
                <p>{trade === "buy" ? "Buy Giftcard" : "Sell Giftcard"}<span className="uppercase">{}</span></p>
                <p></p>
            </div>
            {trade === "buy" ? 
            <div className="flex flex-col justify-center items-center px-8 mt-20">
                <p className="mb-3">Recipient's Email</p>
                <div className="flex items-center w-full border border-slate-400 rounded-md">
                    <input type="email" onChange={handleChange} name="email" value={values.email} placeholder="Email Address" className="w-full outline-none text-md py-3 px-2 font-semibold border-none"/>
                    <div className={!visible ? "hidden" : "flex"}>{!icons ? <BsCheckCircle className="text-green-600"/> : <MdOutlineCancel className="text-red-500"/>}</div>
                </div>
                <button onClick={handleClick} disabled={next} className=" mt-5 bg-blue-600 px-8 py-3 text-white outline-none">Proceed</button>
                
                {/* the overview just like the reciept of the transaction */}
                <div className={success ? "fixed bottom-0 top-0 right-0 left-0 bg-slate-200 p-8 z-10" : "hidden"}>
                   <Recieptdrop values={values} />
                </div>
            </div> : 
            <div className="flex flex-col justify-center items-center px-8 mt-20">
                <p>{trade === "buy" ? "Input your Email Address" : "Upload Giftcard Image"}</p>
                <div className="flex justify-start items-center w-full p-2 mt-5">
                    <div className="w-full border border-black rounded-lg flex flex-col justify-center items-center border-dashed p-3">
                        {/* <div className="flex overflow-x-auto gap-2 overflow scrollbar-w-3">
                            {amp.map((url, index) => {
                                return(
                                <div key={index}>
                                    <img className="m-1 rounded-sm" src={url} alt="images" />
                                    <GiCancel onClick={()=> setAmp(amp.filter((e) => e !== url))}/>
                                </div>
                            )
                            })}
                        </div> */}
                        <label htmlFor="upload" >
                            <div className="flex items-center justify-center">
                                <FiUpload className="text-xl"/>
                                <h1 className="text-lg h- font-semibold ml-3">Upload Card</h1>
                            </div>
                        </label>
                    </div>
                    <input
                        onChange={handleImageUpload}
                        multiple
                        type="file"
                        id="upload" 
                        name="quantity" 
                        className="hidden" 
                    />
                </div>
                <div className="flex gap-2 w-[50%]">
                    {amp.map((url, index) => {
                        return(
                        <div key={index}>
                            <img className="m-1 rounded-sm w-[100px] h-[70px]" src={url} alt="images" />
                            <GiCancel onClick={()=> setAmp(amp.filter((e) => e !== url))}/>
                        </div>
                    )
                    })}
                </div>
                <p className="mr-auto text-slate-400">{}</p>
                <button onClick={uploadImage}  className=" mt-5 bg-blue-600 p-3 text-white outline-none">Proceed with sale</button>
                
                {/* success page that pops up after the image upload has been sucessfull */}
                <div className={summary ? "fixed flex flex-col bg-white justify-center items-center z-10 p-5 top-0 left-0 right-0 bottom-0" : "hidden"}>
                    {loading ? <FaReact size={45} className="animate-spin "/> :
                    <div className="flex flex-col justify-center items-center gap-5">
                        <BsCheckCircleFill size={40} className="text-green-500"/>
                    <p className="text-center">Your Giftcard is being reviewed, as soon as card is verified your {profile.bankName} account with the account number {profile.accNo} will be credited with &#36;10,000 </p>
                    <Link to='/welcome'>
                      <button onClick={handleTrans} className="bg-blue-600 p-3 px-5 rounded-lg text-white outline-none">Continue</button>
                    </Link>
                    </div>
                    }
                </div>
                {/* end of the sucess page */}
            </div>} 
        </div>
    )
}
