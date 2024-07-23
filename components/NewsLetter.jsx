'use client'; 
import { useEffect, useState }from "react"  
function NewsLetter() { 
  const [success, setSuccess] = useState({
    succeeded: false, 
  })
const [status, setStatus] = useState(null)  
const [subNm,setSubNm]=useState({
name:'',
email:'', 
})
 
useEffect(()=>{
  if (success) {
    setInterval(()=>{
     setSuccess(success.succeeded)
    },11000) 
    }
   
},[ ])
  const saveForm=async (e)=>{
e.preventDefault()
const form = {name:subNm.name, email:subNm.email }

const response =await fetch('/api/newsletterhandler', {
method: "POST",
headers:{
'Accept': 'application/json',
'Content-Type': 'application/json',
},
body: JSON.stringify(form)
}) 
const content = await response.json() 
  
  if(response.ok){
    setStatus('Success! Thank you for subscribing!')
    setSuccess(!success.succeeded)
   }else{
    setStatus('Error')
    setSuccess(success.succeeded)
   }  
   e.target.reset();
  }
 
    return (
<div className='py-3 w-80 border bg-gray-900 text-gray-200 '> 

 <h2 className="px-4 text-2xl text-cneter font-bold opacity-90 m-2">Unlock the Secrets of Life ...Sign Up</h2>        
<form onSubmit={saveForm} className="flex flex-col max-w-xs p-8">  
<label htmlFor="name" className="font-bold">
Name:
</label>
<input 
id="name"
type="name" 
name="name"
className="p-2 text-sm my-2 focus:outline-none border rounded border-green-500 text-black"
placeholder='name'
onChange={(e)=> setSubNm({...subNm, name:e.target.value} )}
/>
<label htmlFor="email" className="font-bold">
Email:
</label>
<input
required
id="email"
type="email" 
name="email"
className="p-2 text-sm my-2 focus:outline-none border rounded border-green-500 text-black"
placeholder='you@email.com'
onChange={(e)=> setSubNm({...subNm, email:e.target.value} )}
/>
 
<button type="submit" className="bg-gray-800 text-white mt-3 p-2 cursor-pointer font-bold  hover:bg-opacity-80 rounded border" >
  Submit
</button> 
 
{success &&(
<p className="p-4 text-center text-white text-sm text-gray-300">
 {status} 
</p>
)}
{status=== 'Error'&&(
<p className="p-4 text-center text-white text-sm text-gray-300">
{status} There was an error processing your form!
</p>
)}
</form>  
     
 </div>
    );
  }
  export default NewsLetter