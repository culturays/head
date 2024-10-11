import { createBrowserClient } from "@supabase/ssr"; 
 
export const createClient = () => 
  createBrowserClient(
 'https://peezrwllibppqkolgsto.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZXpyd2xsaWJwcHFrb2xnc3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MTAyNjUsImV4cCI6MjAyOTQ4NjI2NX0.0JuDSTuZpCa7zPsAhGAyZSBT1bQkwxHMWYhgbC_hMg4', 
  )  
  