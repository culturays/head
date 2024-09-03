"use client"
import { faAngleLeft, faAngleRight, faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"  
import Pagination from "../Pagination"

const Economy = ({economy_news}) => {
  const top_economy_items= economy_news.slice(0,4) 
  const carousel_economy_items= economy_news.slice(0,4) 
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
     setPosts([...economy_news]) 
   }
   fetchPs()
 },[economy_news])
 
  
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
    <div className="bg-gray-50 py-4"> 
    <div className="xl:grid xl:grid-cols-2 justify-between gap-1 m-auto lg:w-4/5 xl:px-20 px-6">  
      <section className="sm:grid sm:grid-cols-2 justify-center m-auto gap-1 px-2"> 
      {top_economy_items.map((xy,i)=>
      <div className="xs:w-3/4 sm:w-full m-auto" key={xy.title + ' ' + i}>
        <div className="bg-white p-4 m-1 h-52 shadow"> 
        <div className="my-3 cursor-pointer ">
          <Link href={`/tag/${xy.contentTags.nodes[0]?.slug}`}></Link> <span className="border rounded-2xl bg-red-500 text-white p-2 hover:bg-red-600">
            <FontAwesomeIcon 
           icon={faCircle}
           width={10}
           className="text-white mx-2"
           />{xy.contentTags.nodes[0]?.name} </span>
         
            </div>
                <div className="my-6">
            <div className="cursor-pointer">
           <Link href={`/news/economy/${xy.slug}`}><h2 className="text-xl font-medium hover:text-gray-500">{xy.title}</h2></Link> 
           </div>
            <small className="text-sm my-3 text-red-500"><em>{moment(xy.date).fromNow()}</em></small>
         </div>
    </div>
      </div> 
)}
</section>

<section className='xl:my-20 px-2 border border-yellow-700 w-10/12 xl:w-full m-auto bg-gray-800 my-4'>
 <div className="flex justify-between relative top-24 w-full "> 
 <div onClick={prevSlide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
 <FontAwesomeIcon icon={faAngleLeft}/> 
 </div>
  
 <div onClick={nextSlide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
 <FontAwesomeIcon icon={faAngleRight}/>
  </div> 
 </div> 
 <div className="mx-11"> 
 { carousel_economy_items.map((item, index)=> 
 index===activeSlide&&
 <div className='my-2' key={item.name + ' ' + index}> 
  <Link href={`/news/economy/${item.slug}`}><h2 className='text-3xl text-gray-300 my-1 font-bold hover:text-gray-200 cursor-pointer'>{item?.title} </h2> </Link>
  <Link href={`/news/economy/${item.slug}`}><p className='m-1 text-base text-gray-200 hover:text-gray-50 cursor-pointer'>{replaceHTMLTags(item.excerpt)} </p></Link>
 <small className="text-sm my-3 text-red-500"><em>{moment(item.date).fromNow()}</em></small> 
  </div > 
) }  
 
 </div> 
 </section> 
    </div>
  </div>
    
 <section>
<div className="grid lg:grid-cols-6 m-auto p-8 w-4/5 gap-2"> 
<div className="lg:col-span-4 lg:col-start-1">
<h2 className="text-3xl m-4">Economy</h2>
<hr className="bg-black py-0.5"/>
<div className="grid sm:grid-cols-2 justify-center xl:w-4/5">
{currentPosts.map((xy, ix)=> 
<div className="my-2 px-2 m-auto border-b xs:w-3/4 sm:w-full " key={xy.title + ' ' + ix}> 
<div className="overflow-hidden text-ellipsis " style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}> 
<Link href={`/news/economy/${xy.slug}`}><h2 className="text-3xl mt-4 w-3/4 hover:text-gray-400">{xy.title} </h2></Link>
</div>
<Image
className="hover:opacity-70 cursor-pointer"
src={xy.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={xy.featuredImage.node.altText}
/> 
<Link href={`/news/economy/${xy.slug}`}><p className="my-2 text-lg hover:text-gray-500">{replaceHTMLTags(xy.excerpt)} </p></Link>
 <small className="text-sm my-3 text-red-500"><em>{moment(xy.date).fromNow()}</em></small> 
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
  {currPg === postPerPage ?'': <button onClick={increment}  className="text-lg p-4 text-orange-700 border border border-orange-700 rounded-xl hover:bg-black hover:text-gray-300">
  Next Page  <span>&#x226B;</span> 
   </button> }
   </div>
 </div>
</div>
 
<div className="flex justify-between lg:block xl:flex lg:col-span-2 lg:col-start-5 my-5 "> 
<div className="w-1/2 lg:w-full">
<h2 onClick={()=> setActiveSet(prev => !prev)}className="text-xl cursor-pointer">World</h2>
<hr className={activeSet?"bg-red-500 py-0.5":''}/>


<div>
{activeSet&&economy_news.map((xy, ix)=> 
<div className="my-2 px-2 m-auto border-b xs:w-3/4 sm:w-full" key={xy.title + ' ' + ix}>
<Link href={`/news/business/${xy.slug}`}><h2 className="text-xl py-3 mt-4 hover:text-gray-600 cursor-pointer">{xy.title} </h2></Link>
<Link href={`/news/business/${xy.slug}`}><p className="my-2 hover:text-gray-600 text-base">{replaceHTMLTags(xy.excerpt)} </p></Link>
 <small className="text-sm my-3 text-red-500 "><em>{moment(xy.date).fromNow()}</em></small> 
</div>
)}
</div>
</div>
<div className="w-1/2 lg:w-full">
<h2 onClick={()=> setActiveSet(prev => !prev)}className="text-xl cursor-pointer">Africa</h2>
<hr className={!activeSet?"bg-red-500 py-0.5":''}/>
<div>
{!activeSet&&economy_news.map((xy, ix)=> 
<div className="my-2 px-2 m-auto border-b xs:w-3/4 sm:w-full" key={xy.title + ' ' + ix}>
<Link href={`/news/economy/${xy.slug}`}><h2 className="text-xl py-3 mt-4 hover:text-gray-600 cursor-pointer">{xy.title} </h2></Link>
<Link href={`/news/economy/${xy.slug}`}><p className="my-2 hover:text-gray-600 text-base">{replaceHTMLTags(xy.excerpt)} </p></Link>
 <small className="text-sm my-3 text-red-500 "><em>{moment(xy.date).fromNow()}</em></small> 
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

export default Economy
 