import Search from "@/components/Search";  
import { searchValues } from "../lib/searches/search";
 
const SearchPage = async ({searchParams}) => {
 const {searchVal}= searchParams  
const content = await searchValues() 
 
  return (
    <div>  
    <Search searchVal={searchVal} content={content}/>  
    </div>
  )
}

export default SearchPage
