"use server"
import {createClient} from "@/utils/supabase/server" 
import {createClient as deleteClient} from "@/utils/supabase/accountDelete" 
import { redirect } from "next/navigation";
export async function getProfile(id){ 
    "use server" 
    const supabase =await createClient();  
    const {data:currentProfile, error, status}= 
    await supabase.from('profiles')
    .select(`full_name, website, avatar_url, password, address, email, education, about`)
    .eq('id', id)
    .single()
    if (error && status !== 406) {
        throw error
      }
     
    return {currentProfile} 
  }
  export async function deleteProfile(id){ 
    "use server" 
    const supabase =await deleteClient();
    const auth_ =await createClient()
    const { error}= await auth_.auth.signOut()
    if (error) {
      throw error
    }
    const { error:deleteErr, status}= 
    await supabase.admin.deleteUser(id)
    if (deleteErr && status !== 406) {
        throw deleteErr
      }
     redirect('/')
  } 
export async function updateProfile({ 
    user,  
    avatar_url, 
    email, 
    education,
    address,
    password,
    website,
    fullname,
    about
  }
   ) {
 "use server"
const supabase= createClient() 
      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,  
        avatar_url, 
        email, 
        education,
        address,
        password,
        website,  
        updated_at: new Date().toISOString(),
        about
      })
      //console.log(error)
      if (error) throw error
      console.log('Profile updated!')
 
  }