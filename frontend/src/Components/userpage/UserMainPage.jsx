import React, { useEffect, useRef, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { FaChevronLeft, FaChevronRight, FaUser, FaUsers } from 'react-icons/fa'
import { IoIosPricetags } from 'react-icons/io'
import { FiMessageCircle } from "react-icons/fi";
import FilterSidebar from './FiltersSidebar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AppConetxt } from '../../context/AppContext';
import { toast } from 'react-toastify';
const UserMainPage = ({ searchText }) => {
  const navigate=useNavigate()

  const [searchParams]=useSearchParams();
  const [showFilter, setshowfilter] = useState(false);
  const[currentimage,setCurrevtimage]=useState({});
  const filterRef = useRef(null);

  const {backendUrl}=useContext(AppConetxt);
  const [pgData,setpgData]=useState([]);
  const[loading,setLoading]=useState(true);
const getAllPgs=async()=>{
  try{
  
    setLoading(true);
    const queryString=searchParams.toString();
    let url;
    if(queryString){
      url=`${backendUrl}/pg/filter?${queryString}`;
    }
    else{
      url=`${backendUrl}/pg/owners/all-pgs`;
    }

    const {data}=await axios.get(url,{
      withCredentials:true
    });
    console.log("filterdata ",data);
    if(data.success){
      setpgData(data.pgs);
    }

  }
  catch(error){
    console.log("data ",error);
    toast.error(error.message);
  }
  finally{
    setLoading(false);
  }
}
useEffect(()=>{
  getAllPgs();
},[searchParams]);



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
  const handleMessage = async (pgId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/message/conversation`,
      { pgId },
      { withCredentials: true }
    );
    if (data.success) {
      navigate(`/messages/${data.conversation._id}`);
    }
  } catch (error) {
      console.log("FULL ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    toast.error(
        error.response?.data?.message ||
        error.message ||
        "Unable to start conversation"
    );
  }
};

  const nextImage=(e,pgId,totalimages)=>{
    e.stopPropagation();
    setCurrevtimage((prev)=>({
      ...prev,
      [pgId]:((prev[pgId] || 0)+1)%totalimages
    }));
  }
  const prevImage=(e,pgId,totalImages)=>{
    e.stopPropagation();
    setCurrevtimage((prev)=>({
      ...prev,
      [pgId]:((prev[pgId] || 0)-1 +totalImages)%totalImages
    }))
  }
  
  
  const filteredPgData = pgData.filter((pg) => {
    const search = searchText?.toLowerCase() || "";
    return (
      pg.pgName?.toLowerCase().includes(search) ||
      pg.address?.toLowerCase().includes(search) ||
      pg.city?.toLowerCase().includes(search) ||
      pg.pgType?.toLowerCase().includes(search)
    );

  });
  if(loading) return <p>Loading...</p>

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
              filteredPgData.length===0 ? (
                <p className="col-span-full text-center"> No PGs found. </p>
              ):(
                filteredPgData.map((pg, index) => (
                <div key={pg._id}
                  className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg'>

                  <div  onClick={()=>navigate(`/pg/${pg._id}`,{state: {pg}})}
                  className='group relative h-[400px] md:h-[200px] overflow-hidden'>
                    <img src={pg.images?.[currentimage[pg._id] || 0]?.url}
                    alt={pg.pgName}
                      className=' p-2 rounded h-full w-full object-cover transition duration-500'
                    />
                    <span className={`absolute left-4 top-4 rounded-md px-3 py-1.5 text-sm font-semibold
                                ${pg.availability === "Available" ? "bg-green-50 text-green-700" : "bg-red-100 text-red-500"}`}>{pg.availability}</span>

                          <button onClick={(e)=>prevImage(e,pg._id,pg.images?.length || 1)}
                            className='absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition'>
                              <FaChevronLeft/>
                            </button>   
                            <button onClick={(e)=>nextImage(e,pg._id,pg.images?.length || 1)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition'>
                              <FaChevronRight/>
                            </button>     
                             {/*image dots  */}
                             <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
                             {
                              pg.images.map((_,imageindex)=>(
                                <span
                                key={imageindex}
                                className={`h-2 w-2 rounded-full ${(currentimage[pg._id] || 0)=== imageindex ? "bg-white" : "bg-white/50"}`}
                                />
                              ))
                             }

                             </div>

                  </div>
                  <div className='p-3'>
                    <h1 className='text-gray-900 font-bold'>{pg.pgName}<span className='text-black-700 font-semibold text-sm'> ({pg.pgType})</span></h1>
                    <p className='flex text-sm'><CiLocationOn className=' text-red-600 w-5 h-5' /> {pg.address},{pg.city}</p>
                   
                    <div className='flex  gap-6 text-sm text-gray-700 p-3'>
                      <p className='flex gap-1'><FaUsers className='w-5 h-4' />{pg.roomType}</p>
                      <p className='flex gap-1'><IoIosPricetags className='w-5 h-5' />₹{pg.rentPerMonth}/month</p>
                    </div>
                    <div className='flex flex-wrap gap-2  text-sm p-2'>
                      {
                        pg.facilities?.map((value, index) => (
                          <div key={index}
                           className='flex flex-wrap bg-gray-100 rounded px-2'>
                            <p>{value}</p>
                          </div>
                        ))
                      }
                    </div>
                    <div className='flex px-2'>
                      <button onClick={()=>handleMessage(pg._id)}
                      className='flex gap-1 border rounded shadow px-2 py-1 font-bold'><FiMessageCircle className='w-5 h-5 text-violet-600' />Message</button>
                    </div>
                  </div>


                </div>
              ))
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default UserMainPage