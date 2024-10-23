import { createClient } from ".././../utils/supabase/server"; 
import { getNaijaTrends1 } from "../api/trends/naija";
import { getPosts } from "./actions/loadPosts";
import Main from "@/components/forum/Main";  
import { searchValues } from "../lib/searches/search"; 
 export const revalidate = 3600
 const INITIAL_NUMBER_OF_POSTS = 2 

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
// // const rapidGTrends = await googleTr()
 const postSearch=await searchValues(query)
 const confirmParam= searchParams.confirm 

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