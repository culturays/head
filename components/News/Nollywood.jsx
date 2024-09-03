"use client"

import Link from "next/link"
import moment from "moment/moment"
import Image from "next/image" 
import Pagination from "../Pagination"
import { useEffect, useState } from "react"
const Nollywood = ({nollywood_news}) => {
//     netItems.map((ets)=> {
//         ets.categories.nodes.map((et)=> {
       
//             if(et.name === 'Coming to Netflix Naija'){
// itemLen.push(ets)    
//             } 
//         } 
        
//          ) 
//     })
   
  const [posts, setPosts]=useState([])
  const [loading, setLoading]=useState(false)
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
     setPosts([...nollywood_news])  
   }
   fetchPs()
 },[nollywood_news]) 

 const idxLastPs= currPg * postPerPage
 const idxFsPage = idxLastPs - postPerPage
 const currentPosts = posts.slice(idxFsPage, idxLastPs)  
 const paginating=(pageNumber)=>{
  
 setCurrPg(pageNumber) 
 }
 if(loading){
   return <h2>Loading...</h2>
 }
 const replaceHTMLTags=(string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "")
  const newString = string.replace(regex, "");
  return newString
   }
   
  return (
 <div className=''>  
<div className="bg-black"> 
<div className='md:w-10/12 m-auto py-11'> 
<div className="">
<h2 className="py-6 px-2 bg-yellow-500 rounded w-max text-2xl text-white font-bold border" >Nigerian Movies on Netflix</h2>
<p className="text-xl py-4 text-white" >Get a quick overview of the new movies, TV shows/series and documentaries coming to Netflix Naija everyday.</p>
</div>
 <section className='xl:flex relative m-1'> 
  <div className='border xl:w-10/12'> 
  {nollywood_news.slice(0,1).map((nt)=>(
  <div key={nt.slug} className='home_grid_alt'>
    <Image 
        width={1200}
        height={675}    
       src={nt.featuredImage.node.sourceUrl}     
       alt={nt.featuredImage.node.altText || nt.title}
      /> 
      <div className='absolute z-20 bottom-24 xs:bottom-40 sm:bottom-48 md:bottom-56 xs:mx-8 py-8 font-bold text-white m-2 w-3/4'>   
    <Link href={`/news/nollywood/${nt.slug}`}><h2 className='text-xl xs:text-3xl md:text-4xl md:py-2'> {nt.title}</h2></Link>
    <Link href={`/news/nollywood/${nt.slug}`}><p className='xs:text-lg text-sm py-2 xs:block'>{replaceHTMLTags(nt.excerpt)}</p ></Link> 
    <span className='text-end text-sm mt-11 italic'>{moment(nt.date).fromNow()} </span>
    </div>
    </div> 
       )    
) }</div> 

<div className='xl:w-1/4 flex xl:flex-col border relative overflow-hidden overflow-x-auto sm:overflow-x-hidden'>
  {nollywood_news.slice(1,4).map((nt)=>(
  <div key={nt.slug} className='home_grid_alt border-b lg:border-b-0 lg:text-white lg:relative my-1 '>
       <Image  
        width={1200}  
        height={675}    
       src={nt.featuredImage.node.sourceUrl}     
       alt={nt.featuredImage.node.altText || nt.title}
      /> 
    
    <div className='absolute text-white bottom-5 px-2 z-20'>   
    <Link href={`/news/nollywood/${nt.slug}`}><h2 className='text-xl'>{nt.title}</h2></Link>
    <Link href={`/tag/${nt.contentTags.nodes[0]?.slug}`}><p className='text-sm'><span>{moment(nt.date).fromNow()} |</span> {nt.contentTags.nodes[0]?.name}</p ></Link> 
    </div> 
    </div> 
       )    
) }
    </div> 
  
</section>
</div> 
  
</div> 
 
   <section>
   <div className="pages_shadow border-b-2 border-black p-5 md:w-4/5">
   {currentPosts.map((itx,index)=> 
   <div key={index} className="border-b flex " > 
   <div className="w-1/2"> 
 <Image  
        width={1200}
        height={675}
       src={itx?.featuredImage?.node?.sourceUrl}
       alt={itx?.title}
       />
           </div>  
           <div className="w-full m-1 sm:m-4">
           <p className="italic text-red-600 text-right">{moment(itx.date).fromNow()}</p> 
            <Link href={`/news/nollywood/${itx.slug}`}><h2 className="text-2xl py-2 font-bold">{itx.title}</h2></Link>
         <Link href={`/news/nollywood/${itx.slug}`}><p className="text-lg py-4" style={{lineHeight:'35px'}} >{replaceHTMLTags(itx.excerpt)} </p></Link>  
       <div >
       <div> { itx.contentTags.nodes.map((tx ,index)=> 
    <p key={index} className="text-xl"> {tx.name }</p> )  } 
       </div> 
       </div> 
     
        </div>  
   </div>)}

   <div> 
  <div className=" text-right flex justify-end items-end" >
  {currPg === 1 ? 
  '':<button onClick={decrement} className="text-xl rounded p-4 cursor-pointer font-bold bg-gray-600 text-white my-4">
        <span>&#x226A;</span> Previous Page 
      </button> }
     <div  > {currPg === postPerPage ?'': <button onClick={increment}className="text-xl rounded-sm p-4 cursor-pointer font-bold bg-gray-600">
       Next Page  <span>&#x226B;</span> 
        </button> }</div>
      </div>
      </div> 
   </div>
  
    </section>
 
   <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginating={paginating} />
   
 </div> )
}

export default Nollywood