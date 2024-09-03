 "use client"
import { usePathname, useRouter, useSearchParams} from 'next/navigation'   
import CommentForm from './CommentForm'
import AllComments from './AllComments'
import { useState,useEffect, useRef } from 'react' 
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment,  faDeleteLeft, faPencil, faShare,  faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'   
import ShareButtons from '../ShareButtons' 
import { dateFormatter } from '@/utils/dateFormat'  
import LoginModal from './LoginModal'
const CommentComp = ({ 
post, 
postData,
user,
handleLike,  
editComment,
likes, 
commentObj, 
setCommentObj, 
comment,  
commentLike,
commentEdit,
createComment,
deleteComment, 
commentsByParentId,
show,
setShow ,
setImgIndex,
imgIndex,
activeIdx,
setActiveIdx,
shareOptions,
setShareOptions,  
setIsEditingComment,
isEditingComment
}) => {  
 
const [deleteBtn,setDeleteBtn]=useState(false)
const [editBtn,setEditBtn]=useState(false)  
const router= useRouter()
const imgRef = useRef()
const elRef = useRef(); 
const [replyId,setReplyId]=useState(null) 
const [isChildComment, setIsChildComment]= useState(false)
const [userActions,setUserActions]=useState(false)
const [scrolledComments, setScrolledComments]=useState([])
const [activeCommentReply, setActiveCommentReply]=useState(false)
function getReplies(parentId){ 
return (commentsByParentId[parentId]) 
}
const childComments = getReplies(comment?.id)

   const editting=()=>{ 
  setEditBtn(false)
  setCommentObj(comment)
   setIsEditingComment(true) 
 // editingRef.current?.scrollIntoView()
  }
 

const openEdit=(id,i)=>{
  setEditBtn(prev => !prev)
  setDeleteBtn(false)
  setActiveIdx(id);
  setShareOptions(false)
 }
 useEffect(() => { 
  setScrolledComments(childComments)
  // const newArray = [...scrolledComments.length+1, ...data];
  // setCountComments(newArray.length);

}, [comment]);  
 
  const openDelete=(id,i)=>{
    setDeleteBtn(prev => !prev)
    setEditBtn(false)
    setShareOptions(false);
    setActiveIdx(id);
  } 
 

  
 const commentReplier =()=>{ 
  if(!user){
    setUserActions(true) 
 }else{
  setActiveCommentReply(prev=> !prev)
 } 
  setReplyId(comment.id)
  setDeleteBtn(false)
  setEditBtn(false)
  setShareOptions(false);
  setIsChildComment( false )
  
 }
 
const showAll = (id,i) => { 
  if(!user){
    setUserActions(true) 
 }else{
     setShareOptions(prev => !prev);
 } 
  setActiveIdx(id);  
  setDeleteBtn(false)
  setEditBtn(false)
};
 
useEffect(() => { 
  const handler = (event) => {
    if (!elRef.current) {
      return;
    }

 if (!elRef.current.contains(event.target)) {
  setCommentObj(null); 
  setIsEditingComment(false) 
  setReplyId(null)
  setActiveCommentReply(false)
 }

  };
 
  document.addEventListener("click", handler, true);

  return () => {
    document.removeEventListener("click", handler);
  };

}, []); 


function enlargeImgs(ix) { 
setImgIndex(comment.files[ix])
 //imgRef.current?.scrollIntoView({ behavior: 'smooth',block: 'center'}) 
//   setImgZoom({
//   width:'200%',
//   height:'auto',  
//   transition: "width 0.5s ease",
 
// }
//   )

 setShow(prev => !prev)
}
 
async function resetImg(imgs,img) {
  // setImgZoom({
  //   width:'100%',
  //   height:"160px",
  //   transition: "width 0.5s ease"
  // })
  
const updFiles=imgs?.files?.filter((ex)=> ex !==img)
const { data, error } = await supabase
.from('comments')
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
const [imgMode, setImgMode]=useState(false)
const [activeSlide,setActiveSlide] =useState(0) 

const prevSlide=()=> { 
  const slide =activeSlide - 1 < 0
    ?comment.files.length - 1
    :activeSlide -1;
    setActiveSlide(slide);
    
}
const nextSlide=()=> {
  const slide = activeSlide + 1 <  comment.files.length
    ? activeSlide + 1
    : 0;
    setActiveSlide(slide); 
}
 
const openImg =()=>{
  setImgMode(prev=>!prev)
}
const openImgDelete=(i)=>{
  setDeleteBtn(prev => !prev)  
   setActiveIdx(i);
}
 
const replyRef=useRef()  
const [navDropper,setNavDropper]= useState(false)
const dropperRef=useRef()

useEffect(() => {
const handler = (event) => {
if (!dropperRef.current) {           
        return;
 } 
      if (!dropperRef.current.contains(event.target)) {
        setNavDropper(false);  
        setCommentObj(null)
      } 
   
    };
      document.addEventListener("click", handler, true);
   
    return () => {
      document.removeEventListener("click", handler);
    };
   
  }, [navDropper,setCommentObj]);

 const editAction=()=>{
  setNavDropper(false)
  setCommentObj()
  
}   
 
useEffect(() => {
  const handler = (event) => {
    if (!replyRef.current) {           
      return;
    }
  
    if (!replyRef.current.contains(event.target)) {
   setCommentObj(null)

    } 
  
  };
    document.addEventListener("click", handler, true);
 
  return () => {
    document.removeEventListener("click", handler);
  };
 
}, [ setCommentObj]); 
 
const pathname = usePathname()
const urlParam = useSearchParams()
const params = new URLSearchParams(urlParam);
 
const pushUrl = ()=>{
setIsChildComment(false)  
 router.push(`/forum/comment/${comment.id}`, {scroll:false}) 
 // router.push(`/forum/comment/${slug.slug}/${id.id}`, {scroll:false})  
 } 

 return ( 
 <>
 {userActions &&<LoginModal setUserActions={setUserActions}/>} 
 <div className='max-w-2xl px-2 m-auto my-2'>  
  <div className='border '> 
 <div className='flex '> 
  <div className="max-w-fit w-24">
{comment.avatar_url&& <Link href={`/profile/${comment?.user_id}`}><Image 
src={comment.avatar_url} 
width={50} 
height={50}
className='rounded-full p-4 h-24 max-h-24 w-full'
alt={comment.user_name}/></Link> } 
 {!comment.avatar_url&& <Link href={`/profile/${comment?.user_id}`}><Image 
src='/assets/images/placeholderimg.png'
width={30}  
height={50}
className='rounded-full p-4 h-24 max-h-24 w-full'
alt={comment.user_name}/></Link> } 
</div> 
 <div className='mt-11'> 
<p className="text-xl w-3/4 font-bold my-2"><Link href={`/profile/${comment.user_id}`}>{comment.user_name||comment.user_email}</Link>  </p>
<p className='text-md leading-relaxed cursor-pointer' onClick={pushUrl}>
 {comment.title} </p>
<small className="my-3">
 {dateFormatter?.format(Date.parse(comment?.created_at))}  
 </small>
 </div> 
 
  </div> 
<div className="">
 <div className='m-5'> 
{comment.files?.length > 0 && comment.files?.map((xy, ix)=>ix === activeSlide && xy&&
<div className={imgMode? 'fixed z-10 bg-gray-800 bg-opacity-80 h-full flex justify-center items-center left-0 top-0 w-full': 'mx-1 scroll-smooth text-center cursor-pointer'} key={xy + ' '+ comment.title}>
 {xy&& <div className="flex justify-center"> 
{imgMode&&<p onClick={prevSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'> 
<FontAwesomeIcon icon={faAngleLeft}/> </p>}
<div className={!imgMode? 'w-1/2': 'w-full'}>
<Image 
onClick={openImg}
src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}/${xy}`}  
width={600} 
height={600} 
className='animate-in cursor-pointer rounded-lg mx-1 my-2 border-2 border-gray-300'
alt={comment.title}
/>
<p className='p-1 text-2xl text-white mt-1 hover:scale-105 hover:opacity-80'>+ {comment.files?.length-1} </p>
 </div> 
 {imgMode&&<p onClick={nextSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleRight}/> </p>}

 </div> }
 
  {show&&
<> 
{!deleteBtn && <span onClick={()=>openImgDelete(ix)} className={imgIndex===xy?'absolute top-4 text-gray-700 text-xl rounded-full border bg-opacity-60 p-4 mt-2 font-bold hover:scale-105 cursor-pointer':'hidden'}>X</span> }
{deleteBtn&&activeIdx=== ix && <span className={imgIndex===xy?'absolute right-4 top-4 text-white text-center py-3 mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900':'hidden'}onClick={()=>resetImg(post, xy)} >Delete Photo</span>} </> }  
   </div>
)}
   
  </div>  

<div className='text-gray-700 flex justify-evenly items-center mt-4 w-full border'> 
  
 <button onClick={()=>commentLike(comment)} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon 
width={30}
icon={faThumbsUp}
/>
<p >{comment.likes?.length}</p>  
</button>  
 <button onClick={commentReplier} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon 
icon={faComment} 
width={30}
rotation={180}/>
<p >{childComments?.length ||0 }</p>
</button>  

{user?.id=== comment.user_id ?
<>  
<div className="">
   <button onClick={()=>openEdit(comment.id )}className="flex hover:scale-105 focus:outline-none justify-between my-5 text-xl rounded-none p-1"><FontAwesomeIcon width={30}icon={faPencil} /></button>
 
   {editBtn&&activeIdx=== comment.id &&<button onClick={editting} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-48 z-10 bg-slate-900">
   Edit</button>} 
   </div>
<div>
     <button onClick={()=>openDelete(comment.id)}className="flex hover:scale-105 focus:outline-none justify-between m-5 text-xl rounded-none p-1"><FontAwesomeIcon width={30}icon={faDeleteLeft} rotation={180} /></button>
   
     {deleteBtn&&activeIdx=== comment.id && <button onClick={()=>deleteComment(comment)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-48 z-10 bg-slate-900">
     Delete
   </button>}
</div> 
</> 
:'' }

<button onClick={()=>showAll(comment.id)} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon icon={faShare}  
width={30} />
</button>  

</div> 
 
</div> 

  </div> 
  {userActions?<LoginModal 
   userActions={userActions} 
    setUserActions={setUserActions} />: 
    <ShareButtons  
    item={comment}
    shareOptions={shareOptions}
    activeIdx={activeIdx}  
    /> } 
<div>  
 
 {activeCommentReply &&replyId=== comment.id&& (
 <div ref={elRef} className='text-center opacity-90 text-sm rounded-none p-2'> 
  <CommentForm 
  {...comment}
  createComment={createComment}
  commentEdit={commentEdit}
  />

   {!childComments?.length?'' : !isChildComment&&childComments?.indexOf(childComments[0])===childComments?.length-1 ?<p className='cursor-pointer'onClick={pushUrl}>+ { childComments?.length }</p> :isChildComment&& childComments?.indexOf(childComments[0])!==childComments?.length-1 ?<p className='cursor-pointer'onClick={()=> setIsChildComment(prev =>!prev)}>- { childComments?.length }</p>:<p className='cursor-pointer'onClick={()=> setIsChildComment(prev =>!prev)}>+ { childComments?.length} more</p>} 

 </div> 
 )}
 
{childComments !== null 
 && childComments?.length > 0 
 && isChildComment&& 
 (
<> 
<AllComments  
replyId={replyId}
setReplyId={setReplyId} 
commentObj={commentObj}
setCommentObj={setCommentObj} 
createComment={createComment}
editComment={editComment}    
comments={childComments}  
handleLike={handleLike}
postData={postData}
user={user}
commentEdit={commentEdit}
activeCommentReply={activeCommentReply}
setActiveCommentReply={setActiveCommentReply}
childComments={childComments}
deleteComment={deleteComment}
isChildComment={isChildComment}
setIsChildComment={setIsChildComment}
commentsByParentId={commentsByParentId}
commentLike={commentLike}
setShareOptions={setShareOptions}
activeIdx={activeIdx}  
setActiveIdx={setActiveIdx}
setIsEditingComment={setIsEditingComment}
isEditingComment={isEditingComment}
 /> 

 </> 
)}
 
 {isEditingComment &&comment?.id ===commentObj?.id&&(  
  <> 
<CommentForm 
{...comment} 
commentObj={commentObj} 
setCommentObj={setCommentObj} 
setIsEditingComment={setIsEditingComment}
elRef={elRef}
editComment={editComment}
createComment={createComment}
commentEdit={commentEdit}
/>

</>
  )}  

</div>
</div>
 </> )
}

export default CommentComp