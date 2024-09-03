import LoginForm from "./form"
import { redirect } from "next/navigation"
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";  
import Link from "next/link";
import { compare, hash } from "bcrypt"
import { revalidatePath } from "next/cache"; 
import { Suspense } from "react";
const Login =async ({searchParams} ) => {
  const getURL = () => {
    let url = 
      process?.env?.NEXT_PUBLIC_BASE_URL ??  
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 
      'http://localhost:3000/'
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    return url
  }
  

const signIn = async (formData ) => {
  "use server"; 
const email = formData.get("email");
const password = formData.get("password")  
const supabase = createClient();
  const origin = headers().get("origin"); 
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password ,
  }); 
  if (error) {
     console.log(error)
    return redirect("/login?message=Could not authenticate user");
  }
   console.log('successfull')
 revalidatePath('/') 
  return redirect( `${origin}` ); 
  // return redirect("/protected"); `${origin}/auth/callback` ,
};
 
 
const signUp = async (formData) => {
  "use server";
  const origin = headers().get("origin");
  const email = formData.get("email");
  const password = formData.get("password") ;
  const full_name = formData.get("full_name") ;
 
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password, 
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name, 
      },
    },
  }); 
  if (error) {
    console.log(error)
    return redirect(`/login?message="${error}"`);
  }

  revalidatePath('/', 'layout')
  return redirect("/login?message=Check email to continue the sign in process");
};

const handleOauthLogin = async () => {
  'use server';
  const origin = headers().get("origin"); 
 const supabase = createClient(); 
   const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',  
  options: { 
  redirectTo:`${origin}/auth/callback` ,
 }, 
   })
  if (error) {
    console.log(error)        
 }
 return redirect(data.url);
};


  return ( 
<div className='m-0 p-0 bg-gray-900 h-screen flex flex-col items-center justify-center'> 
  <div className=''> 
<div>
  <Link 
  href='\' 
className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground text-white bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
> 
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
>
  <polyline points="15 18 9 12 15 6" />
</svg>{" "}
Back 
</Link>
</div> 
<LoginForm  
signUp={signUp} 
signIn={signIn} 
searchParams={searchParams}
handleOauthLogin={handleOauthLogin}
 /> 
</div>  
</div>

)
}

export default Login
