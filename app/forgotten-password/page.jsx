 
import { createClient } from "@/utils/supabase/server" 
import { redirect } from "next/navigation"; 
import { Suspense } from "react";
 
const ForgottenPassword = ({searchParams}) => {
 // const [errors, setErrors] = useState({});
     const email_pattern=new RegExp(`^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$`)
      const updatePass=async(e)=>{  
        "use server"
        const formData = new formData(e.currentTarget)
        const supabase = createClient();
        const email = formData.get("email"); 
        
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
             if(error){
              redirect(`/forgotten-password?message=${error}`);
             }
             return redirect("/forgotten-password?message=Check your email to continue!");
              }
              const validateForm = (data) => {
                const errors = {}; 
                if (data.name === 'full_name'&&!name_pattern.test(data.value.trim())) {
                    errors.full_name = 'Username is required';  
                }
                if (data.name === 'email'&&!email_pattern.test(data.value.trim())) {
                  errors.email = 'Please Enter a Correct Email';  
              }
              if (data.name === 'password'&&!password_pattern.test(data.value.trim())) {
                errors.password = 'Password is Incorrect';  
              }
               
                  return errors;
                  };
                  const handleFocus=(e)=>{
                    const newErrors = validateForm(e.currentTarget)
                    //setErrors(newErrors); 
                   return newErrors
                    }
                    const errors =handleFocus()
    return(  
<Suspense>
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
</Suspense>)
}

export default ForgottenPassword

