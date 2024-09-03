import Link from "next/link"
import { createClient } from ".././../utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache"; 
import NewsLetter from "@/components/NewsLetter"; 
import AuthButton from "@/components/AuthButton"; 
import SearchItems from "@/components/SearchItems"; 
import {getNaijaEvents1, getNaijaEvents2 , events1Details, getNaijaEvents3, events3Details } from "@/app/naija-events/eventData/eventContent";
import { getNaijaTrends1 } from "../api/trends/naija";
import { getGoogleNewsTitles } from "../api/news/route"; 
import { netFlixData } from "../naija-wiki/filmsdata";  
import { processImages } from "@/utils/processImages";
import { replaceSpecialCharacters } from "@/utils/replacechar";
import { getPosts } from "./actions/loadPosts";
import Main from "@/components/forum/Main";  
import { searchValues } from "../lib/searches/search";
import { popPeople, getPeople } from "./peopledata";
 //const pxl= await popPeople()
 export const revalidate = 3
 const INITIAL_NUMBER_OF_POSTS = 2
const MONGOKEY = process.env.MONGODB_;

const Forum = async({searchParams, params}) => {
const supabase = createClient()    
const {
data: { user }, 
} = await supabase.auth.getUser(); 

const forumBdays =async ()=>{
  const { data: bday, error } = await supabase
  .from('bday')
  .select('*')
  if(error)throw new Error('An Error has Occured')
  return bday
}

 const bday =await forumBdays()
const peopleEls = bday  
const peopleItems =JSON.parse(JSON.stringify(peopleEls))
const postsItems =async()=>{ 
  const initialPosts = await getPosts(0, INITIAL_NUMBER_OF_POSTS)  
  return initialPosts  
} 
const query = searchParams?.name;
const eventExp = await getNaijaEvents3()

// // const rapidGTrends = await googleTr()
 const postSearch=await searchValues(query)
 const confirmParam= searchParams.confirm 
 
 const dailyEv3 =async()=>{ 
const result = await Promise.all(eventExp.titleAObj.map(async one=> {  
const evData = await events3Details(one.atitle)

return evData 
 }))

const grouped={}

 const data = result.map((ex)=> ex.data) 
for (const ez of data ) {
  for (const ex of ez ) { 
    if (ex.title !== undefined){
    grouped['title']||=[]
   grouped.title=ex.title.replace(/\t/g, '').replace(/\n/g, '')
    
  }
  if (ex.slug !== undefined){ 
   grouped.slug=replaceSpecialCharacters(ex.slug.replace(/’/g, "").replace(/&/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/ /g,"-"))  
    
  } 
 //&& (ex.imgMime.includes('.jpg')|| ex.imgMime.includes('.png'))
  if (ex.imgMime !== undefined ){   
    grouped.img_url=ex.imgMime 
     
   } 
   if (ex.desc !== undefined ){ 
    grouped.desc=ex.desc  
     
   }
   if (ex.day !== undefined ){ 
    grouped.day=ex.day 
      
   }
      if (ex.venSlug !== undefined ){ 
    grouped.loc_slug=replaceSpecialCharacters(ex.venSlug.replace(/’/g, "").replace(/&/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/ /g,"-").replace(/,/g,""))  
     
   } 
  //  if (ex.cost !== undefined ){ 
  //   grouped.genre=ex.cost.replace(/\t/g, '').replace(/\n/g, '').replace(/’/g, "").replace(/&/g, "").split(',').join(' ')
  //  } 
   if (ex.gnr !== undefined ){ 
    grouped.genre=replaceSpecialCharacters(ex.gnr.replace(/’/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/&/g, ""))   
     
   } 
   if (ex.gnrSlug !== undefined ){ 
    grouped.genre_slug=replaceSpecialCharacters(ex.gnrSlug.replace(/’/g, "").replace(/&/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/ /g,"-").replace(/,/g,""))  
     
   } 
  //  if (ex.cost !== undefined ){ 
  //   grouped.genre=ex.cost.replace(/\t/g, '').replace(/\n/g, '').replace(/’/g, "").replace(/&/g, "").split(',').join(' ')
  //  } 
   if (ex.ven !== undefined ){ 
    grouped.location=replaceSpecialCharacters(ex.ven.replace(/’/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/&/g, ""))   
     
   } 
  } 

   try {    
        
    const { data, error } = await supabase
      .from('events')
      .insert([grouped])
      .select()
                  
    if (error) {
      console.error('Error inserting event:', error);
    } else {
      // console.log('Inserted event:', data); 
   }                           
} catch (error) {
  console.error('Unexpected error:', error);
} 
} 
 console.log('it ran')
  } 
 
const daily_intervals =  ()=> {
  //dailyEv3();  7 * 24 * 60 * 60 * 1000
  const intervalId = setInterval(()=>{ 
    dailyEv3()
  }, 7 * 24 * 60 * 60 * 1000);
  return () => {
    clearInterval(intervalId);
  };
}
const stopDailyInterval = daily_intervals();
setTimeout(() => {
  stopDailyInterval(); 
 }, 20000);

const forumEvents =async ()=>{  
  const supabase = createClient() 
  const { data:events , error } = await supabase 
.from('events')
.select('*') 
.order('id', { ascending: false })  
return {events} 

}
const {events} =await forumEvents()
 const trends =await getNaijaTrends1('NG')
 const initialPosts=await postsItems()
 
//const ix =await getGoogleNewsTitles('Lagos, Nigeria');
//const ix =await netFlixData() 
return ( 
<div className=""> 
 <Main  
user={user}
trends={trends}
events={events}
initialPosts={initialPosts}
bday={bday} 
 
/>  
 </div> 
 

  )
}

export default Forum