import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ShareButtons from "../ShareButtons"
import CommentForm from "./CommentForm"
import LoginModal from "./LoginModal"
import { faAngleLeft, faDeleteLeft, faPencil, faShare } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import Link from "next/link"
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons" 

const ChildComment = ({
    isChildComment, 
    parent_of_child, 
    userActions, 
    dateFormatter,
    user,
    editBtn,
    deleteBtn,
    isReplying,
    replyId,
    commentReplier,
    elRef,
    createComment,
    commentEdit,
    setUserActions,


}) => {
    
  return (
    <div>
       
<div className="relative ml-11" key={parent_of_child.title}>  
<div title="close" className='absolute -left-3 bg-gray-200 w-0.5 h-full cursor-pointer'/>  
<div className='max-w-2xl m-auto my-2'>  
<div className='border'> 
<div className='flex '> 
 
<div className="max-w-fit w-24 ">
{parent_of_child.avatar_url&& <Image 
src={parent_of_child.avatar_url} 
width={50} 
height={50}
className='rounded-full p-4 h-24 max-h-24 w-full'
alt={parent_of_child.user_name}/> } 
 {!parent_of_child.avatar_url&& <Image 
src='/assets/images/placeholderimg.png'
width={30}  
height={50}
className='rounded-full p-4 h-24 max-h-24 w-full'
alt={parent_of_child.user_name}/> } 
</div>   

 <div className='mt-11'> 
<p className="text-xl w-3/4 font-bold"><Link href={`/profile/${parent_of_child.user_id}`}>{parent_of_child.user_name||parent_of_child.user_email}</Link>  </p>
<p className='text-md leading-relaxed cursor-pointer' >
 {parent_of_child.title} </p>
<small className="my-3">
 {dateFormatter?.format(Date.parse(parent_of_child?.created_at))}  
 </small>
 </div> 
 
  </div> 
<div className="">
 <div className='m-5'> 
{parent_of_child.files?.length > 0 && parent_of_child.files?.map((xy, ix)=>ix === activeSlide && xy&&
<div className={imgMode? 'fixed z-10 bg-gray-800 bg-opacity-80 h-full flex justify-center items-center left-0 top-0 w-full': 'mx-1 scroll-smooth text-center cursor-pointer'} key={xy + ' '+ parent_of_child.title}>
 {xy&& <div className="flex justify-center"> 
{imgMode&&<p onClick={prevSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'> 
<FontAwesomeIcon icon={faAngleLeft}/> </p>}
<div className=' '>
<Image 
onClick={openImg}
src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}/${xy}`}  
width={200} 
height={200} 
className='animate-in cursor-pointer rounded-lg mx-1 my-2 border-2 border-gray-300'
alt={parent_of_child.title}
/>
<p className='p-1 text-2xl text-white mt-1 hover:scale-105 hover:opacity-80'>+ {parent_of_child.files?.length-1} </p>
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
 <button onClick={()=>commentLike(px)} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon 
width={30}
icon={faThumbsUp}
/>
<p >{parent_of_child.likes?.length}</p>  
</button> 
  
 <button onClick={()=>commentReplier(parent_of_child)} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon 
icon={faComment} 
width={30}
rotation={180}/>
 <p >{parent_of_child.comment?.length ||0}</p> 
</button>  
 
{user?.id=== parent_of_child.user_id ?
<>  
<div className="">
   <button onClick={()=>openEdit(px.id )}className="flex hover:scale-105 focus:outline-none justify-between my-5 text-xl rounded-none p-1"><FontAwesomeIcon width={30}icon={faPencil} /></button>
   
   {editBtn&&activeIdx=== px.id &&<button onClick={()=>setCommentId(px?.id)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900">
   Edit</button>} 
   </div>
<div>
     <button onClick={()=>openDelete(px.id)}className="flex hover:scale-105 focus:outline-none justify-between m-5 text-xl rounded-none p-1"><FontAwesomeIcon width={30}icon={faDeleteLeft} rotation={180} /></button>
   
     {deleteBtn&&activeIdx=== px.id && <button onClick={()=>deleteComment(px?.id)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900">
     Delete
   </button>}
</div> 
</> 
:'' }

<button onClick={()=>showAll(px.id)} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon icon={faShare}  
width={30} />
</button>  

</div> 
 
</div> 

  </div>
  {userActions?<LoginModal 
   userActions={userActions} 
    setUserActions={setUserActions} 
    />: 
    <ShareButtons  
    item={parent_of_child} 
    /> } 
 
 
</div> 
 
{isReplying &&replyId=== parent_of_child.id &&(
 <div ref={elRef} className='text-center opacity-90 text-sm rounded-none p-2'> 
  <CommentForm 
  {...parent_of_child}
  createComment={createComment}
  commentEdit={commentEdit}
  /> 
 

 </div> 
 )} 
</div>    
    </div>
  )
}

export default ChildComment
