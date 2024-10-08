'use server' 
import { createClient } from '@/utils/supabase/server' 
export const getComments = async (offset , limit, post) => {

    try{
        const supabase = createClient() 
        const { data:comments , error } = await supabase 
        .from('comments')
        .select('*')
        .eq('post_id', post.id) 
        .range(offset, limit) 
       return comments
      
      }catch(err){
        if(err) return
      }
  
  }
   
  export const getChildComments = async (comment ) => {
   
    try{
        const supabase = createClient() 
        const { data:comments , error } = await supabase 
        .from('comments')
        .select('*')
        .eq('parent_id', comment.id) 
        .single()
       // .range(offset,limit) 
         //revalidatePath('/forum') 
       return comments
      
      }catch(err){
        if(err) return
      }
  
  }
   