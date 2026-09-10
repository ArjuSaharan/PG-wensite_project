import React from 'react'
import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
const OwnerHeader = () => {
  return (
    <>
      <div className='fixed left-0 top-0 z-50 flex h-screen w-[200px] flex-col border-r border-gray-200 bg-white p-3 px-4'>
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
        <Link className='flex items-center gap-1 p-2 hover:bg-violet-100 hover:rounded-full cursor-pointer'>
          <MdOutlineMessage className='w-5 h-6'/>
          <h4 className='relative text-gray-800 font-bold'>Messages
            <span className='absolute -top-1 -right-3 bg-red-600 text-white 
                       text-[10px] min-w-4 h-4 px-1 rounded-full 
                       flex items-center justify-center'>1</span>
          </h4>
        </Link>
         <Link className='flex items-center gap-1 p-2 hover:bg-violet-100 hover:rounded-full cursor-pointer'>
          <img src="https://i.pinimg.com/736x/89/16/a0/8916a0bfc4e7b501af26ddca7c71d82d.jpg" alt="user"
          className='h-10 w-10 rounded-full object-cover'/>
          <h4 className='text-gray-800 font-bold'>Profile</h4>
        </Link>
        </div>

        <div>
        <button className='flex items-center gap-1 p-2 hover:bg-red-100 hover:rounded-full cursor-pointer'>
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