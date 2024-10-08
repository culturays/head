'use client'
import { faComments, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link" 
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react" 
import { useDebouncedCallback } from 'use-debounce'; 
const Search = ({content, searchVal, searchedPosts}) => { 
const [searchItem, setSearchItem]=useState('')
const router =useRouter() 
const searchParams = useSearchParams();
const pathname = usePathname();
 
const handleSearch = useDebouncedCallback((term) => {
  console.log(term)
  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set('searchVal', term);
  } else {
    params.delete('searchVal');
  }
  router.replace(`${pathname}?${params.toString()}`);
}, 500);

const name = searchParams.get('name') || searchVal;
const params = new URLSearchParams(searchParams);

useEffect(()=>{ 
const searchVals = async () => {  
const supabase = createClient();  
const { data, error } = await supabase
.from('content')   
.select("*")
.filter('title', 'ilike', `%${name}%`);

if (error) {
console.error('Error fetching posts:', error.message);
return;
}

setSearchItem(data) 
}
searchVals() 
  },[name])
  //use style here { netflixNaijaPosts?.map((it, index)=> 
  //   <div key={it.id} className="items_search bg-white max-w-xl m-4 m-auto my-1 py-4"> 
  //   <div className="px-2">
  //     <div className="flex">        
  //    <div className="max-w-32 xs:max-w-44"> 
  //    <Image
  //    src={it.featuredImage.node.sourceUrl}
  //    width={1200}
  //    height={675}
  //    alt={it.featuredImage.node.altText}
  //    />
  //    </div>
  //       <div className="mx-2  flex flex-col justify-between" >
  //          <Link href={`/netflix-naija/news/${it.slug }`}><h3 className="search-title hover:opacity-50 text-lg cursor-pointer font-medium leading-tight underline">{it.title }</h3></Link> 
    
  //          <div className="flex py-2 text-sm"> 
  //         <p>All tags:</p>{it.contentTags?.nodes.slice(0,5)?.map((ex, i)=> 
  //   <Link href={`/topic/${ex.slug}/${ex.id}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
  //   </p>}</Link>  
    
  //   )}
  //   </div> 
    
  //   </div> 
  //   </div>
       
     
  //    </div>
    
  //   </div>
  //   )  } 
return (
<div>
<div className="">  
<input  
placeholder='search' 
className='absolute w-full p-2 border-2 focus:outline-none'
//name="name"
 onChange={(e) => {
 handleSearch(e.target.value);
 }}
type="text"
defaultValue={searchParams.get('searchVal')?.toString()}
/>
 <div className="relative top-3 -right-3/4 ml-22 sm:ml-28 md:ml-32">
 <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer opacity-70" onClick={()=>router.push(`${pathname}?${params.toString()}`)}/>  

</div> 
</div> 
    <div className="search_all mb-5">

<p className="p-5 m-4 font-bold">Search Results for {searchVal|| name }</p>
   
  {name || searchVal?
content?.map((it, index)=> 
<div key={it.id} className="items_search bg-white max-w-xl w-4/5 m-4 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/news//${it.locator}/${it.slug }`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium h-3/4 leading-tight">{it.title }</h3></Link> 
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
   { name || searchVal?
searchItem&&searchItem?.map((it, index)=> 
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
