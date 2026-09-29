import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useContext } from 'react';
import { AppConetxt } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const OwnerLoginForm = () => {
    const navigate = useNavigate();
    const [state, setstate] = useState("Sign up");
    const [formdata, setformdata] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })
    const { backendUrl, setisLoggin, checkAuth } = useContext(AppConetxt);
    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
        // console.log(formdata);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state === 'Sign up') {
            try {
                const { data } = await axios.post(backendUrl + "/pg/owner/register", {
                    name: formdata.fullName,
                    email: formdata.email,
                    phone: formdata.phone,
                    password: formdata.password,
                    confirmPassword: formdata.confirmPassword
                }, { withCredentials: true });
                console.log(data);
                if (data.success) {
                    toast.success(data.message);
                    await checkAuth();
                    setisLoggin(true);
                    navigate('/ownerDashbord', { replace: true });
                }
            }
            catch (error) {
                toast.error(error.message);
            }
        }
        else {
            try {
                const { data } = await axios.post(backendUrl + '/pg/owner/login', {
                    email: formdata.email,
                    password: formdata.password,
                }, { withCredentials: true });
                if (data.success) {
                    toast.success(data.message);
                    await checkAuth();
                    setisLoggin(true);
                    navigate('/ownerDashbord', { replace: true });
                }
            }
            catch (error) {
                toast.error(error.message);
            }
        }

    }

    const passwordRules = {
        length: formdata.password.length >= 8,
        uppercase: /[A-Z]/.test(formdata.password),
        number: /[0-9]/.test(formdata.password),
        special: /[@$!%*?&]/.test(formdata.password)
    };
    return (
        <>
            <div className='flex flex-col gap-3 px-20 py-8'>
                <div className='p-2 '>
                    <h2 className='mb-2 font-bold text-gray-900 text-4xl'>PG Owner Account</h2>
                    <p className='text-gray-600 font-sm'>Create your account to start listing your pg</p>
                </div>


                {/* from div */}
                <div className='flex flex-col gap-2 mb-2'>
                    <form onSubmit={handleSubmit}>
                        {
                            state !== "Login" && (

                                <div className='flex border-1 rounded border-gray-200 mb-3'>
                                    <div className='p-4'>
                                        <FaUser className='h-10 w-10 bg-violet-100 text-violet-800 rounded px-3' />
                                    </div>
                                    <div className='mb-2 '>
                                        <h4 className='text-gray-900 font-semibold p-2'>Full Name</h4>
                                        <input type="text"
                                            name="fullName"
                                            value={formdata.fullName}
                                            onChange={handleChange}
                                            required
                                            placeholder='enter your name' className=' outline-none w-full bg-transparent text-sm  placeholder:text-gray-400 hover:border-1 p-2  rounded ' />
                                    </div>

                                </div>
                            )
                        }

                        <div className='flex border-1 rounded border-gray-200 mb-3'>
                            <div className='p-4'>
                                <MdOutlineMail className='h-10 w-10 bg-violet-100 font-bold text-violet-800 rounded px-3' />
                            </div>
                            <div className='mb-2 '>
                                <h4 className='text-gray-900 font-semibold p-2'>Email Address</h4>
                                <input type="email"
                                    name="email"
                                    value={formdata.email}
                                    onChange={handleChange}
                                    required
                                    placeholder='enter your email' className='text-base w-full bg-transparent text-sm  placeholder:text-gray-400 hover:border-1 p-2  rounded' />
                            </div>

                        </div>


                        {
                            state !== "Login" && (
                                <div className='flex border-1 rounded border-gray-200 mb-3'>
                                    <div className='p-4'>
                                        <FaPhoneAlt className='h-10 w-10 bg-violet-100 text-violet-800 rounded px-3' />
                                    </div>
                                    <div className='mb-2 '>
                                        <h4 className='text-gray-900 font-semibold p-2'>Phone Number</h4>
                                        <input type="tel"
                                            name="phone"
                                            value={formdata.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder='enter your phone number ' className='text-base w-full bg-transparent text-sm  placeholder:text-gray-400 hover:border-1 p-2  rounded' />
                                    </div>

                                </div>
                            )
                        }


                        <div className='flex border-1 rounded border-gray-200 mb-3'>
                            <div className='p-4'>
                                <RiLockPasswordLine className='h-10 w-10 bg-violet-100 text-violet-800 rounded px-3' />
                            </div>
                            <div className='mb-2 '>
                                <h4 className='text-gray-900 font-semibold p-2'>Password</h4>
                                <input type="password"
                                    name="password"
                                    value={formdata.password}
                                    onChange={handleChange}
                                    required
                                    placeholder='create  your password' className='text-base w-full bg-transparent text-sm  placeholder:text-gray-400 hover:border-1 p-2  rounded' />
                                {formdata.password.length > 0 && (
                                    <div className="text-sm mt-2 ml-2">
                                        {formdata.password.length < 8 && (
                                            <p className="text-red-600">
                                                ✗ At least 8 characters
                                            </p>
                                        )}
                                        {!/[A-Z]/.test(formdata.password) && (
                                            <p className="text-red-600">
                                                ✗ One uppercase letter
                                            </p>
                                        )}
                                        {!/[0-9]/.test(formdata.password) && (
                                            <p className="text-red-600">
                                                ✗ One number
                                            </p>
                                        )}
                                        {!/[@$!%*?&]/.test(formdata.password) && (
                                            <p className="text-red-600">
                                                ✗ One special character
                                            </p>
                                        )}

                                    </div>
                                )}
                            </div>

                        </div>
                        {
                            state !== "Login" && (
                                <div className='flex border-1 rounded border-gray-200 mb-3'>
                                    <div className='p-4'>
                                        <RiLockPasswordLine className='h-10 w-10 bg-violet-100 text-violet-800 rounded px-3' />
                                    </div>
                                    <div className='mb-2 '>
                                        <h4 className='text-gray-900 font-semibold p-2'>Confirm password</h4>
                                        <input type="password"
                                            name="confirmPassword"
                                            value={formdata.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            placeholder='confirm your passowrd' className='text-base w-full bg-transparent text-sm  placeholder:text-gray-400 hover:border-1 p-2  rounded' />
                                    </div>

                                </div>

                            )
                        }
                        <div className='flex border-1 items-center justify-center rounded border-gray-200 p-5 bg-violet-700'>
                            <button type="submit"
                                className='text-center font-bold text-lg text-white '>
                                {state === "Login" ? "Login" : "Sign up"}
                            </button>
                        </div>

                    </form>
                    <div className='flex items-center justify-center rounded '>
                        <p onClick={() => setstate(prev => prev === "Login" ? "Sign up" : "Login")}
                            className='text-gray-600 text-sm mt-3 mb-11 cursor-pointer'
                        >
                            {state === "Login"
                                ? "Don't have an account?"
                                : "Already have an account?"
                            }  <span className='text-violet-600 ml-1'>
                                Click here
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OwnerLoginForm
