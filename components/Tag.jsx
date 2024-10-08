 "use client"

import Link from "next/link"
import { useParams } from "next/navigation"

const Tag = ({content_tag_response,tag_response}) => { 
const {slug} = useParams()
const posts =tag_response?.posts.edges.flat()
// const latest= content_tag_response?.latests.edges.flat()
// const awards= content_tag_response?.awards.edges.flat()
// const allNetflixNaija= content_tag_response?.allNetflixNaija.edges.flat()
// const businesses= content_tag_response?.businesses.edges.flat()
// const chars= content_tag_response?.chars.edges.flat()
// const culturaysVideos= content_tag_response?.culturaysVideos.edges.flat()
// const economies= content_tag_response?.economies.edges.flat()
// const environments= content_tag_response?.environments.edges.flat()
// const health= content_tag_response?.health.edges.flat()
// const others= content_tag_response?.others.edges.flat()
// const societies= content_tag_response?.societies.edges.flat()
// const technologies= content_tag_response?.technologies.edges.flat()
// const trends= content_tag_response?.trends.edges.flat()

  return (
    <div>
  {/* <div className="search_all mb-5"> 
  <p className="p-5 m-4 font-bold">Articles tagged in "{slug}"</p>  
{ 
posts?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex"> {it.node.tags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { 
latest?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex "> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50  mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 

 { 
awards?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex "> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50  mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { allNetflixNaija?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex "> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { 
businesses?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex"> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { chars?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex "> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1 ">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { 
culturaysVideos?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex"> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { 
economies?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex"> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { 
environments?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex"> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { 
health?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex"> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { 
others?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex"> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { 
societies?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex"> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { 
technologies?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex"> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
 { 
technologies?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 

 <div className="flex"> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) } 
  
 { 
trends?.map((it, index)=> 
<div key={it.node.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news/${it.node.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium leading-tight py-8 underline">{it.node.title }</h3></Link> 
 <div className="flex"> {it.node.contentTags?.nodes.slice(0,5)?.map((ex, i)=>
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<span className="cursor-pointer hover:opacity-50 mx-1">#{ex.name }  
</span>}</Link>  

)}</div> 
 
 </div>

</div>
) }   
 
 </div>   */}
 
 </div>
  )
}

export default Tag
