import React from 'react' 
import Image from 'next/image'; 
import Link from 'next/link';  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAward, faClapperboard, faFilm } from '@fortawesome/free-solid-svg-icons';
import ShareButtons from '@/components/ShareButtons';
import moment from 'moment';
import { faClock, faNewspaper, faUser } from '@fortawesome/free-regular-svg-icons';
const ToNetflixDetails = ({coming_to_netflix_naija,  netflix_related, netflix_news, coming_to_netflix_details }) => { 
   const replaceHHTMLTags=(string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "")
    const newString = string?.replace(regex, "");
    return newString 
     }  
     const replaceHTMLTags=(string)=>{
      ///(<([^>]+)>)/gi;
      const regex = (/<\/?[^>]+(>|$)/g, "") 
      const newString = string.replace(regex, "");
      return newString 
       }
const itempub =new Date(coming_to_netflix_details.date)   
 const {netflixEmbeds} = coming_to_netflix_details.netflixNewsGroup 
 const news_posts_netflix=netflix_news.map((tx)=> tx.node.netflixNaijaPosts.nodes).flat()
 const next_posts=coming_to_netflix_naija.map((tx)=> tx.node.netflixNaijaPosts.edges).flat()
//   //const {embedText}=new_on_details.netflixNewsGroup
 const {intro}=coming_to_netflix_details.netflixNewsGroup 
const srcMatch = netflixEmbeds?.match(/src="([^"]+)"/);
 const src = srcMatch ? srcMatch[1] : '';   
 const slug=coming_to_netflix_details.netflixCategories.nodes[0].slug
 
return (
  <div className=' bg-gray-50'> 
 <div className='flex bg-white m-auto justify-center m-auto' style={{maxWidth:'1450px'}}>
  <div className='border-r border-r-4 lg:max-w-2xl md-lg:max-w-3xl xl:max-w-5xl'> 
  <div className="px-2">
    <div className='flex flex-col justify-center items-center m-6'> 
    <p className='p-4 text-gray-700 font-bold text-center text-xl border-t border-t-black'> Movies and Series on Netflix Naija </p>  
 </div>
    <hr className=' h-0.5 mx-2 mt-4 bg-black'/> 
    <div className='flex justify-between'> 
    <div className="[&_.share-view]:bg-white [&_.share-view]:relative [&_.share-view]:max-w-max [&_.share-view]:shadow-none [&_.share-view]:border-0 [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:px-3 [&_.shadow-sharebtn]:py-3">
  <ShareButtons 
 item={coming_to_netflix_details} 
 activeIdx={coming_to_netflix_details.id}
  shareOptions={true}
    /> 
     </div>
     <p className='text-sm italic py-1'>Published on {itempub.toDateString()}</p>
     </div> 
  <div className='px-4 my-2 border-b text-gray-700'> 
  <h2 className='text-4xl my-2 font-bold leading-10'>{coming_to_netflix_details.title}</h2> 
  <div className='flex py-2'>
  <span className='text-gray-700 italic text-sm px-2'>by </span><Image  
  className='rounded-full'
 src={coming_to_netflix_details.author.node.avatar.url}
 width={50}
  height={50}
 alt={coming_to_netflix_details.author.node.name}
 /> 
   <Link href={`/creator/${coming_to_netflix_details.author.node.slug}`}><p className='p-2 text-blue-400 hover:text-gray-700'>{coming_to_netflix_details.author.node.name}</p></Link> </div>
 
 </div> 
 
  </div> 

 <div className="md:max-w-5xl px-6 md:m-auto mx-3"> 
 <div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.excerpt}}className='text-lg py-2 leading-10'/>  
<hr className='bg-black h-1 my-2'/> 
<div className='relative px-5'> 
  <Image 
 src={coming_to_netflix_details.featuredImage.node.sourceUrl}
 width={1200}
  height={675}
 alt={coming_to_netflix_details.title}
 />  
  <div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.featuredImage.node.caption}} className="absolute bottom-0 left-8 p-6 leading-8 shadow-xl font-mono"/> 
 </div>
 <div dangerouslySetInnerHTML={{__html:intro}} className='text-lg py-2 leading-10'/> 
 <div className='my-4'> 
 <h2 className='font-bold text-3xl py-6 text-center bg-gray-700 border-b text-gray-200'>Most Anticipated Titles</h2>
