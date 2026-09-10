import React, { useEffect, useRef, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { FaUser, FaUsers } from 'react-icons/fa'
import { IoIosPricetags } from 'react-icons/io'
import { FiMessageCircle } from "react-icons/fi";
import FilterSidebar from './FiltersSidebar';
import { useNavigate } from 'react-router-dom';
const UserMainPage = ({ searchText }) => {
  const navigate=useNavigate()
  const [showFilter, setshowfilter] = useState(false);
  const filterRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setshowfilter(false);
      }
    };
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  const pgData = [
    {
      id:1,
      onwername: "Rakesk kumar",
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
      postedAt: Date.now()
    },
    {
         id:2,
      onwername: "Rakesk kumar",
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
      postedAt: Date.now()
    }, {
      id:3,
      onwername: "Rakesk kumar",
      pgName: "Royal PG",
      address: "Sector 15",
      city: "Noida",
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
      postedAt: Date.now()
    },
    {
      id:4,
      onwername: "Rakesk kumar",
      pgName: "Royal PG",
      address: "Sector 15",
      city: "Delhi",
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
      postedAt: Date.now()
    },

  ]

  
  const filteredPgData = pgData.filter((pg) => {
    const search = searchText.toLowerCase();
    return (
      pg.pgName.toLowerCase().includes(search) ||
      pg.address.toLowerCase().includes(search) ||
      pg.city.toLowerCase().includes(search) ||
      pg.onwername.toLowerCase().includes(search)
    );

  });

  return (
    <>
      <div className='mb-7 flex flex-col  justify-between'>
        <div className='text-medium p-3  text-gray-900 flex  gap-10'>
          <h3 className='font-bold'>All PG Listing</h3>
          <button
            onClick={() => setshowfilter((prev) => !prev)}
            className="border px-3 py-1 font-bold rounded border-violet-300 cursor-pointer hover:bg-violet-50"
          >
            {showFilter ? "Filters" : "Filters"}
          </button>
        </div>
        {showFilter && (
          <div
            ref={filterRef}
            className="absolute z-50 top-0 left-0 w-72 bg-white border border-gray-200 rounded-lg shadow-xl"
          >
            <FilterSidebar />
          </div>
        )}
        <div className='relative'>
          <div className='grid grid-cols-1 gap-7 md:grid-cols-3 xl:grid-cols-3'>
            {
              filteredPgData.map((pg, index) => (
                <div key={pg.id}
                onClick={()=>navigate(`/pg/${pg.id}`,{state: {pg}})}
                  className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg'>

                  <div className='group relative h-[400px] md:h-[200px] overflow-hidden'>
                    <img src={pg.images[0]}
                      className=' p-2 rounded h-full w-full object-cover transition duration-500'
                    />
                    <span className={`absolute left-4 top-4 rounded-md px-3 py-1.5 text-sm font-semibold
                                ${pg.availability === "Available" ? "bg-green-50 text-green-700" : "bg-orange-100"}`}>{pg.availability}</span>

                  </div>
                  <div className='p-3'>
                    <h1 className='text-gray-900 font-bold'>{pg.pgName}</h1>
                    <p className='flex text-sm'><CiLocationOn className=' text-red-600 w-5 h-5' /> {pg.address},{pg.city}</p>
                    <div className='flex  gap-6 text-sm text-gray-700 p-3'>
                      <p className='flex gap-1'><FaUsers className='w-5 h-4' />{pg.roomType}</p>
                      <p className='flex gap-1'><IoIosPricetags className='w-5 h-5' />{pg.rentPerMonth}/month</p>
                    </div>
                    <div className='flex gap-2 text-sm p-2'>
                      {
                        pg.facilities.map((value, index) => (
                          <p>{value}</p>
                        ))
                      }
                    </div>
                    <div className='flex justify-around '>
                      <h4 className='flex gap-1'><FaUser className='h-5' />{pg.onwername}</h4>
                      <button className='flex gap-1 border rounded shadow px-2 py-1 font-bold'><FiMessageCircle className='w-5 h-5 text-violet-600' />Message</button>
                    </div>
                  </div>


                </div>
              ))
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default UserMainPage