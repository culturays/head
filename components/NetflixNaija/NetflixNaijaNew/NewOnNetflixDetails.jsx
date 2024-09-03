 
import PeoplePage from '@/app/news/(other)/people/page';
import { faClock, faNewspaper, faUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faAsterisk, faAward, faBook, faClapperboard, faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';   
//New release with top 10 movies and series on netflix naija
 

const NewOnNetflixDetails = ({what_to_watch, full_list_new, get_popular_series, get_popular_non_eng, get_popular_series_non_eng,get_popular, news_details, netflix_news, netflix_10, netflix_10_series }) => { 
  const replaceHHTMLTags=(string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "")
    const newString = string.replace(regex, "");
    return newString 
     }
     function eliminateSimilarPops(arr1, arr2, arr3) { 
 
      return arr1
        ?.filter(item => !arr2.includes(item.title))
        ?.filter(item => !arr3.slice(0,10).includes(item.title))
        ?.concat(arr2.filter(item => !arr1.includes(item.title))) 
        ?.concat(arr3.slice(0,10).filter(item => !arr1.includes(item.title)));
    }
     
    
    function eliminateSimilarSer(arr1, arr2, arr3) { 
     
      return arr1
        ?.filter(item => !arr2.includes(item.title))
        ?.filter(item => !arr3.slice(0,10).includes(item.title))
        ?.concat(arr2.filter(item => !arr1.includes(item.title))) 
        ?.concat(arr3.slice(0,10).filter(item => !arr1.includes(item.title)));
    } 
 const itempub =new Date(news_details?.date)  
const news_netflix= netflix_news?.map((xy)=> xy.netflixNaija.nodes).flat()  
const netflix_related = news_details.netflixNewsGroup.netflixRelated.nodes
const {netflixEmbeds} = news_details.netflixNewsGroup 
// //const {embedText}=news_details.netflixNewsGroup
  const {intro}=news_details.netflixNewsGroup
  const srcMatch = netflixEmbeds.match(/src="([^"]+)"/);
  const src = srcMatch ? srcMatch[1] : ''; 

const result_pop = eliminateSimilarPops(get_popular_non_eng, get_popular,netflix_10 );  
const result_series = eliminateSimilarSer( get_popular_series_non_eng, get_popular_series,netflix_10_series );
const full_list = full_list_new.map((xy)=> xy.node.netflixNaija.nodes).flat() 
const to_watch = what_to_watch.map((xy)=> xy.node.netflixNaija.nodes).flat() 
 
