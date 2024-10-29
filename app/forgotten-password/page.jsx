import ForgottenPass from "@/components/ForgottenPass";
import { createClient } from "@/utils/supabase/server" 
import { redirect } from "next/navigation"; 
 
const ForgottenPassword = ({searchParams}) => { 
  // const email_pattern =JSON.parse(JSON.stringify(new RegExp(`^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$`))) 
 
      const updatePass=async(e)=>{
        "use server"  
        const formData = new FormData(e.currentTarget)
        const supabase =await createClient();
        const email = formData.get("email"); 
        
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
             if(error){
              redirect(`/forgotten-password?message=Please Enter a Correct Email`);
             }
             redirect("/forgotten-password?message=Check your email to continue!");
              }
              
                
    return(  

<div className="m-0 p-0 bg-gray-900 h-screen flex flex-col items-center justify-center"> 
  <form className="login_form min-w-72 w-96 flex flex-col gap-2.5 bg-gray-800 p-5 rounded tracking-wider relative">
<label className="text-center block text-white text-xl" htmlFor="email">
Email
</label> 
<ForgottenPass/>

  <button formAction={updatePass} type="submit" className="text-white">Reset</button> 
</form>
 
{searchParams?.message && (
<p className="text-white mt-4 bg-foreground/10 text-foreground text-center">
{searchParams.message }
</p>
)} 
   
</div> 

)
}

export default ForgottenPassword

