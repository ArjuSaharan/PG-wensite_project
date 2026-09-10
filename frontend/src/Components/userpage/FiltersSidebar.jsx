import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
    const[serachParams,setserachParams]=useSearchParams();
    const[filters,setfilters]=useState({
        category:"",
        gender:"",
        roomType:[],
        material:[],
        facilaties:[],
        minprice:5000,
        maxprice:20000
    });
    const[priceRange,setPRiceRange]=useState([5000,20000]);
      const navigate=useNavigate();
    const categories=["Top wear","Bottom wear"];
    const roomType=["single seater","double seater","three seater","four seater"];
    const facilaties=["AC","Non ac","Laundary","Parking","food","houseKeeping"];
    const gender=["Boys","Girls"];

    useEffect(()=>{
      const params=Object.fromEntries([...serachParams]);
      setfilters({
        category:params.category || "",
        gender:params.gender || "",
        // color:params.color || "",
         roomType:params.roomType ? params.roomType.split(",") :[],
        // material:params.material ? params.material.split(",") :[],
        facilaties:params.facilaties? params.facilaties.split(",") :[],
        minprice:params.minprice || 5000,
        maxprice:params.maxprice || 20000,
      })

      setPRiceRange([5000,params.maxprice || 20000])
    },[serachParams]);

    const handleFilterChange=(e)=>{
      const {name,value,checked,type}=e.target;
      let newFilter={...filters};
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

    const updateURLParams=(newFilter)=>{
      const params=new URLSearchParams();
      Object.keys(newFilter).forEach((key)=>{
        if(Array.isArray(newFilter[key]) && newFilter[key].length>0){
          params.append(key, newFilter[key].join(","));
        }
        else if(newFilter[key]){
          params.append(key,newFilter[key]);
        }
      })
      setserachParams(params);
      navigate(`?${params.toString()}`)
    }

    const handlePricechange=(e)=>{
      const newPrice=e.target.value;
      setPRiceRange([5000,newPrice]);
      const newFilter={...filters,minprice:5000 ,maxprice:newPrice}
      setfilters(newFilter)
      updateURLParams(newFilter);
    }
  return (
    <>
    <div className='p-4'>
      <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>
       
       {/* category filter */}
       <div className='mb-6'>
        <div className='flex justify-around items-center'>
            <button className='text-white bg-violet-700 px-3 rounded '>clear all</button>
            <button className='text-white bg-violet-700 px-3 rounded'>Apply</button>
        </div>
        {/* <label className='block text-gray-600 font-medium mb-2'>Category</label>
        {
          categories.map((category)=>(
            <div key={category} className='flex items-center mb-1'>
              <input type="radio" name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category ===category}
               className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{category}</span>
              </div>
          ))
        } */}

       </div>
        {/* gender filter */}
       <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Gender</label>
        {
          gender.map((gen)=>(
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

       {/* color section */}
       {/* <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Color</label>
        <div className='flex flex-wrap gap-2'>
          {
            color.map((colors)=>(
              <button key={colors}
              name="color"
              value={colors}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer
              hover:scale-105  ${filters.color ===colors ? "ring-3 ring-blue-500 border-gray-300" :""}`} style={{background:colors.toLocaleLowerCase()}}></button>
            ))
          }

        </div> */}
       {/* </div> */}

       {/*size filter */}
      <div className='mb-6'>
        <label className="block text-gray-600 font-medium mb-2">Size</label>
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

       {/*material filter */}
      {/* <div className='mb-6'>
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {
          material.map((val)=>(
            <div key={val} className='flex items-center mb-1'>
              <input type="checkbox" name="material"
              value={val}
              onChange={handleFilterChange}
              checked={filters.material === val}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{val}</span>
              </div>
          ))
        }

      </div> */}

       {/*brand filter */}
      <div className='mb-6'>
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {
          facilaties.map((val)=>(
            <div key={val} className='flex items-center mb-1'>
              <input type="checkbox" name="facilaties"
              value={val}
              onChange={handleFilterChange}
              checked={filters.facilaties.includes(val)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{val}</span>
              </div>
          ))
        }

      </div>
      {/* price range */}
      <div className='mb-8'>
        <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
        <input type="range" name="priceRange" min={5000} max={20000}
        value={priceRange[1]}
        onChange={handlePricechange}
        className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'/>
        <div className='flex justify-between text-gray-600 mt-2'>
          <span>$5000</span>
          <span>${priceRange[1]}</span>

        </div>


      </div>

    </div>
    </>
  )
}

export default FilterSidebar