import { faClock, faNewspaper, faUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faAsterisk, faAward, faBook, faClapperboard, faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link'; 
import * as cheerio from 'cheerio'; 
import moment from 'moment';
import ShareButtons from '@/components/ShareButtons';
 
const NewOnNetflixDetails = ({ what_to_watch, full_list_new, get_popular_series, get_popular_non_eng, get_popular_series_non_eng, get_popular, new_on_details, netflix_news, netflix_10, netflix_10_series, new_on_netflix_naija, netflix_related }) => { 
   
  const replaceHHTMLTags=(string)=>{ 
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "")
    const newString = string?.replace(regex, "");  
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
const itempub =new Date(new_on_details?.date)    
// const {netflixEmbeds} = new_on_details?.netflixNewsGroup?.netflixNewRelated  
// // // //const {embedText}=news_details.netflixNewsGroup
  const {intro}=new_on_details.netflixNewsGroup
// const srcMatch = netflixEmbeds?.match(/src="([^"]+)"/);
// const src = srcMatch ? srcMatch[1] : '';  
const result_pop = eliminateSimilarPops(get_popular_non_eng, get_popular,netflix_10 );  
const result_series = eliminateSimilarSer( get_popular_series_non_eng, get_popular_series,netflix_10_series );
const full_list = full_list_new.map((xy)=> xy.node.netflixNaijaPosts.nodes).flat() 
const to_watch = what_to_watch.map((xy)=> xy.node.netflixNaijaPosts.nodes).flat() 
const next_posts=new_on_netflix_naija.map((tx)=> tx.node.netflixNaijaPosts.edges).flat()
 
const news_posts_netflix=netflix_news.map((tx)=> tx.node.netflixNaijaPosts.nodes).flat()
const $ = cheerio.load({data:new_on_details.content})
let data_texts= ''
let data_link= []
let data_imgs= []
const h2t_index=[]
const h3r_index=[]
const link_texts=[]

    $('img', new_on_details.content).each(async function(){
      const img = $(this).attr('src') 
      data_imgs.push(img)
      })
      $('p', new_on_details.content).each(async function(){
        const text = $(this).text()
        data_texts+=text
        })
  
        new_on_details.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
          const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
          tags?.map((xy)=>{
          if(xy?.includes('h2')){
            h2t_index.push(index )
         } 
        })});
        new_on_details.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
          const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
          tags?.map((xy)=>{
          if(xy?.includes('h3')){
            h2t_index.push(index )
         } 
        })}); 
        new_on_details.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
          const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
          tags?.map((xy)=>{
          if(xy?.includes('h4')){ 
            h2t_index.push(index )
         } 
        })}); 
    const category_slug=new_on_details.netflixCategories.nodes[0].slug
 
