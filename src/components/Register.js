import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom"
import {auth} from "./firebase"
import { doc, setDoc} from "firebase/firestore"
import db from "./firebase"
import { FaReact } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth"
import "react-phone-number-input/style.css";


export default function Register() {
  const [errors, setErrors] = useState({})
  const [alerts, setAlerts] = useState(true)
  const [loadings, setLoadings] = useState(true)
  const [currentUser, setCurrentUser] = useState("")
  const [loading, setLoading] = useState(true)
  

  // values for error Validation
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    password: "",
  });
  // function to target the values inputted
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  // errors from Validation

 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    


      if (!values.firstname) {
      setErrors ({firstname: "Name is required."});
      return
      }
      if (!values.lastname) {
        setErrors ({lastname: "Name is required."});
        return
        }
      if (!values.email) {
      setErrors({email: "Email is required."})
      return
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      setErrors({email: "Email is invalid."})
      return
      }
      if (!values.password) {
      setErrors ({password: "Password is required."})
      return
      } else if (values.password.length < 8) {
      setErrors ({password: "Atleast 8 Characters"})
      return
      }

  
    //   user.sendEmailVerification()
    // .addOnCompleteListener(new OnCompleteListener<Void>() {
    //     @Override
    //     public void onComplete(@NonNull Task<Void> task) {
    //         if (task.isSuccessful()) {
    //             // Email sent successfully
    //         } else {
    //             // Email failed to send
    //         }
    //     }
    // });

      setErrors("")
      setLoading(true)
      setLoadings(false)
      const creation = await createUserWithEmailAndPassword(auth, values.email, values.password)
      await sendEmailVerification(creation.user)
      .then(auth=>{
        setLoadings(true)
        setAlerts(false)
      })
      .catch(error=>alert('something went wrong'))

      
      
      

       
  }
      
    // setDoc is used to edit or change an existing document and it uses docref and payload 
    // while addDoc uses collection ref and payload and it is use to create or lets say add new document to the collect

    
  useEffect (() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        setLoading(false)
        setCurrentUser(user)
        // setPc(currentUser.uid)
      })

    return unsubscribe
  }, [currentUser, values])


    const handleCreate = async () =>{
      const docRef = doc(db, "profiledetails", currentUser.uid)
      const payload = {firstname: values.firstname, lastname: values.lastname, MobileNumber: values.number}
      await setDoc (docRef, payload)
      const docRef1 = doc(db, "wallet", currentUser.uid)
      const payload1 = {walletAddress: "null"}
      await setDoc (docRef1, payload1)
      console.log(currentUser.uid)
      console.log(currentUser.email)
    }

  const [viewPass, setViewPass] = useState(false)
  

 
  useEffect(()=>{
    if (values.password.length > 0) {
      setViewPass(true)
      return
    }

    setViewPass(false)
  },[values.password])

  const [pass, setPass] = useState("false");
  const seePass = () => {
    setPass(!pass); 
  };
 


  return (
    <div>
        <div className="w-full h-[100vh] text-white flex justify-center items-center bg-black">
        <div className="flex flex-col justify-center items-center">
          <form className="flex flex-col gap-5">
            {/* {currentUser && currentUser.values.email} */}
            <h1 className="text-xl font-bold">Sign Up</h1>
            <div>
              <input
                className="w-[300px] h-10 pl-3 border rounded-lg text-black outline-none"
                type="text"
                onChange={handleChange}
                id="firstname"
                name="firstname"
                value={values.fullname}
                placeholder="First Name"
              />
              {errors.fullname && (
                <p className="error text-red-600">{errors.fullname}</p>
              )}
            </div>
            <div>
              <input
                className="w-[300px] h-10 pl-3 border rounded-lg text-black outline-none"
                type="text"
                onChange={handleChange}
                id="lastname"
                name="lastname"
                value={values.fullname}
                placeholder="Last Name"
              />
              {errors.fullname && (
                <p className="error text-red-600">{errors.fullname}</p>
              )}
            </div>
            <div>
              <input
                className="w-[300px] h-10 pl-3 border rounded-lg text-black outline-none"
                type="email"
                id="email"
                onChange={handleChange}
                name="email"
                value={values.email}
                placeholder="Email"
              />
              {errors.email && (
                <p className="error text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="w-[300px] h-10 pl-3 border rounded-lg text-black outline-none bg-white">
              <input
                className="w-[280px] h-10 text-black border-none outline-none"
                value={values.number}
                name="number"
                placeholder="MobileNumber"
                onChange={handleChange}
              />
              {errors.number && (
                <p className="error text-red-600">{errors.number}</p>
              )}
            </div>
            <div className="flex items-center bg-white border rounded-lg">
            <div>
            <input
              className="h-10 pl-3 border-none rounded-lg text-black outline-none"
              type={!pass ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
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
            <button
              disabled={loading}
              type="submit"
              onClick={handleFormSubmit}
              className="bg-[#00df9a] text-black h-10 border rounded-lg text-lg font-bold hover:scale-105 duration-100"
            >
              Create account
            </button>
          </form>
          <div className="w-full gap-5 mt-3">
            <p>
              Already have an account{" "}
             <Link to="/login">
                <span className="text-[#00df9a]">Login</span>
             </Link>
            </p>
          </div>
        </div>
      </div>
      <div className={!alerts ? "fixed flex justify-center items-center bg-white top-0 bottom-0 left-0 right-0" : "hidden"}>
          <div>
              <p>Account created successfully</p>
              <Link to='/login'>
                  <button onClick={handleCreate} className="bg-[#00df9a] text-black cursor-pointer border-0 rounded-lg text-lg font-semibold hover:text-slate-700 w-full">continue</button>
              </Link>
          </div>
      </div>
      <div className={!loadings ? "fixed flex justify-center items-center bg-white opacity-75 top-0 bottom-0 left-0 right-0" : "hidden"}>
          <FaReact className="animate-spin text-black font-bold" size={50}/>
      </div>
    </div>
  );
}
