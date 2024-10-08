"use client"
import moment from "moment";
import Image from "next/image"
import ShareButtons from "../ShareButtons";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";  
import SlidingSide from "../SlidingSide";

const NaijaWikiNetflixNewsDetails =({content_videos,news_details}) => {
  const videoRef = useRef(null);
  const replaceHTMLTags=(string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "") 
    const newString = string.replace(regex, "");
    return newString
     }
     const related_content=news_details.netflixNewsGroup.netflixNewsRelated  
     const [duration, setDuration] = useState(0);
 
     useEffect(() => {
      const updateTime = () => {
        setCurrentTime(videoRef.current.currentTime);
      };
  
      const updateDuration = () => {
      setDuration(videoRef.current.duration);
      };
    
      videoRef?.current?.addEventListener('timeupdate', updateTime);
      videoRef?.current?.addEventListener('loadedmetadata', updateDuration);
  
      return () => {
        videoRef.current?.removeEventListener('timeupdate', updateTime);
        videoRef.current?.removeEventListener('loadedmetadata', updateDuration);
      };
    }, []);
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secondsRemaining = Math.floor(seconds % 60);
      
      // Pad seconds with leading zero if necessary
      const formattedSeconds = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;  
      return `${minutes}:${formattedSeconds}`;
  }
 
  return (
    <div> 
         <div className="xs:flex justify-between items-center"> 
   <h2 className="text-gray-600 text-4xl font-bold py-2 px-6"> Videos </h2> <hr className="h-0.5 bg-gray-700 w-full"/>
      </div>
 <SlidingSide newsItems={content_videos} speed={60000}/> 
       <div className="bg-gray-50 px-2 m-auto py-8  max-w-7xl">    
      <div className="bg-white my-2 py-10 rounded-lg mx-4 xs:mx-8 sm:m-auto sm:w-4/5">
       <h2 className="font-medium py-4 px-8 text-3xl md:text-5xl text-gray-800 w-4/5 leading-9">{news_details.title} </h2>
       <p className="p-4 italic text-red-500 text-gray-200">{moment(news_details.date).fromNow() } </p> 
       <Link href={`/creator/${news_details?.node.author.node.slug}`}><p className="p-4 text-end text-lg bg-gray-700 text-gray-200 mx-4 xs:mx-20 bg-opacity-70"><small className="italic p-3"> by</small>{ news_details.author.node.name } </p></Link>
       <div className="relative -mx-5 sm:-mx-8"> 
       <Image src={news_details.featuredImage.node.sourceUrl}
       width={1200} 
       height={675} 
       alt={news_details.featuredImage.node.altText}
/>  
 </div>
 <div className="pb-2 [&_.share-view]:bg-white [&_.share-view]:max-w-max [&_.share-view]:justify-between [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:mx-2">
 <ShareButtons  
 item={news_details} 
 activeIdx={news_details.id}
    shareOptions={true}
    />
    <p className="text-base p-5 border-b bg-gray-700 bg-opacity-70 text-gray-200 italic my-2">Photo/{replaceHTMLTags(news_details.featuredImage.node.caption)} </p>
     </div>
 <p className="p-4 mt-10 text-lg">{replaceHTMLTags(news_details.excerpt)} </p> 
  </div> 
 
  <hr className="h-14 bg-orange-800 w-2 m-auto border border-dotted"/>

  <div className="bg-white my-1 py-10 mx-6 xs:mx-10 sm:m-auto sm:w-3/4">
  {news_details.content.split('\n').map((line, index) => (
  <React.Fragment key={index}>
    {/* <p className="px-8 py-1 text-lg leading-8">{replaceHTMLTags(line)} </p> 
    */}
    <div dangerouslySetInnerHTML={{__html:line}} className="px-8 py-1 text-lg leading-8 [&_p>a]:hover:bg-gray-800 [&_p>a]:text-green-600 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-3xl [&_h3]:font-bold"/>
    {index===2&&  
    <div className="border py-4 mx-1 bg-gray-50"> 
      <h2 className="shadow-2xl bg-red-500 text-gray-200 px-2 py-1 mx-4 text-lg w-max font-bold">New on the Topic</h2>
     <div className="sm:flex w-11/12 m-auto">     
  {related_content?.nodes.slice(0,2).map((ex)=>   
  <div key={ex.title + ' ' + Math.random()} className="bg-black py-4 first:border-b first:sm:border-b-0 first:sm:border-r px-3"> 
  <div className="flex"> 
  <div className=" px-1 w-2/3">
  <h2 className="text-gray-300">{ex.title} </h2>
  </div>  
<div className=" px-1 w-2/3"> 
 <Image 
src={ex.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={ex.featuredImage.node.altText}
/>  
 </div> 

  </div>
   <Link href={`/netflix-naija/news/${ex.slug}`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
   </div> 
  )}  
    
  </div>
    </div> }  
  
   </React.Fragment>
  ) )}
<div className="flex flex-wrap mx-8">
  {news_details.contentTags.nodes.map((xy)=> 
<p key={xy.name +  ' ' + Math.random()} className="shadow-sm text-base font-bold text-green-600 py-7 px-3 mx-2">{xy.name}</p>  
)} 
</div>
  </div>
    </div>   
  
    </div>
  )
}

export default NaijaWikiNetflixNewsDetails
