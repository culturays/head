'use server' 
import { createClient } from '@/utils/supabase/server'

// const childView = async () => { 
//   const supabase = createClient();  
//   const { data:comment_ex, error} = await supabase
//   .from('comments') 
//   .select('*') 
//   .eq('id', comment.id)
//   .order('id', { ascending: true })
//   .range(0,2)
//   if (error) {  
//   console.error('Error fetching posts:', error );
//   return;
//   }
     
//   return comment_ex
//   } 


export const getComments = async (offset , limit, post) => {

    try{
        const supabase = createClient() 
        const { data:comments , error } = await supabase 
        .from('comments')
        .select('*')
        .eq('post_id', post.id) 
        .range(offset, limit)         
         //console.log(error)
         //revalidatePath('/forum') 
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
   