import React from 'react'
import { LuBookUser } from "react-icons/lu";

import { MdVerified } from "react-icons/md";
const Testimonial = () => {
  const cardsdata=[
    {
      image:'https://i.pinimg.com/736x/2e/e5/d5/2ee5d558892c3595675ccb7738c40002.jpg',
      name:'Riya Goel',
      feedback:'ApnaStay made finding a PG so easy. I found a verified room near my workplace within a few days. The photos and details were exactly as shown'
    },
    {
      image:'https://i.pinimg.com/736x/3c/5c/62/3c5c62dbb375819153c005cade1ed994.jpg',
      name:'Rahul Sharma',
      feedback:'I was worried about finding a safe place in a new city, but ApnaStay helped me connect with trusted PG owners quickly. Highly recommended!'
    },
    {
      image:'https://i.pinimg.com/736x/7e/66/52/7e6652b5db5df7abd15a0438093627d2.jpg',
      name:'Neha Singh',
      feedback:"The direct communication feature is amazing. I could talk with the owner, clear my doubts, and finalize my stay without any hassle."
    },
    {
      image:'https://i.pinimg.com/736x/72/a9/cd/72a9cd43ba36935b0320386f8a8dce1d.jpg',
      name:'Arjun Mehta',
      feedback:"Finding an affordable and comfortable PG used to be difficult, but ApnaStay made the entire process simple and transparent."
    }
  ]
  const CreateCard = ({card})=>(
    <div className='p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0'>
      <div className='flex gap-2'>
        <img className='size-11 rounded-full ' src={card.image}/>
        <div className='flex flex-col'>
          <div className='flex items-center gap-1'>
            <p>{card.name}</p>
            {/* <MdVerified className='fill-green-600 text-white '/> */}
          </div>
          <span className='text-xs text-slate-500'>{card.handle}</span>
        </div>
      </div>
      <p className='text-sm py-4 text-gray-800'>{card.feedback}</p>
    </div>
  );
  return (
    <>
    <style>
      {`
      @keyframes marqueeScroll{
         0% {transform:translateX(0%);}
         100%{ transform : translateX(-50%)}
      }
         .marquee-inner{
         animation:marqueeScroll 25s linear infinite;}

         .marquee-reverse{
         animation-direction:reverse;}
      `}
    </style>
    <div id="testimonals" className="min-h-screen bg-white px-6 md:px-20 py-20 flex flex-col items-center">
         <div className="flex items-center gap-2 text-sm text-violet-600 bg-violet-400/10 rounded-full px-6 py-2 mb-6">
             <LuBookUser className="size-4.5 stroke-violet-600"/>
            <span>Testimonails</span>
          </div>
         <div className='text-center max-w-2xl'>
            <h2 className='text-xl font-bold'>Find Your Perfect Stay</h2>
            <p className='text-sm tracking-tighter text-gray-800'>Discover verified PGs with comfortable rooms, trusted owners, and all the amenities you need. Find a safe and affordable place to stay or list your property with ease.</p>

         </div>
        
        <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">

  {/* Left Gradient */}
  <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

  {/* Cards */}
  <div className="marquee-inner flex transform-gpu min-w-[200%] gap-4 pt-10 pb-5">
    {[...cardsdata, ...cardsdata].map((card, index) => (
      <CreateCard key={index} card={card} />
    ))}
  </div>

  {/* Right Gradient */}
  <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

</div>
  <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">

  {/* Left Gradient */}
  <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

  {/* Cards */}
  <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] gap-4 pt-10 pb-5">
    {[...cardsdata, ...cardsdata].map((card, index) => (
      <CreateCard key={index} card={card} />
    ))}
  </div>

  {/* Right Gradient */}
  <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

</div>
    </div>
    
    </>
  )
}

export default Testimonial