<div className='xl:flex my-4'> 
<div className='max-w-xl m-auto my-3 py-3 leading-9 [&_li]:list-disc border-t-8 border-green-500 bg-gray-100'>
<h2 className='font-bold text-2xl py-3 text-center'>Netflix African</h2> 
  <div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.netflixNewsGroup.mostAnticpatedAfrican}} className='px-8 border-t xl:px-2'/>  
  </div>
  <div className='max-w-xl m-auto my-3 py-3 leading-9 [&_li]:list-disc border-t-8 border-orange-500 bg-gray-100'>
  <h2 className='font-bold text-2xl py-3 text-center'>Netflix Non-African</h2> 
 
  <div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.netflixNewsGroup.mostAnticpatedForeign}} className=' px-8 border-t xl:px-2'/> 
  </div> 
  <div className='max-w-xl m-auto my-3 py-3 leading-9 [&_li]:list-disc border-t-8 border-blue-700 bg-gray-100'>
  <h2 className='font-bold text-2xl py-3 text-center'>Netflix Nollywood</h2>  
  <div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.netflixNewsGroup.mostAnticpatedNollywood}} className='px-8 border-t xl:px-2'/> 
  
  </div>  
</div> 
 </div>
 <hr className='bg-black h-1 my-2'/>  
  <div className="" >
 <div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.content}} className="[&_p]:py-2 [&_p]:my-3 [&_li]:my-6 [&_iframe]:w-3/4 [&_iframe]:m-auto [&_iframe]:my-4 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-center [&_figure>figcaption]:text-sm text-xl leading-9 [&>figure]:px-8 [&>h3]:text-4xl [&>h3]:my-4 [&>h3]:font-bold [&>h2]:text-4xl [&>h5]:font-bold [&>h5]:text-xl [&>h2]:font-bold [&>h4]:text-xl [&>h4]:font-bold [&_p>a]:hover:bg-green-900 [&_p>a]:text-green-600 py-0.5 [&>h5]:py-6 [&>h4]:py-6 [&>h2]:py-6 [&>h3]:py-6 [&>h2]:border-2 [&>h3]:border-2 [&>h3]:bg-blue-900 [&>h3]:bg-opacity-90 [&>h3]:text-gray-300 [&>h3]:px-4 [&>h2]:border [&>h3]:border-2 [&>h3]:bg-blue-900 [&>h3]:bg-opacity-90 [&>h3]:text-gray-300 [&>h3]:px-4 [&>h3]:w-max [&>h2]:w-max [&>h4]:border-2 [&_blockquote]:py-11 [&_blockquote]:text-xl [&_blockquote]:border-l-8 [&_blockquote]:border-blue-400 [&_blockquote]:max-w-xl [&_blockquote]:m-auto [&_blockquote]:leading-9 [&_blockquote]:bg-black [&_blockquote]:text-gray-200 [&_blockquote]:my-6 [&_blockquote]:bg-opacity-80 [&_blockquote]:px-5 [&_img]:m-auto [&_strong]:text-2xl"/>

 <div className='my-4 px-2'>
 <hr className='bg-black h-1'/>
<h3 className='text-center text-gray-600 text-3xl py-4 px-1'>More on the Topic</h3>
   <div className='xl:flex gap-1'>
 {netflix_related?.slice(0,2).map((xy, i)=>   
<div className='xs:flex gap-1 border-b my-2 justify-center items-center' key={xy.node.title + ' ' + i}> 
  <div className='py-4 px-2'> 
  <Image
  className='my-2 xs:max-w-44 m-auto'
src={xy?.node.featuredImage?.node.sourceUrl}
width={1200}
height={675}
alt={xy?.node.featuredImage?.node.altText}
/>   
</div>

  <div className='px-2 py-4 text-gray-700 font-light text-lg flex flex-col xs:max-w-xs flex-col-reverse'> 
  <Link href={`/netflix-naija/coming-to-netflix/${xy.node.slug}`}><h2 className='text-xl font-bold overflow-hidden text-ellipsis'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2></Link> 
  <div className='flex my-3'>
      <FontAwesomeIcon icon={faUser} width={14}/>
      <Link href={`/creator/${xy?.node.author.node.slug}`}><p className='mx-2'>{xy.node.author.node.name}</p></Link>
  </div>  
 
  <div className='flex my-3'> 
  <FontAwesomeIcon icon={faClock} width={14}/>
  <p className='mx-2 w-full'>{new Date(xy.node.date).toDateString()}</p>
  </div>  
 
  </div>  
</div>
)}
 
