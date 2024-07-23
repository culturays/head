import NaijaEvents from '@/components/events/NaijaEvents'
import { createClient } from '@/utils/supabase/server' 
import { getTop10 } from '../filmsdata' 
import NewsLetter from '@/components/NewsLetter'
import SearchItems from '@/components/SearchItems' 
import Top10 from '@/components/Top10El'  
import { searchValues } from '../lib/searches/search' 
export const revalidate = 10
const Events_Naija = async({searchParams}) => { 
const forumEvents =async ()=>{
const supabase = createClient() 
const { data:events , error } = await supabase 
.from('events')
.select('*')
 
if (error) {
    throw new Error(error.message)
 }
return {events}
   
}
const name = searchParams.name; 
const {events} =await forumEvents() 
const top10Naija = await getTop10()
const eventSearch = await searchValues(name) 
const top10Names = top10Naija.map((ex)=> ex.name) 
return ( 
<>
<SearchItems searchVal={name} itemSearches={eventSearch}/> 
<div className='xxs:flex xxs:flex-col'> 
<NaijaEvents events={events} top10Naija={top10Naija}/>
<div className="m-auto mt-5"> 
<NewsLetter/>  
</div>

</div> 
</>)
}

export default Events_Naija
