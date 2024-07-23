import React from 'react'
 import { createClient } from "@/utils/supabase/server"
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
const resetPage = ({searchParams}) => {   
  const password_pattern=new RegExp(`^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$`)
  const email_pattern=new RegExp(`^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$`)
  const name_pattern=new RegExp(`^[A-Za-z0-9]{3,10}$`) 
  const [passType, setPassType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);
  
  const handleToggle = (textPass) => {
  if (passType===textPass){
    setIcon(faEyeSlash);
    setPassType('text') 
  } else { 
    setIcon(faEye)
    setPassType(textPass)
  }
  }
  const [errors, setErrors] = useState({});
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
      setErrors(newErrors); 
     
      } 
const updateData=async(formData)=>{
"use server"; 
const supabase = createClient();
const email = formData.get("email");
const password = formData.get("password") ;
const full_name = formData.get("full_name")  
const origin = headers().get("origin");
const { data, error } = await supabase.auth.updateUser({
email,
password ,
data: { full_name }
}) 
if(error){
redirect(`/forgotten-password?message=${error}`);
}
revalidatePath('/', 'layout')     
return redirect( `/` );
}


  return (
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
      <label className="text-md block text-white text-xl" htmlFor="password">
     New Password
    </label>
    <input
      className="rounded-b-sm border-solid p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white"
      name="password"
      placeholder="••••••••••••••"
      type={passType}
pattern={password_pattern}
required={errors.password}
onBlur={(e) =>handleFocus(e )} 
 data-focused={focused } 
    />
{errors.password &&
<span className="text-red-600">
{errors.password}
</span>
}
{errors.password&&
<ul className="text-white m-4">
<li className="list-disc p-1">At least two uppercase letters.</li>
<li className="list-disc p-1">At least one special character from the set !@#$&*.</li>
<li className="list-disc p-1">At least two digits.</li>
<li className="list-disc p-1">At least three lowercase letters.</li>
<li className="list-disc p-1">Length between 8 and 20 characters.</li>
</ul>}

<span className="absolute top-40 mt-2 left-3/4 cursor-pointer" onClick={()=>handleToggle("password")}>
<FontAwesomeIcon className="mr-10 text-gray-600" icon={icon} width={25}/>
</span> 
 
    <button formAction={updateData} type="submit" className="text-white">Submit</button>
    </form>
    {searchParams?.message && (
  <p className="text-white mt-4 bg-foreground/10 text-foreground text-center">
    {searchParams.message}
  </p>
)} 

   </div>  
  )
}

export default resetPage
