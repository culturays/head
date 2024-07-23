"use client"
import { getTop10 } from "@/app/filmsdata";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useRef, useState } from "react"; 
 
import { PagesContext } from "./Pages-Context"; 
const supabase = createClient()
export const ContextProvider = ({children}) => {
  let initialVal=""
  const [scrolledPosts,setScrolledPosts]=useState([])
  const [scrolledComments,setScrolledComments]=useState([])
  const [shareOptions,setShareOptions]=useState(false)
  const [notify,setNotify]=useState('')
  const [imgZoom,setImgZoom]=useState({})

  const [show, setShow] = useState(false);
  const [isReplying, setIsReplying] = useState(false)
  const [imgIndex,setImgIndex]= useState('')  
  const [activeIdx,setActiveIdx]=useState(null) 
  const [scrollChild,setScrollChild]=useState([])
  const pathname = usePathname()
  const imgRef= useRef() 
  const router = useRouter()
  
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
  const [currentUrl, setCurrentUrl] = useState(''); 
  useEffect(() => { 
  if (process) { 
    setCurrentUrl(window.location.href);
  }
  }, []);
const handleConfirmLogout = () => {
  console.log(currentUrl,currentUrl.split('/?')[0])
  if (typeof currentUrl === 'string') {
    router.push( `${currentUrl.split('/?')[0]}?confirm=yes`, { shallow: true });
  }
};

  
async function resetImg(imgs,img) {
  // setImgZoom({
  //   width:'100%',
  //   height:"160px", 
  //   transition: "width 0.5s ease"
  // })
  
const updFiles=imgs?.files?.filter((ex)=> ex !==img)
const { data, error } = await supabase
.from('posts')
.update({ files: [...updFiles ] })
.eq('id', imgs.id)
.select() 
const { data:updateData, error:updateErr } = await supabase
.storage
.from('posts_imgs')
.remove(img)

  if(error){
    console.log(error)
  }
  setShow(false)
  setNotify('Image Deleted')
  const pt = scrolledPosts.filter((te)=> te.id!== imgs.id) 
  setScrolledPosts([...pt, ...data ] ) 
  setTimeout(
    () =>setNotify(''),  
    2000 
  );
  router.refresh()
}

 return (
    <PagesContext.Provider value={{ activeIdx ,setActiveIdx ,shareOptions,setShareOptions, scrolledComments, setScrolledComments,setScrollChild, scrollChild, scrolledPosts, setScrolledPosts, show, setShow,  setIsReplying, isReplying,setCurrentUrl, setImgIndex,setImgZoom, imgZoom, imgIndex, imgRef, resetImg, setNotify, notify, handleConfirmLogout, commentReply, deleteReps,  setNotify }}>     
     {children}  
    </PagesContext.Provider>
  )
} 

// export function usePagesContext(){
//   return useContext(PagesContext)
// }