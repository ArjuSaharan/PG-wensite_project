import React, { useState } from 'react'
import { useContext } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { toast } from 'react-toastify';
import { AppConetxt } from '../context/AppContext'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const OnwerMainPage = () => {
  const nvigate=useNavigate();
  const [pgDataInfo, setPgDataInfo] = useState([]);
  const [loading, setloading] = useState(true);
  const { backendUrl } = useContext(AppConetxt);
  // This MUST be a function
  const handlePgCreated = (pgData) => {
    console.log("PG DATA RECEIVED:", pgData);

    setPgDataInfo((prev) => [
      ...prev,
      pgData
    ]);
  };

  const fetchMyPgs = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(backendUrl + '/pg/owners/my-pgs', {
        withCredentials: true
      })
      console.log("data", data);
      if (data.success) {
        setPgDataInfo(data.pgs);
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message);
    }
    finally {
      setloading(false);
    }
  }
  useEffect(() => {
    fetchMyPgs();
  }, []);

  const handleDelete = async (id) => {
    const confirmdel = window.confirm("Are you sure you want to delete this PG?");
    if (!confirmdel) {
      return;
    }
    try {
      const { data } = await axios.delete(backendUrl + `/pg/owners/delete/${id}`, {
        withCredentials: true
      })
      if (data.success) {
        setPgDataInfo((prev) => {
          return  prev.filter((pg) => pg._id !== id)
        })
        toast.success(data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading your PGs...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">

      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {pgDataInfo.length == 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <h2 className="text-xl font-semibold text-gray-800">
              No PGs found
            </h2>
            <p className="text-gray-500 mt-2">
              You haven't added any PG yet.
            </p>
          </div>
        ) :
          (
            pgDataInfo.map((val, index) => (
              <div key={index} className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-full">
                <div className='shrink-0'>
                  <img src={val.images[0]?.url} className='w-[230px] h-50 object-cover p-3 rounded-2xl' />
                </div>
                <div className='py-4'>
                  <h3 className='font-bold text-lg '>{val.pgName}</h3>
                  <p className='flex  text-sm text-gray-800'><CiLocationOn className='w-5 h-5 text-gray-900' /> {val.address}, {val.city}</p>
                  <div className='flex  gap-6 text-sm text-gray-700'>
                    <p className='flex gap-1'><FaUsers className='w-5 h-4' />{val.roomType}</p>
                    <p className='flex gap-1'><IoIosPricetags className='w-5 h-5' />₹{val.rentPerMonth}/month</p>
                  </div>
                  <div className='flex gap-2 text-sm '>
                    {
                      val.facilities.map((value, index) => (
                        <p>{value}</p>
                      ))
                    }
                  </div>
                  <p className="text-sm mt-3">
                    Status:
                    <span
                      className={`ml-2 font-semibold ${val.availability === "Available"
                          ? "text-green-600"
                          : "text-red-600"
                        }`}
                    >
                      {val.availability}
                    </span>
                  </p>
                  <p>Posted at{" "}{new Date(val.createdAt).toLocaleDateString()}</p>
                </div>
                <div className='ml-auto flex items-center gap-8 px-6 py-4 shadow'>
                  <div>
                    {/* <h3 className='mb-2'>Views</h3>
                    <p className='mb-2'>24</p> */}
                    <button onClick={()=>nvigate(`/owner/edit-pg/${val._id}`)}
                     className=' border border-violet-300 rounded-full px-5 py-2 text-violet-800 font-bold hover:bg-violet-100'>Edit</button>
                  </div>
                  <div>
                    {/* <h3 className='mb-2'>Messages</h3>
                    <p className='mb-2'>24</p> */}
                    <button onClick={()=>handleDelete(val._id)}
                    className='border border-red-300 rounded-full px-5 py-2 text-red-700 font-bold  hover:bg-red-100'>Delete</button>
                  </div>
                </div>
              </div>

            ))
          )}
      </div>
    </div>

  )
}

export default OnwerMainPage