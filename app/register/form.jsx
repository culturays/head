'use client'
import { useRouter } from 'next/navigation';
import '../../../styles/globals.scss'

import { useEffect, useRef, useState } from "react"

const RegisterForm = () => {
 const [validData,setValidData]=useState({
    userNameMsg: "Must be only valid characters.",
    emailMsg: "Email is not valid",
    passwordMsg: "Password length is too short or does not include mixed characters.",
    matchingPassWordMsg: "Passwords don't match",
 })
 const [regSuccess,setRegSuccess]=useState('')
 const formRef = useRef();
 const router = useRouter()
const password_pattern=`^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$`
const [focused,setFocused]=useState(false) 

  const dataSubmit=async(e)=>{
        e.preventDefault() 
        e.stopPropagation()   
        const formData= new FormData(e.currentTarget)
       //gdh@hfjFGT2345''
 const response = await fetch('/api/auth/register',{ 
            method:"POST",
            body:JSON.stringify({
                email:formData.get('email'),
                password:formData.get('password'),
            }),
            headers: { 'content-type': 'multipart/form-data' }
            
        })
  
   if(!response?.ok){
  const res = await response.json()
  console.log(res.message)
   }else{
    const res = await response.json()
    setRegSuccess(res.message)
    console.log(res.message)
   
   }
formRef?.current?.reset()
setValidData('')
        }
 
const handleFocus=(e )=>{
    if(e.currentTarget.name==='email'){
        setFocused(true)
        setValidData({...validData, passwordMsg: ''})
    }else if(e.currentTarget.name==='password'){
        setFocused(true) 
        setValidData({...validData, passwordMsg:"Please enter correct values."})
    }
    
}

  return (<>
  
 <form onSubmit={dataSubmit}ref={formRef}>
        {/* <label>Username</label>
        <input 
        name="username"
        type="username"
        pattern="^[A-Za-a0-9]{3-16}$"
 /> <span className="msgSpan">{regForm.emailMsg}</span> */}

  <label>Email</label>
<input
    name="email"
    type="email"
   // required={validData.emailMsg}
    onBlur={(e) =>handleFocus(e )} 
    data-focused={focused }
/>
<span>{validData.emailMsg}</span>
<label>Password</label>  
  <input
    name="password"
    type="text"
   // required={validData.passwordMsg}
    pattern={password_pattern}
    onBlur={(e) =>handleFocus(e )} 
    data-focused={focused}
/>
<span>{validData.passwordMsg}</span> 

    {/* <label>Confrim Password</label> <input
       name="password"
      type="password"
      pattern={values.password} can't be uses with fromdata. Has to be a state form value to use the same password
       />
        <span className="msgSpan">{regForm.confirmPassWordMsg}</span> */}
        <button type="submit">Register</button>
    </form>

    <p>{regSuccess}</p>
   </>
  )
}

export default RegisterForm
