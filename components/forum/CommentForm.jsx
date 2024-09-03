"use client"
import Link from "next/link";
import { usePagesContext } from "../Pages-Context";
import { useFormStatus } from "react-dom"; 
import { useEffect, useRef } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CommentForm =({
id,
commentObj, 
elRef,
post_id,
title,
createComment,
commentEdit
})=>{ 
const { pending, action } = useFormStatus();
const isPending = pending && action 
const handleSubmitComment = (e) => {
    e.preventDefault();  
    if(commentObj?.id===id){ 
        commentEdit(e)     
    } else{
        createComment(e, post_id, id);
    } 
    //setCommentObj({})
   } 

return (
<> 
<form className='animate-in flex relative' ref={elRef} onSubmit={handleSubmitComment} >
<textarea
rows="2"
cols="70"  
type='text'
name='title'
defaultValue={commentObj?.id===id?title:''}
className='w-full resize-none bg-inherit text-sm p-5 leading-normal focus:outline-none border-2 rounded' 
placeholder="Speak your Mind!"
/>  
<label className="block text-2xl h-fit p-2 top-8 mt-3 left-3 absolute overflow-hidden float-left clear-left hover:scale-105" htmlFor="file_input">
 <p className="cursor-pointer text-black "> 
 <FontAwesomeIcon 
   icon={faImage}
   width={20}
   />
   </p> 
 <div className="flex justify-center ">
   <input
   size="80"
 className="absolute top-0 z-20 opacity-0 text-2xl text-text font-bold border-none rounded-lg cursor-pointer focus:outline-none dark:placeholder-gray-400"
 id=""
 type="file"
 name='files'
 multiple 
 accept="image/*,video/*"
 /> 
 </div>
 </label>
 <button type="submit" aria-disabled={pending} className="w-1/6 mx-2 cursor-pointer border-0 rounded-full bg-gray-600 text-white block border-none hover:text-pink-900 text-lg p-2" >
 {isPending ? 'Waiting' :commentObj?.id?'Update' :'Reply'}
 </button>  
 </form>

  </>
    )
} 

export default CommentForm
 