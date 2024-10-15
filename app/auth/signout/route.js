import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache' 
import { NextResponse } from 'next/server'

export async function POST(req) { 
  const supabase = createClient() 
  const {
    data: { user },
  } = await supabase.auth.getUser() 
  
  if (user) {
    await supabase.auth.signOut({
      options: {
        callbackUrl: '/',
        
      },
    })
   
  }

  revalidatePath('/', 'layout')
  console.log(req.url)
 return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  }) 
}