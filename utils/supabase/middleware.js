 "use server"
import { createServerClient, CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedPath= ['/forum','/profile']
export const updateSession = async (request) => {  
    // let response = NextResponse.next({
    //   request: {
    //     headers: request.headers,
    //     path: request.nextUrl.pathname,
    //   },
    // });
  
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    }) 
    
   
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return request.cookies.get(name)?.value
          },
          set(name, value, options) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name, options) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )
    response.headers.set('x-url', request.url)
    response.headers.set('pathname', request.url)
    //response.headers.set('searchParams', request.nextUrl.searchParams ||'no value')
   
   return {response, supabase };
};

 