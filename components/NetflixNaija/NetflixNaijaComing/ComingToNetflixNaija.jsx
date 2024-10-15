import Link from "next/link"
import moment from "moment/moment"
import Image from "next/image"    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAward, faClapperboard, faFilm } from "@fortawesome/free-solid-svg-icons" 
import SideBar from "@/components/Side"
import Paginate from "../Paginate"

const ComingToNetflixNaija = ({coming_to_netflix_grouped, netflix_news_data,coming_to_netflix_naija}) => { 
   const [slug]=coming_to_netflix_naija    
  const netflixNaija=coming_to_netflix_naija.map((xy)=> xy.node.netflixNaijaPosts.edges).flat()
  const news_items = netflix_news_data.map((ex)=> ex.node.netflixNaijaPosts?.nodes
 ).flat() 
 
 const replaceHTMLTags=(string)=>{
  // const regex = /(<([^>]+)>)/gi;
  // //(/<\/?[^>]+(>|$)/g, "")
  // const newString = string.replace(regex, "");
  // return newString
   }
 console.log(coming_to_netflix_grouped)  
  return (
 <div className='bg-gray-50'>  
<div className="bg-black"> 
<div className='m-auto py-11 px-4 max-w-max lg:max-w-7xl' > 
<div className=" text-center">
<h2 className="py-6 px-2 w-max text-2xl text-white font-bold" >Nigerian Movies on Netflix</h2>
<hr className='my-2 h-2'/>
<p className="text-xl py-4 text-white" >Get a quick overview of the new movies, TV shows/series and documentaries coming to Netflix Naija everyday.</p>
</div>

  <section className='lg:flex relative '> 
  <div className='border-r'> 
  {coming_to_netflix_grouped.slice(0,1).map((nt)=>(
  <div key={nt.node.slug} className='home_grid_alt_vid'> 
  <div className=' '> 
  <Image  
        width={1200}
        height={675}    
       src={nt.node.featuredImage.node.sourceUrl}     
       alt={nt.node.featuredImage.node.altText}
      />  
      </div>  
      <div className='absolute z-20 top-0 sm:top-28 xs:mx-8 py-5 font-bold text-white mx-2 lg:w-1/2'>   
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}`}><h2 className='text-xl xs:text-3xl md:text-4xl md:py-2 hover:text-gray-500 '> {nt.node.title}</h2></Link>
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}`}><p className='xs:text-lg text-sm py-2 xs:block hover:text-gray-500'>{replaceHTMLTags(nt.node.excerpt)}</p ></Link> 
    <span className='text-end text-sm mt-11 italic'>{moment(nt.node.date).fromNow()} </span>
    </div>
    </div> 
       )
) }</div>  
<div className='relative overflow-hidden overflow-x-auto sm:overflow-x-hidden h-max max-w-max lg:max-w-sm'>
  <div className='home_grid_alt_vid xs:flex lg:block'>
  {coming_to_netflix_grouped.slice(1,4).map((nt)=>(
  <div key={nt.node.slug} className='lg:text-white [&:nth-child(3)]:lg:mt-3 [&:nth-child(2)]:lg:mt-3'>
 <div className="lg:max-w-96">  
 <Image 
 className="object-cover xs:h-32 sm:h-44 md:h-48 lg:h-auto"
 src={nt.node.featuredImage.node.sourceUrl }
 width={1200}
 height={675}
 alt={nt.node.featuredImage.node.altText}
  />  
  </div>
  <div className='relative h-max text-white'>
        <div className='absolute bottom-8 xs:bottom-1 z-10'>
        <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className='hover:text-gray-500 overflow-hidden text-ellipsis mx-2 sm:w-56 lg:w-64 text-lg xs:text-base sm:text-lg lg:text-xl'>{nt.node.title}</h2></Link>
    <Link href={`/topic/${nt.node.contentTags.nodes[0]?.slug}/${nt.node?.contentTags?.nodes[0]?.id}`}><p className='text-sm mx-2 xs:text-xs sm:text-sm hover:text-gray-500 py-2'><span>{moment(nt.node.date).fromNow()} |</span> {nt.node.contentTags.nodes[0]?.name}</p ></Link> 

      </div> 
      
    </div>
    </div>  
       )    
) } </div>
    </div> 
 
  
</section> 
 
</div> 
  
</div>  
 
<div className="md:flex justify-between max-w-max bg-white m-auto"> 
<Paginate content={coming_to_netflix_grouped.slice(4)}/>
<div> 
 
<div className='h-max mx-1 rounded-t lg:hidden absolute -right-36 md:bg-transparent md:relative hover:right-0 md:right-0 md:w-auto cursor-pointer z-50'>  

<div className='py-5 text-gray-200 flex flex-col justify-center w-full cursor-pointer bg-gray-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
<FontAwesomeIcon icon={faClapperboard}className='text-xl'/>
<Link href='/netflix-naija/new-on-netflix'><p className='p-2 font-bold text-center'>On Netflix Naija</p></Link> 
</div> 
<div className='py-5 text-gray-200 flex flex-col justify-center w-full cursor-pointer   bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
<FontAwesomeIcon icon={faFilm} className='text-xl p-2'/>
<Link href='/netflix-naija/news'><p className='p-2 font-bold text-center'>Netflix News</p></Link>  
</div> 
 
</div> 

<div className='hidden lg:block mx-1 py-4 max-w-sm'> 
 <div className="cursor-pointer text-sm py-6 shadow max-w-sm border px-3 font-bold text-gray-600 flex items-center justify-between my-1"> 
 <Link href='/netflix-naija/new-on-netflix'><li className='hover:text-gray-400 list-none'>New on Netflix Naija</li></Link>
<FontAwesomeIcon icon={faAngleRight}/>
</div> 

<div className='mx-1 max-w-sm'>   
  <h2 className='text-3xl text-center font-bold py-4 border-b my-4'>News</h2>
  <div className='[&>*:nth-child(odd)]:border-l-4 [&>*:nth-child(odd)]:border-l-black [&>*:nth-child(even)]:border-l-4 [&>*:nth-child(even)]:border-l-orange-500 my-2'> 
{news_items.slice(0,10).map((xy,i)=>
<div key={xy.title + ' ' + i} className='shadow flex my-2 justify-between py-6 px-2'>
<div>
<Image
className='border max-w-28 object-cover'
src={xy?.featuredImage?.node.sourceUrl}
width={200}
height={205}
alt={xy?.featuredImage?.node.altText}
/> 

</div>
<div className='px-2 font-bold flex items-center justify-between my-1'>
<Link href={`/netflix-naija/news/${xy.slug}`}><h2 className='text-base hover:text-gray-400 text-gray-600'>{xy.title} </h2></Link>
</div> 
</div> 
)}</div>

</div>  

 </div>

  <SideBar/>
</div>

 </div> 
 </div> 
 )
}

export default ComingToNetflixNaija