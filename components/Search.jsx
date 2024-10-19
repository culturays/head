'use client'
import { faComments, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link" 
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react" 
import { useDebouncedCallback } from 'use-debounce'; 
import Image from "next/image"
const Search = ({content, name }) => { 
const [searchItem, setSearchItem]=useState([]) 
const searchParams = useSearchParams();
{/* <div className="mx-2  flex flex-col justify-between" >
<Link href={`/netflix-naija/news/${it.slug }`}><h3 className="search-title hover:opacity-50 text-lg cursor-pointer font-medium leading-tight underline">{it.title }</h3></Link> 

<div className="flex py-2 text-sm"> 
<p>All tags:</p>{it.contentTags?.nodes.slice(0,5)?.map((ex, i)=> 
<Link href={`/topic/${ex.slug}/${ex.id}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
</p>}</Link>  

)}
</div> 

</div>  */}
const netflixContent = content?.map((xy)=> xy?.netflixCategories?.nodes.map((tx)=> tx?.netflixNaijaPosts.nodes).flat()).flat()
return (
    
<div>
<div className="">   
</div> 
    <div className=" mb-5">
{name&&content?.length>0&&<p className="p-5 m-4 font-bold">Search result for {name} {content?.length}</p>}   

  {name &&content?.length>0&&
content?.map((it, index)=>  it?.contentTypeName !=='char' && it.contentTypeName !=='netflix-naija' && it.contentTypeName !=='post' &&  it.contentTypeName !=='page' &&           
<div key={it.id} className="shadow bg-white max-w-xl w-4/5 px-4 m-auto py-5 my-2"> 
<div className="flex "> 
     <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4">            
 <Link href={`/news/${it?.contentTypeName}/${it?.slug }`}><h3 className="hover:opacity-50 text-xl  cursor-pointer font-medium leading-tight">{it?.title }</h3></Link> 
 <div className="tag-search"> {it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex?.slug}`}key={i}>{ex&&<span className="cursor-pointer hover:opacity-50 py-3">#{ex.name }  
</span>}</Link>  

)}</div>
 <div className="tag-search"> {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex?.slug}`}key={i}>{ex&&<span className="cursor-pointer hover:opacity-50 py-3">#{ex.name }  
</span>}</Link>  

)}</div> 
<div className="gotoforum cursor-pointer py-3 hover:opacity-50 "> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div> 
</div>
) }  
  
 
{name &&content?.length>0&&
content?.filter((x1)=> x1?.contentTypeName ==='netflix-naija' ).map((xy)=> xy?.netflixCategories?.nodes.map((tx)=> tx?.netflixNaijaPosts.nodes)?.flat()?.map((it, index)=>           
<div key={it?.id} className="shadow bg-white max-w-xl w-4/5 px-4 m-auto py-5 my-2"> 
<div className="flex">
 
     <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4">            
 <Link href={`/neflix-naija/news/${it?.slug }`}><h3 className="hover:opacity-50 text-xl  cursor-pointer font-medium leading-tight">{it?.title }</h3></Link> 
 <div className="tag-search"> {it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex?.slug}`}key={i}>{ex&&<span className="cursor-pointer hover:opacity-50 py-3">#{ex.name }  
</span>}</Link>  

)}</div>
 <div className="tag-search"> {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex?.slug}`}key={i}>{ex&&<span className="cursor-pointer hover:opacity-50 py-3">#{ex.name }  
</span>}</Link>  

)}</div> 
<div className="gotoforum cursor-pointer py-3 hover:opacity-50 "> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div>
</div>
)) }

{name &&content?.length>0&&
content?.map((it, index)=> it.contentTypeName ==='char' &&               
<div key={it.id} className="shadow bg-white max-w-xl w-4/5 px-4 m-auto py-5 my-2"> 
<div className="flex ">        
     <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4">            
 <Link href={`/naija-wiki/character/${it?.slug }`}><h3 className="hover:opacity-50 text-xl  cursor-pointer font-medium leading-tight">{it?.title }</h3></Link> 
 <div className="tag-search"> {it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex?.slug}`}key={i}>{ex&&<span className="cursor-pointer hover:opacity-50 py-3">#{ex.name }  
</span>}</Link>  

)}</div>
 <div className="tag-search"> {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex?.slug}`}key={i}>{ex&&<span className="cursor-pointer hover:opacity-50 py-3">#{ex.name }  
</span>}</Link>  

)}</div> 
<div className="gotoforum cursor-pointer py-3 hover:opacity-50 "> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div>
</div>
) } 
{name &&content?.length>0&&
content?.map((it, index)=> it.contentTypeName ==='post' &&               
<div key={it.id} className="shadow bg-white max-w-xl w-4/5 px-4 m-auto py-5 my-2"> 
<div className="flex ">        
     <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4">            
 <Link href={`/news/article/${it?.slug }`}><h3 className="hover:opacity-50 text-xl  cursor-pointer font-medium leading-tight">{it?.title }</h3></Link> 
 <div className="tag-search"> {it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex?.slug}`}key={i}>{ex&&<span className="cursor-pointer hover:opacity-50 py-3">#{ex.name }  
</span>}</Link>  

)}</div>
 <div className="tag-search"> {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex?.slug}`}key={i}>{ex&&<span className="cursor-pointer hover:opacity-50 py-3">#{ex.name }  
</span>}</Link>  

)}</div> 
<div className="gotoforum cursor-pointer py-3 hover:opacity-50 "> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div>
</div>
) } 
   { name ?
searchItem?.length>0&&searchItem?.map((it, index)=> 
<div key={it.id} className="items_search bg-white max-w-xl w-4/5 m-0 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/forum/post/${it.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium h-3/4 leading-tight">{it.title }</h3></Link> 
 <div className="tag-search"> {it.tags?.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.replace('.','')}/${ex.id}`}key={i}>{ex&&<span className="cursor-pointer hover:opacity-50 p-4">#
{ex.replace('.','').split(' ').join(' ') }  
</span>}</Link>  

)}</div> 
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