return (
  <div className='bg-gray-50'> 
 <div className='flex bg-white md:w-11/12 xl:w-3/4 md:m-auto mx-2 px-4 md:px-8'>
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
  
  <div className="px-5 md:px-8">  
 <div className=""> 
<p className='text-lg py-2' style={{lineHeight:'32px'}}>{replaceHHTMLTags(news_details.excerpt)} </p>
<hr className='bg-black h-1 my-2'/> 
<div className='w-4/5 m-auto'> 
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
 
  <div className='col-span-3 py-5'>
 {full_list.map((xy)=> 
  <div key={xy.title} className='text-center '>
 <h2 className='text-3xl bg-culturaysBg py-14 text-white border-b'>{ xy.title.toUpperCase()}</h2>

 {xy.content.split('.').map((line, index) => (
  <ul key={index} className='mx-8'> 
 <li className='text-lg py-2 list-disc' >{replaceHHTMLTags(line)} </li>
</ul>
 ))}

  </div>
  )}
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
  
 <div className='col-span-3 row-span-2 py-4 border-b border-b-4 my-8 border-black rounded-lg mx-2'> 
    <h3 className='text-center text-2xl md:text-4xl py-4 border-b text-gray-500'>This Week on Netflix Naija</h3>
    <h2 className='text-xl font-bold bg-gray-500 p-4 w-max text-center text-gray-50 my-4'>Top Ranking Series</h2>  
  <div className='md:my-8 lg:my-11 w-full grid grid-cols-2 md:grid-cols-3 [&>*:nth-child(even)]:bg-gray-50'>  
 {result_series.filter(ex=> ex.title !== undefined).map((xy, i)=> 
 <div key={xy.title+ ' ' + i} className='flex border py-4 h-auto' >  
   <p className='p-1 md:text-xl text-lg italic font-bold'> {i+1} </p>
  <h3 className='md:text-xl text-lg p-3'> {xy.title} </h3>

  </div>
 )}   
 </div> 
 
  </div> 
  <div className="col-span-3 bg-gray-100 rounded m-1 ">
<h2 className='text-center text-2xl lg:text-4xl py-4 border-b border-b-4 mx-1 border-black my-4 font-bold '> What to Watch on Netflix Naija Now</h2>
 {to_watch.map((xy,i)=> 
  <div className='mx-3' key={xy.title + ' ' +i}> 
<div className='flex flex-col flex-col-reverse sm:flex-row items-start gap-2'>
 <Image 
className='py-4 mx-2 w-11/12 sm:w-1/2'
src={xy?.featuredImage?.node.sourceUrl}
width={1200}
height={675}
alt={xy?.featuredImage?.node.altText}
/>  
 
<div className='p-2 sm:w-1/2'>
  <div className='text-gray-700 font-light text-lg md:flex'> 
    <div className='flex my-3'>
      <FontAwesomeIcon icon={faUser} width={14} />
  <p className='mx-2 '>{xy.author.node.name} </p>
  </div>
  <div className='flex my-3'>
  <FontAwesomeIcon icon={faClock} width={14}/>
  <p className='mx-2'>{new Date(xy.date).toDateString()} </p>
  </div>
  
  </div>

  <div className=''> 
 <h2 className='text-4xl font-medium py-2 w-full'>{xy.title}</h2> 
<p className='w-56 flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-lg font-thin'> {replaceHHTMLTags(xy.netflixNewsGroup.intro)} </p> 
</div>

</div>  
</div>  

<hr className='bg-white h-1'/> 
 <div className='mt-8 px-8'> 
{xy.content.split('\n').map((ex, i)=>
<p className='text-lg py-0.5' key={ex + ' ' + i}> {replaceHHTMLTags(ex)} </p>
 )} 
 
 </div>  
</div>  
 )}
 
 <div className='my-4 mx-2'>
 <hr className='bg-black h-1'/>
  <h3 className='text-center text-gray-600 text-3xl py-4'> More on What's New on Netflix Naija</h3> 
  <div className='lg:grid grid-cols-2 gap-1'>
{news_netflix.map((xy, i)=>   
<div className='flex gap-1 max-w-lg' key={xy.title + ' ' + i}> 
  <div className='py-4 mx-2 w-1/4'>

<Image
src={xy?.featuredImage?.node.sourceUrl}
width={1200}
height={675}
alt={xy?.featuredImage?.node.altText}
/> 
</div>
  <div className='p-2 text-gray-700 font-light text-lg'> 
    <div className='flex my-3'>
      <FontAwesomeIcon icon={faUser} width={14}/>
  <p className='mx-2'>{xy.author.node.name}</p>
  </div>
  <div className='flex my-3'>
  <FontAwesomeIcon icon={faClock} width={14}/>
  <p className='mx-2'>{new Date(xy.date).toDateString()}</p>
  </div>
  
 <h2 className='text-xl font-bold py-2 '>{xy.title} gfhffd fgfdfs nfgdf</h2> 
  </div>  
</div>
)}

</div>  

</div>
  </div> 
  <div className='col-span-3 row-span-2 py-4 border-b border-b-4 my-8 border-black rounded-lg mx-2'> 
    <h3 className='text-center text-2xl md:text-4xl py-4 border-b text-gray-500'>This Week on Netflix Naija</h3>
    <h2 className='text-xl font-bold bg-gray-500 p-4 w-max text-center text-gray-50 my-4'>Top Ranking Movies</h2>  
  <div className='md:my-8 lg:my-11 w-full grid grid-cols-2 md:grid-cols-3 [&>*:nth-child(even)]:bg-gray-50'>  
  {result_pop.filter(ex=> ex.title !== undefined).map((xy, i)=> 
 <div key={xy.title+ ' ' + i} className='flex border py-4 h-auto' >  
   <p className='p-1 md:text-xl text-lg italic font-bold'> {i+1} </p>
  <h3 className='md:text-xl text-lg p-3'> {xy.title} </h3>

  </div>
 )} 
 </div> 
 
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
 
export default NewOnNetflixDetails