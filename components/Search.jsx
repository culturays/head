import { faComments } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"  
 
import Image from "next/image"
const Search = ({content, name }) => { 
const searchItem = []   
const netflixContent = content?.map((xy)=> xy?.netflixCategories?.nodes.map((tx)=> tx?.netflixNaijaPosts.nodes).flat()).flat()
return (
    
<div>
<div className="">   
</div> 
    <div className=" mb-5">
{name&&content?.length>0&&<p className="p-5 m-4 font-bold">Search result for {name} — {content?.length}</p>}   

  {name &&content?.length>0&&
content?.map((it, index)=> it?.contentTypeName !=='char' && it.contentTypeName !=='netflix-naija' && it.contentTypeName !=='post' && it.contentTypeName !=='page' &&           
<div key={it.id + Math.random()} className="shadow bg-white max-w-2xl px-4 m-auto my-2"> 
<div className="flex justify-center xs:items-center"> 
     <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-28 xs:h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4 xs:py-5">            
 <Link href={`/news/${it?.contentTypeName}/${it?.slug }`}><h3 className="hover:opacity-50 text-xl cursor-pointer font-medium leading-8">{it?.title }</h3></Link> 
 {it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div className="flex flex-wrap justify-between pt-4" key={i + Math.random()}><Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50">#{ex.name }  
</span>}</Link>  

</div>)}
 {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div className="flex flex-wrap justify-between py-1"key={i}><Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50">#{ex.name }  
</span>}</Link>  

</div>)} 
<div className="gotoforum cursor-pointer py-3 hover:opacity-50 "> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div> 
</div>
) }  
  
 
{name &&content?.length>0&&
content?.filter((x1)=> x1?.contentTypeName ==='netflix-naija' ).map((xy)=> xy?.netflixCategories?.nodes.map((tx)=> tx?.netflixNaijaPosts.nodes)?.flat()?.map((it, index)=>           
<div key={it?.id + Math.random()} className="shadow bg-white max-w-2xl px-4 m-auto my-2"> 
<div className="flex justify-center xs:items-center">
 <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-28 xs:h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4 xs:py-5">            
 <Link href={`/neflix-naija/news/${it?.slug }`}><h3 className="hover:opacity-50 text-xl cursor-pointer font-medium leading-tight">{it?.title }</h3></Link> 
 {it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div className="flex flex-wrap justify-between pt-4"key={i}><Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50">#{ex.name }  
</span>}</Link>  

</div>)}
 {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div className="flex flex-wrap justify-between py-1"key={i}><Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 ">#{ex.name }  
</span>}</Link>  

</div>)} 
<div className="gotoforum cursor-pointer py-3 hover:opacity-50"> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div>
</div>
)) }

{name &&content?.length>0&&
content?.map((it, index)=> it.contentTypeName ==='char' &&               
<div key={it.id + Math.random()} className="shadow bg-white max-w-2xl px-4 m-auto my-2"> 
<div className="flex items-center">        
     <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-28 xs:h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4 py-5">            
 <Link href={`/naija-wiki/character/${it?.slug }`}><h3 className="hover:opacity-50 text-xl cursor-pointer font-medium leading-tight">{it?.title }</h3></Link> 
{it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div className="flex flex-wrap justify-between pt-4"key={i}> <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50">#{ex.name }  
</span>}</Link>  

</div>)}
 {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
<div className="flex flex-wrap justify-between py-1"key={i}> <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 py-2">#{ex.name }  
</span>}</Link>  

</div> )}
<div className="gotoforum cursor-pointer py-3 hover:opacity-50 "> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div>
</div>
) } 
{name &&content?.length>0&&
content?.map((it, index)=> it.contentTypeName ==='post' &&               
<div key={it.id + Math.random()} className="shadow bg-white max-w-2xl px-4 m-auto py-5 my-2"> 
<div className="flex justify-center xs:items-center">        
     <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-28 xs:h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4 xs:py-5">            
 <Link href={`/news/article/${it?.slug }`}><h3 className="hover:opacity-50 text-xl cursor-pointer font-medium leading-tight">{it?.title }</h3></Link> 
{it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div className="flex flex-wrap justify-between pt-4"key={i}> <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50">#{ex.name }  
</span>}</Link>  

</div>)}
{it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div className="flex flex-wrap justify-between py-1"key={i}> <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 py-2">#{ex.name }  
</span>}</Link>  

</div>)} 
<div className="gotoforum cursor-pointer py-3 hover:opacity-50 "> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div>
</div>
) } 
   { name ?
searchItem?.length>0&&searchItem?.map((it, index)=> 
<div key={it.id + Math.random()} className="items_search bg-white max-w-2xl m-0 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/forum/post/${it.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium h-3/4 leading-tight">{it.title }</h3></Link> 
{it.tags?.slice(0,5)?.map((ex, i)=>
 <div className="flex flex-wrap justify-between pt-4"key={i}> <Link href={`/topic/${ex.replace('.','')}/${ex.id}`}>{ex&&<span className="cursor-pointer hover:opacity-50 p-4">#
{ex.replace('.','').split(' ').join(' ') }  
</span>}</Link>  

</div> )}
<div className="gotoforum cursor-pointer"> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>

</div>
):null}  
 
 </div>
 
 </div>
  )
}

export default Search
