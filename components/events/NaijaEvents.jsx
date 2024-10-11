'use client'
import Image from "next/image" 
import Link from "next/link" 
import style from '../../styles/events.module.css'
import { useMemo } from "react" 
 
const NaijaEvents = ({events}) => { 
  const eventByLocale = useMemo(() => {
  const group = {} 
  events&&events.forEach(ev => {
    //1 or 0
  group[ev.loc_slug] ||= []
  group[ev.loc_slug ].push(ev)
  })
  return group
  }, []) 
  const eventByArtists = useMemo(() => {
    const group = {} 
    events&&events.forEach(ev =>{ 
    group[ev.genre_slug] ||= [] 
    group[ev.genre_slug].push(ev) 
   } ) 
    return group  
    }, [])
   
   const eventKeys = {
    eventLoc: Object.keys(eventByLocale),
    events:Object.values(eventByLocale)
  } 
 ///<a href="#contact">Go to Section 2</a> should refer to an id
const artistEl = Object.keys(eventByArtists).map((ux)=> ux.replace(/ /g, '').split(',') ).flat()
 const fixArtistImg = artistEl.filter( function( item, index, inputArray ) {
  return inputArray.indexOf(item) === index;
})
 
return (
  <> 
<div className="top_event mt-8 m-auto max-w-7xl px-4 min-[481px]:px-8" >
<h2 className="py-6 xxs:text-2xl text-3xl font-bold bg-gray-700 text-center text-gray-300 mb-1">Find Events by Location</h2>
<div className="grid md:grid-cols-3 gap-1 min-[481px]:grid-cols-2">
{Object.keys(eventByLocale).map((ex, i)=> 
{ return( 
<div key={ex + ' ' + i} className={`w-full relative ${style.event_categoryBox}`}> 
{Object.values(eventByLocale).flat().map((ux,ix)=> ix === i &&
 <div key={ix}> 
 <Image 
 className="h-56 lg:h-64"
src={ux.img_url &&ux?.img_url?.endsWith('.jpg')||ux?.img_url?.endsWith('.jpeg')||ux?.img_url?.endsWith('.png')?`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${ux?.img_url}`:'/assets/images/culturays_events.png'}
width={500} 
height={500}
alt={ex}
/>
 <ul> 
 <Link href={`/naija-events/event/${ux.slug}`}><li title='view event'className="absolute bottom-4 cursor-pointer text-white hover:text-gray-200 px-3 py-2 z-10 font-bold text-base underline">{ux.title }</li></Link>
 </ul>
</div>  
)}
{/* {ex.charAt(0).toUpperCase() + ex.slice(1).replace(/-/g," ") } */}
 <h2 className="absolute top-5 text-cnter text-white px-3 py-2 z-10 font-bold text-2xl capitalize">{ex}</h2> 
</div> 
) }  
)}   
</div> 
</div> 

<div className="top_event mt-8 m-auto xl:w-4/5 lg:w-11/12 px-4 min min-[481px]:px-8" >
<h2 className="py-6 xxs:text-2xl text-3xl font-bold bg-gray-700 text-center text-gray-300 mb-1">Find Events by Genre</h2>
<div className="grid md:grid-cols-3 gap-1 min-[481px]:grid-cols-2">
{Object.keys(eventByArtists).map((ex, i)=> 
{ return( 
<div key={ex + ' ' + i} 
className={`w-full relative ${style.event_categoryBox}`}> 
{Object.values(eventByArtists).flat().map((ux,ix)=> ix === i &&  
<div key={ix}> 
 <Image

 className="h-56 lg:h-64"
src={ux.img_url &&ux?.img_url?.endsWith('.jpg')||ux?.img_url?.endsWith('.jpeg')||ux?.img_url?.endsWith('.png')?`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${ux.img_url}`:'/assets/images/culturays_events.png'}
width={500} 
height={500}
alt={ex}
/> 
 <ul> 
 <Link href={`/naija-events/event/${ux.slug }`}><li title='view event'className="absolute bottom-4 cursor-pointer text-white hover:text-gray-200 px-3 py-2 z-10 font-bold text-lg underline">{ux.title }</li></Link>
  </ul></div>
)}
 
 <h2 className="absolute top-5 text-cnter text-white px-3 py-2 z-10 font-bold text-2xl">{ex.charAt(0).toUpperCase() + ex.slice(1).replace(/-/g," ") }</h2> 
</div> 
) }  
)}   
</div>  
</div> 
 </>)
}

export default NaijaEvents
