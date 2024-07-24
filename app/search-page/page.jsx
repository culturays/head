import Search from "@/components/Search"; 
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation"; 
 
const SearchPage = async ({searchParams}) => {
 const {searchVal}= searchParams
 
const searchedContnet = async () => { 
const supabase = createClient();  
const { data, error } = await supabase
.from('content')   
.select("*")
.filter('title', 'ilike', `%${searchVal}%`);

if (error) {
console.error('Error fetching posts:', error.message);
return;
}   
return data

}
const content = await searchedContnet() 
 
  return (
    <div>  
    <Search searchVal={searchVal} content={content}/>  
    </div>
  )
}

export default SearchPage
