import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { AppConetxt } from '../../context/AppContext';
import { toast } from 'react-toastify';

const FilterSidebar = () => {
    const[serachParams,setserachParams]=useSearchParams();
    const[filters,setfilters]=useState({
        category:"",
        gender:"",
        roomType:[],
        facilities:[],
        minprice:5000,
        maxprice:20000
    });
    const[priceRange,setPRiceRange]=useState([5000,20000]);
    const roomType=["Single seater","Double seater","Triple seater","Four seater"];
    const facilities=[ "AC",
          "Non-AC",
          "WiFi",
          "Food",
          "Parking",
          "Laundry",
          "Housekeeping",
          "Hot Water",];
    const pgType=["Boys","Girls" ,"co-living"];


    useEffect(()=>{
      const params=Object.fromEntries(serachParams);
      setfilters({
        gender:params.gender || "",
         roomType:params.roomType ? params.roomType.split(",") :[],
        facilities:params.facilities? params.facilities.split(",") :[],
        minprice:params.minprice || "",
        maxprice:params.maxprice || "",
      })

      setPRiceRange(params.maxprice ? Number(params.maxprice): 20000)
    },[serachParams]);

    const handleFilterChange=(e)=>{
      const {name,value,checked,type}=e.target;
      const newFilter={...filters};
      if(type==="checkbox"){
        if(checked){
          newFilter[name]=[...(newFilter[name] || []),value];
        }
        else{
          newFilter[name]=newFilter[name].filter((item)=>item !== value)
        }
      }
       else{
          newFilter[name]=value;
        }
        setfilters(newFilter);

        updateURLParams(newFilter);
            console.log({name,value,checked,type});
    }
   
    const updateURLParams = (newFilters) => {

        const params = new URLSearchParams();

        if (newFilters.gender) {
            params.set(
                "gender",
                newFilters.gender
            );
        }

        if (newFilters.roomType.length > 0) {
            params.set(
                "roomType",
                newFilters.roomType.join(",")
            );
        }
        if (newFilters.facilities.length > 0) {
            params.set(
                "facilities",
                newFilters.facilities.join(",")
            );
        }
        if (newFilters.minprice) {
            params.set(
                "minprice",
                newFilters.minprice
            );
        }
        if (newFilters.maxprice) {
            params.set(
                "maxprice",
                newFilters.maxprice
            );
        }
        console.log(
            "NEW FILTER URL:",
            params.toString()
        );
        setserachParams(params);
    };


    const handlePricechange=(e)=>{
      const newPrice=Number(e.target.value);
      setPRiceRange(newPrice);
      const newFilter={...filters,minprice:5000 ,maxprice:newPrice}
      setfilters(newFilter)
      updateURLParams(newFilter);
    }
    const handleClearAll = () => {

        setfilters({
            gender: "",
            roomType: [],
            facilities: [],
            minprice: "",
            maxprice: ""
        });
        setPRiceRange(20000);
        setserachParams({});
    };
  return (
    <>
    <div className='p-4'>
      <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>
       
       {/* category filter */}
       <div className='mb-6'>
        <div className='flex justify-around items-center'>
            <button onClick={handleClearAll}
            className='text-white bg-violet-700 px-3 rounded '>clear all</button>
            
        </div>
       </div>
        {/* gender filter */}
       <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Pg Type</label>
        {
          pgType.map((gen)=>(
            <div key={gen} className='flex items-center mb-1'>
              <input type="radio" name="gender"
              value={gen}
              onChange={handleFilterChange}
               checked={filters.gender === gen}
               className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{gen}</span>
              </div>
          ))
        }
       </div>
       {/*room type */}
      <div className='mb-6'>
        <label className="block text-gray-600 font-medium mb-2">Room Type</label>
        {
          roomType.map((val)=>(
            <div key={val} className='flex items-center mb-1'>
              <input type="checkbox" name="roomType"
              value={val}
              onChange={handleFilterChange}
               checked={filters.roomType.includes(val)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{val}</span>
              </div>
          ))
        }
      </div>

      </div>
      <div className='mb-6'>
        <label className="block text-gray-600 font-medium mb-2 mx-3">Facilities</label>
        {
          facilities.map((val)=>(
            <div key={val} className='flex items-center mb-1 px-3'>
              <input type="checkbox" name="facilities"
              value={val}
              onChange={handleFilterChange}
              checked={filters.facilities.includes(val)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{val}</span>
              </div>
          ))
        }

      </div>
      {/* price range */}
      <div className='mb-8'>
        <label className='block text-gray-600 font-medium mb-2 px-3'>Price Range</label>
        <input type="range" name="priceRange" min={5000} max={20000}
        value={priceRange}
        onChange={handlePricechange}
        className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'/>
        <div className='flex justify-between text-gray-600 mt-2'>
          <span>$5000</span>
          <span>${priceRange}</span>

        </div>


      </div>
    </>
  )
}

export default FilterSidebar