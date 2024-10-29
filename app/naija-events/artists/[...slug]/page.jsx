import NewsLetter from "@/components/NewsLetter";
import ArtistEvent from "@/components/events/ArtistEvent";  
import { createClient } from "@/utils/supabase/server";  
const ArtistsPage = async({searchParams, params }) => {
const artist= params.slug
const eventView = async () => { 
const supabase =await createClient();
const { data, error} = await supabase
.from('events')
.select('*')
//.eq('loc_slug', artist) 
.filter('genre_slug', 'ilike', `%${artist}%`)
// .ilike('artist', transformed); 
if (error) { 
console.error('Error fetching posts:', error.message);
return;
} 

return data 
} 
 
const eventTitle= await eventView() 
 
return (
<div className="flex flex-col"> 
 <ArtistEvent eventTitle={eventTitle}/>
 
</div>
  )
} 

export default ArtistsPage