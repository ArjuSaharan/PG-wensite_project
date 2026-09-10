import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const OwnerNavbar = () => {
  const navigate=useNavigate();

  const handlenavigate=()=>{
    navigate('/ownerDashbord/addpg');
  }
  return (

    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className='flex h-2 w-[700px] items-center'>
         <h4 className='font-bold font-lg'>My PG listing</h4>
      </div>

      <div className='flex items-center gap-4 p-2'>
        <div className='flex items-center gap-2'>
          <div>
            <button onClick={handlenavigate}className='text-sm font-bold text-white bg-violet-700 rounded px-3 py-2'>+ADD NEW PG</button>

          </div>
        </div>
      </div>
      </div>
  )
}

export default OwnerNavbar