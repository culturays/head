import Search from "@/components/Search";  
import { searchValues } from "../lib/searches/search";
import { Suspense } from "react";
 
const SearchPage = async ({searchParams}) => {
const {name}= searchParams  
const content = await searchValues(name) 
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>    
    <Search name={name} content={content}/>  
     </Suspense> 
    </div>
  ) 
}

export default SearchPage
