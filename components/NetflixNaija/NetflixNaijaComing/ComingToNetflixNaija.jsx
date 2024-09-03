"use client"

import Link from "next/link"
import moment from "moment/moment"
import Image from "next/image"  
import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAward, faClapperboard, faFilm } from "@fortawesome/free-solid-svg-icons"
import PeoplePage from "@/app/news/(other)/people/page"
const ComingToNetflixNaija = ({coming_to_netflix_naija}) => { 
   const [slug]=coming_to_netflix_naija 
  const [posts, setPosts]=useState([])
  const [loading, setLoading]=useState(false)
  const [currPg, setCurrPg]=useState(1)
  const [postPerPage, setPostPerP]=useState(2)  
  const netflixNaija=coming_to_netflix_naija.map((xy)=> xy.node.netflixNaija.edges).flat()
  const netflix_related_items = netflixNaija.map((ex)=> ex.node.netflixNewsGroup?.netflixRelated).flat()
  const netflix_related =netflix_related_items.map((xy)=> xy?.nodes).flat()
  
  function decrement() {
   setCurrPg(currPg - 1); 
 } 
 function increment() {
   setCurrPg(currPg + 1); 
 }
 
 useEffect(()=>{
   const fetchPs= async()=>{ 
     setPosts([...netflixNaija]) 
   }
   fetchPs()
 },[coming_to_netflix_naija]) 

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
  // const regex = /(<([^>]+)>)/gi;
  // //(/<\/?[^>]+(>|$)/g, "")
  // const newString = string.replace(regex, "");
  // return newString
   }
 
  return (
 <div className='bg-gray-50'>  
<div className="bg-black"> 
<div className='w-10/12 m-auto py-11'> 
<div className=" text-center">
<h2 className="py-6 px-2 w-max text-2xl text-white font-bold" >Nigerian Movies on Netflix</h2>
<hr className='my-2 h-2'/>
<p className="text-xl py-4 text-white" >Get a quick overview of the new movies, TV shows/series and documentaries coming to Netflix Naija everyday.</p>
</div>
  <section className='xl:flex relative m-1 md:w-11/12 m-auto '> 
  <div className='border xl:w-10/12 border-b-8 border-double border-b-orange-900'> 
  {netflixNaija.slice(0,1).map((nt)=>(
  <div key={nt.node.slug} className='home_grid_alt'>
    
  <Image 
        width={1200}
        height={675}    
       src={nt.node.featuredImage.node.sourceUrl}     
       alt={nt.node.featuredImage.node.altText || nt.node.title}
      /> 
      
      <div className='absolute z-20 bottom-24 xs:bottom-40 sm:bottom-48 md:bottom-56 xs:mx-8 py-8 font-bold text-white m-2 w-3/4'>   
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}`}><h2 className='text-xl xs:text-3xl md:text-4xl md:py-2'> {nt.node.title}</h2></Link>
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}`}><p className='xs:text-lg text-sm py-2 xs:block'>{replaceHTMLTags(nt.excerpt)}</p ></Link> 
    <span className='text-end text-sm mt-11 italic'>{moment(nt.node.date).fromNow()} </span>
    </div>
    </div> 
       )    
) }</div>  

