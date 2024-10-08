import { dateFormatter } from "@/utils/dateFormat"
import * as cheerio from 'cheerio';
import Image from "next/image";
import Link from "next/link";
import ShareButtons from "./ShareButtons";
import NewsLetter from "./NewsLetter";
import SideBar from "./Side";
const replaceHTMLTags=(string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "") 
  const newString = string.replace(regex, "");
  return newString
   }

            
const NewsDetail = ({sidebarItems,post}) => { 
  const $ = cheerio.load({data:post.content}) 
  let data_texts= ''
  let data_link= [] 
  let data_imgs= []
  const h2t_index=[]
  const h3r_index=[]
  const link_texts=[]

      $('img', post.content).each(async function(){
        const img = $(this).attr('src') 
        data_imgs.push(img)
        })
        $('p', post.content).each(async function(){
          const text = $(this).text()
          data_texts+=text
          })
    
      post.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
            const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
            tags?.map((xy)=>{
            if(xy?.includes('h2')){
              h2t_index.push(index )
           } 
          })});
           post.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
            const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
            tags?.map((xy)=>{
            if(xy?.includes('h3')){
              h3r_index.push(index )
           } 
          })}); 
        post.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
            const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
            tags?.map((xy)=>{
            if(xy?.includes('href')){
              data_link.push(index)
              $('a', xy).each(async function(){
                const linked = $(this).attr('href')  
               link_texts.push({
                item:linked,
                index
               })
            
            }) 
           } 
          })});
 
          const post_related= post.postnewsgroup.relatedPosts?.nodes    
 
  return (
    <div>
      <div > 
<div className="">
<div className="px-4 lg:px-16 py-8 m-auto max-w-7xl" > 
<div className="flex justify-between text-ld py-4 px-2"> 
<p>{dateFormatter.format(Date.parse(post.date))}</p>
<p>{post.categories.nodes[0].name}</p>
</div>
    <hr className="bg-black h-1 w-full my-1"/> 
<hr className="bg-black h-1 w-full my-1"/>  
  
 <h1 className="text-5xl font-bold py-4" style={{lineHeight:'60px'}}>
   {post.title} 
  </h1>
  <div className="border-t border-t-4 border-t-orange-600">
  <div className="flex justify-between items-center py-6">
    <div className="flex">
 <small className="text-lg">by:</small> 
 <Link href={`/creator/${post?.author.node.slug}`}><h2 className="text-lg px-2 text-orange-600 font-bold hover:text-gray-600 cursor-pointer">{post.author.node.name}</h2></Link>
  </div>


  <div className="[&_.share-view]:relative [&_.share-view]:bg-white [&_.share-view]:p-0 [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:m-3"> 
 <ShareButtons 
 item={post} 
 shareOptions={true} 
 activeIdx={post.id}
 />
</div>
 </div>
<hr/>
  <div dangerouslySetInnerHTML={{__html:post.excerpt}} className="py-4 text-xl font-medium italic"/>
</div>  
 </div>
 
 <Image 
  className="flex flex-col items-center justify-center bg-cover bg-center h-screen w-full object-cover border-t border-t-8 rounded-t border-t-orange-600"
     src={post.featuredImage.node.sourceUrl}
     width={1250}
     height={675}
     alt={post.featuredImage.node.altText}
     />
 <div className="bg-gray-600 relative text-gray-200">
  <div dangerouslySetInnerHTML={{__html:post.featuredImage.node.caption}} className="absolute bottom-20 left-8 p-6 leading-8 shadow-xl font-mono"/>
 
 </div>
</div>

<div className="px-2 lg:px-11 py-8 m-auto"style={{maxWidth:'1700px'}}>
  <div className="lg:flex"> 
<div className="flex flex-wrap max-w-5xl m-auto">
 <div className="w-1/2 px-4">
 <div style={{height:'600px'}}>
 <Image 
  className="object-cover h-full border-t border-t-8 rounded-t border-t-orange-600"
     src={post.postnewsgroup?.heroImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={post.postnewsgroup?.heroImage?.node.altText}
     />
 </div>

 <div>
{post.content.split('\n').filter((xy)=> xy !=='').map((line, index) =>(
  <div key={index + ' ' + Math.random()} className="">

     {h2t_index.includes(index)&&!h3r_index.includes(index)&&index<10&& <> 
      <div dangerouslySetInnerHTML={{__html:line}} className="text-3xl py-3 mt-4 font-bold "/>
      <hr className='h-2 bg-gray-800'/>
    </>
    }
    {!h2t_index.includes(index)&&h3r_index.includes(index)&&index<10&& <>
      <div dangerouslySetInnerHTML={{__html:line}} className="text-3xl py-3 mt-4 font-bold "/>            
      <hr className='h-2 bg-gray-800'/>
    </>}
{!h2t_index.includes(index)&&!h3r_index.includes(index)&&data_link.includes(index)&&index<10&&
   <> 

 <div dangerouslySetInnerHTML={{__html:line}} className="text-lg leading-9 py-2 my-1 [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-800"/> 
  </>}

    {!h2t_index.includes(index)&&!h3r_index.includes(index) && !data_link.includes(index)&&index<10&&
        <div>
        <div dangerouslySetInnerHTML={{__html:line}} className="py-2 my-1 text-lg leading-9 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm"/>
        {index===5&&     
     <div className='bg-white w-11/12 m-auto lg:w-4/5'>  
      {post_related?.slice(0,2).map((ex)=>   
       <div key={ex.title + ' ' + Math.random()} className=" py-4 first:border-b border px-3"> 
       <div className="sm:flex justify-center"> 
       <div className="px-1 sm:w-4/5">
       <Link href={`/news/${ex.slug}`}><h2 className="text-orange-600 hover:text-red-300 py-1 font-bold">{ex.title} </h2></Link>
       </div>
       
     <div className="px-4 py-2 sm:w-2/3 sm:px-0 sm:m-0 m-auto"> 
     <Image 
     src={ex.featuredImage.node.sourceUrl}
     width={1200}
     height={675}
     alt={ex.featuredImage.node.altText}
     /> 
      </div> 
     
       </div>
        <Link href={`/news/${ex.slug}`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
        </div>  
       )} 
      </div>
            }
       </div>   
       }
   </div> ))}

</div>  
   </div>
  
  <div className="w-1/2 px-4">
  {post.content.split('\n').filter((xy)=> xy !=='').map((line, index) =>(
  <div key={index + ' ' + Math.random()}> 
  
   {h2t_index.includes(index)&&!h3r_index.includes(index)&& index>=10&& <> 
   <div dangerouslySetInnerHTML={{__html:line}} className="text-3xl py-3 mt-4 font-bold"/>
   <hr className='h-2 bg-gray-800'/>
    </>}
    {!h2t_index.includes(index)&&h3r_index.includes(index)&& index>=10&& <>
    
    <div dangerouslySetInnerHTML={{__html:line}} className="text-3xl py-3 mt-4 font-bold"/>
    <hr className='h-2 bg-gray-800'/>
    </>}
        {!h2t_index.includes(index)&&!h3r_index.includes(index)&&data_link.includes(index) && index >=10&&
         <> 
 
<div dangerouslySetInnerHTML={{__html:line}} className="text-lg leading-10 py-2 my-1 [&_p>a]:text-green-600 [&_p>a]:hover:bg-gray-800"/> 
    </>}
       {!h2t_index.includes(index)&&!h3r_index.includes(index)&& index>=10&& !data_link.includes(index)&&
        <div> 
  <div dangerouslySetInnerHTML={{__html:line}} className="[&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm py-2 my-1 text-lg leading-9 [&>figure]:px-8"/>
  
       {index===8&&     
     <div className='bg-white w-11/12 m-auto lg:w-4/5'>  
      {post_related?.slice(2,4).map((ex)=>   
       <div key={ex.title + ' ' + Math.random()} className=" py-4 first:border-b border px-3"> 
       <div className="sm:flex justify-center"> 
       <div className="px-1 sm:w-4/5">
       <Link href={`/news/${ex.slug}`}><h2 className="text-orange-600 hover:text-red-300 py-1 font-bold">{ex.title} </h2></Link>
       </div>
       
     <div className="px-4 py-2 sm:w-2/3 sm:px-0 sm:m-0 m-auto"> 
     <Image 
     src={ex.featuredImage.node.sourceUrl}
     width={1200}
     height={675}
     alt={ex.featuredImage.node.altText}
     /> 
      </div> 
     
       </div>
        <Link href={`/news/${ex.slug}`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
        </div>  
       )} 
      </div>
            }
       </div>   
       }

 </div>
))}

 </div>  
 </div>
 
<SideBar/>
 
  </div>


  </div>
 </div>
 
</div>
  )
}

export default NewsDetail
