'use client'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'; 
const Bday = ({data}) => {
  const todaysBd= new Date() 
  todaysBd.setDate(todaysBd.getDate());
 
  const nig = data?.data?.bdaydb?.map((lx)=> lx.diff).flat()  
  const bdayObj= nig?.filter((xy,i)=>new Date(xy.bday).toLocaleString().split(',')[0].slice(0,-5)
  ===
  todaysBd.toLocaleString().split(',')[0].slice(0,-5))
  
  const [activeSlide,setActiveSlide] =useState( 0) 
  const prevSlide=()=> { 
    const slide =activeSlide - 1 < 0
      ?bdayObj.length - 1
      :activeSlide -1;
      setActiveSlide(slide);
  }
  const nextSlide=()=> {
    let slide = activeSlide + 1 <  bdayObj.length
      ? activeSlide + 1
      : 0;
      setActiveSlide(slide);  
  }

  return (
    <div > 
<section className="">
  <h2 className="border-dotted border-b-2 py-2 text-2xl my-4 font-bold text-center">Naija Birthdays Today <small>{todaysBd.toLocaleString().split(',')[0].slice(0,-5) }</small>
</h2>  
{ bdayObj.length >0
&&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 justify-center"> 
  <div className="flex justify-between absolute mt-14 w-10/12"> 
 <p onClick={prevSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleLeft}/> </p>
  
 <p onClick={nextSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleRight}/> </p>
 </div>
<div className="pple-card-x flex w-max justify-center">
{bdayObj.map((xx,ix)=> 
  ix === activeSlide &&
<div key={ix} className="w-full">
<div className="pple-card m-1">
<Image
className="justify-self-center bg-gray-900 rounded-full"
src={xx?.img } 
width={150}
height={150}    
alt='Naija Birthdays'/>
</div>
<div className="my-2 pple-card">
<h3 className=' text-white text-center bg-gray-900 w-full p-2'>{xx.name}</h3> 
</div> 
</div>
)}
 </div> 

</div>}
{bdayObj.length < 1 &&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 justify-center">
<p>No Birthdays Today </p>
</div>}
 </section> 

    </div>
  );
};

export default Bday;