<div className='xl:w-1/4 flex xl:flex-col border relative overflow-hidden overflow-x-auto sm:overflow-x-hidden '>
  {netflixNaija.slice(1,4).map((nt)=>(
  <div key={nt.node.slug} className='home_grid_alt border lg:border-b-0 lg:text-white lg:relative'>
       <Image  
        width={1200}  
        height={675}    
       src={nt.node.featuredImage.node.sourceUrl}     
       alt={nt.node.featuredImage.node.altText || nt.node.title}
      />
   <div className='absolute text-white bottom-5 xl:bottom-20 p-4 z-20'>   
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}`}><h2 className='text-xl'>{nt.node.title}</h2></Link>
    <Link href={`/tag/${nt.node.netflixTags.nodes[0]?.slug}`}><p className='text-sm '><span>{moment(nt.node.date).fromNow()} |</span> {nt.node.netflixTags.nodes[0]?.name}</p ></Link> 
    </div>  
    </div> 
       ) 
) }
    </div> 
  
</section> 
</div> 
  
</div> 
  <section className="bg-white flex xl:px-8 lg:w-11/12 xl:w-4/5 m-auto py-2">
   <div className="border-b-2 border-b-black border-r-4 border-r-gray-400 px-5 md:w-4/5 lg:w-3/4 rounded-b-4 h-fit">
   {currentPosts.map((itx,index)=> 
   <div key={index} className="border-b flex py-2" > 
  <div className="w-1/2"> 
 <Image  
        width={1200}
        height={675}
       src={itx.node?.featuredImage?.node?.sourceUrl}
       alt={itx.node?.title}
       /> 
           </div>  
           <div className="w-full m-1 sm:m-4">
           <p className="italic text-red-600 text-right">{moment(itx.node.date).fromNow()}</p> 
            <Link href={`/netflix-naija/${slug.slug}/${itx.node.slug}`}><h2 className="text-2xl py-2 font-bold">{itx.node.title}</h2></Link>
         <Link href={`/netflix-naija/${slug.node.slug}/${itx.node.slug}`}><p className="text-lg py-4 " style={{lineHeight:'35px'}} >{replaceHTMLTags(itx.node.excerpt)} </p></Link>  
       <div >
       <div> {itx.node.netflixTags.nodes.map((tx ,index)=> 
    <p key={index} className="text-xl"> {tx.name }</p> )  } 
       </div> 
       </div> 
     
        </div>  
   </div>)}

   <div> 
  <div className="text-right flex justify-end items-end" >
  {currPg === 1 ? 
  '':<button onClick={decrement} className="text-xl rounded p-4 cursor-pointer font-bold bg-gray-600 text-white my-4">
        <span>&#x226A;</span> Previous Page 
      </button> }
     <div  > {currPg === postPerPage ?'': <button onClick={increment}className="text-xl rounded text-white p-4 cursor-pointer font-bold bg-gray-600">
       Next Page  <span>&#x226B;</span> 
        </button> }</div>
      </div>
      </div> 
   </div>

   <div className='h-screen mx-1 rounded-t lg:hidden absolute -right-36 md:bg-transparent md:relative hover:right-0 md:right-0 md:w-auto cursor-pointer '>  
 
 <div className='py-5 text-gray-200 flex flex-col justify-center w-full cursor-pointer   bg-gray-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
 <FontAwesomeIcon icon={faClapperboard}className='text-xl'/>
 <Link href='/netflix-naija/new-on-netflix-naija'><p className='p-2 font-bold text-center'>On Netflix Naija</p></Link> 
 </div>
 <div className='py-5 text-gray-200 flex flex-col justify-center w-full cursor-pointer   bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
 <FontAwesomeIcon icon={faFilm} className='text-xl p-2'/>
 <Link href='/netflix-naija/coming-to-netflix-naija'><p className='p-2 font-bold text-center'>Coming Soon</p></Link>  
 </div> 
 <div className='py-5 text-gray-200 flex flex-col justify-center w-full cursor-pointer   bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
 <FontAwesomeIcon icon={faAward} className='text-2xl p-2'/>
 <Link href='/awards'><p className='p-2 font-bold text-center'>Awards</p></Link>  
 </div> 
 </div> 
  
  <div className='hidden lg:block mx-1 w-1/3 border-l'>   
 <ul className=''>
   <div className="cursor-pointer text-lg py-8 shadow-2xl mx-1 border border-4 border-orange-400 font-bold text-gray-600 flex items-center justify-around"> 
   <Link href='/netflix-naija/coming-to-netflix-naija'><li>Coming to Netflix Naija</li></Link>
  <FontAwesomeIcon icon={faAngleRight}/>
  </div> 
  
  <div className="cursor-pointer text-lg py-8 shadow-2xl border border-4 border-orange-400 border-t-0 mx-1 font-bold text-gray-600 flex items-center justify-around"> 
  <Link href='/netflix-naija/new-on-netflix'><li >New on Netflix </li></Link>
   <FontAwesomeIcon icon={faAngleRight}/> 
    </div>
 
 </ul>  
   <PeoplePage/>   
   <hr /> 
 <div >
 
     <h2 className='text-3xl text-center font-bold py-4 border-b my-4'>News</h2>
     <div className='[&>*:nth-child(odd)]:bg-gray-500 [&>*:nth-child(even)]:bg-blue-800 [&>*:nth-child(odd)]:text-gray-200 [&>*:nth-child(even)]:text-gray-200 w-11/12'> 
 {netflix_related.filter((xe)=> xe !== undefined).slice(0,10).map((xy,i)=>
 <div className='flex m-2 p-4' key={xy.title + ' ' + i}> 
  <h2 className='text-lg mr-6 w-3/4'>{xy.title} </h2> 
  {xy?.featuredImage?
  <div className="w-full"> 
  <Image
  className='border ml-8'
 src={xy?.featuredImage?.node.sourceUrl}
 width={1200}
 height={675}
 alt={xy?.featuredImage?.node.altText}
 /> </div> :
  <div className="w-full">
    <Image 
  className='border'
 src={'/assets/images/placeholderimg.png'} 
 width={1200}
 height={675}
 alt='Image AltText'
 />
 </div>}
  
 </div>
 )} 
 
 </div>
 
 </div> 
    </div> 
    </section>  
   <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginating={paginating} />
 </div> 
 )
}

export default ComingToNetflixNaija