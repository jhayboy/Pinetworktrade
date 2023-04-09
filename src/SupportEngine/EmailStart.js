import React, {useState, useEffect} from "react"
// import {RxAvatar} from "react-icons/rx"
import emailjs from '@emailjs/browser'
// import {BiSupport} from "react-icons/bi"
// import {SiCarthrottle} from 'react-icons/si'
import {Link, useNavigate} from 'react-router-dom'
import {AiOutlineRollback, AiOutlineLoading3Quarters} from 'react-icons/ai'

export default function EmailStart(){
    // const [showsupport, setShowsupport] = useState(true)
    // const [contact, setContact] = useState({name: "", email: "", message: ""})

    const navigate =  useNavigate()
    const [lock, setLock] = useState(false)
    const [alerts, setAlerts] = useState(false)
    const [contact, setContact] = useState({name: "", email: "", message: ""})
    const [loading, setLoading] = useState(false)

   
    const handleSubmit =  (e) => {
      e.preventDefault()
      setLoading(true);
      emailjs.send('service_l6qbsm9', 'template_0g35zch', {name: contact.name, email: contact.email, message: contact.message}, 'ye0atviIa9nxefHia')
      .then((result) => {
        setLoading(false)
        setAlerts(true)
      }, (error) => {
        console.log(error.text);
      });
    }
    useEffect(() =>{
        if (contact.name && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(contact.email) && contact.message) {
            setLock(false)
        } else{
            setLock(true)
        }
    },[contact.name, contact.message, contact.email])
    const handleChange = (event) =>{
        setContact({...contact,[event.target.name]: event.target.value})
    }
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600 px-8">
        <div className='flex justify-center items-center gap-1 text-white mb-3'>
            <p className='font-semibold text-2xl'>PiTrade Support</p>
        </div>
      {/* <h1 className="text-2xl font-bold mb-4 text-white">Contact Support</h1> */}
      <p className="text-white mb-8 text-center">Need help with your account? Please contact us using the form below:</p>
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
              Name:
            </label>
          </div>
          <div className="md:w-2/3">
            <input onChange={handleChange} value={contact.name} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600" type="text" name="name" />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
              Email:
            </label>
          </div>
          <div className="md:w-2/3">
            <input onChange={handleChange} value={contact.email} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600" type="email" name="email" />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
              Message:
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea onChange={handleChange} value={contact.message} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full h-32 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600" type="text" name="message" />
          </div>
        </div>
          <div className="flex items-center justify-between">
            <button disabled={lock} className="px-3 bg-white rounded-md py-1" onClick={handleSubmit}>{loading ? <AiOutlineLoading3Quarters className="animate-spin text-xl text-black"/> : 'Submit'}</button>
            <Link to='/welcome'>
              <button className="px-3 bg-white rounded-md py-1 flex items-center gap-1">Back <AiOutlineRollback/></button>
            </Link>
          </div>

          <div className={alerts ? "h-screen w-full bg-black/30 flex justify-center items-center fixed top-0 bottom-0 right-0 left-0" : "hidden"}>
            <div className="w-[80%] bg-white flex flex-col justify-center items-center py-10 gap-4">
              <p>Email Successful Sent</p>
              <Link to='/welcome'>
                <button className="bg-blue-600 px-2 py-1 text-white">continue</button>
              </Link>
              <p></p>
            </div>
          </div>
        </form>
    </div>    
    )
}
