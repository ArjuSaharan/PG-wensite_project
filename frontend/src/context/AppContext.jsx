import { useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import {toast} from  'react-toastify'

export const AppConetxt=createContext();

export const AppContextProvider=(props)=>{
    const backendUrl = 'http://localhost:3000';
    const [isLoggedin,setisLoggin]=useState(false);
    const [userData,setuserData]=useState(false);
    const[ownerdata,setownerData]=useState(false);

    const getuserdata=async()=>{
        try{
            const {data}=await axios.get(backendUrl +'/pg/user/userdata',{
                withCredentials:true
            })
           if( data.success ){
             setuserData(data.userData)
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }
    const getownerdata=async()=>{
        try{
            const {data}=await axios.get(backendUrl+ '/pg/owner/getdata',{
                withCredentials:true,
            })
            if(data.success){
                setownerData(data.ownerdata);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }
    const value={
        backendUrl,getuserdata,isLoggedin,setisLoggin,userData,setuserData,ownerdata,setownerData,getownerdata
    }
    return (
        <AppConetxt.Provider value={value}>
            {props.children}
        </AppConetxt.Provider>
    )
}