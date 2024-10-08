import { getUserPosts } from "@/app/forum/actions/postsActions"; 
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";   
import Profile from "@/components/Profile";
import { getProfile } from "../profileActions";
const INITIAL_NUMBER_OF_POSTS = 2
  

export async function generateMetadata({ params, searchParams }, parent) {

    const supabase = createClient();  
    const {
      data: { user }, 
      } = await supabase.auth.getUser(); 

 const previousImages = (await parent).openGraph?.images || [] 
 
  return {
    title:`Culturays | ${user?.user_metadata.full_name}`,
    openGraph: {
    images: [user?.user_metadata.picture],
    },
  }
}
const UserPage =async({searchParams, params}) => {
  const id = params.id
  const supabase = createClient()    
  const {
  data: { user }, 
  } = await supabase.auth.getUser();  

  const {currentProfile} = await getProfile(id)
 
  if(!currentProfile){
    notFound()
  }

  const userItems =async()=>{ 
    const initialPosts = await getUserPosts(0, INITIAL_NUMBER_OF_POSTS, id)  
    return initialPosts  
  }
  const userPosts = await userItems() 
 
  return (
    <div>      
  <Profile
     profile={currentProfile}
     user={user}
     userPosts={userPosts} 
     />  
    </div>
  )
}

export default UserPage
