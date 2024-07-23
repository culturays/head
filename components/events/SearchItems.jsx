 'use client'

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link" 
import { useForm } from "react-hook-form"
import { useRouter, usePathname, useSearchParams } from "next/navigation";
const SearchItems = ({searchVal, itemSearches }) => { 
const pathname = usePathname(); 
const router = useRouter();
const currentSearchParams = useSearchParams(); 
function onInputBlur(event) { 
  const name = event.target.value; 
  const updatedSearchParams = new URLSearchParams(currentSearchParams.toString())
  updatedSearchParams.set("name", name) 
  router.push(pathname + "?" + updatedSearchParams.toString())
}
 
return (
<div>
 <div className="">  
<input  
placeholder='search'
className='absolute w-full p-2 border-2 focus:outline-none'
type="text"  
 onChange={onInputBlur}
/> 

<div className="relative top-3 -right-3/4 ml-22 sm:ml-28 md:ml-32">
<FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer opacity-70" onClick={()=>!searchVal?router.push('/forum/search-page')
:router.push(`/search-page?searchVal=${searchVal}`)}/> 

</div>
</div>
<div className='searchRes m-2 sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3'>  
{searchVal && 
itemSearches?.slice(0,4).map((it, index)=>               
<div key={it.id} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full">
<div className="m-6 "> 
<Link href={`/naija-events/event/${it.slug }`}><p className="text-xl text-center">{it.title}</p></Link> 

</div>
</div>
)   } 

</div>  

</div>
)
}

export default SearchItems
