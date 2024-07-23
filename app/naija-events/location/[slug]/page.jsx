import NewsLetter from "@/components/NewsLetter";
import EventLocations from "@/components/events/Location";
import { createClient } from "@/utils/supabase/server"; 
import SearchItems from "@/components/events/SearchItems"; 

const LocationPage = async({searchParams, params }) => {
  const name = searchParams.name; 
 // {
//.filter('location', 'ilike', `%${transformedLocation}%`)} both work for filtering
//.replace(/[^a-zA-Z0-9 ]/g, ' ');
const location= params.slug
//const transformed= location.replace(/%20/g, ' ').replace(/[^a-zA-Z0-9 ]/g, ' ')
 
const eventView = async () => { 
const supabase = createClient();
const { data, error } = await supabase
.from('events')
.select('*')
.eq('loc_slug', location) 
//.filter('loc_slug', 'ilike', `%${location}%`)

if (error) { 
console.error('Error fetching posts:', error.message);
return;
} 
 
return data  
}
const searchValues = async () => { 
  const supabase = createClient();  
  const { data, error } = await supabase
  .from('events')
  .select("*")
  .filter('title', 'ilike', `%${name}%`);
  
  if (error) {
  console.error('Error fetching posts:', error.message);
  return;
  } 
  return data
  } 
const postSearch = await searchValues()
const eventTitle= await eventView()
return (
<div  className='xxs:flex xxs:flex-col'>
 <SearchItems searchVal={name} itemSearches={postSearch}/>  
 <EventLocations eventTitle={eventTitle}/>
 <div className="m-auto mt-5"> 
<NewsLetter/>  
</div>

</div>
  )
} 

export default LocationPage