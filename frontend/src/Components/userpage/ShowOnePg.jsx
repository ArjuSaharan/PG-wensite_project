import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FaUser, FaUsers, FaCheck } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { FiMessageCircle, FiArrowLeft } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { AppConetxt } from "../../context/AppContext";
import axios from "axios";

const ShowOnePg = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {id}=useParams();
  const {getownerdata,backendUrl}=useContext(AppConetxt);
  const [relatedPgs,setRelatedPgs]=useState([]);
  const[Loading,setLoading]=useState(false);
  const[currentimage,setCurrevtimage]=useState({});
  // Get PG object sent from UserMainPage
const pg = location.state?.pg;
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
const fetchRelatedPgs=async()=>{
  try{
    setLoading(true);
    const {data}=await axios.get(backendUrl+`/pg/user/related/${id}`);
    if(data.success){
      setRelatedPgs(data.pgs);
    }
  }
  catch(error){
    console.log("related: ",error);
  }
  finally{
    setLoading(false);
  }
}
useEffect(()=>{
  if(id){
    fetchRelatedPgs();
  }
},[id]);
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
  const [currentImage, setCurrentImage] = useState(0);

  // If user directly opens /pg/1 without state
  if (!pg) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          PG details not found
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 rounded bg-violet-600 px-4 py-2 text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-1 flex items-center gap-2 rounded-lg border bg-white px-4 py-2 font-semibold shadow-sm hover:bg-gray-100"
      >
        <FiArrowLeft />
      </button>

      <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow-lg">

        {/* PG Name */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {pg.pgName}
            </h1>

            <p className="mt-2 flex items-center gap-1 text-gray-600">
              <CiLocationOn className="text-red-500" />
              {pg.address}, {pg.city}
            </p>
          </div>

          <span
            className={`rounded-lg px-4 py-2 font-semibold ${
              pg.availability === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {pg.availability}
          </span>

        </div>

        {/* Images + Basic details */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {/* Images */}
          <div>

            <div className="h-[400px] overflow-hidden rounded-xl">
              <img
                src={pg.images[currentImage]?.url}
                alt={pg.pgName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thumbnail images */}
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {pg.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${pg.pgName} ${index + 1}`}
                  onClick={() => setCurrentImage(index)}
                  className={`h-20 w-24 cursor-pointer rounded-lg object-cover ${
                    currentImage === index
                      ? "border-4 border-violet-600"
                      : "border border-gray-200"
                  }`}
                />
              ))}

            </div>

          </div>

          {/* Details */}
          <div>
            <h2 className="mb-5 text-2xl font-bold">
              PG Information
            </h2>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <FaUsers className="text-violet-600" />
                <div>
                  <p className="text-sm text-gray-500">
                    Room Type
                  </p>

                  <p className="font-semibold">
                    {pg.roomType}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <IoIosPricetags className="text-violet-600" />
                <div>
                  <p className="text-sm text-gray-500">
                    Rent
                  </p>

                  <p className="font-semibold">
                    ₹{pg.rentPerMonth} / month
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaUser className="text-violet-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Owner
                  </p>

                  <p className="font-semibold">
                    {pg.onwername}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Address
                </p>
                <p className="font-semibold">
                  {pg.address}, {pg.city}
                </p>
              </div>

            </div>
            {/* Message button */}
            <button onClick={()=>handleMessage(pg._id)}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
            >
              <FiMessageCircle />
              Message Owner
            </button>

          </div>

        </div>

        {/* Facilities */}
          <div className="mt-5 border-t ">

          <h2 className="mb-2 text-lg font-bold">
            Facilities
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {pg.facilities.map((facility, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-lg bg-violet-50 px-2 text-center"
              >
                <span className="font-medium">
                  {facility}
                </span>
              </div>
            ))}

          </div>

        </div>
        {/* Description */}
        <div className="mt-10 border-t pt-1">

          <h2 className="mb-3 text-lg font-bold">
            About this PG
          </h2>

          <p className="leading-7 text-gray-600">
            {pg.description}
          </p>
        </div>
      </div>


      {/* realted pgs */}
      <div className="mt-12">

    <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Related PGs
    </h2>

    {Loading ? (
        <p>Loading related PGs...</p>
    ) : relatedPgs.length === 0 ? (
        <p className="text-gray-500">
            No related PGs found.
        </p>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPgs.map((pg) => (

                <div key={pg._id}
                                onClick={()=>navigate(`/pg/${pg._id}`,{state: {pg}})}
                                  className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg'>
                
                                  <div className='group relative h-[400px] md:h-[200px] overflow-hidden'>
                                    <img src={pg.images?.[currentimage[pg._id]?.url || 0]}
                                    alt={pg.pgName}
                                      className=' p-2 rounded h-full w-full object-cover transition duration-500'
                                    />
                                    <span className={`absolute left-4 top-4 rounded-md px-3 py-1.5 text-sm font-semibold
                                                ${pg.availability === "Available" ? "bg-green-50 text-green-700" : "bg-red-100 text-red-500"}`}>{pg.availability}</span>
                
                                          <button onClick={(e)=>prevImage(e,pg._id,pg.images.length)}
                                            className='absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition'>
                                              <FaChevronLeft/>
                                            </button>   
                                            <button onClick={(e)=>nextImage(e,pg._id,pg.images.length)}
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
                                        pg.facilities.map((value, index) => (
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
                
                
            ))}
        </div>
    )}
</div>
</div>
  );
};

export default ShowOnePg;