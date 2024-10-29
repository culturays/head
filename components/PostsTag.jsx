"use client"

import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
const PostsTags = ({post_tag_response}) => { 
const posts_tags= post_tag_response.nodes.map((xy)=>xy?.posts.nodes).flat()
const businesses=  posts_tags.map((xy)=>xy?.categories.nodes).flat().filter((ex)=>ex.slug==='business')[0]?.slug

 return (
  <div className="search_all" > 
  <div className="m-auto bg-white sm:px-4 xl:px-28 px-2 "style={{maxWidth:'1550px'}}> 
    <h2 className="py-3 font-bold text-3xl font-bold">{ post_tag_response.nodes[0]?.name}</h2>
  <div className="sm:flex justify-center py-6 " >
   <div>
 {posts_tags.filter((tx) => 
  tx.categories.nodes.some((category) => category.parent === null)).slice(0,1)?.map((ex, index)=>
 <div key={ex.id + Math.random()}className="max-w-4xl"> 
 <div className="shadow-sm my-3">
 
  <div> 
  <Image
  src={ex?.featuredImage?.node.sourceUrl}
  width={1200}
  height={675}
  alt={ex?.featuredImage?.node.altText}
  />
{ex.categories.nodes.filter((tx)=> tx.parent===null).map((tx)=><div key={tx.slug}><Link href={`/news/${tx.slug}/${ex.slug }`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center h-9 capitalize">{tx.name }</p></Link></div> )}
  </div>
 
  <div className="flex flex-col justify-between py-4 mx-3" >
  {ex.categories.nodes.filter((tx)=> tx.parent===null).map((tx)=><div key={tx.slug}><Link href={`/news/${tx.slug}/${ex.slug }`}><h3 className="search-title leading-9 hover:opacity-50 text-3xl font-bold cursor-pointer font-medium underline">{ex.title }</h3></Link> </div> )}    
 
   <div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.postsTags?.nodes.slice(0,5)?.map((ex, i)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
</p>}</Link>  

)}
</div> 
</div>
   
 </div> 
   
 </div>
 ) }  
 
   </div>
   
   {/* <div className="max-w-xl"> 
 {tagged_reses.slice(1,4)?.map((ex, index)=> 
   ex.contentTypeName ==='video'?
 <div key={ex.id + Math.random()} className="shadow-sm my-1 xs:my-0 py-2"> 
 <div className="px-2">
   <div className="flex">        
  <div > 
   
  <Image
  className="max-w-28 sm:max-w-32 md:max-w-44 "
  src={ex.featuredImage.node.sourceUrl}
  width={1200}
  height={675}
  alt={ex.featuredImage.node.altText}
  />
   <Link href={`/news/video/${ex.slug }`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center h-9 capitalize">{ex.contentTypeName}</p></Link>
  </div> 
   
     <div className="mx-2" >
      <div className="flex justify-between gap-5">
       <Link href={`/news/${ex.contentTypeName}/${ex.slug }`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline max-w-96">{ex.title }</h3></Link> 
 <button> 
       <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-300 text-2xl cursor-pointer"><FontAwesomeIcon icon={faPlay}/></span></Link>  
           </button> </div> 
    <div className="flex py-2 text-sm"> 
       <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex, i)=> 
 <Link href={`/topic/${ex.slug}/${ex.id}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
 </p>}</Link>
 
 )}
  </div> 
 
 </div> 
 </div>   
  
  </div>
 
 </div>:
 <div key={ex.id + Math.random()} className="shadow-sm my-1 xs:my-0 py-2"> 
 <div className="px-2">
   <div className="flex">        
  <div> 
  <Image
 className="max-w-28 sm:max-w-32 md:max-w-44"
  src={ex.featuredImage.node.sourceUrl}
  width={1200}
  height={675}
  alt={ex.featuredImage.node.altText}
  />
 <Link href={`/news/${ex.contentTypeName }/${ex.slug }`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center h-9 capitalize">{ex.contentTypeName }</p></Link>
  </div> 
   
     <div className="mx-2 " >
     <Link href={ `/news/${ex.contentTypeName }/${ex.slug }`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title }</h3></Link> 
  
    <div className="flex py-2 text-sm "> 
       <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex, i)=> 
 <Link href={`/topic/${ex.slug}/${ex.id}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50  ">#{ex.name }  
 </p>}</Link>  
 
 )}
 </div> 
 </div> 
 </div>   
  
  </div>
 
 </div>
 ) }  
 </div> */}
 
 </div> 
 
 
  
   
 
 
 
 
 
 </div>
 
  
 </div> 
 
 )
}

export default PostsTags