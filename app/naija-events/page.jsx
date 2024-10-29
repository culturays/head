import NaijaEvents from '@/components/events/NaijaEvents'
import { createClient } from '@/utils/supabase/server' 
import { getTop10 } from '../naija-wiki/filmsdata'  
 
export const revalidate = 10
const Events_Naija = async({searchParams}) => { 
const forumEvents =async ()=>{
const supabase =await createClient() 
const { data:events , error } = await supabase 
.from('events')
.select('*')
.order('id', { ascending: false }) 
if (error) {
    throw new Error(error.message) 
 }
return {events}
    
} 
const {events} =await forumEvents() 
const top10Naija = await getTop10() 
return ( 
<>   
<div className='xxs:flex xxs:flex-col'> 
  <NaijaEvents events={events} top10Naija={top10Naija}/> 
</div> 

</>)
}

export default Events_Naija
