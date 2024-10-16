import { createClient } from '@/utils/supabase/server' 
import { redirect } from 'next/navigation' 

export async function GET(req) { 
  const supabase = createClient() 
  const {
    data: { user },
  } = await supabase.auth.getUser() 
  
  if (user) { 
    const { error } = await supabase.auth.signOut()
if(error)throw new Error('Error Logging Out')
   
  }

 // revalidatePath('/', 'layout') 
  return redirect('/login' );
  
}