"use client"
import moment from "moment";
import Image from "next/image";
import { useState } from "react"; 
const Trending = ({trends}) => {  
 const related_trends = trends.tags.nodes.map((ex)=> ex.trends.nodes).flat() 
 const replaceHTMLTags=(string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "")
  const newString =string?.replace(regex, "")  
  return newString 
   } 
   const [readAll, setReadAll]=useState(false)
   const read_all=()=> {

   }
  return (
    <div> 
    <div className="xl:flex justify-center xl:w-4/5 m-auto">  
    <div className=" my-11 sm:flex justify-center px-8 sm:px-0 xl:w-3/4"> 
      <div className="sm:w-2/5 md:px-2">      
   <h3 className="text-4xl py-4" style={{ fontStyle: 'oblique' }}>{trends.title.toUpperCase()} </h3>
   
  <p className="text-lg">{replaceHTMLTags(trends.content.split(',')[0].concat(trends.content.split(',')[1]).concat(trends.content.split(',')[2]))} 
  <br/></p> 
  <div className='py-2'>
<Image
src={trends.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={trends.featuredImage.node.altText}
/>
 </div>
  {readAll&&trends.content?.split(',')?.slice(2)?.map((xy)=> <p className="text-lg py-4">{replaceHTMLTags(xy )} <br/> </p>  ) } 
  <button onClick={()=> setReadAll(prev => !prev)} className="cursor-pointer text-lg opacity-80 bg-gray-800 p-4 text-white">{!readAll?'Expand':'Close'} </button> 
 </div> 

<div className="sm:w-1/2 grid xs:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 my-4 gap-1 xl:w-3/4 h-max">
{related_trends.slice(0,4).map((xy,i)=>
<div key={xy.title + ' ' + i} className="p-4 border rounded"> 
<small className="text-md italic text-red-600 py-2">{moment(xy.date).fromNow()} </small>
<h3 className="text-2xl py-2">{xy.title} </h3> 
<p4 className='text-md py-2'> {replaceHTMLTags(xy.excerpt)} </p4>
<div className='py-2'>
<Image
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

 <div className="border bg-gray-300 my-11 xl:w-2/6 md:flex lg:w-11/12 m-auto xl:block">
 <div>
  <h2 className="text-center p-6 text-3xl text-gray-700">More on the topic</h2>
  <hr className="p-0.5 bg-gray-600 w-1/2 m-auto m-1"/>
{related_trends.slice(0,4).map((xy,i)=>
<div key={xy.title + ' ' + i} className="flex m-4 border-b border-b-4 border-black "> 
<div className="w-1/2"> 
<h3 className="text-2xl py-2 font-bold truncate">{xy.title} </h3>
<p4 className=' text-lg font-serif text-gray-600' > {replaceHTMLTags(xy.excerpt)} </p4>
</div>
<div className="w-1/2 p-1">
<Image
src={xy.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={xy.featuredImage.node.altText}
/>
  
</div>
</div>
 )} 
  </div>

 <div className=" my-4 xs:grid grid-cols-2 md:block xl:grid"> 
{related_trends.slice(0,4).map((xy,i)=>
<div key={xy.title + ' ' + i} className="flex m-2 shadow py-4 px-2"> 

<div className=" "> 
<small className="text-md italic text-gray-600 py-2">{moment(xy.date).fromNow()} </small>
<h3 className="text-2xl py-2 font-bold truncate w-11/12">{xy.title} </h3>
<p4 className=' text-lg font-serif text-gray-600 w-11/12' > {replaceHTMLTags(xy.excerpt)} </p4>
</div>
 
</div>
 )}
    </div>

    </div>  
 
     </div>

     <section>
     <h2 className="text-center p-6 text-3xl text-gray-700">Popular on the topic</h2>
     <hr className="p-0.5 bg-gray-600 w-1/2 m-auto m-1"/>
<div className="m-8 lg:flex md:w-full xl:w-3/4 xl:m-auto m-auto sm:m-0 sm:w-3/4 mx-4"> 
<div className="md:flex"> 
<div className="m-2 p-8  "> 
  {related_trends.slice(0,4).map((xy,i)=> 
<div key={xy.title + ' ' + i} className="">  
  <ul>
   <li className='list-disc text-2xl py-2 text-gray-800'>{xy.title} </li> 
     </ul> 
 <p4 className="text-lg"> {replaceHTMLTags(xy.excerpt)} </p4>
 <small className="text-md italic text-red-600 py-2 block">{moment(xy.date).fromNow()} </small>
</div>
  )
  }
  </div>
  <div className="my-11 lg:border-r md:border-l md:border-b md:border-b p-8">  
{related_trends.slice(0,1).map((xy,i)=> 
<div key={xy.title + ' ' + i} className="">   
<div className=" "> 

 <h3 className="text-2xl py-2 text-gray-800">{xy.title} </h3>
 <p4 className='text-lg ' > {replaceHTMLTags(xy.excerpt)} </p4>
  <small className="text-md italic text-red-600 py-2 block">{moment(xy.date).fromNow()} </small>
 </div>
<Image
src={xy.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={xy.featuredImage.node.altText}
/> 

</div>
  )
  }
  </div>

</div>
  <div className="m-2 p-8 md:sm:w-3/4 lg:w-full"> 
  {related_trends.slice(0,4).map((xy,i)=> 
<div key={xy.title + ' ' + i} className="">  
  <ul>
   <li className='list-disc text-2xl py-2 text-gray-800'>{xy.title} </li> 
     </ul> 
 <p4 classNametext-lg> {replaceHTMLTags(xy.excerpt)} </p4>
  <small className="text-md italic text-red-600 py-2 block">{moment(xy.date).fromNow()} </small>
</div>
  )
  }
  </div>
    </div>
</section>
  </div>)
}

export default Trending
