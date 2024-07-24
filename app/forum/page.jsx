import Link from "next/link"
import { createClient } from ".././../utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache"; 
import { MongoClient } from "mongodb"; 
import NewsLetter from "@/components/NewsLetter"; 
import AuthButton from "@/components/AuthButton"; 
import SearchItems from "@/components/SearchItems"; 
import {getNaijaEvents1, getNaijaEvents2 , events1Details, getNaijaEvents3, events3Details } from "@/app/api/eventData/eventContent";
import { getNaijaTrends1 } from "../api/trends/naija";
import { getGoogleNewsTitles } from "../api/news/route"; 
import { netFlixData } from "../filmsdata"; 
import axios from  'axios' ; 
import { processImages } from "@/utils/processImages";
import { replaceSpecialCharacters } from "@/utils/replacechar";
import { getPosts } from "./actions/loadPosts";
import Main from "@/components/forum/Main"; 
import { Suspense } from "react";
 export const revalidate = 3
 const INITIAL_NUMBER_OF_POSTS = 2
const MONGOKEY = process.env.MONGODB_;

const Forum = async({searchParams, params}) => {
const supabase = createClient()    
const {
data: { user }, 
} = await supabase.auth.getUser(); 

// // const client = await MongoClient.connect(`mongodb+srv://teech:${MONGOKEY}@cluster0.pmxgu.mongodb.net/peopledb?retryWrites=true&w=majority`)
// // const dbs= client.db() 
// // const peopleX = await dbs.collection('peopledata').find({}).toArray()
// // const peopleEls = await dbs.collection('bd').find({}).toArray() 
// // const exPPL= peopleX.map((tx)=>tx.ngeX)
// // const ppEL=peopleEls.map((tx)=>tx.diff)
// // client.close()
 
// ///api/auth/signin?callbackUrl=/forum
 
const peopleItems =[]
const postsItems =async()=>{ 
  const initialPosts = await getPosts(0, INITIAL_NUMBER_OF_POSTS)  
  return initialPosts  
} 
const query = searchParams?.name;
const searchValues = async () => { 
const supabase = createClient();  
const { data, error } = await supabase
.from('posts')
.select("*")
.filter('title', 'ilike', `%${query}%`);

if (error) {
console.error('Error fetching posts:', error.message);
return;
} 
return data
}
 
 
  const eventExp = await getNaijaEvents3() 
// // const rapidGTrends = await googleTr()
 const postSearch=await searchValues()
 const confirmParam= searchParams.confirm 
 
 const dailyEv3 =async()=>{ 
// // const result = await Promise.all(eventExp.titleAObj.map(async one=> {  
// // const evData = await events3Details(one.atitle)

// // return evData 
// //  }))

// // const grouped={}
// //  const data = result.map((ex)=> ex.data) 
// // for (const ez of data ) {
// //   for (const ex of ez ) { 
// //     if (ex.title !== undefined){
// //     grouped['title']||=[]
// //    grouped.title=ex.title.replace(/\t/g, '').replace(/\n/g, '')
    
// //   }
// //   if (ex.slug !== undefined){ 
// //    grouped.slug=replaceSpecialCharacters(ex.slug.replace(/’/g, "").replace(/&/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/ /g,"-"))  
    
// //   } 
// //  //&& (ex.imgMime.includes('.jpg')|| ex.imgMime.includes('.png'))
// //   if (ex.imgMime !== undefined ){   
// //     grouped.img_url=ex.imgMime 
     
// //    } 
// //    if (ex.desc !== undefined ){ 
// //     grouped.desc=ex.desc  
     
// //    }
// //    if (ex.day !== undefined ){ 
// //     grouped.day=ex.day 
      
// //    }
// //       if (ex.venSlug !== undefined ){ 
// //     grouped.loc_slug=replaceSpecialCharacters(ex.venSlug.replace(/’/g, "").replace(/&/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/ /g,"-").replace(/,/g,""))  
     
// //    } 
// //   //  if (ex.cost !== undefined ){ 
// //   //   grouped.genre=ex.cost.replace(/\t/g, '').replace(/\n/g, '').replace(/’/g, "").replace(/&/g, "").split(',').join(' ')
// //   //  } 
// //    if (ex.gnr !== undefined ){ 
// //     grouped.genre=replaceSpecialCharacters(ex.gnr.replace(/’/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/&/g, ""))   
     
// //    } 
// //    if (ex.gnrSlug !== undefined ){ 
// //     grouped.genre_slug=replaceSpecialCharacters(ex.gnrSlug.replace(/’/g, "").replace(/&/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/ /g,"-").replace(/,/g,""))  
     
// //    } 
// //   //  if (ex.cost !== undefined ){ 
// //   //   grouped.genre=ex.cost.replace(/\t/g, '').replace(/\n/g, '').replace(/’/g, "").replace(/&/g, "").split(',').join(' ')
// //   //  } 
// //    if (ex.ven !== undefined ){ 
// //     grouped.location=replaceSpecialCharacters(ex.ven.replace(/’/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/&/g, ""))   
     
// //    } 
// //   } 
 
// //    try {    
        
// //   //   const { data, error } = await supabase
// //   //     .from('events')
// //   //     .insert([grouped])
// //   //     .select();
                                          
// //   //   if (error) {
// //   //     console.error('Error inserting event:', error);
// //   //   } else {
// //   //     // console.log('Inserted event:', data); 
// //   //  }                           
// // } catch (error) {
// //   console.error('Unexpected error:', error);
// // } 
// // } 
 
  } 
  dailyEv3()
 
const forumEvents =async ()=>{  
  const supabase = createClient() 
  const { data:events , error } = await supabase 
.from('events')
.select('*')
return {events} 

}
const {events} =await forumEvents()
 const trends =await getNaijaTrends1('NG')
 const initialPosts=await postsItems()
 
//const ix =await getGoogleNewsTitles('Lagos, Nigeria');
//const ix =await netFlixData() 

return (

 <div >
 <AuthButton confirmParam={confirmParam} />  
<div className='thoughts-text bg-culturaysBg text-white p-8 text-center '> 
<p className="text-2xl">Welcome! Drop your story and get replies from other creatives! </p>  
</div>
<div className=""> 
<div className="flex-1 w-full flex flex-col gap-10">
<div className="w-full border-b border-b-foreground/10">
      
</div> 
</div>  
    <SearchItems searchVal={query} itemSearches={postSearch} />  
 
<Main  
user={user}
trends={trends}
events={events}
initialPosts={initialPosts}
peopleItems={peopleItems}
 //ppEL={ppEL} 
/>  
 </div> 
 </div> 

  )
}

export default Forum