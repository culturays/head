 "use client"
import { faAngleLeft, faAngleRight, faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"  
import Pagination from "./Pagination"
 

const Awards = ({awards_content}) => {
    const top_awards_items= awards_content.slice(0,4) 
    const carousel_awards_items= awards_content.slice(0,4) 
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
       setPosts([...awards_content]) 
     }
     fetchPs()
   },[awards_content])
   
    
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
      <div className="bg-gray-100"> 
      <div className="m-2 bg-white mx-4 sm:mx-11 md:w-4/5 md:m-auto"> 
        <div className="text-center py-5"> 
        <h2 className="text-4xl font-bold text-gray-800 py-4">Awards</h2>
       <div className="sm:flex justify-center w-3/4 m-auto"> 
        <p className="bg-blue-900 p-2 text-gray-200 m-2">{new Date().toDateString()} </p>
         <p className="text-gray-800 text-xl m-2">Recent Awards</p>
        </div>
        </div> 
        <hr className="bg-gray-700 h-1 w-4/5 m-auto"/> 

 <div className="sm:flex my-3 sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 m-auto">
{top_awards_items.slice(0,1).map((ex,i)=>
<div key={ex.node.title + ' '+ i} className="relative w-11/12 xs:w-3/4 m-auto sm:mx-1"> 
<Image 
src={ex.node.featuredImage.node.sourceUrl} 
style={{height:'35em', width:'100em'}}
width={100}
height={100}
  className='object-cover'
  alt={ex.node.featuredImage.node.altText}
  />
   </div>
)}
<div className="bg-blue-900 relative bottom-36 w-4/5 sm:bottom-0"> 
  <h2 className="text-2xl text-white p-4 text-center">Top Awards News</h2>
{top_awards_items.slice(0,4).map((ex,i)=>
<div key={ex.node.title + ' '+ i} className="mx-4 py-2">
  <ul className="text-gray-300 text-xl px-2 mx-1"> 
 <li className="list-disc p-2">{ex.node.title}</li>
</ul>
 </div>
)}</div>
 </div>

 <div className="bg-blue-900 mx-11 px-4 py-8">  
{top_awards_items.slice(1,2).map((ex,i)=>
  <div key={ex.node.title + ' '+ i} >
     <h2 className="text-2xl text-white p-4 text-center">{ex.node.title}</h2>
<div key={ex.node.title + ' '+ i} className="sm:flex justify-center"> 
 <h2 className="text-gray-300 text-lg px-2 xs:w-1/2 max-w-lg">{replaceHTMLTags(ex.node.excerpt)} gfgf fgfgf ghghg</h2>
 <div className="p-2 xs:w-1/2 max-w-xs"> 
 <Image
  src={ex.node.featuredImage.node.sourceUrl}
width={1200}
height={675}
  alt={ex.node.featuredImage.node.altText}
  /> 
   </div> 
    </div> 
 </div>
)}
<hr/>
 {top_awards_items.slice(1,2).map((ex,i)=>
  <div key={ex.node.title + ' '+ i} >
     <h2 className="text-2xl text-white p-4 text-center">{ex.node.title}</h2>
<div key={ex.node.title + ' '+ i} className="sm:flex justify-center">  
 <div className="p-2 xs:w-1/2 max-w-xs"> 
 <Image
  src={ex.node.featuredImage.node.sourceUrl}
width={1200}
height={675}
  alt={ex.node.featuredImage.node.altText}
  /> 

   </div>
      <h2 className="text-gray-300 text-lg px-2 xs:w-1/2 max-w-lg">{replaceHTMLTags(ex.node.excerpt)} gfgf fgfgf ghghg</h2>
    </div> 
 </div>
)}

</div>

 <hr className="bg-gray-700 h-1 my-3"/>
<div className="px-4 ">
<div className="xs:flex lg:px-11 xl:w-3/4">

<div className="xs:w-1/3 m-4">
<h2 className="text-4xl text-gray-800 font-medium">Local</h2>
<hr className="bg-yellow-700 h-1 my-3 w-4/5"/>
{awards_content.map((ex,i)=>
<div className="border-b-2 border-black rounded-b-4 " key={ex.node.title + ' '+ i} > 
  <h2 className="text-lg py-4">{ex.node.title} </h2>
<Image 
className="p-2 border border-black"
  src={ex.node.featuredImage.node.sourceUrl}
 width={1200}
 height={675}
  alt={ex.node.featuredImage.node.altText}
  />  
  </div>
 )}

</div>
<div className="xs:w-1/2 xl:w-1/3 h-max border border-b-2 border-b-black bg-gray-50 text-gray-700" > 
<h2 className="text-2xl text-gray-800 font-medium m-4">Foreign</h2>
<hr className="bg-yellow-700 h-1 my-3 w-4/5 m-auto"/>
{awards_content.map((ex,i)=>
 <h2 className="text-lg px-16 p-3 my-3 xs:px-3" key={ex.node.title + ' '+ i} >{ex.node.title} </h2>
 )}

</div>
</div>

<div className="w-11/12 m-auto">
<hr className="bg-gray-700 h-1 w-4/5 m-auto"/> 
  <h2 className="text-4xl text-gray-800 font-medium my-4 text-center">Music</h2>
  <hr className="bg-gray-700 h-1 w-1/2 m-auto"/> 
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1 my-4 lg:w-4/5 m-auto">
 {awards_content.map((ex,i)=>
<div className="shadow-lg rounded-b-lg h-96" key={ex.node.title + ' '+ i} >
 
  <Image
  src={ex.node.featuredImage.node.sourceUrl}
 width={1200}
 height={675}
  alt={ex.node.featuredImage.node.altText}
  /> 
  <h2 className="text-lg p-2 ">{ex.node.title} </h2> 
  </div>  
 )}
    </div> 
 </div>
    </div>
    </div>
    </div>
 )
  }
  
  export default Awards
