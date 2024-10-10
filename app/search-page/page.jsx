import Search from "@/components/Search";  
import { searchValues } from "../lib/searches/search";
 
const SearchPage = async ({searchParams}) => {
const {name}= searchParams  
const content = await searchValues(name) 
  return (
    <div>  
    <Search name={name} content={content}/>  
    </div>
  ) 
}

export default SearchPage
