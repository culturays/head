"use client"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
const replaceHTMLTags=(string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "") 
  const newString = string?.replace(regex, "");
  return newString
   }

const SlideFxn = ({content, title_item}) => {
    const [activeSlide,setActiveSlide] =useState(0)
    const prevSlide=()=> { 
        const slide =activeSlide - 1 < 0
          ?4 - 1
          :activeSlide -1;
          setActiveSlide(slide);
      }
      const nextSlide=()=> {
        let slide = activeSlide + 1 < 4
          ? activeSlide + 1
          : 0;
          setActiveSlide(slide);  
      }
     
  return (  
 <section className='m-auto my-3 max-w-3xl relative'>
 <div className="flex justify-between m-auto absolute top-1/3 w-full"> 
 <div onClick={prevSlide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
 <FontAwesomeIcon icon={faAngleLeft}/> 
 </div>
  
 <div onClick={nextSlide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
 <FontAwesomeIcon icon={faAngleRight}/>
  </div> 
 </div> 
 
{content.slice(0,4).map((item, index)=>  
 index===activeSlide&&
<div key={item?.name + ' ' + index} className="bg-gray-900 border border-yellow-700">  
 <div className='my-2 max-w-max m-auto px-11 py-8'> 
  <Link href={`/news/${title_item}/${item.slug}`}><h2 className='text-3xl text-gray-300 my-1 font-bold hover:text-gray-200 cursor-pointer overflow-hidden text-ellipsis leading-10' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{item?.title} </h2> </Link>
  <Link href={`/news/${title_item}/${item?.slug}`}><p className='m-1 py-2 text-base text-gray-200 hover:text-gray-50 cursor-pointer'>{replaceHTMLTags(item?.excerpt)} </p></Link>
 <small className="text-sm my-3p y-2 text-red-500"><em>{moment(item?.date).fromNow()}</em></small> 
  </div >  
 </div>
 ) }  
 </section> 
 
 
  )
}

export default SlideFxn
