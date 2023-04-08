import React, { useEffect, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import {Redirect} from "react-router-dom"
import {FaReact} from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase"
// import { UsersContext } from "../ProfileComponent/UsersContext";


export default function Login() {
//  const {setUsers} = useContext(UsersContext) || {}
 const [profileId, setProfileId] = useState()
 const [pass, setPass] = useState("false");
 const seePass = () => {
    setPass(!pass); 
  };
  // prevent form Submit and firebase auth for login
  const [password,setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({})
  const [alerts, setAlerts] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadings, setLoadings] = useState(true)
  const navigate = useNavigate()


  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({email: "Email is required."})
      return
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrors({email: "Email is invalid."})
      return
    }
    if (!password) {
      setErrors ({password: "Password is required."})
      return
    } else if (password.length < 8) {
      setErrors ({password: "Atleast 8 Characters"})
      return
    } 

      setErrors("")
      setLoadings(false)
      signInWithEmailAndPassword(auth, email, password)
      .then(auth=>{
        setLoadings(true)
        if (email === "admin@me.com") {
          navigate("/adminonly")
        } else {
          navigate("/welcome")
        }
      })
      .catch(()=>{
        setLoadings(true)
        setAlerts(false)
      })
    
  };

  const handleCreate = () =>{
    setAlerts(true)
  }
  useEffect(()=>{

    auth.onAuthStateChanged(user =>{
        if (user){ 
          // console.log(user.uid)
          // console.log(user.email)
          // console.log(user.emailVerified)
          // console.log(user)
          setProfileId(user)
          localStorage.setItem('firebaseUserId', user.uid);
        }
    })
  
},[])
  

  const [viewPass, setViewPass] = useState(false)

  // useEffect(()=>{
        
  //   auth.onAuthStateChanged((user) => {
  //       if (user){
  //         navigate('/welcome')
  //       }
  //   })
    
  // })
 
  useEffect(()=>{
    if (password.length > 0) {
      setViewPass(true)
      setLoading(false)
      return
    }

    setViewPass(false)
  },[password])
  console.log(profileId)

 
  

  return (
    <div className="w-full h-screen text-white flex justify-center items-center bg-black">
      <div className="flex flex-col justify-center items-center">
        <form className="flex flex-col gap-5 w-full">
          <h1 className="text-xl font-bold">Login</h1>
          <div className="w-full">
            <input
              className="w-full h-10 pl-3 border rounded-lg text-black outline-none"
              type="email"
              id="email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && (
                  <p className="error text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="flex items-center bg-white border rounded-lg w-full">
            <div className="w-full">
              <input
                className="h-10 pl-3 border-none rounded-lg text-black outline-none"
                type={!pass ? "text" : "password"}
                id="password"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
              />
              {errors.password && (
                  <p className="error text-red-600">{errors.password}</p>
              )}
            </div>
            <div onClick={seePass} className={!viewPass ? "hidden" : "ml-20"}>
                {!pass ? (
                  <AiOutlineEyeInvisible className="text-black" size={20} />
                ) : (
                  <AiOutlineEye className="text-black" size={20} />
                )}
            </div>
          </div>
          <button disabled={loading} onClick={handleFormSubmit} className="bg-[#00df9a] text-black h-10 cursor-pointer border-0 rounded-lg text-xl font-semibold hover:text-slate-700">
            Login
          </button>
        </form>
        <div className="w-full gap-5">
          <Link to='/resetpassword' className="mt-5">
            <span className="text-[#00df9a]">Forgotten Password</span>
          </Link>
          <p className="">
            Don't have an account{" "}
            <Link to="/register">
              <span className="text-[#00df9a] cursor-pointer">Sign up</span>
            </Link>
          </p>
        </div>
        <div className={!loadings ? "fixed flex justify-center items-center bg-white top-0 bottom-0 left-0 right-0" : "hidden"}>
          <FaReact className="animate-spin text-black font-bold" size={50}/>
        </div>
        <div className={!alerts ? "fixed flex justify-center items-center bg-black/80 top-0 bottom-0 left-0 right-0" : "hidden"}>
          <div>
              <p className="mb-2">Incorrect Email or Password</p>
              <button onClick={handleCreate} className="bg-[#00df9a] text-black cursor-pointer border-0 rounded-lg text-lg font-semibold hover:text-slate-700 w-full">continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
