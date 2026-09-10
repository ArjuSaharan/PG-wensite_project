import React, { useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";

const OnwerMainPage = () => {

   const [pgDataInfo, setPgDataInfo] = useState([]);

    // This MUST be a function
    const handlePgCreated = (pgData) => {
        console.log("PG DATA RECEIVED:", pgData);

        setPgDataInfo((prev) => [
            ...prev,
            pgData
        ]);
    };

  const pgData = [
    {
      pgName: "Royal PG",
      address: "Sector 15",
      city: "Chandigarh",
      rentPerMonth: "7000",
      roomType: "Double",
      availability: "Available",
      facilities: [
        "AC",
        "WiFi",
        "Food",
        "Parking"
      ],
      foodIncluded: "",
      description: "Good PG near university",
      images: [
        "https://i.pinimg.com/736x/03/5e/56/035e56f477ee03313fb2b72119fb25cd.jpg",
        "https://i.pinimg.com/736x/5c/be/4e/5cbe4efe4b0c86f2ba238f6ef2e371ce.jpg",
        "https://i.pinimg.com/1200x/49/87/e5/4987e5a45a6c3d1216452688cb1d23a9.jpg",
        "https://i.pinimg.com/736x/0e/2b/be/0e2bbea6bccd5931aa268e94d5c9fbfe.jpg"
      ],
      postedAt: Date.now
    },
    {
      pgName: "Royal PG",
      address: "Sector 15",
      city: "Chandigarh",
      rentPerMonth: "7000",
      roomType: "Double",
      availability: "Available",
      facilities: [
        "AC",
        "WiFi",
        "Food",
        "Parking"
      ],
      foodIncluded: "",
      description: "Good PG near university",
      images: [
        "https://i.pinimg.com/736x/03/5e/56/035e56f477ee03313fb2b72119fb25cd.jpg",
        "https://i.pinimg.com/736x/5c/be/4e/5cbe4efe4b0c86f2ba238f6ef2e371ce.jpg",
        "https://i.pinimg.com/1200x/49/87/e5/4987e5a45a6c3d1216452688cb1d23a9.jpg",
        "https://i.pinimg.com/736x/0e/2b/be/0e2bbea6bccd5931aa268e94d5c9fbfe.jpg"
      ],
      postedAt: Date.now
    }, {
      pgName: "Royal PG",
      address: "Sector 15",
      city: "Chandigarh",
      rentPerMonth: "7000",
      roomType: "Double",
      availability: "Available",
      facilities: [
        "AC",
        "WiFi",
        "Food",
        "Parking"
      ],
      foodIncluded: "",
      description: "Good PG near university",
      images: [
        "https://i.pinimg.com/736x/03/5e/56/035e56f477ee03313fb2b72119fb25cd.jpg",
        "https://i.pinimg.com/736x/5c/be/4e/5cbe4efe4b0c86f2ba238f6ef2e371ce.jpg",
        "https://i.pinimg.com/1200x/49/87/e5/4987e5a45a6c3d1216452688cb1d23a9.jpg",
        "https://i.pinimg.com/736x/0e/2b/be/0e2bbea6bccd5931aa268e94d5c9fbfe.jpg"
      ],
      postedAt: Date.now
    },
    {
      pgName: "Royal PG",
      address: "Sector 15",
      city: "Chandigarh",
      rentPerMonth: "7000",
      roomType: "Double",
      availability: "Available",
      facilities: [
        "AC",
        "WiFi",
        "Food",
        "Parking"
      ],
      foodIncluded: "",
      description: "Good PG near university",
      images: [
        "https://i.pinimg.com/736x/03/5e/56/035e56f477ee03313fb2b72119fb25cd.jpg",
        "https://i.pinimg.com/736x/5c/be/4e/5cbe4efe4b0c86f2ba238f6ef2e371ce.jpg",
        "https://i.pinimg.com/1200x/49/87/e5/4987e5a45a6c3d1216452688cb1d23a9.jpg",
        "https://i.pinimg.com/736x/0e/2b/be/0e2bbea6bccd5931aa268e94d5c9fbfe.jpg"
      ],
      postedAt: Date.now
    },

  ]
  return (
    <div className="min-h-screen bg-gray-100 p-6 ">

      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {
          pgData.map((val, index) => (
            <div key={index} className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-full">
              <div className='shrink-0'>
                <img src={val.images[0]} className='w-[230px] object-cover p-3 rounded-2xl' />
              </div>
              <div className='py-4'>
                <h3 className='font-bold text-lg '>{val.pgName}</h3>
                <p className='flex  text-sm text-gray-800'><CiLocationOn className='w-5 h-5 text-gray-900' /> {val.address}, {val.city}</p>
                <div className='flex  gap-6 text-sm text-gray-700'>
                  <p className='flex gap-1'><FaUsers className='w-5 h-4' />{val.roomType}</p>
                  <p className='flex gap-1'><IoIosPricetags className='w-5 h-5' />{val.rentPerMonth}/month</p>
                </div>
                <div className='flex gap-2 text-sm '>
                  {
                    val.facilities.map((value, index) => (
                      <p>{value}</p>
                    ))
                  }
                </div>
                <p>Posted at {new Date( val.postedAt).toLocaleDateString()}</p>
              </div>
              <div className='ml-auto flex items-center gap-8 px-6 py-4 shadow'>
                <div>
                  <h3 className='mb-2'>Views</h3>
                  <p className='mb-2'>24</p>
                  <button className=' border border-violet-300 rounded-full px-5 py-2 text-violet-800 font-bold hover:bg-violet-100'>Edit</button>
                </div>
                <div>
                  <h3 className='mb-2'>Messages</h3>
                  <p className='mb-2'>24</p>
                  <button className='border border-red-300 rounded-full px-5 py-2 text-red-700 font-bold  hover:bg-red-100'>Delete</button>
                </div>
              </div>
            </div>

          ))
        }
      </div>
      <div>
        {
          
          pgDataInfo.length === 0 ? (
            <div></div>
          ):(
            <div>
             {pgDataInfo.map((value, index) => (

                          <div>
                              <h1>{value.pgName}</h1>
                        <p>{value.address}</p>
                        <p>{value.city}</p>
                        <p>₹{value.rentPerMonth}</p>
                            </div>

                    ))}
            </div>
          )
        }
      </div>
     
    </div>

  )
}

export default OnwerMainPage