 
import * as cheerio from 'cheerio';
import moment from 'moment';
import Image from "next/image";
import React from "react";  
import ShareButtons from "../ShareButtons";
import Link from 'next/link';
const ArticleDetail = ({news_detail}) => {
  const $ = cheerio.load({data:news_detail.content})
  let data_texts= ''
  let data_imgs= []
  const header_index=[]
  const h2t_index=[]
  const h3r_index=[]

  news_detail.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
            const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
            tags?.map((xy)=>{
            if(xy?.includes('h2')){
              h2t_index.push(index )
           } 
          })});
          news_detail.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
            const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
            tags?.map((xy)=>{
            if(xy?.includes('h3')){
              h3r_index.push(index )
           } 
          })}); 

  const replaceHTMLTags=(string)=>{
    const regex = /(<([^>]+)>)/gi; 
    const newString = string.replace(regex, "");
    return newString
     }

     const related_content=news_detail.newsGroup.related?.edges

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
 <div className='bg-white max-w-6xl lg:max-w-xl xl:max-w-5xl' > 
<h1 className="text-6xl">{news_detail.title}</h1>
<p className='py-4 text-lg italic'>{replaceHTMLTags(news_detail.excerpt)}</p>
<div className="bg-gray-600 relative text-gray-200">
  <div dangerouslySetInnerHTML={{__html:news_detail.featuredImage.node.caption}} className="absolute top-0 left-8 p-6 leading-8 shadow-xl font-mono max-w-xl"/>
 
 </div>
<Image 
src={news_detail.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={news_detail.featuredImage.node.altText} 
/> 

<div className='xs:flex'> 
<div className='h-40 border-r'> 

<Link href={`/creator/${news_detail.author.node.slug}`}><p className='text-lg p-3 underline'>{news_detail.author.node.name} </p></Link> 
<hr className='bg-black p-0.5 m-0.5'/>
<hr className='bg-black p-0.5 m-0.5'/>
<p className='text-sm p-3 text-red-600 italic'>{moment(news_detail.date).fromNow()} </p>
<div className="pb-2 [&_.share-view]:bg-white [&_.share-view]:xs:absolute [&_.share-view]:relative [&_.share-view]:max-w-max [&_.share-view]:xs:flex-col [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:px-3 [&_.shadow-sharebtn]:xs:py-3">
  <ShareButtons 
 item={news_detail} 
 activeIdx={news_detail.id}
  shareOptions={true}
    /> 
     </div> 
</div>
  
<div className='py-11 relative xs:my-0 xs:bottom-44 lg:max-w-xl xl:max-w-4xl'>
<hr className='h-2 bg-gray-800'/> 
<div className='xs:px-3 xs:py-8 bg-white'>
{news_detail.content.split('\n').filter((xy)=> xy !=='').map((line, index) =>(
  <div key={index + ' ' + Math.random()}className='p-1 my-1'>
    <div dangerouslySetInnerHTML={{__html:line}} className="[&_h2]:text-3xl [&_h2]:py-3 [&_h2]:mt-4 [&_h2]:font-bold [&_h3]:text-3xl [&_h3]:py-3 [&_h2]:mt-4 [&_h3]:font-bold my-1 text-lg leading-9 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm [&_figure>figcaption]:text-center [&_img]:max-w-xs [&_img]:sm:max-w-sm [&_img]:md:max-w-md [&_img]:max-h-96 [&_img]:m-auto"/>
    {index===5&&     
     <div className='bg-white md:flex lg:block xl:flex m-auto md:m-0'>  
      {related_content?.slice(0,2).map((ex)=>   
       <div key={ex.node.title + ' ' + Math.random()} className="py-4 first:border-b border px-3 max-w-xs m-auto sm:m-0"> 
       <div className="sm:flex justify-center"> 
       <div className="px-1 sm:w-4/5">
         <Link href={`/news/${news_detail.contentTypeName}/${ex.node.slug}`}><h2 className="text-gray-600 hover:text-red-300 text-lg py-2">{ex.node.title} </h2></Link>  
       </div> 
       
     <div className="px-4 py-2 sm:w-2/3 sm:px-0 sm:m-0 m-auto">      
     <Image 
     src={ex.node?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={ex.node?.featuredImage?.node.altText}
     /> 
      
      </div> 
     
       </div>
        <Link href={`/news/${ex.slug}`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
        </div>  
       )} 
 </div>}
   </div> ))}

</div>  
</div>
 
</div>
</div> 
  )
}

export default ArticleDetail












// {news_detail.content.split('\n').filter((xy)=> xy !=='').map((line, index) =>(
//   <div key={index + ' ' + Math.random()} className='bg-white p-3 my-1'> 
   
//          {!header_index.includes(index)&& <p className='py-2 my-1 text-lg leading-9'>{replaceHTMLTags(line)}</p>} 
//          {header_index.includes(index)&&<><h2 className='text-3xl py-1 mt-4 font-bold  '> {replaceHTMLTags(line)}</h2><hr className='h-2 bg-gray-800'/>
//          </>}
//          { index===1&&
//          <div className='border-b-4 py-8 border-t border-t-4 border-gray-700'>
//          <div className='w-3/4 m-auto py-8 '>
          
//        <Image 
//        src={data_imgs[0]}  
//        width={1200}
//        height={675}
//        alt={news_detail.title}
//        />
//      </div>
//           </div>
//          }      
//           { index===2 &&
//                 <div className='border-b-4 py-8 border-t border-t-4 border-gray-700'>
//         <div className='w-3/4 m-auto  '> 
//        <Image 
//        src={data_imgs[1]}
//        width={1200}
//        height={675}
//        alt={news_detail.title}
//        />
//          </div>    
//          </div>
//          }
//          { index===3 &&
       
//   <div className='bg-white w-11/12 m-auto lg:w-4/5'>  
//    {related_content.edges.slice(0,2).map((ex)=>   
//     <div key={ex.node.title + ' ' + Math.random()} className="bg-black py-4 first:border-b first:sm:border-b-0 first:sm:border-r px-3"> 
//     <div className="flex"> 
//     <div className=" px-1 w-2/3">
//     {/* <Link href={`/news/${ex.node.category-here}/${ex.node.slug}`}><h2 className="text-gray-300 hover:text-red-300">{ex.node.title} </h2></Link> */}
//     </div>
    
//   <div className="px-1 w-2/3"> 
//   <Image 
//   src={ex.node.featuredImage.node.sourceUrl}
//   width={1200}
//   height={675}
//   alt={ex.node.featuredImage.node.altText}
//   /> 
//    </div> 
  
//     </div>
//      <Link href={`/news/${ex.node.slug}`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
//      </div>  
//     )} 
//    </div>
//          }
      
//   </div>
//       ))}
