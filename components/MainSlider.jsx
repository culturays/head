"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'; 

const MainSlider = ({ data, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
const [screenWidth,setScreenWidth]=useState({})
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [data?.length, interval]);
  useEffect(()=>{
const viewport= {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight
} 
setScreenWidth(viewport)
  },[screenWidth?.viewport?.width ]) 
 
  return (
    <div >
        <h2 className='text-gray-600 font-bold text-4xl text-center py-4'>News Plug</h2> 
        <hr className='w-3/4 m-auto bg-gray-600 h-1'/> 
  <div className="main-slider	overflow-hidden relative m-auto sm:w-auto" style={{ maxWidth:'600px', height:'30em'}}>
    <div className='main-x-slider absolute top-0 pt-4 left-4 ml-1 min-[375px]:left-10 min-[375px]:ml-6 min-[600px]:left-16 min-[481px]:ml-10 min-[550px]:ml-16 sm:left-0 sm:ml-0 md:left-16 md:m-5 min-[850px]:left-24 min-[850px]:ml-5 min-[950px]:ml-0 lg:left-0 lg:m-auto' style={{width:'9000px'}}> 
    {data?.flat()?.map((xy,i)=>
    <div className='x-main-x-slider float-left relative inline-block p-1 h-80' key={i + ' ' + Math.random()}> 
    <div className="main-slider-container px-2 text-center py-11 bg-gray-200 bg-opacity-60 rounded-xl sm:w-auto w-72 md:w-80 lg:w-72" > 
     <Link href={`/news/topic/${xy.slug}`}><h2 className="overflow-hidden leading-8 py-8 text-gray-600 text-xl py-5 px-3 h-32 hover:text-gray-500 cursor-pointer "style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link>  
      <Image  
        className='h-56 px-1 py-2 hover:opacity-50'
        src={xy.featuredImage.node.sourceUrl}
        width={1200}
        height={675} 
        alt={xy.featuredImage.node.altText}
        />   
        
    </div>    
    </div>
   )}
    </div>

  </div> 

    <hr className='w-11/12 m-auto bg-gray-600 h-1'/>
   </div>
);
};

export default MainSlider;
