"use server" 
import { createClient } from "@/utils/supabase/server" ;

export const getUserPosts = async (offset,limit, id) => {

  try{
    "use server"
    const supabase = createClient();  
      const { data:posts , error } = await supabase 
      .from('posts')
      .select('*')
      .eq('user_id', id)
     .range(offset,limit)  
       //revalidatePath('/forum') 
     return posts
    
    }catch(err){
      if(err) return
    } 
} 
 
 