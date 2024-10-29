'use server'
import { redirect } from "next/navigation"
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const signIn = async (formData ) => {
    "use server"; 
  const email = formData.get("email");
  const password = formData.get("password") ; 
  const supabase =await createClient();
  const origin =await headers().get("origin");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
   return redirect( `${origin}` );
    // return redirect("/protected"); `${origin}/auth/callback` ,
  };
   
   
  export const signUp = async (formData) => {
    "use server";
    const origin =await headers().get("origin");
    const email = formData.get("email");
    const password = formData.get("password") ;
    const supabase =await createClient();
   
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}`,
        // data: {
        //   username: '', 
        // },
      },   
    });
  
    if (error) { 
      return redirect(`/login?message="${error}"`);
    }
  
    return redirect("/login?message=Check email to continue sign in process");
  };
  
 export const handleOauthLogin = async () => {
    'use server';
    const origin =await headers().get("origin"); 
   const supabase =await createClient(); 
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
   