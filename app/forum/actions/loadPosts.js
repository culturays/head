'use server' 
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export const getPosts = async (offset , limit ) => {
    try{
        const supabase = createClient() 
        const { data:posts , error } = await supabase 
        .from('posts')
        .select('*') 
        .range(offset,limit) 
         //revalidatePath('/forum')
        if(error)  throw new Error('No Data Returned')
       return posts
      
      }catch(err){
        if(err) return
      } 
}

export async function getRelatedPosts(keyword) {
const cleanKey= keyword
const textSearch1= cleanKey.split(' ')[0]
const textSearch2= cleanKey.split(' ')[1]
const textSearch3= cleanKey.split(' ')[2]
const textSearch4= cleanKey.split(' ')[3]
const supabase = createClient()
const { data, error } = await supabase
  .from('posts')
  .select('*') 
  .ilike('title', `%${textSearch1}%`, `%${textSearch2}%`, `%${textSearch3}%`, `%${textSearch4}%`) 
  if (error) {
    return [] 
    // console.error(error)
    //  throw new Error('No Data Returned')
  }
  
  return data
} 

