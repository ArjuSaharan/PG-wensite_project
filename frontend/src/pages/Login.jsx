import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { AppConetxt } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
const Login = () => {
  const query=new URLSearchParams(window.location.search)
  const urlState=query.get('state')
  const[state,setstate]=useState(urlState ||"login");
  const[formData,setformData]=useState({
    name:"",
    email:"",
    password:"",
  })
  const {backendUrl,getuserdata,setisLoggin,userData,setuserData}=useContext(AppConetxt);
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      console.log(formData.email);
      if(state==="register"){
      const {data}=await axios.put(backendUrl+'/pg/user/register',{
        name:formData.name,
        email:formData.email,
        password:formData.password
      },{
        withCredentials:true,
      })
      if(data.success){
        setisLoggin(true);
        getuserdata();
        navigate('/user');
      }
      else{
        toast.error(data.message)
      }
    }
    else{
      const {data}=await axios.post(backendUrl+'/pg/user/login',{
        email:formData.email,
        password:formData.password
      },{
        withCredentials:true,
      })
      if(data.success){
        setisLoggin(true);
        getuserdata();
        navigate('/user');
      }
      else{
        toast.error(data.message);
      }
    }
    }
    catch(error){
      toast.error(error.message);
    }
  }
  const handleChange=(e)=>{
    const{name,value}=e.target
    setformData(prev=>({...prev,[name]:value}))
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
   <form onSubmit={handleSubmit} className='sm:w-[350px] w-full text-center border border-gray-300/6 rounded-2xl px-8 bg-white'>
       <h1 className='text-gray-900 text-3xl mt-10 font-medium'>{state==="login" ? "Login":"Sign Up"}</h1>
       <p className='text-gray-500 text-sm mt-2'>Please {state} to continue</p>
       {
        state !== "login" &&(
          <div className='flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
             <FaRegUser className='h-5 w-5'/>
             <input type="text" name="name" placeholder='Name'
             className='border-none outline-none ring-0'
             value={formData.name}
             onChange={handleChange} required/>
          </div>
        )}
        <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
             <CiMail className='h-5 w-5'/>
             <input type="email" name="email" placeholder='Emaiil id'
             className='border-none outline-none ring-0'
             value={formData.email}
             onChange={handleChange} required/>
        </div>
        <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
             <CiLock className='h-5 w-5'/>
             <input type="password" name="password" placeholder='Password'
             className='border-none outline-none ring-0'
             value={formData.password}
             onChange={handleChange} required/>
        </div>
        <div>
          <button className='text-sm text-violet-600' type="reset">Forget password?</button>
        </div>
        <button className='mt-2 w-full h-11 rounded-full text-white bg-violet-700 hover:bg-violet-500 cursor-pointer'>
          {state=== "login" ? "Login" : "Sign up"}
        </button>
        <p onClick={() => setstate(prev => prev === "login" ? "register" : "login")}
          className='text-gray-600 text-sm mt-3 mb-11 cursor-pointer'
        >
        {state === "login" 
        ? "Don't have an account?" 
        : "Already have an account?"
        }  <span className='text-violet-600 ml-1'>
        Click here
        </span>
       </p>
       <p
          className='text-gray-600 text-sm mt-3 mb-11 cursor-pointer'
        >Create owner Account?
        <span className='text-violet-600 ml-1'>
       <Link to='/ownerlogin'>Click here</Link>
        </span>
       </p>
       
   </form>
    </div>
  )
}

export default Login