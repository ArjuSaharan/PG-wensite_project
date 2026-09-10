import React, { useContext, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AppConetxt } from '../../context/AppContext';
const UserNavbar = ({onSearch}) => {
  const[input,setinput]=useState("");
  const {userData,getuserdata,isLoggedin}=useContext(AppConetxt);
  const handleSearch=()=>{
     onSearch(input.trim().toLocaleLowerCase());
  }

  const handdleKeydown=(e)=>{
    if(e.key==="Enter"){
      handleSearch();
    }
  }

const handleinput=(e)=>{
  setinput(e.target.value);
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
        <div className='flex items-center gap-2'>
          <img src="https://i.pinimg.com/736x/89/16/a0/8916a0bfc4e7b501af26ddca7c71d82d.jpg" alt="user"
          className='h-10 w-10 rounded-full object-cover'/>
          <div>
            {isLoggedin && userData && <p className='text-sm font-semibold text-gray-900'>{userData.name}</p>}

          </div>
        </div>
      </div>
      </div>
  )
}

export default UserNavbar