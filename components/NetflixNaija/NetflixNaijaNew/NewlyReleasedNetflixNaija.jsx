"use client"

import Link from "next/link"
import moment from "moment/moment"
import Image from "next/image"  
import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import { faAngleRight, faAward, faClapperboard, faFilm } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PeoplePage from "@/app/news/(other)/people/page"
const NewlyRealeasedNetflixNaija = ({
  made_in_africa, 
  non_africa, 
  new_on_netflix_naija,  
  added_on_netflix_naija,

}) => { 
  const added_items = added_on_netflix_naija.map((ex)=> ex.node.netflixNaija.edges
 ).flat()
 const [slug]=new_on_netflix_naija 
  const [posts, setPosts]=useState([])  
  const [loading, setLoading]=useState(false)
  const [currPg, setCurrPg]=useState(1)
  const [postPerPage, setPostPerP]=useState(2)  
  const [title_view, setTitleView]=useState([]) 
 const netflixNaija=new_on_netflix_naija.map((xy)=> xy.node.netflixNaija.edges).flat()
 const africa_made = made_in_africa.map((ex)=> ex.netflixNaija.edges).flat()
 const non_africa_made = non_africa.map((ex)=> ex.netflixNaija.edges).flat() 
 const netflix_related_items = netflixNaija.map((ex)=> ex.node.netflixNewsGroup.netflixRelated).flat()
const netflix_related =netflix_related_items.map((xy)=> xy?.nodes).flat()
  function decrement() {
   setCurrPg(currPg - 1); 
 }
 function increment() {
   setCurrPg(currPg + 1); 
 }
 
 const changeView =(e)=>{ 
  if(e.target.value=== 'made-in-Africa'){
    setTitleView([...africa_made])
  }else if(e.target.value=== 'non-african'){
    setTitleView([...non_africa_made])
  }else{
    setTitleView([...added_items]);
  }
 
 } 
 useEffect(() => {
  setTitleView([...added_items]);
}, []);

 const idxLastPs= currPg * postPerPage
 const idxFsPage = idxLastPs - postPerPage
 const currentPosts = title_view.slice(idxFsPage, idxLastPs)  
   
 const paginating=(pageNumber)=>{  
 setCurrPg(pageNumber) 
 }
 
 const replaceHTMLTags=(string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "")
  const newString = string.replace(regex, "");
  return newString
   }
 
  return (
 <div className='bg-gray-50'>
   <div>
<div className="bg-black"> 
<div className='md:w-10/12 m-auto py-11'> 
<div className="">
<h2 className="py-6 px-2 w-max text-2xl text-white font-bold" >Nigerian Movies on Netflix</h2>
<hr className='my-2 h-2'/>
<p className="text-xl py-4 text-white" >Get a quick overview of the new movies, TV shows/series and documentaries on Netflix Naija.</p>
</div>
 <section className='xl:flex relative m-1'> 
 <div className='border border-b-8 border-double border-b-orange-900 xl:w-9/12'> 
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
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}`}><p className='xs:text-lg text-sm py-2 xs:block w-4/5'>{replaceHTMLTags(nt.node.excerpt)}</p ></Link> 
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
     
    <div className='absolute text-white bottom-5 xl:bottom-20 px-2 z-20'>   
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}`}><h2 className='text-xl'>{nt.node.title}</h2></Link>
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.netflixTags.nodes[0]?.slug}`}><p className='text-sm '><span>{moment(nt.node.date).fromNow()} |</span> {nt.node.netflixTags.nodes[0]?.name}</p ></Link>  
    </div> 
    </div> 
       )    
) }
    </div>  
  
</section>
</div> 
 
</div>
 
<section className="bg-white flex sm:p-5 xl:px-8 lg:w-11/12 xl:w-4/5 m-auto rounded-b-4 p-5"> 
  <div className="border-b-2 border-b-black border-r-4 border-r-gray-400 w-11/12 h-fit"> 
<div className="max-w-sm">
  <form className="flex my-4"> 
<label htmlFor="library" className="block font-medium text-gray-900 text-xl w-full">Choose a Library:</label>
  <select id="" onChange={(e)=>changeView(e)} className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-none ">  
    <option value="Choose Library to View"className="p-4">All Libraries:</option>
    <option value="non-african"className="p-4">Non African</option>
    <option value="made-in-Africa"className="p-4">Made in Africa</option> 
  </select> 
    </form>
 </div>  
<div className="mx-4 bg-gray-200 p-4 border-r-4 border-l-4 border-blue-700 text-gray-700 text-lg"> 
  <p className="font-bold">Netflix Naija Titles Available Now</p>
    
  </div>
  <div> 
   
  {currentPosts.map((itx,index)=>
<div key={index} className="lg:w-full xl:w-11/12 xl:px-8"> 
  <div className="my-8 sm:mx-8 border-t-4"> 
<h2 className='text-3xl my-4'>{itx.node.title}</h2>
<div className="flex bg-yellow-700 border-2 relative "> 
  <div className="shadow-xl h-max w-1/2 xs:min-w-min">
 <Image 
 src={itx.node.featuredImage.node.sourceUrl}
 width={1200}
 height={675}
 alt={itx.node.title} 
 />
  </div> 
  <div className="xs:my-8 text-white w-1/2 xs:relative absolute left-0 right-0 mx-2 top-2 px-4 bg-gray-700 bg-opacity-70 cursor-pointer hover:z-20 hover:bg-opacity-90 h-full max-w-max"> 
  <h2 className="text-2xl my-2 py-2"> {itx.node.netflixNewsGroup.filmTitle}</h2>
 <ul className="p-6" >
  <li className="list-disc text-lg m-2">
  Genre:{itx.node.netflixNewsGroup.genre} </li> 
  <li className="list-disc text-lg m-2">
  Director:{itx.node.netflixNewsGroup.director} </li> 
  <li className="list-disc text-lg m-2">
  Cast:{itx.node.netflixNewsGroup.cast} </li> 
 </ul>
 </div>
  </div>
 </div>
<div className="md:flex relative bottom-20 xs:bottom-44 sm:px-16 px-3 m-auto md:px-0">  
  <p className="text-lg bg-white p-4 my-2 xl:w-2/5 " style={{lineHeight:'30px'}}>{replaceHTMLTags(itx.node.content)} </p>   
  <div dangerouslySetInnerHTML={{__html: itx.node.netflixNewsGroup.netflixEmbeds}}className='my-4 sm:my-20 sm:mx-2 '></div>
 
</div>
</div>)} 
 </div>

<div> 
  <div className="text-right flex justify-end items-end">
  {currPg === 1 ? 
  '':<button onClick={decrement} className="text-xl rounded p-4 cursor-pointer font-bold bg-gray-600 text-white my-4">
        <span>&#x226A;</span> Previous Page 
      </button> }
     <div > {currPg === postPerPage ?'': <button onClick={increment}className="text-xl rounded-sm p-4 cursor-pointer font-bold bg-gray-600 text-white rounded text-white">
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
 <Link href='/netflix-naija/coming-netflix-naija'><p className='p-2 font-bold text-center'>Coming Soon</p></Link>  
 </div> 
 <div className='py-5 text-gray-200 flex flex-col justify-center w-full cursor-pointer   bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
 <FontAwesomeIcon icon={faAward} className='text-2xl p-2'/>
 <Link href='/awards'><p className='p-2 font-bold text-center'>Awards</p></Link>  
 </div> 
 </div> 
  
  <div className='hidden lg:block mx-1 w-1/3'>   
 <ul className=''>
   <div className="cursor-pointer text-lg py-8 shadow-2xl mx-1 border border-4 border-orange-400 font-bold text-gray-600 flex items-center justify-around"> 
   <Link href='/netflix-naija/coming-netflix-naija'><li>Coming to Netflix Naija</li></Link>
  <FontAwesomeIcon icon={faAngleRight}/>
  </div> 
  
  <div className="cursor-pointer text-lg py-8 shadow-2xl border border-4 border-orange-400 border-t-0 mx-1 font-bold text-gray-600 flex items-center justify-around"> 
  <Link href='/netflix-naija/new-on-netflix'><li >New on Netflix </li></Link>
   <FontAwesomeIcon icon={faAngleRight}/> 
    </div>
 
 </ul>  
   <PeoplePage/>   
   <hr /> 
 <div>
 
     <h2 className='text-3xl text-center font-bold py-4 border-b my-4'>News</h2>
     <div className='[&>*:nth-child(odd)]:bg-gray-500 [&>*:nth-child(even)]:bg-blue-800 [&>*:nth-child(odd)]:text-gray-200 [&>*:nth-child(even)]:text-gray-200 w-4/5'> 
 {netflix_related.filter((xe)=> xe !== undefined).slice(0,10).map((xy,i)=>
 <div className='flex m-2 p-4 w-3/4' key={xy.title + ' ' + i}> 
  <h2 className='text-lg mr-6 w-full'>{xy.title} </h2> 
  {xy?.featuredImage?
  
  <Image
  className='border ml-4'
 src={xy?.featuredImage?.node.sourceUrl}
 width={1200}
 height={675}
 alt={xy?.featuredImage?.node.altText}
 /> : <Image 
  className='border'
 src={'/assets/images/placeholderimg.png'} 
 width={1200}
 height={675}
 alt='Image AltText'
 />}
  
 </div>
 )}</div>
 
 </div> 
    </div> 
 </section>
   <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginating={paginating} />


   </div> 

 </div> )
}

export default NewlyRealeasedNetflixNaija