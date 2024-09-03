"use client" 

import { createClient } from "@/utils/supabase/client" 
import { useRouter, useSearchParams } from "next/navigation"; 
import { useState } from "react";
const ForgottenPassword = () => {
 const [errors, setErrors] = useState({});
 const searchParams = useSearchParams()
 const router = useRouter()
     const email_pattern=new RegExp(`^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$`)
      const updatePass=async(e)=>{  
        const formData = new formData(e.currentTarget)
        const supabase = createClient();
        const email = formData.get("email"); 
        
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
             if(error){
               router.push(`/forgotten-password?message=${error}`);
             }
             return router.push("/forgotten-password?message=Check your email to continue!");
              }
              const validateForm = (data) => {
                const errors = {};  
                if (data.name === 'email'&&!email_pattern.test(data.value.trim())) {
                  errors.email = 'Please Enter a Correct Email';  
              } 
                  return errors;
                  };
                  
                  const handleFocus=(e)=>{
                    const newErrors = validateForm(e.currentTarget)
                    setErrors(newErrors); 
                   
                   return newErrors
                    }
                
    return(  

<div className="m-0 p-0 bg-gray-900 h-screen flex flex-col items-center justify-center"> 
  <form className="login_form min-w-72 w-96 flex flex-col gap-2.5 bg-gray-800 p-5 rounded tracking-wider relative">
<label className="text-md block text-white text-xl" htmlFor="email">
Email
</label>
<input
className='login_input border-0 focus:outline-none rounded-b-sm border-solid p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white tracking-wider'
name="email"
type="text"
placeholder="you@email.com"
pattern={email_pattern}
required={errors.email}
onBlur={(e) =>handleFocus(e)}  
/>

{errors.email &&
<span className='text-red-600'>{errors.email}</span>
}
<button formAction={updatePass} type="submit" className="text-white">Reset</button>
</form>
 
{searchParams?.message && (
<p className="text-white mt-4 bg-foreground/10 text-foreground text-center">
{searchParams.message}
</p>
)} 
   
</div> 

)
}

export default ForgottenPassword

