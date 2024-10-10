'use client' 
import { useState } from "react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons'
import { SubmitButton } from "./submit-button";   
import Link from "next/link";

const LoginForm = ({ handleOauthLogin, signUp, signIn, searchParams}) => {
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
      errors.full_name = 'Username is Incorrect';  
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
  
return (  
<> 
<form className="login_form min-w-72 w-96 flex flex-col gap-2.5 bg-gray-800 p-5 rounded tracking-wider relative" noValidate>
<label className="text-md block text-white text-xl" htmlFor="full_name">
Username
</label>
<input
className='login_input border-0 focus:outline-none rounded-b-sm border-solid p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white tracking-wider'
name="full_name"
placeholder="Username"
type="text"
pattern={name_pattern}
required={errors?.full_name}
onBlur={(e) =>handleFocus(e)}  
/>
{errors.full_name &&
  <span className='text-red-600'>{errors.full_name}</span>
 }

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
<span className="text-red-600">
{errors.email}
</span>
 }
<div className="relative"> 
<label className="text-md block text-white text-xl" htmlFor="password">
Password
</label>
<input
className="login_input rounded-b-sm w-full border-solid border-0 focus:outline-none p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white "
name="password"
placeholder="••••••••••••••"
type={passType}
pattern={password_pattern}
required={errors.password}
onBlur={(e) =>handleFocus(e)} 
 
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

<span className="absolute right-11 top-8 mt-2 cursor-pointer" onClick={()=>handleToggle("password")}>
<FontAwesomeIcon className="text-gray-600" icon={icon} width={25}/>
</span> 
</div> 
 
<div className='flex justify-end items-center gap-2.5 btn-link'> 
{!errors.full_name ||!errors.email ||!errors.password? 
<SubmitButton
formAction={signIn}
className="rounded-md px-4 py-2 text-foreground mb-2"
pendingText="Signing In..."
>Sign In

</SubmitButton>:null}
{!errors.full_name ||!errors.email ||!errors.password?
 <SubmitButton
formAction={signUp}
className="text-white border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
pendingText="Signing Up..."
>
Create Account
</SubmitButton>:null}
</div> 
{searchParams?.message && (
<p className="text-white mt-4 bg-foreground/10 text-foreground text-center">
Invalid Login
</p>
)} 
 <hr />
  <small className="text-white text-center cursor-pointer text-lg">or </small> 
 <button type="submit" formAction={handleOauthLogin} className="bg-tranparent"><p className="text-white cursor-pointer p-2 text-lg bg-gray-700 p-2">Sign in with Google</p></button>
 </form> 
 <Link href='/forgotten-password'><p className="p-4 my-8 text-white cursor-pointer text-center bg-gray-600 text-lg">Forgot Password?</p></Link>  
  </> )
}
 
export default LoginForm
