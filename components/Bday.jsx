'use client'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState} from 'react'; 
const Bday = ({data}) => { 
   const [activeSlide,setActiveSlide] =useState( 0) 
  const offset = -8;
  const todaysBd= new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
  const bdayObj= data?.filter((xy, i)=>new Date(xy.info).toLocaleString().split(',')[0].slice(0,-5) 
  === new Date(todaysBd).toLocaleString().split(',')[0].slice(0,-5))
///today.setHours(0, 0, 0, 0); 
const today = new Date();
const todayDay = today.getDate()-1;
const todayMonth = today.getMonth();

const filteredDates = data.filter(dateStr => {
    const date = new Date(dateStr.info);
    const dateDay = date.getDate();  
    const dateMonth = date.getMonth();
    return dateMonth === todayMonth&&dateDay === todayDay;
}); 

  const prevSlide=()=> { 
    const slide =activeSlide - 1 < 0
      ?filteredDates.length - 1
      :activeSlide -1;
      setActiveSlide(slide);
  }
  const nextSlide=()=> {
    let slide = activeSlide + 1 <  filteredDates.length
      ? activeSlide + 1
      : 0;
      setActiveSlide(slide);  
  }

  return (
    <div > 
  <section className="">
  <h2 className="border-dotted border-b-2 py-2 text-2xl my-4 font-bold text-center">Naija Birthdays Today <small>{todaysBd.toLocaleString().split(',')[0].slice(0,-5) }</small>
</h2>  
{ filteredDates.length >0
&&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 justify-center"> 
  <div className="flex justify-between absolute mt-14 w-10/12"> 
 <p onClick={prevSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleLeft}/> </p>
  
 <p onClick={nextSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleRight}/> </p>
 </div>
<div className="pple-card-x flex w-max justify-center">
{filteredDates.map((xx,ix)=> 
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
{filteredDates.length < 1 &&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 justify-center">
<p>No Birthdays Today </p>
</div>}
 </section>  

    </div>
  );
};

export default Bday;
