"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
const Form= ( ) => {
  const router = useRouter()
  const [formData, setFormData]= useState({})
  const [errMsg, setErrMsg]= useState(null)
  const [successMsg, setSuccessMsg]= useState(null)

const dataChange=(e)=>{ 
const value = e.target.value
const name = e.target.name

setFormData((prevData)=>({
...prevData,
  [name]:value
}) )
}


const handleSubmit= async (e)=>{
  e.preventDefault()
  const res = await fetch("/api/auth/users",{
    method:"POST",
    body:JSON.stringify({formData}),
    "Content-Type": "application/json"
  })
 
  if(!res.ok){
    const response = await res.json() 
    setErrMsg(response.message)
    router.refresh()
  }else{
   
      const response = await res.json() 
    setSuccessMsg(response.message)
     
       router.refresh()
   router.push('/forum')
  }
 
  setFormData('')
}
 
    return (
      <> 
      <form
      className=""
      onSubmit={handleSubmit}
      method="post"
      >
        <label className="text-white block">Email</label>
        <input
        name="email"
        value={formData.email || ''}
        type="email"
         required={true}
        onChange={dataChange}
        />
         <label className="text-white block">Password</label>
          <input
        name="password"
        value={formData.password ||''}
        type="password"
         required={true}
        onChange={dataChange}
        />
        <input 
        type="submit"
        value="Add New"
        
        />
      </form>
 {errMsg?.message?
  <p>{errMsg?.message}</p>:  
  <p>{successMsg}</p>
   }
 
      </>
    )
  }
  
  export default Form