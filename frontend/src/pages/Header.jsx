
import { IoHome } from "react-icons/io5";
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { LuLayoutTemplate } from "react-icons/lu";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaPenNib } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GoDeviceCameraVideo } from "react-icons/go";
import { FaMicrosoft } from "react-icons/fa";
import { SiHuawei } from "react-icons/si";
import { TbBrandWalmart } from "react-icons/tb";
import { MdHome } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import Login from "./Login";
import { MdOutlineVerifiedUser } from "react-icons/md";
// import { IoHome } from "react-icons/io5";
const Header = () => {
    const [menuOpen,setMenuOpen]=useState(false);

  return (
    <>
    <div className='h-screen pb-20 bg-[url("https://i.pinimg.com/1200x/8e/8e/3b/8e8e3b9a94ba332b50171df502a94ab1.jpg")] bg-no-repeat bg-cover'>
        <nav className='z-50 flex items-center justify-between w-full  py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm shadow-[0_4px_6px_-1px_rgba(124,58,237,0.3)] rounded'>
            {/* <a href="#">
               
                <span className='h-11 w-auto text-green-700 text-2xl flex hover:text-green-800'>Resume<FaPenNib/></span>
            </a> */}
            <div className="flex p-2">
                <div>
                    <IoHome className="h-6 w-6 text-violet-700"/>
                </div>
                <div>
                    <h2 className="font-bold">Apna<span className="text-violet-700 font-bold text-lg">Stay</span></h2>
                </div>
                </div>
                 <div  className="flex gap-2 items-center justify-center font-bold ">
                    <a href="#" className="hover:text-violet-700">Home</a>
                    <a href="#services" className="hover:text-violet-700">About</a>
                    <a href="#testimonals" className="hover:text-violet-700">Testimonial</a>
                </div>
            <div className='flex gap-2'>
                {/* <Link to='/app?state=register' className='text-black hidden md:block px-6 py-2 border-violet-600 bg-violet-700 active:scale-95 transition-all rounded-full  text-white hover:bg-violet-500'>Get Started</Link> */}
                <Link to='/login' className='hidden md:block px-6 py-2 border-violet-600 bg-violet-700 active:scale-95 transition-all rounded-full  text-white hover:bg-violet-500'>Login</Link>
            </div>
            <button onClick={()=>setMenuOpen(true) } className="md:hidden active:scale-90 transition"><IoReorderThreeOutline  className='h-9 w-9'/></button>
        </nav>

        {/* mobile menu */}
        <div className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center
            justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" :"translate-x-full"}`}>
               <Link to='/app?state=register' className='text-black hidden md:block px-6 py-2 border-violet-600 bg-violet-700 active:scale-95 transition-all rounded-full  text-white hover:bg-violet-500'>Get Started</Link>
                <Link to='/app?state=login' className='hidden md:block px-6 py-2 border-violet-600 bg-violet-700 active:scale-95 transition-all rounded-full  text-white hover:bg-violet-500'>Login</Link>
                <button onClick={()=>setMenuOpen(false) } className='active:ring-3 active:ring-white aspect-square size-10 p-10 items-center
                justify-center bg-violet-600 hover:bg-violet-700 transition text-white rounded-md flex'>X</button>
        </div>
        {/* hero section */}
        <div className='h-screen ' >
                {/* headline */}
               <div className="bg-transparent p-5 flex items-center gap-10 justify-around flex-col">
                <div className="">
                    <h2 className="text-[30px] p-2 text-gray-950 font-bold">Find Your Perfect <br/><span className="text-violet-700 font-bold">PG</span> or list your Property</h2>
                    <p className="text-sm tracking-tighter">A trusted platform to find PG accommodations <br/>or list your property and connect with right tenets</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="items-start gap-4 p-3 border border-transparent rounded-xl 
                    hover:border-violet-700 shadow-[0_4px_6px_-1px_rgba(124,58,237,0.3)]  hover:scale-105 hover:shadow-lg 
                      transition-all duration-300 cursor-pointer ">
                        <div className="flex gap-1">
                            <MdHome className="w-5 h-6 text-violet-700"/>
                        <h3 className="font-bold text-gray=950">Verified PG Listed</h3>
                        </div>
                        <p className='tracking-tighter text-sm'>Browse verifed PGs with photos,amenities &more</p>
                    </div>
                    <div className=" items-start gap-4 p-3 border border-transparent rounded-xl 
                        hover:border-violet-700 hover:scale-105 shadow-[0_4px_6px_-1px_rgba(124,58,237,0.3)]  hover:shadow-lg 
                        transition-all duration-300 cursor-pointer">
                        <div  className="flex gap-1">
                            <TiMessages className="w-5 h-6 text-violet-700"/>
                            <h3 className="font-bold text-gray=950">Direct  Communication</h3>
                      </div>
                        <p className='tracking-tighter text-sm'>Message or call owners directly for more details</p>
                    </div>
                    <div className=" items-start gap-4 p-3 border border-transparent rounded-xl 
                      hover:border-violet-700 shadow-[0_4px_6px_-1px_rgba(124,58,237,0.3)] hover:scale-105 hover:shadow-lg 
                      transition-all duration-300 cursor-pointer">
                        <div  className="flex gap-1">
                            <MdOutlineVerifiedUser className="w-5 h-6 text-violet-700"/>
                            <h3 className="font-bold text-gray=950">Secure & trusted</h3>
                      </div>
                        <p className='tracking-tighter text-sm'>Safe,Secure and trusted platorm for everyone</p>
                    </div>
                    <div className="items-start gap-4 p-3 border border-transparent rounded-xl 
                   hover:border-violet-700 shadow-[0_4px_6px_-1px_rgba(124,58,237,0.3)]  hover:scale-105 hover:shadow-lg 
                    transition-all duration-300 cursor-pointer">
                        <div  className="flex gap-1">
                            <FaRegUser className="w-5 h-6 text-violet-700"/>
                            <h3 className="font-bold text-gray=950">For Owners & Users</h3>
                      </div>
                        <p className='tracking-tighter text-sm'>List your PGs as an owner or find the best stay asa user</p>
                    </div>
                </div>
               </div>
            </div>

        </div>

    {/* </div> */}
    </>
  )
}

export default Header