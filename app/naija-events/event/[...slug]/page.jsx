import EventDetail from "@/components/events/EventDetails";  
import { createClient } from "@/utils/supabase/server";
const EventPage = async({searchParams, params }) => { 
const slug= params.slug
const eventView = async () => { 
const supabase =await createClient();  
const { data, error} = await supabase
.from('events')
.select()
.eq('slug', slug[0])
.single()
if (error) {
console.error('Error fetching posts:', error.message);
return;
}   
return data 
}
 
const eventTitle = await eventView()
return (
<div>   
<EventDetail eventTitle={eventTitle}/> 
</div>
  )
}

export default EventPage