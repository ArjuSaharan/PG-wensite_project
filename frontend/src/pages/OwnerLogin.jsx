import React from 'react'
import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdEditDocument } from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
import OwnerLoginForm from './OwnerLoginForm';
const OwnerLogin = () => {
  return (
    <>
      <div>
        <div className='fixed left-0 top-0 z-50 flex h-screen w-[300px] flex-col border-r border-gray-200
       p-3 px-4 bg-gradient-to-b from-violet-400 to-white'>
        <div>
          <div className="flex p-2">
          <div>
            <IoHome className="h-6 w-6 bg-violet-700 text-white rounded-full px-1" />
          </div>
          <div>
            <h2 className="font-bold text-white">Apna<span className="text-violet-700 font-bold text-lg">Stay</span></h2>
          </div>
        </div>
      </div>

      <div className='p-3 flex flex-col gap-3'>

        <div>
          <img src="" className='w-full h-full object-cover'/>

        </div>

        <div className='flex items-center justify-start gap-2 rounded bg-white px-2 py-3'>
          <div className='p-2'>
            <HiOutlineUserGroup className='h-5 w-5 text-violet-800'/>
          </div>
          <div>
            <h3 className='font-semibold'>Reach More Tenants</h3>
            <p className='text-gray-700 tracking-tighter text-sm'>List your pg and connect with us</p>
          </div>
        </div>

         <div className='flex items-center justify-start gap-2 rounded bg-white px-2 py-3'>
          <div className='p-2'>
            <MdEditDocument className='h-5 w-5 text-violet-800'/>
          </div>
          <div>
            <h3 className='font-semibold'>Manage Easily</h3>
            <p className='text-gray-700 tracking-tighter text-sm'>Update details and availability</p>
          </div>
        </div>

         <div className='flex items-center justify-start gap-2 rounded bg-white px-2 py-2'>
          <div className='p-2'>
            <SiGooglemessages className='h-5 w-5 text-violet-800'/>
          </div>
          <div>
            <h3 className='font-semibold'>Get More Booking</h3>
            <p className='text-gray-700 tracking-tighter text-sm'>Revieve more booking requests</p>
          </div>
        </div>
      </div>
      </div>

      <div className='ml-[300px]'>
        <OwnerLoginForm/>
      </div>
      </div>
    </>
  )
}

export default OwnerLogin