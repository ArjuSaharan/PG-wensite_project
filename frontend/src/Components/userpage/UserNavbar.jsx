import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AppConetxt } from '../../context/AppContext';
const UserNavbar = ({onSearch}) => {
  const[input,setinput]=useState("");
  const {user,loading}=useContext(AppConetxt);

   if(loading){
    return <div>Loading...</div>
   }
  const handleSearch=()=>{
     onSearch(input.trim().toLowerCase());
  }

  const handdleKeydown=(e)=>{
    if(e.key==="Enter"){
      handleSearch();
    }
  }
const handleinput=(e)=>{
  setinput(e.target.value);
  handleSearch();
  console.log(input);
}
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className='flex h-2 w-[700px] items-center'>
        {/* search bar */}
        <div className='flex flex-1 items-center rounded-l-lg border-gray-200 bg-white px-4'>
          <span className='mr-3 text-gray-400'><FaSearch/></span>
          <input type="text"
          value={input}
          onChange={handleinput}
          onKeyDown={handdleKeydown}
          placeholder='serach by location , pg name...'
          className=' w-full bg-transparent text-sm  placeholder:text-gray-400 border-1 p-2 text-center rounded-full'
          />
        </div>
        
          <button
          onClick={handleSearch}
           className='ml-4 h-[44px] font-semibold shadow-md flex gap-1 items-center bg-violet-600 text-white px-4 py-2 rounded'>
          <FaSearch/><span>Search</span>
        </button>
        {/* button serach */}
      </div>

      <div className='flex items-center gap-4 p-2'>
         {user && (
                <div className='flex gap-2 '>
                  <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                </div>
                <p className='font-lg font-semibold py-2'>{user.name.toUpperCase()}</p>
                </div>
                
            )}
      </div>
      </div>
  )
}

export default UserNavbar