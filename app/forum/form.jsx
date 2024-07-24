'use client' 
import { SubmitButton } from "./submit-button";
const Form = ({searchParams, create}) => {
 
  return (
<>  
<form className='relative bg-transparent' >  
<textarea
rows="2"
cols="50"  
type='text'
name='title'
className=''
placeholder="Say what you think!"
/>
<div className='flex justify-end items-center gap-2.5 btn-link'> 
  
    <SubmitButton
      formAction={create}
      className="text-white border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
      pendingText="Creating..."
    >
      Create
    </SubmitButton>
    </div> 
   
</form> 
{searchParams?.message && (
<p className="text-white mt-4 bg-foreground/10 text-foreground text-center">
  {searchParams.message}
</p>
)}
 </> 
  )
}

export default Form