</div>  

</div> 
  
 </div>  

  </div>
 
   </div> 

   <div className='h-max mx-1 rounded-t lg:hidden absolute -right-28 -mr-2 md:bg-transparent md:relative hover:right-0 md:right-0 md:w-auto cursor-pointer '>   
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-gray-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
 <FontAwesomeIcon icon={faClapperboard}className='text-xl'/>
 <Link href='/netflix-naija/new-on-netflix'><p className='p-3 font-bold text-center'>On Netflix Naija</p></Link> 
 </div>
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
 <FontAwesomeIcon icon={faFilm} className='text-xl p-2'/>
 <Link href='/netflix-naija/coming-to-netflix'><p className='p-3 font-bold text-center'>Coming to Netflix Naija</p></Link>  
 </div> 
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
 <FontAwesomeIcon icon={faNewspaper} className='text-2xl p-2'/>
 <Link href='/netflix-naija/news'><p className='p-3 font-bold text-center'>Netflix News</p></Link>  
 </div> 
 </div> 


  <div className='hidden lg:block mx-1 py-4 max-w-sm'>  
   <div className="cursor-pointer text-base py-6 shadow max-w-sm border px-3 font-bold text-gray-600 flex items-center justify-between my-1"> 
   <Link href='/netflix-naija/new-on-netflix'><li className='hover:text-gray-400 list-none'>New on Netflix Naija</li></Link>
  <FontAwesomeIcon icon={faAngleRight}/>
  </div> 
    <div className="cursor-pointer text-sm py-6 shadow max-w-sm border px-3 font-bold text-gray-600 flex items-center justify-between my-1"> 
    <Link href='/netflix-naija/coming-to-netflix'><li className='hover:text-gray-400 list-none'>Coming to Netflix Naija</li></Link>
  <FontAwesomeIcon icon={faAngleRight}/>
  </div> 

   <div className='mx-1 max-w-xs'>   
     <h2 className='text-3xl text-center font-bold py-4 border-b my-4'>News</h2>
     <div className='[&>*:nth-child(odd)]:border-l-4 [&>*:nth-child(odd)]:border-l-black  [&>*:nth-child(even)]:border-l-4 [&>*:nth-child(even)]:border-l-orange-500 my-2'> 
 {news_posts_netflix.slice(0,10).map((xy,i)=>
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
 <div className='px-2  font-bold flex items-center justify-between my-1'>
 <Link href={`/netflix-naija/news/${xy.slug}`}><h2 className='text-base hover:text-gray-400 text-gray-600'>{xy.title} </h2></Link>
  </div> 
 </div> 
 )}</div>
 
 </div>  
 
    </div>  
 
</div>
 <hr className='bg-black h-1 my-2'/> 

 <div className='bg-white px-3'> 
  <div className='max-w-7xl m-auto'>
   <h2 className='text-2xl text-gray-700 font-bold py-4'>Next</h2>
     </div>
    <div className="max-w-7xl m-auto overflow-auto pt-4 px-1 hidden-scroll" >
  <div className='flex' style={{width:'1000px'}}> 
   {next_posts.slice(0,3).map((xy,i)=> 
    <div className='border pt-5 px-3 w-96' key={i + ' ' + Math.random()}>   
    <Link href={`/topic/${xy.node.contentTags.nodes[0].slug}`}></Link> <h3 className='text-red-500 text-sm italic'>{xy.node.contentTags.nodes[0].name} </h3>
    <Link href={`/netflix-naija/new-on-netflix/${xy.node.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-base font-bold overflow-hidden text-ellipsis hover:text-gray-500 cursor-pointer"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2></Link>            
      <div className='py-2 text-sm'> 
        <p className='text-gray-600'>{moment(xy.node.date).fromNow()}</p> 
        <Link href={`/creator/${xy.node.author.node.slug}`}>
          <p className='py-2 text-gray-800 font-medium'>{xy.node.author.node.name}</p>
        </Link> 
      </div>   
     
    </div>
   )} 
    </div>  
    </div>  
  </div> 
  
</div>)
}
 
export default ToNetflixDetails