import React from 'react'
import { IoHome } from "react-icons/io5";
import { FaPenNib } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <>
   <style>
{`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

*{
  font-family:'Poppins',sans-serif;
}
`}
</style>
    <footer className='flex flex-wrap justify-center lg:justify-between overflow-hidden p-10 md:gap-20
    py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[12px] text-gray-500 bg-gradient-to-r from-white via-violet-200/60 to-white mt-40'>
        <div className='flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]'>
            <a href="#">
                 <div className="flex p-2">
                                <div>
                                    <IoHome className="h-6 w-6 text-violet-700"/>
                                </div>
                                <div>
                                    <h2 className="font-bold">Apna<span className="text-violet-700 font-bold text-lg">Stay</span></h2>
                                </div>
                                </div>
            </a>
            <div >
                <p className='text-slate-800 font-semibold'>Product</p>
                <ul className='mt-2 space-y-2'>
                    <li><a href="" className='hover:text-violet-600 transition'>Home</a></li>
                    <li><a href="" className='hover:text-violet-600 transition'>Support</a></li>
                    <li><a href="" className='hover:text-violet-600 transition'>Pricing</a></li>
                    <li><a href="" className='hover:text-violet-600 transition'>Affiliate</a></li>
                </ul>
            </div>
            <div>
                <p className='text-slate-800 font-semibold'>Resources</p>
                <ul className='mt-2 space-y-2'>
                    <li><a href="" className='hover:text-violet-600 transition'>Company</a></li>
                    <li><a href="" className='hover:text-violet-600 transition'>Blogs</a></li>
                    <li><a href="" className='hover:text-violet-600 transition'>Community</a></li>
                   
                    <li><a href="" className='hover:text-violet-600 transition'>About</a></li>

                </ul>
            </div>
            <div>
                <p className='text-slate-800 font-semibold'>Legal</p>
                <ul className='mt-2 space-y-2'>
                    <li><a href="" className='hover:text-violet-600 transition'>Privacy</a></li>
                <li><a href="" className='hover:text-violet-600 transition'>Terms</a></li>
                </ul>
                </div>
                <div className='flex flex-col max-md:items-center max-md:text-center gap-2 items-end'>
                    <p className='max-w-60'>Making every customer feel valued-no matter the size of your audience</p>
                    <div className='flex items-center gap-4 mt-3'>
                        <a href="" target="_blank" className='hover:text-violet-600 transition ' rel="noreferrer">
                            <FaInstagram className='h-5 w-5'/>
                        </a>
                        <a href="" target="_blank" className='hover:text-violet-600 transition ' rel="noreferrer">
                            <FaFacebookF className='h-5 w-5'/>
                        </a>
                        <a href="" target="_blank" className='hover:text-violet-600 transition ' rel="noreferrer">
                            <FaTwitter className='h-5 w-5'/>
                        </a>
                        <a href="" target="_blank" className='hover:text-violet-600 transition ' rel="noreferrer">
                            <FaLinkedin className='h-5 w-5'/>
                        </a>
                    </div>
                    <p className='mt-3 text-center'>@ 2026<a href="#">ApnaStay</a></p>
                </div>
        </div>

    </footer>
    </>
  )
}

export default Footer