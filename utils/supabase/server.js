"use server"
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => { 
  const cookieStore =await cookies();
 
  return createServerClient(
   'https://peezrwllibppqkolgsto.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZXpyd2xsaWJwcHFrb2xnc3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MTAyNjUsImV4cCI6MjAyOTQ4NjI2NX0.0JuDSTuZpCa7zPsAhGAyZSBT1bQkwxHMWYhgbC_hMg4',
    {
      cookies: {
        get(name) {
          return  cookieStore.get(name)?.value;
        }, 
        set(name, value, options) {
          try {
             cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
