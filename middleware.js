 
import { NextResponse } from 'next/server'
import { updateSession } from "./utils/supabase/middleware"; 
export async function middleware(request) {
const { response, supabase } = await updateSession(request); 
 const { data: { user } } = await supabase.auth.getUser();  
 const path = new URL(request.url).pathname;  
 response.headers.set('confirm', request.nextUrl.searchParams ||'no value')
 if (path === "/") return response;       
  const unprotectedPaths = ["/login", "/forgotten-password", "/reset"]; 
  const isUnprotectedPath = unprotectedPaths.some((up) => path.startsWith(up));
   if (user && isUnprotectedPath) {
   return NextResponse.redirect(new URL("/", request.url));
  }
  // if (!user && path ==="/login") { 
  //  return NextResponse.redirect(new URL("/login", request.url));
  // }
  if (!user && path ==="/forgotten-password") { 
   return NextResponse.redirect(new URL("/forgotten-password", request.url));
  }
  if (!user && path ==="/reset") { 
    return NextResponse.redirect(new URL("/forgotten-password", request.url));
   }
  
   return response
}

export const config = {
  matcher: [{source:"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"}]
};

 
 