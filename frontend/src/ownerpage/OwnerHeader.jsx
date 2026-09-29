import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import axios from 'axios';
import { useContext } from 'react';
import { AppConetxt } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
const OwnerHeader = () => {
  const navigate=useNavigate();
 const {
    backendUrl,
    setisLoggin,
    owner,
    ownerdata,
} = useContext(AppConetxt);

 const ownerName = owner?.name || ownerdata?.name || "";
console.log("OWNER IN HEADER:", owner);
 const [unreadCount,setUnreadCount]=useState(0);

 const getUnreadMessages = async () => {
    try {
        const response = await axios.get(
            `${backendUrl}/message/owner/conversation`,
            {
                withCredentials: true
            }
        );

        console.log("FULL OWNER RESPONSE:", response.data);

        if (response.data.success) {

            const conversations = response.data.conversations || [];

            console.log("OWNER CONVERSATIONS:", conversations);

            conversations.forEach((conversation) => {
                console.log(
                    "CONVERSATION:",
                    conversation._id,
                    "ownerUnreadCount:",
                    conversation.ownerUnreadCount
                );
            });

            const totalunread = conversations.reduce(
                (total, conversation) =>total + Number(conversation.ownerUnreadCount || 0), 0);
            console.log("OWNER TOTAL UNREAD:", totalunread);

            setUnreadCount(totalunread);
        }
    } catch (error) {

        console.log(
            "GET OWNER UNREAD ERROR:",
            error.response?.data || error.message
        );
    }
};
 useEffect(()=>{
  getUnreadMessages();
 },[]);
 const handleLogout=async()=>{
  try{
    const {data}=await axios.post(backendUrl+'/pg/owner/logout',{},{
      withCredentials:true
    })
    if(data.success){
      setisLoggin(false);
      navigate('/');
      toast.success(data.message);
    }
  }
  catch(error){
    toast.error(error.message);
  }
 }

  return (
    <>
      <div className='fixed left-0 top-0 z-50 flex h-screen w-[200px] flex-col border-r border-gray-200 bg-white p-3 px-4 shadow'>
        <div>
          <div className="flex p-2">
          <div>
            <IoHome className="h-6 w-6 text-violet-700" />
          </div>
          <div>
            <h2 className="font-bold">Apna<span className="text-violet-700 font-bold text-lg">Stay</span></h2>
          </div>
        </div>
      </div>
      <div className='mt-2'>
        <div>
          <div>
          <Link to='/ownerDashbord' className='flex items-center gap-1 p-2 hover:bg-violet-100 hover:rounded-full cursor-pointer'>
          <IoMdHome className='w-5 h-6'/>
          <h4 className='text-gray-800 font-bold'>Home</h4>
          </Link>
        </div>
         <Link to="/ownerDashbord" className='flex items-center gap-1 p-2 hover:bg-violet-100 hover:rounded-full cursor-pointer'>
          <FaRegListAlt className='w-5 h-6'/>
          <h4 className='text-gray-800 font-bold'>PG Listings</h4>
        </Link>
        <Link to="owner/messages"
         className='flex items-center gap-1 p-2 hover:bg-violet-100 hover:rounded-full cursor-pointer'>
          <MdOutlineMessage className='w-5 h-6'/>
          <h4 className='relative text-gray-800 font-bold'>Messages
            {
              unreadCount >0 &&(
                <span className='absolute -top-1 -right-3 bg-red-600 text-white 
                       text-[10px] min-w-4 h-4 px-1 rounded-full 
                       flex items-center justify-center'>{unreadCount}</span>
              )
            }
          </h4>
        </Link>
         <Link to='profile'
         className='flex items-center gap-1 p-2 hover:bg-violet-100 hover:rounded-full cursor-pointer'>
          <div className="h-10 w-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold text-lg">
              {ownerName.charAt(0).toUpperCase() || "O"}</div>
          <h4 className='text-gray-800 font-bold'>Profile</h4>
        </Link>
        </div>

        <div>
        <button onClick={handleLogout}
        className='flex items-center gap-1 p-2 hover:bg-red-100 hover:rounded-full cursor-pointer'>
          <IoIosLogOut className='w-5 h-6'/>
          <h4 className='text-gray-800 font-bold'>Logout</h4>
        </button>
          </div>
      </div>
    </div >
    </>
  )
}

export default OwnerHeader