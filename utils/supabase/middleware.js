"use server"
import { createServerClient, CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const protectedPath= ['/forum','/profile']
export const updateSession = async (request) => { 
 
    let response = NextResponse.next({
      request: {
        headers: request.headers,
        path: request.nextUrl.pathname,
      },
    });

const supabase = createServerClient(   
      process.env.NEXT_PUBLIC_SUPABASE_URL,  
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
       
          get(name ) { 
            return request.cookies.get(name)?.value;
          },
          set(name , value , options ) { 
            request.cookies.set({
              name,
              value,
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            request.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name , options ) { 
            request.cookies.set({
              name,
              value: "",
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            request.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
  //  const {data}= await supabase.auth.getSession();
  //  const url = new URL(request.url)
  //  if(data.session){
  //   if(url.pathname==="/login"){
  //     return NextResponse.redirect(new URL('/forum', request.url))
  //   }
  //   return response;
  //  }else{
  //   if(protectedPath.includes(url.pathname)){
  //     return NextResponse.redirect(new URL("/login?next="+url.pathname, request.url))
  //   }
  //   return response
  //  }

   return {response, supabase};
};
