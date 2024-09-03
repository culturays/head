"use client"
import { useState } from "react";
import LoginForm from "@/app/login/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { usePagesContext } from "../Pages-Context";
 import { signIn, signUp, handleOauthLogin } from "@/app/modalLogin";
import { useSearchParams } from "next/navigation";
const LoginModal = ({setUserActions} ) => { 
 const [current, setCurrent] = useState(true); 
 const searchParams= useSearchParams()
const closeActions=()=>{
  setCurrent(false) 
  setUserActions(prev=> !prev)
}
  return (
  <div className="p-8 bg-gray-800 bg-opacity-40 m-auto z-10 h-full -top-1 fixed z-10 w-full left-0 text-center flex flex-col items-center justify-center"> 
 <p className="text-5xl text-gray-600 absolute top-0 right-0 m-5 cursor-pointer"onClick={closeActions} ><FontAwesomeIcon icon={faClose}/></p> 
  {current &&
  <LoginForm 
 signUp={signUp} 
 signIn={signIn} 
 searchParams={searchParams}
 handleOauthLogin={handleOauthLogin}
 /> }  
 
</div>
  )
}

export default LoginModal
