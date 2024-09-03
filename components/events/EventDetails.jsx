'use client'
import { faEllipsisVertical, faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"  
import Link from "next/link"
import { useEffect, useState } from "react";
import EventForm from "./EventForm";
import { createClient } from "@/utils/supabase/client" 
const EventDetail = ({ eventTitle }) => {
const [active, setActive]= useState(false)
const [similarEvents,setSimilarEvents]= useState([]) 
const [eventId,setEventId]= useState([]) 
const openForm = () => {
setActive(prev => !prev);  
}
console.log(eventTitle.loc_slug)
useEffect(()=>{
const simValues = async () => {  
const supabase = createClient();  
const { data, error } = await supabase
.from('events')   
.select("*")
.filter('loc_slug', 'ilike', `%${eventTitle.loc_slug}%`);

if (error) {
console.error('Error fetching posts:', error.message);
return;
}

setSimilarEvents( data)  
}
simValues()
},[eventTitle])  

 const user = {id:eventTitle?.user_id}
 
return (
  <div className="my-6"> 
  <div className='flex flex-col items-center justify-center bg-cover bg-center h-screen'style={{'backgroundImage': `url(https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${eventTitle?.img_url})`}}>   
  
<div className="p-32 hover:shadow-3xl border border-t-8 hover:opacity-70 cursor-pointer p-3 bg-gray-700 opacity-70 w-11/12 h-full" >
  {/* <p className="text-lg border bg-white ml-14 m-2 w-14 rounded-full p-3 text-center relative bottom-32 left-full cursor-pointer" onClick={openForm} ><FontAwesomeIcon icon={faPen} /></p>  */}
 <h2 className="text-5xl font-bold text-center text-white">{eventTitle.title}</h2>  
<p className="text-2xl font-bold py-3 text-center text-white">{eventTitle.location}</p>
<p className="text-2xl font-bold py-3 text-center text-white">{eventTitle.genre}</p>
<p className="text-2xl font-bold py-3 text-center text-white">{eventTitle.day}</p>
{/* <p className="text-xl font-bold py-3 text-center text-white">{eventTitle.date}</p>
 {eventTitle.genre.split(' ').map((xy, i)=><p key={i}className="text-xl font-bold py-3 text-center text-white">{xy}</p> )}  */}
 <div className="m-4 ">
<p className="text-xl p-3 text-white text-center leading-6 opacity-80">{eventTitle.desc}</p>
</div>

</div> 

<div>

</div> 
{active &&
 <EventForm 
active={active}
setActive={setActive }
user={user}
eventEdit={eventTitle}
 /> } 
  </div>
<div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-1 m-auto sm:max-w-full w-full p-5 min-[360px]:w-11/12 max-w-sm min-[420px]:px-8 sm:px-0 md:px-11 md:max-w-2xl lg:max-w-5xl" >
{similarEvents.filter((xx)=> xx.title!== eventTitle.title).map((ex)=>
<div key={ex.title}style={{
  backgroundImage: `url(https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${ex?.img_url})`,  
  backgroundRepeat: 'no-repeat',
      backgroundPosition: '',  
      backgroundColor: 'transparent',
      backgroundSize: 'cover',}}
      className="rounded-lg py-20 bg-black px-8 hover:border-solid"> 
 <Link href={`/naija-events/event/${ex.slug}`}>
 <h3 className="text-3xl pb-5 pt-16 text-white font-bold cursor-pointer hover:opacity-80">
{ex.title}
</h3></Link>
<p className="text-lg text-white font-bold text-right">
{ex.genre}
</p>
<hr/>  

 <div className="rounded-lg hover:shadow-3xl px-2 w-full animated-in">
   <p className="text-lg pt-4 text-white font-bold hover:opacity-80">
{ex.location}
</p>
<p className="pb-14 pt-2 text-white font-bold cursor-pointer hover:opacity-80 ">{ex.day}</p></div>  
</div>)}
 
</div>  

   </div> )
  }
  
  export default EventDetail
  