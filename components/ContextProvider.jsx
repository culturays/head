"use client"
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react"; 
 
import { PagesContext } from "./Pages-Context"; 
import nlp from "compromise/three";
 
export const ContextProvider = ({children}) => {
  let initialVal=""
  const [scrolledPosts,setScrolledPosts]=useState([])
  const [scrolledComments,setScrolledComments]=useState([])
  const [isReplying, setIsReplying] = useState(false)
  const [scrollChild,setScrollChild]=useState([])
  const [user,setUser]=useState({})  
  const [post,setPost]= useState({})
  const [showIndex, setShowIndex]= useState(null)
const [onIdx, setOnIdx]=useState(null) 
const [editBtn, setEditBtn]=useState(false)
const [showSuggestion, setShowSuggestion]=useState(false)
const [deleteBtn,setDeleteBtn]=useState(false) 
const [activeReply,setActiveReply]=useState(null)

  const pathname = usePathname()
  const imgRef= useRef() 
  const router = useRouter()
  const editingRef=useRef()
  const searchParams= useSearchParams();
  const val = searchParams.get('message');

  
 const commentReply  = async(comment, user) => { 
  const supabase = createClient(); 
  const likeidx = comment?.replies?.findIndex((id)=> id === comment.id)  

  if(likeidx=== -1){ 
  const {data:replies, error: lkrror } = await supabase
  .from('comments')
  .update({replies: [...comment?.replies, user.id]} )
  .eq('id', comment.id) 
  .select()
  
  if (lkrror) {
  console.error('Error updating comment:', lkrror );
  } else {
   
   setNotify('Updated successfully.');
    setTimeout(
      () =>setNotify(''), 
      2000 
    );  
   
   router.refresh()  
  //  const pt = scrolledComments.filter((te)=> te.id !== comment.id) 
  //  setScrolledComments([...pt, ...comments]) 
    }    
  }  

 }


    const deleteReps =async (comment, commentId) => {
      const updReps= comment?.replies?.filter((ex)=> ex!==commentId)  
    
      try{
        const supabase = createClient();  
        const {data, error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        if(error){
        return
        
        }
        
        const {data:replies, err } = await supabase
        .from('comments')
        .update({ replies:[...updReps]})
        .eq('id', comment.id) 
        .select()
        if(err){
        console.log(err)
        }
       
        }catch(err){
        console.log(err)
        } 
        //delete from posts as well
        setNotify('Deleted')    
        setTimeout(
        () =>setNotify(''), 
        2000 
        );  
       
        router.refresh() 
        const pt = scrolledPosts.filter((te)=> te.id!== commentId) 
        setScrolledPosts(pt )
          
        };
const searched= useSearchParams()
  const params = new URLSearchParams(searched);
  const prX = params.get('confirm')
  // const [currentUrl, setCurrentUrl] = useState(''); 
  // useEffect(() => { 
  // if (process) { 
  //   setCurrentUrl(window.location.href);
  // }
  // }, []);

 
// const handleConfirmLogout = () => { 
//   // if (typeof currentUrl === 'string') {
//   //   router.push( `${currentUrl.split('/?')[0]}?confirm=yes`, { shallow: true });
//   // }
// };

  








//posts functions

 return ( 
<PagesContext.Provider value={{ 
  activeIdx ,setActiveIdx ,shareOptions,setShareOptions, scrolledComments, setScrolledComments,setScrollChild, scrollChild, scrolledPosts, setScrolledPosts, show, setShow, setIsReplying, isReplying,  setImgIndex,setImgZoom, imgZoom, imgIndex, imgRef, setNotify, notify,   commentReply, deleteReps, setNotify,  
 
}}>     
{children}  
</PagesContext.Provider>

)
} 

// export function usePagesContext(){
//   return useContext(PagesContext)
// }