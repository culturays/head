'use client' 
import { useEffect, useRef } from "react";
import { SubmitButton } from "./submit-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faFile, faFileImage,faImage } from "@fortawesome/free-regular-svg-icons";
  
const CreateForm = ({createPost, postEdit, post, val }) => { 
  
 const clearRef= useRef() 
 useEffect(() => {
  if(val=== 'Post Created Successfully'||val=== 'Post Updated Successfully' || val=== 'There was an error. Please try again!'){
    clearRef.current.reset();
  
  } 

}, [createPost, postEdit]);
 
  return (
<> 
<form className='relative bg-transparent' ref={clearRef} > 
<input  
type='text' 
name='title' 
className='post-view bg-inherit shadow-3xl focus:outline-none resize-none inherit border-none mt-1 w-full p-6 leading-normal text-gray-500 rounded'
placeholder="Give your story a short title"
defaultValue={post?.title ||''}
/>
<textarea 
rows="4"
cols="50"   
type='text' 
name='story' 
className='post-view shadow-3xl bg-inherit focus:outline-none resize-none inherit border-none mt-1 w-full p-6 leading-normal text-gray-500 rounded'
placeholder="Tell your story. . . !"
defaultValue={post?.story||''}
/>
<label className="myFile edit-view m-5 block text-2xl text-gray-900 dark:text-white" htmlFor="file_input">
<p className="cursor-pointer"> 
<FontAwesomeIcon 
  icon={faImage}
  />
  </p>
  
<div className="flex"> 
  <input
className="block top-0 right-0 opacity-0 absolute p-2 text-text font-bold border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:placeholder-gray-400"
id=""
type="file"
name='files'
multiple 
accept="image/*,video/*"
/> 
</div>
</label>
<div className="flex my-5 flex-wrap">
  <div className="mx-2">
<input
className="p-1 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
name="family"
  type="checkbox"
  />
  <label htmlFor="family" className="text-text font-bold mx-1">Family</label>
  </div>
 
  <div className="mx-2 my-1">
  <input
className="p-1 rounded-lg cursor-pointer dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
name="work"
  type="checkbox"
  />
  <label htmlFor="work" className="text-text font-bold mx-1">Work</label> 
   </div>
   <div className="mx-2  my-1"> 
  <input
className="p-1 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
name="entertainment" 
  type="checkbox"
  />
  <label htmlFor="entertainment" className="text-text font-bold mx-1 ">Entertainment</label>
  </div>
  <div className="mx-2 my-1"> 
  <input
className="p-1 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
name="school"
 
  type="checkbox"
  />
  <label htmlFor="school" className="text-text font-bold mx-1">School</label>
  </div>
  <div className="mx-2  my-1"> 
  <input
className="p-1 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
  name="friends" 
  type="checkbox"
  />
  <label htmlFor="friends" className="text-text font-bold mx-1">Friends</label>
  </div>
  <div className="mx-2 my-1"> 
  <input
className="p-1 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
name="folktale" 
  type="checkbox"
  />
  <label htmlFor="folktale" className="text-text font-bold mx-1">Folktale</label>
  </div>
</div>
<div className='w-1/3 flex justify-center m-auto bg-slate-600 rounded-lg gap-2.5 btn-link'>  
<SubmitButton     
formAction={ !post.id?createPost :postEdit }
className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 "
pendingText="Sending ..."  
>
  {!post.id?'Create':'Update'}

</SubmitButton>
</div> 

</form> 

 </> 
  )
}

export default CreateForm 