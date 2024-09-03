"use client"
import Image from 'next/image'
import moment from 'moment'
import React, { useState, useEffect } from "react" 
import Link from 'next/link'  
import VideoPlayer from './NaijaWiki/VideoPlayer'
import Pagination from '../Pagination'

const VideoPage = ({content_videos}) => {
 
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
      setPosts([...content_videos])
      
    }
    fetchPs()
  },[content_videos])
  
   
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
   <div> 
   <section >
    <div> 
<h2 >Videos from Nollywood</h2>
<p >Explore Inteviews of your favorite Nollywood personalities.</p>

</div> 

{currPg>1?'': 
  <div className='md:grid grid-cols-2'> 
  <div > 
      { content_videos.map(( itx,index )=>
      index===0&&
 <div key={index} >  
   <VideoPlayer 
 videoSrc={itx.videos.videoUrl.node.mediaItemUrl}
 posterSrc={itx.featuredImage.node.sourceUrl}
  />  
     <div>
      <Link href={`/videos/video/${itx.slug}`}><h2>{itx.title}</h2></Link> 
</div> 
     </div> 
          
      )}</div>
      <div className='flex md:flex-col'> 
      { content_videos.slice(1,4).map(( itx,index )=>
       
 <div key={index} >  
   <VideoPlayer 
 videoSrc={itx.videos.videoUrl.node.mediaItemUrl}
 posterSrc={itx.featuredImage.node.sourceUrl}
  />  
     <div>
      <Link href={`/videos/video/${itx.slug}`}><h2>{itx.title}</h2></Link> 
  </div> 
     </div> 
          
      )}</div>
</div>
 
    }
   </section>
   
   <section >
   <div >
   {currentPosts.map((itx,index)=> 
   <div key={index} > 
  {/* <VideoPlayer 
 videoSrc={itx.videos.videoUrl.mediaItemUrl}
 posterSrc={itx.featuredImage.node.sourceUrl}
  /> */}
           <div >
           <Link href={`/videos/video/${itx.slug}`}><h2>{itx.title}</h2></Link>
           <div > <Link href={`/videos/video/${itx.slug}`}><p >{replaceHTMLTags(itx.excerpt)} </p></Link> </div>  
      <span>{moment(itx.date).fromNow()}</span> 
        </div> 

   </div>)}
   <div > 
  <div  >
  {currPg === 1 ? 
  '':<button onClick={decrement}>
   	 <span>&#x226A;</span> Previous Page 
      </button> } </div> 
     <div> {currPg === postPerPage ?'': <button onClick={increment}>
       Next Page <span>&#x226B;</span> 
        </button>   }</div>
      </div>
     
   </div>
 
    </section>
 
   <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginating={paginating} />
  </div>    
 
  
  )
}

export default VideoPage