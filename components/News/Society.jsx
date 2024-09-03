"use client"
import { faAngleLeft, faAngleRight, faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"  
import Pagination from "../Pagination"

const Society = ({eco_news}) => {
  const top_eco_items= eco_news.slice(0,4) 
  const carousel_eco_items= eco_news.slice(0,4) 
  const [activeSlide,setActiveSlide] =useState( 0)
  const [posts, setPosts]=useState([]) 
  const [currPg, setCurrPg]=useState(1)
  const [postPerPage, setPostPerP]=useState(2) 
  
  function decrement() {
   setCurrPg(currPg - 1);
 }
 function increment() {
   setCurrPg(currPg + 1);
 }
 
 useEffect(()=>{
   const fetchPs= async()=>{ 
     setPosts([...eco_news]) 
   }
   fetchPs()
 },[eco_news])
 
  
 const idxLastPs= currPg * postPerPage
 const idxFsPage = idxLastPs - postPerPage
 const currentPosts = posts.slice(idxFsPage, idxLastPs)
 
 const paginating=(pageNumber)=>{ 
 setCurrPg(pageNumber) 
 }

  const prevSlide=()=> { 
    const slide =activeSlide - 1 < 0
      ?10 - 1
      :activeSlide -1;
      setActiveSlide(slide);
  }
  const nextSlide=()=> {
    let slide = activeSlide + 1 < 10
      ? activeSlide + 1
      : 0;
      setActiveSlide(slide);  
  }
  const replaceHTMLTags=(string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "")
    const newString = string.replace(regex, "");
    return newString
     }
     const [activeSet , setActiveSet]=useState(false)
  return (
    <div> 
    <div className="bg-gray-100"> 
    <div className="xl:grid xl:grid-cols-2 justify-between gap-1 w-3/4 m-auto lg:w-4/5">  
      <section className="md:grid md:grid-cols-2 justify-center m-auto gap-1 w-full xl:w-full lg:w-3/4"> 
      {top_eco_items.map((xy,i)=>
      <div className="xs:w-3/4 sm:w-full m-auto" key={xy.title + ' ' + i}>
        <div className="bg-white p-4 m-1 h-52 shadow"> 
        <div className="my-3">
           <span className="border rounded-2xl bg-red-500 text-white p-2">
            <FontAwesomeIcon 
           icon={faCircle}
           width={10}
           className="text-white mx-2"
           />{xy.tags.nodes[0]?.name} </span>
         
            </div>
                <div className="my-4">
            <div className="">
           <h2 className=""><Link href="/">{xy.title}</Link></h2>
                  </div>
            <p className="my-3"><small className=""><em>{moment(xy.date).fromNow()}</em></small></p>
         </div>
    </div>
      </div> 
)}
</section>

<section className='xl:my-20 w-3/4 m-auto mx-4'> 

 <div className="flex justify-between relative top-16 w-full"> 
 <div onClick={prevSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleLeft}/> </div>
  
 <div onClick={nextSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleRight}/>
  </div> 
 </div> 
 <div className="mx-11"> 
 { carousel_eco_items.map((item, index)=> 
 index===activeSlide&&
 <div className='my-2' key={item.name + ' ' + index}> 
 <h2 className='text-2xl text-gray-600 my-1 font-bold'>{item?.title} </h2> 
 <p className='m-1 text-gray-600'>{replaceHTMLTags(item.excerpt)} </p>
 <p className="my-3"><small className=""><em>{moment(item.date).fromNow()}</em></small></p>
  </div > 
) }  
 
 </div> 
 </section>
 
    </div>
  </div>
  
 <section>
<div className="grid lg:grid-cols-6 w-3/4 m-auto p-8 lg:w-11/12 xl:w-4/5"> 
<div className="lg:col-span-4 lg:col-start-1">
<h2 className="text-3xl m-4">Business</h2>
<hr className="bg-black py-0.5"/>
<div className="grid sm:grid-cols-2 justify-center ">
{currentPosts.map((xy, ix)=> 
<div className=" my-2 px-2 m-auto border-b xs:w-3/4 sm:w-full " key={xy.title + ' ' + ix}>
<h2 className="text-xl lg:h-28 py-3 md:h-20 h-24 mt-4">{xy.title} </h2>
<Image
src={xy.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={xy.featuredImage.node.altText}
/> 
<p className="my-2">{replaceHTMLTags(xy.excerpt)} </p>
<p className="my-3"><small className=""><em>{moment(xy.date).fromNow()}</em></small></p>
</div>
)}
</div>
<div className=""> 
 
 <div  >
{currPg === 1 ? 
'':<button onClick={decrement}>
 <span>&#x226A;</span> Previous Page 
 </button> } </div> 
<div >
  {currPg === postPerPage ?'': <button onClick={increment}>
  Next Page  <span>&#x226B;</span> 
   </button> }
   </div>
 </div>
</div>
 
<div className="flex justify-between lg:col-span-2 lg:col-start-5"> 
<div> 
<h2 onClick={()=> setActiveSet(prev => !prev)} className="text-xl cursor-pointer">World</h2>
<hr className={activeSet?"bg-red-500 py-0.5":''}/>
<div>
{activeSet&&eco_news.map((xy, ix)=> 
<div className=" my-2 px-2 m-auto border-b xs:w-3/4 sm:w-full" key={xy.title + ' ' + ix}>
<h2 className="text-xl lg:h-28 py-3 md:h-20 h-24 mt-4">{xy.title} </h2>
 
<p className="my-2">{replaceHTMLTags(xy.excerpt)} </p>
<p className="my-3"><small className=""><em>{moment(xy.date).fromNow()}</em></small></p>
</div>
)}
</div>
</div>
<div>
<h2 onClick={()=> setActiveSet(prev => !prev)}className="text-xl cursor-pointer">Africa</h2>
<hr className={!activeSet?"bg-red-500 py-0.5":''}/>
<div>
{!activeSet&&eco_news.map((xy, ix)=> 
<div className=" my-2 px-2 m-auto border-b xs:w-3/4 sm:w-full" key={xy.title + ' ' + ix}>
<h2 className="text-xl lg:h-28 py-3 md:h-20 h-24 mt-4">{xy.title} </h2>
 
<p className="my-2">{replaceHTMLTags(xy.excerpt)} </p>
<p className="my-3"><small className=""><em>{moment(xy.date).fromNow()}</em></small></p>
</div>
)}
</div>
</div>

</div>
<Pagination postPerPage={postPerPage} totalPosts={posts.length} paginating={paginating} />
</div>
  </section> 
  </div>)
}

export default Society
 