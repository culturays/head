
import Link from "next/link"
import moment from "moment/moment"
import Image from "next/image"  
import Paginate from "../Paginate"
import SideBar from "../../app/side/Side"
const Nollywood = ({nollywood_news}) => {
//     netItems.map((ets)=> {
//         ets.categories.nodes.map((et)=> {       
//             if(et.name === 'Coming to Netflix Naija'){
// itemLen.push(ets)    
//             } 
//         }        
//          ) 
//     })
 const replaceHTMLTags=(string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "")
  const newString = string.replace(regex, "");
  return newString
   }
   
  return (
 <div className=''>  
<div className="bg-black"> 
<div className='m-auto py-11 px-8' style={{maxWidth:'1420px'}}> 
<div className="">
<h2 className="py-6 px-2 bg-yellow-500 rounded w-max text-2xl text-white font-bold border" >Nigerian Movies on Netflix</h2>
<p className="text-xl py-4 text-white" >Get a quick overview of the new movies, TV shows/series and documentaries coming to Netflix Naija everyday.</p>
</div>


 <section className='xl:flex relative m-auto justify-center max-w-5xl xl:max-w-max'> 
  <div className='border'> 
  {nollywood_news?.slice(0,1).map((nt)=>(
  <div key={nt.slug} className='home_grid_alt'>
    <Image
    style={{maxHeight:'650px'}}
        width={1200}
        height={675}    
       src={nt.featuredImage.node.sourceUrl}     
       alt={nt.featuredImage.node.altText || nt.title}
      /> 
      <div className='absolute z-20 top-0 sm:top-28 xs:mx-8 py-5 font-bold text-white mx-2 w-1/2'>   
    <Link href={`/news/nollywood/${nt.slug}`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}  className='overflow-hidden text-ellipsis text-xl xs:text-3xl md:text-4xl md:py-2'> {nt.title}</h2></Link>
    <Link href={`/news/nollywood/${nt.slug}`}><p className='overflow-hidden text-ellipsis xs:text-lg text-sm xs:block leading-6 w-3/4'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} >{replaceHTMLTags(nt.excerpt)}</p ></Link> 
    <span className='text-end text-sm mt-11 italic py-2'>{moment(nt.date).fromNow()} </span>
    </div>
    </div> 
       )    
) }</div> 

<div className='xl:max-w-xs xs:flex xl:flex-col border overflow-hidden overflow-x-auto sm:overflow-x-hidden'>
  {nollywood_news?.slice(1,4).map((nt)=>(
  <div key={nt.slug} className='home_grid_alt2 border-b lg:border-b-0 lg:text-white lg:relative my-1 '>
       <Image  
        width={1200}  
        height={675}    
       src={nt.featuredImage.node.sourceUrl}     
       alt={nt.featuredImage.node.altText || nt.title}
      /> 
    
    <div className='relative text-white '>   
    <Link href={`/news/nollywood/${nt.slug}`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className='absolute  xs:bottom-0 overflow-hidden z-20 text-ellipsis mx-2 sm:w-56 lg:w-64 text-lg bottom-10'>{nt.title}</h2></Link>
    <Link href={`/topic/${nt.contentTags.nodes[0]?.slug}/${nt?.contentTags?.nodes[0]?.id}`}><p className='absolute z-20 bottom-24 xs:bottom-14 text-sm mx-2 xs:text-xs'><span>{moment(nt.date).fromNow()} |</span> {nt.contentTags.nodes[0]?.name}</p ></Link> 
    </div> 
    </div> 
       )    
) }
    </div> 
  
</section>
</div> 
  
</div> 
<div className="md:flex justify-between max-w-max"> 
<Paginate content={nollywood_news?.slice(4)}/>
<SideBar/>
 </div>  
 </div>
 )
}

export default Nollywood