return (
  <div className='bg-gray-50'> 
  <div className='flex bg-white justify-center m-auto' style={{maxWidth:'1450px'}}> 
  <div className='border-r border-r-4 lg:px-6 lg:max-w-2xl md-lg:max-w-3xl xl:max-w-5xl'>
    <div className="px-2">
    <div className='flex flex-col justify-center items-center m-6'> 
    <p className='p-4 text-gray-700 font-bold text-center text-xl border-t border-t-black'> Movies and Series on Netflix Naija </p>
 </div> 
    <hr className=' h-0.5 mx-2 mt-4 bg-black'/> 
    <div className='flex justify-between'> 
    <div className="[&_.share-view]:bg-white [&_.share-view]:relative [&_.share-view]:max-w-max [&_.share-view]:shadow-none  [&_.share-view]:border-0 [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:px-3 [&_.shadow-sharebtn]:py-3">
  <ShareButtons 
 item={new_on_details} 
 activeIdx={new_on_details.id}
  shareOptions={true}
    /> 
     </div>
     <p className='text-sm italic py-1'>Published on {itempub.toDateString()}</p>
     </div>
    <div className='px-4 my-2 border-b text-gray-700'> 
  <h2 className='text-4xl my-2 font-bold leading-10'>{new_on_details.title}</h2> 
  <div className='flex py-2'>
  <span className='text-gray-700 italic text-sm px-2'>by </span><Image 
  className='rounded-full'
 src={new_on_details.author.node.avatar.url}
 width={50}
  height={50}
 alt={new_on_details.author.node.name}
 /> 
   <Link href={`/creator/${new_on_details.author.node.slug}`}><p className='p-2 text-blue-400 hover:text-gray-700'>{new_on_details.author.node.name}</p></Link> </div>

 </div> 
  </div>  
   
  <div className="md:max-w-4xl px-6 md:m-auto mx-3"> 
  <div dangerouslySetInnerHTML={{__html:new_on_details.excerpt}}className='text-lg py-2 leading-10'/> 
<hr className='bg-black h-1 my-2'/> 
  <div className='relative px-5'> 
  <Image 
 src={new_on_details.featuredImage.node.sourceUrl}
 width={1200}
  height={675}
 alt={new_on_details.title}
 /> 
  <div dangerouslySetInnerHTML={{__html:new_on_details.featuredImage.node.caption}} className="absolute bottom-20 left-8 p-6 leading-8 shadow-xl font-mono"/>
 </div> 

   <div dangerouslySetInnerHTML={{__html:intro}} className='text-lg py-2 leading-10'/> 
  <hr className='bg-black h-1 my-2'/>  
  <div className='py-5'>
 {full_list.length> 0 &&full_list.map((xy)=> 
  <div key={xy.title} className='text-center '>
 <h2 className='text-3xl bg-culturaysBg py-14 text-white border-b leading-9 px-4'>{ xy.title.toUpperCase()}</h2>

 {xy.content.split('.').map((line, index) => (
  <ul key={index} className='mx-4'>
 <li className='text-lg py-2 list-disc' >{replaceHHTMLTags(line)} </li>
</ul>
 ))}
<hr className='bg-black h-1 my-2'/> 
  </div>
  )}

  </div>   

  <div className="[&_iframe]:w-1/2" > 
  {new_on_details.content.split('\n').map((xy, index)=> 
  <div key={xy+ ' ' + index} className=' '> 
  <div dangerouslySetInnerHTML={{__html:xy}} className="[&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm text-lg leading-9 [&>figure]:px-8 [&>h3]:text-3xl [&>h3]:font-bold [&>h2]:text-3xl [&>h5]:font-bold [&>h5]:text-xl [&>h2]:font-bold [&>h4]:text-3xl [&>h4]:font-bold [&_p>a]:hover:bg-gray-900 [&_p>a]:text-gray-600 py-0.5 [&>h5]:py-8 [&>h4]:py-8 [&>h2]:py-8 [&>h3]:py-8 [&>h2]:bg-gray-700 [&>h3]:bg-gray-700 [&>h4]:bg-gray-700 [&>h2]:text-gray-200 [&>h3]:text-gray-200 [&>h4]:text-gray-200 [&>h2]:px-3 [&>h3]:px-3 [&>h4]:px-3"/> 
   
  {index === 3&&
   <div key={xy+ ' ' + index} className='py-4 border-b border-b-4 my-8 border-black rounded-lg'>  
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
  
  }
{index === 6&&
<div className="bg-gray-100 rounded m-1 "key={xy+ ' ' + index}>
<h2 className='text-center text-2xl lg:text-4xl py-4 border-b border-b-4 mx-1 border-black my-4 font-bold'> What to Watch on Netflix Naija Now</h2>
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
      <Link href={`/creator/${xy?.author.node.slug}`}><p className='mx-2 '>{xy.author.node.name} </p></Link>
  </div>
  <div className='flex my-3'>
  <FontAwesomeIcon icon={faClock} width={14}/>
  <p className='mx-2'>{new Date(xy.date).toDateString()} </p>
  </div>
  
  </div>

  <div className=''> 
 <h2 className='text-4xl font-medium py-2 w-full'>{xy.title}</h2> 
<p className='flex-grow overflow-hidden text-ellipsis text-lg font-thin'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}> {replaceHHTMLTags(xy.netflixNewsGroup.intro)} </p> 
</div>

</div>  
</div>  

<hr className='bg-white h-1'/> 
 <div className='mt-8 px-3'> 
{xy.content.split('\n').map((ex, i)=>
<p className='text-lg py-0.5' key={ex + ' ' + i}> {replaceHHTMLTags(ex)} </p>
 )} 
 
 </div>  
</div>
 )}
 
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
     <h2 className='text-xl font-bold overflow-hidden text-ellipsis'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2> <div className='flex my-3'>
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
}

</div> 
)} 
  
 </div>  

    <div className='py-4 border-b border-b-4 my-8 border-black rounded-lg mx-2'> 
    <h3 className='text-center text-2xl md:text-4xl py-4 border-b text-gray-500'>This Week on Netflix Naija</h3>  
     <h2 className='text-xl font-bold bg-gray-500 py-4 px-1 w-max text-center text-gray-50 my-4'>Top Ranking Movies</h2>  
   <div className='md:my-8 lg:my-11 w-full grid grid-cols-2 md:grid-cols-3 [&>*:nth-child(even)]:bg-gray-50'>  
  {result_pop.filter(ex=> ex.title !== undefined).map((xy, i)=> 
 <div key={xy.title+ ' ' + i} className='flex border py-4 h-auto' >  
   <p className='p-1 md:text-xl text-lg italic font-bold'> {i+1} </p>
  <h3 className='md:text-xl text-lg py-3 px-2'> {xy.title} </h3>

  </div>
 )}   
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
 
export default NewOnNetflixDetails