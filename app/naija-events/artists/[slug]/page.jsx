import NewsLetter from "@/components/NewsLetter";
import ArtistEvent from "@/components/events/ArtistEvent"; 
import SearchItems from "@/components/events/SearchItems";
import { createClient } from "@/utils/supabase/server";  
const ArtistsPage = async({searchParams, params }) => {
const artist= params.slug
const transformed= artist.replace(/%20/g, ' ')
const name = searchParams.name; 
const eventView = async () => { 
const supabase = createClient();
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
const eventTitle= await eventView()
const postSearch = await searchValues() 
 
return (
<div className="flex flex-col">
<SearchItems searchVal={name} itemSearches={postSearch}/>  
 <ArtistEvent eventTitle={eventTitle}/>
 <div className="m-auto mt-5"> 
<NewsLetter/>  
</div> 
  
</div>
  )
} 

export default ArtistsPage