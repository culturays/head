import React from 'react' 
import Image from 'next/image'; 
import Link from 'next/link'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"  
import PeoplePage from '@/app/news/(other)/people/page';
import { faAngleRight, faAward, faClapperboard, faFilm } from '@fortawesome/free-solid-svg-icons';
  
 //for titles on wp - subheading may or may not have bg
 //What's Coming to Netflix Naija in August - [ can have most anticiated, or no subheading]
 //what's coming in the week - [ can have most anticiated, or no sbheading ]
 //what's coming in the weekend - [ can have most anticiated, or no sbheading]
 //returning titles coming in month, year -[english, non-english]
 //first look-[will list movies/series by each month of realease,  subheading may   have bg] 
 //every movies /series coming  -[will list mosies/serie by each month of realease,  subheading may have bg] 
 //coming to netflix naija in the holidays
 //most anticipted upcoming 
 //category coming in the year, month, week -subheadings [new & returnsing, category existing on netflix for the year, category coming in the year, month, week inside detail ]
 //sequels coming

const ToNetflixDetails = ({ netflix_news, news_details }) => { 

  const replaceHHTMLTags=(string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "")
    const newString = string.replace(regex, "");
    return newString 
     } 
const itempub =new Date(news_details?.date)  
const news_netflix= netflix_news?.map((xy)=> xy.netflixNaija.edges).flat()  
const netflix_related=news_details.netflixNewsGroup.netflixRelated.nodes
 const {netflixEmbeds} = news_details.netflixNewsGroup 
 //const {embedText}=new_on_details.netflixNewsGroup
 const {intro}=news_details.netflixNewsGroup 
  const srcMatch = netflixEmbeds?.match(/src="([^"]+)"/);
  const src = srcMatch ? srcMatch[1] : '';   
 
return (
  <div className=' bg-gray-50'> 
 <div className='flex bg-white md:w-11/12 xl:w-3/4 md:m-auto mx-2 px-8'>
  <div className='border-r border-r-4 w-11/12 lg:w-2/3 xl:w-3/4'>

    <div className="px-2">
    <div className='flex flex-col justify-center items-center m-6'> 
    <p className='p-4 text-gray-700 font-bold text-center text-xl border-t'> Movies and Series on Netflix Naija </p>
 </div>
    <hr className='bg-gray-300 h-0.5 mx-2 mt-4'/> 
  <div className='bg-culturaysBg p-4 my-2'> 
   <h2 className='text-3xl my-4 font-bold text-white'>{news_details.title}</h2> 
   <Link href='/creator'><p className='py-2 text-blue-400'><span className='text-white italic pr-2 text-xs'>by </span>{news_details.author.node.name}</p></Link>  
  <p className='text-white text-xs italic'>Published on {itempub.toDateString()}</p>
 </div> 
  </div> 
  
  <div className="w-11/12 px-11">  
 <div className=""> 
<p className='text-lg py-2' style={{lineHeight:'32px'}}>{replaceHHTMLTags(news_details.excerpt)} </p>
 
<hr className='bg-black h-1 my-2'/> 
<div className='px-11'> 
<Image 
 src={news_details.featuredImage.node.sourceUrl}
 width={1200}
  height={675}
 alt={news_details.title}
 />
 </div>
  <p className='text-lg py-2' style={{lineHeight:'32px'}}>{replaceHHTMLTags(intro)} </p>  
 <hr className='bg-black h-1 my-2'/> 
  </div>  
  
  <div className="col-span-3 row-span-3" >
  {news_details.content.split('\n').map((xy, index)=> 
  <div key={xy+ ' ' + index}> 
 <p className='text-lg py-2' style={{lineHeight:'35px'}}>{replaceHHTMLTags(xy)}</p> 
{index=== 1 &&  
 <iframe className='md:w-4/5 w-11/12 m-auto h-72 lg:h-96'
 title={xy}
 width={1200}
 height={675}
 src={src}
 frameBorder="0"
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
 referrerPolicy="strict-origin-when-cross-origin"
 allowFullScreen
></iframe>
 }
</div> 
)}  
 
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
 {netflix_related.slice(0,10).map((xy,i)=>
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
  
</div>
</div>)
}
 
export default ToNetflixDetails