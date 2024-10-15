import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache' 
import { NextResponse } from 'next/server'

export async function POST(req) { 
  const supabase = createClient() 
  const {
    data: { user },
  } = await supabase.auth.getUser() 
  
  if (user) { 
    const { error } = await supabase.auth.signOut()
if(error)throw new Error('Error Logging Out')
   
  }

  revalidatePath('/', 'layout') 
  return NextResponse.redirect('/login', {
    status: 302,
  });
  
}