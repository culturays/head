import EventDetail from "@/components/events/EventDetails"; 
import SearchItems from "@/components/events/SearchItems";
import { createClient } from "@/utils/supabase/server";
const EventPage = async({searchParams, params }) => { 
const slug= params.slug
const name = searchParams.name
const eventView = async () => { 
const supabase = createClient();  
const { data, error} = await supabase
.from('events')
.select()
.eq('slug', slug) 
.single()
if (error) {
console.error('Error fetching posts:', error.message);
return;
} 
  
return data 
}

const eventTitle = await eventView()
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
return (
<div>  
 <SearchItems searchVal={name} itemSearches={postSearch}/> 
 <EventDetail eventTitle={eventTitle}/> 
</div>
  )
}

export default EventPage