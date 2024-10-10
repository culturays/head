 'use client'
import { searchValues } from "@/app/lib/searches/search"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"  
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce" 
const SearchItems = () => {
const router = useRouter()
const searchParams = useSearchParams();
const pathname = usePathname();
const [searchData, setSearchData]=useState([])
const params = new URLSearchParams(searchParams);

const handleSearch = useDebouncedCallback((term) => { 
  if (term) {
    params.set('name', term); 
  } else {
    params.delete('name');
  }
  
  router.replace(`${pathname}?${params.toString()}`);

  search_data()
}, 300);


const name = params.get('name'); 
const search_data =async()=>{
  const postSearch= await searchValues(name) 
  setSearchData(postSearch)
}
 
const netflixContent = searchData?.map((xy)=> xy?.netflixCategories?.nodes.map((tx)=> tx?.netflixNaijaPosts.nodes).flat()).flat()
 
return (  
<div > 
<div className="">  
<input  
placeholder='search'
className='absolute z-30 w-full p-2 border-2 focus:outline-none text-lg'
type="text" 
// name='name' 
onChange={(e) => {
  handleSearch(e.target.value);
}}
defaultValue={searchParams.get('name')?.toString()}
/> 
 
<div className="relative z-50 top-3 -right-3/4 ml-22 sm:ml-28 md:ml-32">
<FontAwesomeIcon icon={faAngleDoubleRight} className="cursor-pointer opacity-70 text-xl hover:scale-150" onClick={()=>!name?router.push('/search-page')
:router.push(`/search-page?name=${name}`)}/> 
 
</div>
</div>
  {!pathname.includes('search-page')&&
<div className='searchRes m-2 sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3'>  
{name && 
searchData?.slice(0,4).map((it, index)=> it?.contentTypeName ==='char' &&           
<div key={it?.id} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full"> 
<div className="m-6"> 
<Link href={`/naija-wiki/character/${it?.slug }`}><p className="text-xl text-center">{it?.title}</p></Link> 

</div>
</div>
)   }
{name && 
searchData?.slice(0,4).map((it, index)=> it?.contentTypeName ==='post' &&           
<div key={it?.id} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full"> 
<div className="m-6"> 
<Link href={`/news/article/${it?.slug }`}><p className="text-xl text-center">{it?.title}</p></Link> 

</div>
</div>
)   }
{name && 
searchData?.slice(0,4).map((it, index)=> it?.contentTypeName !=='char' && it.contentTypeName !=='netflix-naija' && it.contentTypeName !=='post' &&  it.contentTypeName !=='page' &&             
<div key={it?.id} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full"> 
<div className="m-6"> 
<Link href={`/news/${it?.contentTypeName}/${it?.slug }`}><p className="text-xl text-center">{it?.title}</p></Link> 

</div>
</div>
)   }
{name && 
content?.filter((x1)=> x1?.contentTypeName ==='netflix-naija' ).map((xy)=> xy?.netflixCategories?.nodes.map((tx)=> tx?.netflixNaijaPosts.nodes)?.flat()?.map((it, index)=>
<div key={it?.id} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full"> 
<div className="m-6"> 
<Link href={`/netflix-naija/news/${it?.slug }`}><p className="text-xl text-center">{it?.title}</p></Link> 

</div>
</div>
)) }
 
 {name&&searchData?.length ===0 && netflixContent?.length ===0 &&<p className="p-11 text-xl"> No results </p> }  
</div> 
}
</div>
  )
}

export default SearchItems
