"use client"
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";   
const Trending = ({related_to_trend, trends_categories, trending_all, trends}) => {  
 const replaceHTMLTags=(string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "")
  const newString =string?.replace(regex, "")  
  return newString 
   } 
   const [readAll, setReadAll]=useState(false)   
  
  return (
    <div className="m-auto" style={{maxWidth:'1700px'}}> 
    <div className="xl:flex justify-center " style={{maxWidth:'1600px'}}>
    <div className=" my-11 md:flex justify-center px-4 mx-2 xl:mx-0 xl:px-0 gap-2"> 
      <div className="md:max-w-md m-auto px-4 min-[800px]:max-w-lg min-[900px]:max-w-xl min-[1000px]:max-w-2xl min-[1080px]:max-w-4xl xl:max-w-5xl md:m-0">      
   <h3 className="text-4xl py-4" style={{ fontStyle: 'oblique' }}>{trends.title.toUpperCase()} </h3>
   <div dangerouslySetInnerHTML={{__html:trends.excerpt}} className="text-gray-700 text-lg"/>
 
  <br/> 
  <div className='py-2 my-4'>
<Image
src={trends.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={trends.featuredImage.node.altText}
/>
<div dangerouslySetInnerHTML={{__html:trends.featuredImage.node.caption}} className="text-gray-700 text-sm italic my-2 underline"/>
 
 </div>

 <div dangerouslySetInnerHTML={{__html:trends.trendinggroup.intro}} className="text-gray-700 text-lg py-1 leading-8"/>
  {readAll&&<div><div dangerouslySetInnerHTML={{__html:trends.content}} className="text-gray-700 text-lg py-1 leading-8 [&_img]:my-4 [&_figure>figcaption]:italic [&_figure>figcaption]:mb-3 [&_figure>figcaption]:underline [&_figure>figcaption]:text-sm"/><br/>
  </div> } 
  <button onClick={()=> setReadAll(prev => !prev)} className="cursor-pointer text-lg opacity-80 bg-gray-800 p-4 text-white">{!readAll?'Expand':'Close'} </button> 


  <div className=" my-3 m-auto h-max"> 
<h2 className="text-center p-3 text-3xl text-gray-700 font-bold py-8">See Also</h2>
 <div className="my-4 xs:grid grid-cols-2 justify-center border"> 
{trends_categories[0].trends.nodes.map((xy,i)=>
<div key={xy.title + ' ' + i} className="flex shadow px-2 py-4 justify-center"> 

<div className="max-w-xs"> 
<small className="text-md italic text-gray-600 py-2">{moment(xy.date).fromNow()} </small>
<Link href={`/news/trending/${xy.xlug}`}><h3 className="hover:text-gray-500 text-2xl font-bold overflow-hidden text-ellipsis leading-8"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </h3></Link>
<Link href={`/news/trending/${xy.xlug}`}><p className='hover:text-gray-500 text-lg font-serif text-gray-600 overflow-hidden text-ellipsis my-3'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} > {replaceHTMLTags(xy.excerpt)} </p></Link>
</div>
 
</div>
 )}
    </div>
</div> 
 </div>
{related_to_trend?.length>0&&
<div className="my-10 md:my-0 max-w-xs xs:max-w-max md:max-w-xs  m-auto"> 
  <h2 className="text-4xl text-gray-800">Related</h2>
<div className="grid xs:grid-cols-2 md:grid-cols-1 my-4 gap-1 h-max">
{related_to_trend?.slice(0,5).map((xy,i)=>
<div key={xy.title + ' ' + i} className="p-4 border rounded"> 
<small className="text-md italic text-red-600">{moment(xy.date).fromNow()} </small>
<Link href={`/news/trending/${xy.xlug}`}><h3 className="hover:text-gray-500 text-2xl  overflow-hidden text-ellipis leading-8" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </h3></Link> 
<Link href={`/news/trending/${xy.xlug}`}><p className='hover:text-gray-500 overflow-hidden text-ellipis my-2'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}> {replaceHTMLTags(xy.excerpt)} </p></Link>
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
}
    </div>
  
 <div className="my-11 lg:flex xl:block h-max justify-center max-w-5xl m-auto">
 <div className="bg-gray-200 m-auto border max-w-2xl xl:max-w-sm">
  <h2 className="text-center p-3 text-3xl text-gray-700 font-bold">Popular Trends</h2>
  <hr className="p-0.5 bg-gray-600 w-1/2 m-auto m-1"/>
{trends_categories[1].trends.nodes.map((xy,i)=>
<div key={xy.title + ' ' + i} className="flex m-4 border-b border-b-4 border-black"> 
<div className="w-1/2"> 
<Link href={`/news/trending/${xy.xlug}`}><h3 className="hover:text-gray-500 text-2xl py-2 font-bold truncate">{xy.title} </h3></Link>
<Link href={`/news/trending/${xy.xlug}`}><p className='hover:text-gray-500 text-lg font-serif text-gray-600' > {replaceHTMLTags(xy.excerpt)} </p></Link>
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


<div className="bg-gray-200 border max-w-2xl my-3 lg:my-0 lg:m-0 xl:my-3  m-auto xl:max-w-sm h-max"> 
<h2 className="text-center p-3 text-3xl text-gray-700 font-bold pt-8">On the Topic </h2>
 <div className="my-4 xs:grid grid-cols-2 lg:block xl:grid justify-center mx-2"> 
{trends_categories[2].trends.nodes.map((xy,i)=>
<div key={xy.title + ' ' + i} className="flex shadow px-2 py-4 justify-center"> 

<div className="max-w-xs"> 
<small className="text-md italic text-gray-600 py-2">{moment(xy.date).fromNow()} </small>
<Link href={`/news/trending/${xy.xlug}`}><h3 className="hover:text-gray-500 font-bold overflow-hidden text-ellipsis"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </h3></Link>
<Link href={`/news/trending/${xy.xlug}`}><p className='hover:text-gray-500 text-lg font-serif text-gray-600 overflow-hidden text-ellipsis my-3'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} > {replaceHTMLTags(xy.excerpt)} </p></Link>
</div> 
 
</div>
 )}
    </div>
</div>
   
    </div>  
   </div>
 
     <section>
     <h2 className="text-center p-6 text-3xl text-gray-700">More Trending Topics</h2>
     <hr className="p-0.5 bg-gray-600 w-1/2 m-auto m-1"/>
<div className="xl:flex justify-center py-8"> 
<div className="md:flex justify-center"> 
<div className="mx-2 px-8"> 
  {trends_categories[3].trends.nodes.map((xy,i)=> 
<div key={xy.title + ' ' + i} className="my-3 [&:not(:last-child)]:border-b">  
  <ul>
  <Link href={`/news/trending/${xy.xlug}`}><li className='hover:text-gray-500 list-disc text-2xl text-gray-800 overflow-hidden text-ellipsis leading-9' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </li></Link> 
     </ul> 
     <Link href={`/news/trending/${xy.xlug}`}><p className="hover:text-gray-500 text-lg overflow-hidden text-ellipsis leading-8 my-3" style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}> {replaceHTMLTags(xy.excerpt)} </p></Link>
 <small className="text-md italic text-red-600 py-2 block">{moment(xy.date).fromNow()} </small>
</div>
  )
  }
  </div>
  <div className="my-4 lg:border-r md:border-l md:border-b h-max p-3 ">  
{trends_categories[4].trends.nodes.map((xy,i)=> 
<div key={xy.title + ' ' + i} className="max-w-2xl ">   
<div className="[&:not(:last-child)]:border-b my-3"> 

<Link href={`/news/trending/${xy.xlug}`}><h3 className="hover:text-gray-500 text-2xl text-gray-800 overflow-hidden text-ellipsis leading-8 my-3"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </h3></Link> 
<Link href={`/news/trending/${xy.xlug}`}><p className='hover:text-gray-500 text-lg overflow-hidden text-ellipsis leading-8 my-3' style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}> {replaceHTMLTags(xy.excerpt)} </p></Link> 
  <small className="text-md italic text-red-600 py-2 block">{moment(xy.date).fromNow()} </small>
 </div>
<Image
className="max-h-56 xl:max-h-64"
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
 
  <div className="m-2 p-8 max-w-2xl"> 
  {trends_categories[5].trends.nodes.map((xy,i)=> 
<div key={xy.title + ' ' + i} className="[&:not(:last-child)]:border-b my-3">  
  <ul>
  <Link href={`/news/trending/${xy.xlug}`}><li className='hover:text-gray-500 list-disc text-2xl text-gray-800'>{xy.title} </li></Link>
     </ul> 
     <Link href={`/news/trending/${xy.xlug}`}><p className="text-lg hover:text-gray-500 overflow-hidden text-ellipsis leading-8 my-3" style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}> {replaceHTMLTags(xy.excerpt)} </p></Link>
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
 