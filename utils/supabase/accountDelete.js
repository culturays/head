import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
 
export const createClient = () => {
const cookieStore = cookies();
 const supabaseClient = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_SECRET, 
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
    }
  ) 
  return supabaseClient.auth;
};