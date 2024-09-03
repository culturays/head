 
import EventLocations from "@/components/events/Location";
import { createClient } from "@/utils/supabase/server";  

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
 
 
const eventTitle= await eventView()
return (
<div  className='xxs:flex xxs:flex-col'>  
 <EventLocations eventTitle={eventTitle}/> 
</div>
  )
} 

export default LocationPage