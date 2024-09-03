 
import * as cheerio from 'cheerio';
import moment from 'moment';
import Image from "next/image";
import React from "react";  
import ShareButtons from "../ShareButtons";
import Link from 'next/link';
const NewsDetails = ({news_detail}) => {
  const $ = cheerio.load({data:news_detail.content})
  let data_texts= ''
  let data_imgs= []
  const header_index=[]
  const replaceHTMLTags=(string)=>{
    const regex = /(<([^>]+)>)/gi; 
    const newString = string.replace(regex, "");
    return newString
     }
     const related_content=news_detail.newsNewsGroup.news_related
     $('img', news_detail.content).each(async function(){
      const img = $(this).attr('src') 
      data_imgs.push(img)
      })
      $('p', news_detail.content).each(async function(){
        const text = $(this).text()
        data_texts+=text
        })
        ///[&:not(:first-child)]
     
        const result = data_texts.replace(/(?:\.[^.]*){2}\./g, (match) => match + "<br/>");
        news_detail.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
          const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
          tags?.map((xy)=>{
              if(xy?.includes('h2')){
            header_index.push(index )
         } 
        })});
     
  return ( 
    <div className="bg-gray-50">
 <div className='bg-white w-11/12 m-auto p-6 sm:px-10 lg:w-4/5 xl:3/4 2xl:w-2/4 lg:px-16'> 
<h1 className="text-6xl">{news_detail.title}</h1>
<p className='py-4 text-lg italic'>{replaceHTMLTags(news_detail.excerpt)}</p>
<Image 
src={news_detail.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={news_detail.featuredImage.node.altText} 
/> 
<div className='flex'> 
<div className=' border-r'> 

<p className='text-base p-3'>{news_detail.author.node.name} </p>
<p className='text-sm p-3 text-red-600 italic'>{moment(news_detail.date).fromNow()} </p>
<div className="pb-2 [&_.share-view]:bg-white [&_.share-view]:max-w-max [&_.share-view]:flex-col [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:text-gray-800 text-xl  [&_.shadow-sharebtn]:my-2">
  <ShareButtons 
 item={news_detail} 
 activeIdx={news_detail.id}
  shareOptions={true}
    /> 
     </div>
</div>

 
<div className='py-11 relative bottom-32 md:bottom-44 md:w-4/5 m-auto'>
<hr className='h-2 bg-gray-800'/>
 {news_detail.content.split('\n').filter((xy)=> xy !=='').map((line, index) =>(
<div key={index + ' ' + Math.random()} className='bg-white p-3 my-1' > 
 
       {!header_index.includes(index)&& <p className='py-2 my-1 text-lg leading-9'>{replaceHTMLTags(line)}</p>} 
       {header_index.includes(index)&&<><h2 className='text-3xl py-3 mt-4 font-bold  '> {replaceHTMLTags(line)}</h2><hr className='h-2 bg-gray-800'/></>}
       { index===1&&
       <div className='border-b-4 py-8 border-t border-t-4 border-gray-700'>
       <div className='w-3/4 m-auto py-8 '>
        
     <Image 
     src={data_imgs[0]}
     width={1200}
     height={675}
     alt={news_detail.title}
     />
   </div>
        </div>
       }      
        { index===2 &&
              <div className='border-b-4 py-8 border-t border-t-4 border-gray-700'>
      <div className='w-3/4 m-auto  '> 
     <Image 
     src={data_imgs[1]}
     width={1200}
     height={675}
     alt={news_detail.title}
     />
       </div>    
       </div>
       }
       { index===3 &&
     
<div className='bg-white w-11/12 m-auto lg:w-4/5'>  
 {related_content.edges.slice(0,2).map((ex)=>   
  <div key={ex.node.title + ' ' + Math.random()} className="bg-black py-4 first:border-b first:sm:border-b-0 first:sm:border-r px-3"> 
  <div className="flex"> 
  <div className=" px-1 w-2/3">
  <h2 className="text-gray-300">{ex.node.title} </h2>
  </div>
  
<div className="px-1 w-2/3"> 
<Image 
src={ex.node.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={ex.node.featuredImage.node.altText}
/> 
 </div> 

  </div>
   <Link href={`//news/${ex.node.slug}`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
   </div>  
  )} 
 </div>
       }
    
</div>
    ))}
  
</div>
 
</div>
</div>

 
      </div>
 
  )
}

export default NewsDetails
