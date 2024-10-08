"use client"
//to be deleted after fixing the news component
import Image from "next/image"
import Link from "next/link"
import moment from "moment"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

const Main = ({newsData}) => { 
  const [activeIndices, setActiveIndices] = useState([0, 1]);
 const news1 = newsData.map((x1)=> x1.node.newsArticlesCategories )[0].nodes[0]?.newsArticles.nodes 
 const news1_name = newsData.map((x1)=> x1.node.newsArticlesCategories )[0]?.nodes[0]?.name

 const news2 =  newsData.map((x1)=> x1.node.newsArticlesCategories )[1]?.nodes[0]?.newsArticles.nodes 
const news2_name = newsData.map((x1)=> x1.node.newsArticlesCategories )[1]?.nodes[0]?.name

const news3 =  newsData.map((x1)=> x1.node.newsArticlesCategories )[2].nodes[0]?.newsArticles.nodes 
const news3_name = newsData.map((x1)=> x1.node.newsArticlesCategories )[2].nodes[0]?.name

const news4 =  newsData.map((x1)=> x1.node.newsArticlesCategories )[3]?.nodes[0]?.newsArticles.nodes 
const news4_name = newsData.map((x1)=> x1.node.newsArticlesCategories )[3]?.nodes[0]?.name
 
 const news5 =  newsData.map((x1)=> x1.node.newsArticlesCategories )[4]?.nodes[0]?.newsArticles.nodes 
 const news5_name = newsData.map((x1)=> x1.node.newsArticlesCategories )[4]?.nodes[0]?.name
 
 const news6 =  newsData.map((x1)=> x1.node.newsArticlesCategories )[5]?.nodes[0]?.newsArticles.nodes 
 const news6_name = newsData.map((x1)=> x1.node.newsArticlesCategories )[5]?.nodes[0]?.name
 
 const news7 =  newsData.map((x1)=> x1.node.newsArticlesCategories )[6]?.nodes[0]?.newsArticles.nodes 
 const news7_name = newsData.map((x1)=> x1.node.newsArticlesCategories )[6]?.nodes[0]?.name 
 

 const news8 =  newsData.map((x1)=> x1.node.newsArticlesCategories )[7]?.nodes[0]?.newsArticles.nodes 
 const news8_name = newsData.map((x1)=> x1.node.newsArticlesCategories )[7]?.nodes[0]?.name 
    const left_slide = () => {
      setActiveIndices(([left, right]) => {
        const newLeft = left - 1 < 0 ? newsData.length - 1 : left - 1;
        const newRight = right - 1 < 0 ? newsData.length - 1 : right - 1;
        return [newLeft, newRight];
      });
    };
      
    const right_slide = () => {
      setActiveIndices(([left, right]) => {
        const newLeft = (left + 1) % newsData.length;
        const newRight = (right + 1) % newsData.length;
        return [newLeft, newRight];
      });
    };
 
  return (
    <div className="bg-gray-50"> 
   <h2 className='text-xl text-gray-700 font-bold py-4'>{news1_name}</h2> 
         <div className='bg-white mx-2 px-2 lg:mx-8 flex flex-wrap xl:flex-nowrap justify-center'style={{maxWidth:'1500px',margin:'0 auto'}} > 
 <div className="max-w-5xl m-auto xl:max-w-7xl">
 <div className='xl:border-r sm:flex-row flex-col flex rounded-xl my-4 max-w-4xl xl:max-w-6xl m-auto h-max py-11 md:px-8 lg:px-4 xl:px-0 sm:px-0'>
  {news1.slice(0,1).map((xy,i)=>  
<div className='max-w-xl m-auto sm:m-0 px-8 xs:px-11 sm:px-3 sm:max-w-xs md:max-w-md lg:max-w-2xl' key={xy.title}>
  <div className="max-w-xs m-auto sm:max-w-sm">
<Image
className='rounded-xl'
  width={1200} 
  height={675}    
  src={xy.featuredImage?.node.sourceUrl}     
  alt={xy?.featuredImage?.node.altText } 
      />    
   <Link href={`/article/${xy.slug}`}><h2 className='text-2xl font-bold py-3 text-gray-800 hover:text-gray-700'>{xy.title} </h2></Link> 
  <div className='flex text-gray-600 px-2'> 
  <p className=''>{moment(xy.date).fromNow()} </p> 
 
   </div> 
   </div> 

</div>   
)} 

  <div className="flex overflow-auto max-w-xs sm:max-w-xl xs:max-w-md m-auto sm:overflow-hidden pt-4 px-1 sm:pt-0 hidden-scroll sm:m-0 px-5 xxs:px-2" >
    <div className='flex sm:block sm:max-w-lg'> 
    {news1.slice(1,4).map((xy,i)=> 
    <div className='border w-72 xxs:w-96 px-5 xl:px-0 pt-5 sm:pt-0 sm:border-none sm:w-auto' key={i + ' ' + Math.random()}>      
   {/* <Link href={`/topic/${xy.contentTags.nodes[0].slug}`} > <h3 className='text-red-500 text-sm italic py-1'>{xy.contentTags.nodes[0].name} </h3></Link>  */}
    {/* <Link href={`/article/${xy.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-lg font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link>            
      <div className='py-2 text-sm flex flex-wrap'> 
      <h3 className="m-1">{xy.newsArticlesCategories.nodes[0].name} |</h3> 
        <p className='m-1 text-gray-600'>{moment(xy.date).fromNow()}</p> 
        
      </div>  */}
   
    </div>
   )}
    </div>

  </div>  

  </div>

<hr/>
 
  {/* <div className="bg-white rounded-xl"> 
 <h2 className='text-xl text-gray-700 font-bold py-4'>{news2_name}</h2> 
  <div className="grid sm:grid-cols-2 sm:max-w-6xl sm:m-0 px-5 xs:px-11 sm:px-3 py-8 max-w-xl" > 
    {news2.map((xy,i)=> 
    <div className='pt-2 sm:pt-0 border-b flex my-2 mx-1' key={i + ' ' + Math.random()}>  
       <div className='' style={{maxWidth:'20%'}}> 
    <Image
className='h-20 rounded-xl object-cover'
  width={1200} 
  height={675}    
  src={xy.featuredImage?.node.sourceUrl}     
 /> </div> 
 <div className="px-2"> 
   <Link href={`/topic/${xy.contentTags.nodes[0].slug}`} > 
   <h3 className='text-red-500 text-sm italic py-1'>{xy.contentTags.nodes[0].name} </h3></Link>
  <Link href={`/article/${xy.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-base font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2>
  </Link>            
      <div className='py-2 text-sm flex flex-wrap '> 
      <h3 className="m-1">{xy.newsArticlesCategories.nodes[0].name} |</h3> 
        <p className='m-1 text-gray-600'>{moment(xy.date).fromNow()}</p> 
         
      </div>   
      </div>   


    </div>
   )}   

  </div> 
</div>  

<div className='xl:border-r sm:flex-row flex-col flex rounded-xl bg-white my-4 max-w-4xl xl:max-w-5xl m-auto h-max py-11 md:px-8 lg:px-4 sm:px-0'>
  {news3.slice(0,1).map((xy,i)=>  
<div className='max-w-xl m-auto sm:m-0 px-8 xs:px-11 sm:px-3 sm:max-w-xs md:max-w-md lg:max-w-2xl' key={xy.title}>
  <div className="max-w-xs m-auto sm:max-w-sm">
<Image
className='rounded-xl'
  width={1200} 
  height={675}    
  src={xy.featuredImage?.node.sourceUrl}     
  alt={xy?.featuredImage?.node.altText } 
      />    
   <Link href={`/article/${xy.slug}`}><h2 className='text-2xl font-bold py-3 text-gray-800 hover:text-gray-700'>{xy.title} </h2></Link> 
  <div className='flex text-gray-600 px-2'> 
  <p className=''>{moment(xy.date).fromNow()} </p> 
 
   </div> 
   </div> 

</div>  
)} 

  <div className="flex overflow-auto max-w-xs sm:max-w-xl xs:max-w-md m-auto sm:overflow-hidden pt-4 px-1 sm:pt-0 hidden-scroll sm:m-0 px-5 xxs:px-2" >
    <div className='flex sm:block sm:max-w-lg'> 
    {news3.slice(1,4).map((xy,i)=> 
    <div className='border w-72 xxs:w-96 px-3 xl:px-0 pt-5 sm:pt-0 sm:border-none sm:w-auto' key={i + ' ' + Math.random()}> 
   <Link href={`/topic/${xy.contentTags.nodes[0].slug}`} > <h3 className='text-red-500 text-sm italic py-1'>{xy.contentTags.nodes[0].name} </h3></Link> 
    <Link href={`/article/${xy.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-lg font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link>            
      <div className='py-2 text-sm flex flex-wrap'> 
      <h3 className="m-1">{xy.newsArticlesCategories.nodes[0].name} |</h3> 
        <p className='m-1 text-gray-600'>{moment(xy.date).fromNow()}</p> 
        
      </div>   
   
    </div>
   )}
    </div>

  </div> 

  </div>

<hr/>
 <div className="grid sm:grid-cols-2 gap-1 justify-center"> 

 <div className="bg-white rounded-xl my-2 py-2 max-w-lg">
{news4.slice(0,3).map((x1,i)=> 
  <div className='border-b mx-1 pt-5 sm:pt-0 py-5 flex my-2' key={i + ' ' + Math.random()}>
    <div className='px-2' style={{maxWidth:'30%'}}> 
    <Image
className='h-20 xxs:h-24 rounded-xl object-cover'
  width={1200} 
  height={675}    
  src={x1.featuredImage?.node.sourceUrl}     
  alt={x1?.featuredImage?.node.altText } 
      />  </div>
    <div>  
  <Link href={`/topic/${x1.contentTags.nodes[0].slug}`} ><h3 className='text-red-500 text-sm italic py-1'>{x1.contentTags.nodes[0].name} </h3></Link> 
   <Link href={`/article/${x1.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-base font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{x1.title}</h2></Link>            
   <div className='py-2 text-sm flex flex-wrap '> 
      <h3 className="m-1">{x1.newsArticlesCategories.nodes[0].name} |</h3> 
        <p className='m-1 text-gray-600'>{moment(x1.date).fromNow()} </p>
      
      </div> 
       </div>
   </div>
)}

</div>

<div className="bg-white rounded-xl my-2 py-2 max-w-lg">
{news5.slice(0,3).map((x1,i)=> 
  <div className='border-b mx-1 pt-5 sm:pt-0 py-5 flex my-2' key={i + ' ' + Math.random()}>
    <div className='px-2' style={{maxWidth:'30%'}}> 
    <Image
className='h-24 rounded-xl object-cover'
  width={1200} 
  height={675}    
  src={x1.featuredImage?.node.sourceUrl}     
  alt={x1?.featuredImage?.node.altText } 
      />  </div>
    <div>  
  <Link href={`/topic/${x1.contentTags.nodes[0].slug}`} ><h3 className='text-red-500 text-sm italic py-1'>{x1.contentTags.nodes[0].name} </h3></Link> 
   <Link href={`/article/${x1.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-base font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{x1.title}</h2></Link>            
   <div className='py-2 text-sm flex flex-wrap '> 
      <h3 className="m-1">{x1.newsArticlesCategories.nodes[0].name} |</h3> 
        <p className='m-1 text-gray-600'>{moment(x1.date).fromNow()} </p>
     
      </div> 
       </div>
   </div>
)}

</div>  
 </div> 


 <div className='xl:border-r sm:flex-row flex-col flex rounded-xl bg-white my-4 max-w-4xl xl:max-w-5xl m-auto h-max py-11 md:px-8 lg:px-4 sm:px-0'>
  {news6.slice(0,1).map((xy,i)=>  
<div className='max-w-xl m-auto sm:m-0 px-8 xs:px-11 sm:px-3 sm:max-w-xs md:max-w-md lg:max-w-2xl' key={xy.title}>
  <div className="max-w-xs m-auto sm:max-w-sm">
<Image
className='rounded-xl'
  width={1200} 
  height={675}    
  src={xy.featuredImage?.node.sourceUrl}     
  alt={xy?.featuredImage?.node.altText } 
      />    
   <Link href={`/article/${xy.slug}`}><h2 className='text-2xl font-bold py-3 text-gray-800 hover:text-gray-700'>{xy.title} </h2></Link> 
  <div className='flex text-gray-600 px-2'> 
  <p className=''>{moment(xy.date).fromNow()} </p> 
 
   </div> 
   </div> 

</div>  
)} 

  <div className="flex overflow-auto  max-w-xs sm:max-w-xl xs:max-w-md m-auto sm:overflow-hidden pt-4 px-1 sm:pt-0 hidden-scroll sm:m-0 px-5 xxs:px-2" >
    <div className='flex sm:block sm:max-w-lg'> 
    {newsData.slice(1,4).map((xy,i)=> 
    <div className='border w-72 xxs:w-96 px-3 xl:px-0 pt-5 sm:pt-0 sm:border-none sm:w-auto' key={i + ' ' + Math.random()}> 
   <Link href={`/topic/${xy.contentTags.nodes[0].slug}`} > <h3 className='text-red-500 text-sm italic py-1'>{xy.contentTags.nodes[0].name} </h3></Link> 
    <Link href={`/article/${xy.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-lg font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link>            
      <div className='py-2 text-sm flex flex-wrap'> 
      <h3 className="m-1">{xy.newsArticlesCategories.nodes[0].name} |</h3> 
        <p className='m-1 text-gray-600'>{moment(xy.date).fromNow()}</p> 
        
      </div>   
   
    </div>
   )}
    </div>

  </div> 

  </div>
  <hr/>
 <div className="grid grid-cols-2 gap-1 justify-center"> 
<div className="bg-white rounded-xl my-2 py-2 max-w-lg">
{newsData.slice(0,3).map((x1,i)=> 
  <div className='border-b mx-1 pt-5 sm:pt-0 py-5 flex my-2' key={i + ' ' + Math.random()}>
    <div className='px-2' style={{maxWidth:'30%'}}> 
    <Image
className='h-24 rounded-xl object-cover'
  width={1200} 
  height={675}    
  src={x1.featuredImage?.node.sourceUrl}     
  alt={x1?.featuredImage?.node.altText } 
      />  </div>
    <div>  
  <Link href={`/topic/${x1.contentTags.nodes[0].slug}`} ><h3 className='text-red-500 text-sm italic py-1'>{x1.contentTags.nodes[0].name} </h3></Link> 
   <Link href={`/article/${x1.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-base font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{x1.title}</h2></Link>            
   <div className='py-2 text-sm flex flex-wrap '> 
      <h3 className="m-1">{x1.categories.nodes[0].name} |</h3> 
        <p className='m-1 text-gray-600'>{moment(x1.date).fromNow()} </p>
     
      </div> 
       </div>
   </div>
)}

</div> 

<div className="rounded-xl my-2 py-2 max-w-lg">
{newsData.slice(0,3).map((x1,i)=> 
  <div className='border-b mx-1 pt-5 sm:pt-0 py-5 flex my-2' key={i + ' ' + Math.random()}>
    <div className='px-2' style={{maxWidth:'30%'}}> 
    <Image
className='h-24 rounded-xl object-cover'
  width={1200} 
  height={675}    
  src={x1.featuredImage?.node.sourceUrl}     
  alt={x1?.featuredImage?.node.altText } 
      />  </div>
    <div>  
  <Link href={`/topic/${x1.contentTags.nodes[0].slug}`} ><h3 className='text-red-500 text-sm italic py-1'>{x1.contentTags.nodes[0].name} </h3></Link> 
   <Link href={`/article/${x1.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-base font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{x1.title}</h2></Link>            
   <div className='py-2 text-sm flex flex-wrap '> 
      <h3 className="m-1">{x1.newsArticlesCategories.nodes[0].name} |</h3> 
        <p className='m-1 text-gray-600'>{moment(x1.date).fromNow()} </p>
     
      </div> 
       </div>
   </div>
)}

</div>
</div>   */}

 
</div>  

 {/* <div className="xl:max-w-3xl">
  <div className="md:flex xl:block "> 
<div className="rounded-xl my-4 xl:mx-2 m-auto max-w-xl md:max-w-md min-[900px]:max-w-xl lg:max-w-2xl xl:max-w-xl h-max">
{newsData.slice(0,3).map((x1,i)=> 
  <div className='border-b mx-1 px-3 pt-5 sm:pt-0 py-3 flex my-2' key={i + ' ' + Math.random()}>
    <div className='px-2 py-2 ' style={{maxWidth:'30%'}}> 
    <Image
className='h-32 xl:h-36 rounded-xl object-cover'
  width={1200} 
  height={675}    
  src={x1.featuredImage?.node.sourceUrl}     
  alt={x1?.featuredImage?.node.altText } 
      />  </div>
    <div className="max-w-lg py-4">  
  <Link href={`/topic/${x1.tags.nodes[0].slug}`} ><h3 className='text-red-500 text-sm italic py-1'>{x1.tags.nodes[0].name} </h3></Link> 
   <Link href={`/article/${x1.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-xl xl:text-base font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{x1.title}</h2></Link>            
   <div className='py-2 text-sm flex flex-wrap '> 
      <h3 className="m-1">{x1.newsArticlesCategories.nodes[0].name} |</h3> 
        <p className='m-1 text-gray-600'>{moment(x1.date).fromNow()} </p>
      
      </div> 
       </div>
   </div>
)}
</div>


<div className=""> 
<div className="bg-white rounded-xl my-1 px-2 md:mx-1 overflow-hidden py-4 my-4  max-w-xs xs:max-w-sm m-auto">
<h2 className='text-3xl font-bold text-center text-slate-800 opacity-80 border-b'>{news7_name} </h2> 
<div className='flex md:block xl:flex justify-between'>   
 { news7.map((it, index)=>  
 activeIndices.includes(index) &&  
<div 
key={index} 
className='overflow-hidden first:border-r first:md:border-r-0 first:md:border-b w-80 xl:w-56 md:w-auto mx-2 xl:mx-0 px-1 pt-3 max-w-sm first:xl:border-b-0 first:xl:border-r'> 
  <Image 
  className='h-20 w-max mb-3 md:mb-5 md:m-auto xl:h-24'
  src={it.featuredImage.node.sourceUrl}
  width={1200}
  height={675}
  alt={it.featuredImage.node.altText}  
  />
<div className='my-3 sm:my-0 md:px-1 '>
<Link href={`/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.contentTags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>  

 </div>
 )} 
  
</div> 

 <div className="flex justify-end">  
 <div onClick={left_slide} className='text-xl text-gray-400 bg-opacity-90 cursor-pointer p-2'> 
 <FontAwesomeIcon icon={faAngleLeft}/> 
 </div> 
 <div onClick={right_slide} className='text-xl text-gray-400 bg-opacity-90 cursor-pointer p-2'> 
 <FontAwesomeIcon icon={faAngleRight}/> 
 </div>
 </div>
  
</div>

 <div className='bg-white max-w-xs xs:max-w-sm m-auto xl:m-1'>   
 { newsData.slice(5,15).map((it, index)=> 
  
<div 
key={index} 
className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3'> 
  
<div className='my-3 sm:my-0 md:px-1 '>
<Link href={`/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.contentTags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>  

 </div>
 )} 
  
</div>  
</div> 
</div>  
 </div>  */}


  </div> 


{/* <div className="bg-white w-full my-8"> 
  
 <div className="xs:grid grid-cols-2 justify-center items-center lg:grid-cols-4 max-w-2xl lg:max-w-max m-auto py-8"> 
<div className='max-w-sm m-auto border-r'>   
 { newsData.slice(5,9).map((it, index)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.contentTags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.contentTags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div> 
<div className='max-w-sm m-auto border-r'>   
 { newsData.slice(5,9).map((it, index)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.contentTags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.contentTags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div> 
<div className='max-w-sm m-auto border-r'>   
 { newsData.slice(5,9).map((it, index)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.contentTags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.contentTags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div> 
<div className='max-w-sm m-auto border-r'>   
 { newsData.slice(5,9).map((it, index)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.contentTags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.contentTags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div>  
</div> 

</div>  */}
    </div>
  )
}

export default Main
