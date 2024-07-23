 'use client' 
 
import {usePathname, useRouter, useSearchParams} from 'next/navigation'   
import CommentForm from './CommentForm'
import AllComments from './AllComments'
import { useState,useEffect, useRef,useMemo } from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft,faDeleteLeft, faPencil,faShare,faEllipsisVertical, faThumbsUp, faComment, faAngleDown, faAngleUp, faImage, faAngleLeft, faAngleRight, faSearch } from '@fortawesome/free-solid-svg-icons' 
import Link from 'next/link' 
import Image from 'next/image'
import { usePagesContext } from '../Pages-Context'
import CreateForm from '@/app/forum/createpost' 
import ShareButtons from '../ShareButtons'
import { dateFormatter } from '@/utils/dateFormat'
import moment from 'moment'
import { useInView } from 'react-intersection-observer' 
import LoginModal from './LoginModal'
import { createClient } from '@/utils/supabase/client'
import SearchItems from '../SearchItems'
import Trends from './Trends'
import Relevant from './Relevant'
 
 
let initialVal=""  
function sortAscending(pb, pa){
  return (pb?.id - pa?.id);
 }
function CommentX ({
  post_comments, 
  postsData, 
  comment, 
  user,  
  searchVal, 
  itemSearches, 
  trends,
  related
}) {
const router = useRouter()    
const [navDropper,setNavDropper]= useState(false) 
const [commentId,setCommentId]=useState(null) 
const [commentText, setCommentText]=useState(initialVal) 
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(false)   
const [prompt, setPrompt]=useState("")
const [deleteBtn,setDeleteBtn]=useState(false)  
const [onIdx, setOnIdx]=useState(null)
const [showIndex, setShowIndex]= useState(null)
const [activeReply,setActiveReply]=useState(null)
const [showSuggestion, setShowSuggestion]=useState(false)
const [emoji_, setEmoji] = useState("");
const [editId,setEditId]=useState(null)
const [scrolledPosts, setScrolledPosts]=useState([]) 
const [scrolledComments, setScrolledComments]=useState([])
const [userActions,setUserActions]=useState(false)
const [count,setCount]=useState(2)
const [isEditing, setIsEditing] = useState(false)
const [editBtn,setEditBtn]=useState(false)  
const [startScroll,setStartScroll]=useState(2)
const [replyId,setReplyId]=useState(null) 
const [currentParent, setCurrentParent]=useState([])
const [isChildComment, setIsChildComment]= useState(false)
const [countComments, setCountComments] = useState(0);
const {notify, show, imgIndex, activeIdx, setActiveIdx, createPost, setShareOptions, isReplying, setIsReplying, setNotify, post }=usePagesContext()
const dropperRef=useRef()
const replyRef=useRef()
const elRef=useRef() 
const observerRef= useRef()
const { ref, inView } = useInView() 
const txRef=useRef() 
const commentsByChildId = useMemo(() => {
const groupParent = {} 
post_comments?.forEach(comment => {  
groupParent[comment?.parent_id] ||= []
groupParent[comment?.parent_id].push(comment) 
})

return groupParent
}, [])

const commentsByParentId = useMemo(() => {
const groupParent = {} 
post_comments?.forEach(comment => {  
groupParent[comment?.id] ||= []
groupParent[comment?.id].push(comment) 
})

return groupParent
}, [])
const childComments = commentsByChildId[comment.id]  

useEffect(() => {
  if(childComments) {
      setScrolledComments([...scrolledComments,  ...childComments])
  }

 
}, []);  
   
const fetchParent = async()=>{ 
  if(!comment.parent_id)return
    const parent_Comment = commentsByParentId[comment.parent_id] 
    const [id]=parent_Comment
    setCurrentParent(parent_Comment) 
    setIsChildComment(prev=>!prev)  
    router.push(`/forum/view/comment/${id.id}`, {scroll:false})  
 } 
 
 const commentReplier =()=>{ 
    if(!user){
      setUserActions(true) 
   }else{
    setIsReplying(prev=> !prev)
   } 
    setReplyId(comment.id)
    setDeleteBtn(false)
    setEditBtn(false)
    setShareOptions(false);
   // setIsChildComment( false ) 
   }
   
   const handleOpen = (post) => { 
    setOnIdx(post.id);  
    setShareOptions(false);
    if(!user){
     setUserActions(true) 
  }else{
   setActiveReply(true);
  } 
  }
 const showAll = (id) => { 
   if(!user){
     setUserActions(true) 
  }else{
      setShareOptions(prev => !prev);
  } 
     setActiveIdx(id); 
    setDeleteBtn(false)
  }

  const openEdit=(id,i)=>{
    setEditBtn(prev => !prev)
    setDeleteBtn(false)
    setActiveIdx(id);
    setShareOptions(false)
   }
 
    
    const openDelete=(id,i)=>{
      setDeleteBtn(prev => !prev)
      setEditBtn(false)
      setShareOptions(false);
      setActiveIdx(id);
    } 
   
 
const [activeSlide,setActiveSlide] =useState(0) 
const [imgMode, setImgMode]=useState(false)
const prevSlide=()=> { 
const slide =activeSlide - 1 < 0
?postsData.files.length - 1
:activeSlide -1;
setActiveSlide(slide);
}
const nextSlide=()=> {
const slide = activeSlide + 1 <  postsData.files.length
? activeSlide + 1
: 0;
setActiveSlide(slide); 
}
const openImg =()=>{
setImgMode(prev=>!prev)
}
const editAction=()=>{
  setNavDropper(false)
  setEditId(postsData?.id )
}
 
const postLike = async (post ) => { 
if(!user){
setUserActions(true)
}else{ 
const supabase = createClient(); 
const likeidx = post?.likes?.findIndex((id)=> id === user?.id)  
const updLks= post?.likes?.filter((ex)=> ex !==user?.id )
if(likeidx=== -1){ 
const {data:posts, error: lkrror } = await supabase
.from('posts')
.update({likes: [...post?.likes, user?.id]} )
.eq('id', post.id) 
.select()

if (lkrror) {
console.error('Error updating likes:', lkrror );
} else {

setNotify('Like updated successfully.');
setTimeout(
() =>setNotify(''), 
2000 
);  

router.refresh() 

const pt = scrolledPosts.filter((te)=> te.id !== post.id) 
setScrolledPosts([...pt, ...posts]) 
}    
} 

if(likeidx !== -1){  

const {data:posts, error } = await supabase
.from('posts')
.update({ likes:[...updLks]})
.eq('id', post.id) 
.select()
if(error){
console.log(error)
}
else {   
setNotify('Like removed successfully.');
setTimeout(
() =>setNotify(''), 
2000 
); 
} 
const pt = scrolledPosts.filter((te)=> te.id !== post.id) 
setScrolledPosts([...pt, ...posts])

}

// const updtPosts= posts.filter((ex)=> ex.id === post.id)
// const pt = scrolledPosts.filter((te)=> te.id !== post.id) 
router.refresh()
}
}
 

const createComment =async (e, postId, parentId ) => {
e.preventDefault()

const formData = new FormData(e.target);
const title = formData.get('title');
const slug = title?.toLowerCase().replace(/ /g,"-") 
const replies = []

// const postId = e.currentTarget.getAttribute('id')
//const postComms=post?.comments?.filter((ex)=> ex.slug!==slug )
const allFiles=[]
const files = formData.getAll("files");
for (let i = 0; i < files.length; i++) {
const file=files[i];
const filePath = `${Date.now()}-${file.name}`; 
if(file.name=== ''){
allFiles.push(null)

}else{
allFiles.push(filePath)

const { error: uploadError } = await supabase.storage.from('posts_imgs').upload(filePath, file,{upsert: true})
if (uploadError)
{
throw uploadError
// redirect("/forum?message=Error Loading Image")
} 
} 

};
if(!user){
setUserActions(true)
}else{ 
try{
const supabase = createClient();  
const { data, error } = await supabase 
.from('comments')
.insert([ 
{    
title, 
slug,
likes:[],
replies:[],
post_id:postId,
parent_id: parentId ,
user_id:user.id,
files:allFiles, 
avatar_url: user?.user_metadata.picture,
user_name:user?.user_metadata.full_name,
user_email:user?.email,
}  
]) 
.select()

if(error){
console.log(error)
}
 
//const newScrolledItems =scrolledComments.indexOf(scrolledComments[scrolledComments.length -1])+1
 
if(parentId === comment?.id){
  setScrolledComments([...scrolledComments, ...data])
  }else{
    router.push(`/forum/view/comment/${parentId}`, {scroll:false,shallow:true});
     router.refresh() 
    
  }
 
  router.refresh()
}catch(err){
console.log(err)
}
setIsReplying(null) 
setTimeout(
() =>setNotify(''), 
2000 
)
} 
}
  
const commentLike  = async(commentx ) => {
const supabase = createClient(); 
const likeidx = commentx?.likes?.findIndex((id)=> id === user.id)  
const updLks= commentx?.likes?.filter((ex)=> ex !==user.id )

if(!user){
setUserActions(true)
}else{ 
if(likeidx=== -1){ 
const {data:comments, error: lkrror } = await supabase
.from('comments')
.update({likes: [...commentx?.likes, user.id]} )
.eq('id', commentx.id) 
.select()

if (lkrror) {
console.error('Error updating likes:', lkrror );
} else { 
setNotify('Like updated successfully.');
setTimeout(
() =>setNotify(''), 
2000 
);

 const st = scrolledComments.filter((te)=> te?.id !== commentx.id)
if(commentx.id !== comment.id){
  setScrolledComments([...st, ...comments])
  }

}
router.refresh() 

}  
if(likeidx !== -1){  
const {data:comments, error } = await supabase
.from('comments')
.update({ likes:[...updLks]})
.eq('id', commentx.id)
.select()
if(error){
console.log(error)
}

else { 
const st = scrolledComments.filter((te)=> te?.id !== commentx?.id)

if(commentx.id !== comment.id){
setScrolledComments([...st, ...comments])
}
setNotify('Like removed successfully.');
setTimeout(
() =>setNotify(''), 
2000 
); 
} 

router.refresh()
}

}
}


const commentEdit = async(e) => { 
const formData = new FormData(e.target);
const title = formData.get('title')  
const files = formData.getAll('files')
const slug = title?.toLowerCase().replace(/ /g,"-")
const allFiles=[]
const supabase = createClient();
for (let i = 0; i < files.length; i++) {
const file=files[i];
const filePath = `${Date.now()}-${file.name}`; 
if(!file.name ){ 
allFiles.push(post.files||null)
}else{
allFiles.concat(post.files).push(filePath)

const { error: uploadError } = await supabase.storage.from('comment_imgs').upload(filePath, file,{upsert: true})
if (uploadError)
{
throw uploadError 
} 
} 

}; 
const { data:comment, error } = await supabase
.from('comments')
.update([
{    
title,   
slug , 
// user_id:comment?.user_id,
// post_id:comment?.post_id,
// parent_id:comment?.parent_id,
// avatar_url:comment?.avatar_url,
// user_name:comment?.user_email,
// likes:[],
// files:comment?.files.concat(allFiles), 
},

])
.eq('id', commentId)
.select()
if (error) {
console.log(error) 
}
formData.set('title', '')
router.push(pathname+'?message=Comment Updated Successfully', {scroll:false})  
const pt = scrolledComments.filter((te)=> te?.id !==commentId) 
setScrolledComments([...pt, ...comment]) 
//.filter((te)=> te.slug!== slug)
// const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
// setScrolledComments(pt.concat(data)) 
// setScrollChild(pt.concat(data))
router.refresh()
setTimeout(()=>{
// setComment(null)

}, 3000)

};


const deleteComment =async (commentId ) => {
try{
const supabase = createClient();  
const {data, error } = await supabase
.from('comments')
.delete()
.eq('id', commentId)
if(error){
return

}
console.log(data)
}catch(err){
console.log(err)
} 
//delete from posts as well
setNotify('Comment Deleted Successfully')    
setTimeout(
() =>setNotify(''), 
2000 
);  

// if(pathname.includes('/post/')){
// router.back()

// }

//const pt = scrolledPosts.filter((te)=> te.id!== commentId) 
const comms = scrolledComments.filter((te)=> te.id!== commentId) 
setScrolledComments(comms)
router.refresh() 
};


useEffect(() => {
  const handler = (event) => {
  if ( !elRef.current) {
  return;
  } 
  if (!elRef.current.contains(event.target)) { 
  setActiveReply(null)
  }
  
  };
  
  document.addEventListener("click", handler, true);
  
  return () => {
  document.removeEventListener("click", handler);
  };
  
  }, [setActiveReply]);
  useEffect(() => { 
    const handler = (event) => {
      if (!txRef.current) {
        return;
      }
  
   if (!txRef.current.contains(event.target)) {
    setCommentId(null); 
    setIsEditing(false) 
    setReplyId(null)
    setIsReplying(false)
   }
  
    };
   
    document.addEventListener("click", handler, true);
  
    return () => {
      document.removeEventListener("click", handler);
    };
  
  }, []); 
  
const tx =scrolledComments?.length>0&& scrolledComments?.sort(sortAscending)

const [locateItem, setLocateItem]=useState(false)
const searchLocation =()=> {
setLocateItem(prev => !prev)
  return 
}
const searchRef =useRef()
useEffect(() => {
  const handler = (event) => {
  if ( !searchRef.current) {
  return;
  } 
  if (!searchRef.current.contains(event.target)) { 
    setLocateItem(null)
  }
  
  };
  
  document.addEventListener("click", handler, true);
  
  return () => {
  document.removeEventListener("click", handler);
  };
  
  }, []);
  const postEdit = async(formData) => {  
    const title = formData.get('title') 
    const story = formData.get('story')  
    const slug=title?.trim()?.toLowerCase().replace(/ /g,"-")
    const storyX = story.split(' ').filter((ex)=> !ex.includes('#')).join(' ')
    const family = formData.get('family')
    const work = formData.get('work')
    const school = formData.get('school')
    const friends = formData.get('friends')
    const folktale = formData.get('folktale')
    const entertainment = formData.get('entertainment')
    const files = formData.getAll("files");
    const genre=[{
    family,
    work,
    entertainment,
    school,
    friends,
    folktale
    }]
    const genreList =[] 
    
    for (const [key, value] of genre.flat().entries()) { 
    for(const [k,v] of Object.entries(value) ){
    //console.log(`Key: ${k}, Value: ${v}`); 
    if(v){ 
    const updGnr= postsData.genre.filter((tx)=> !tx.includes(k) ).flat()
    genreList.push([...updGnr, k] )  
    } 
    }
    }
    const gnrItx =genreList.concat(postsData.genre).flat().filter( function( item, index, inputArray ) {
    return inputArray.indexOf(item) === index;
    })
    
    const allFiles=[]
    const supabase = createClient();
    for (let i = 0; i < files.length; i++) {
    const file=files[i];
    const filePath = `${Date.now()}-${file.name}`; 
    if(!file.name ){ 
    allFiles.push(postsData.files||null)
    }else{
    allFiles.concat(postsData.files).push(filePath)
    
    const { error: uploadError } = await supabase.storage.from('posts_imgs').upload(filePath, file,{upsert: true})
    if (uploadError)
    {
    throw uploadError 
    } 
    } 
    
    }; 
    const { data, error } = await supabase
    .from('posts')
    .update([
    {    
    title,  
    story:storyX, 
    slug,
    is_approved:true,
    genre:gnrItx,
    user_id:postsData.user_id, 
    comments:postsData.comments,
    likes:postsData.likes,           
    username:postsData.username,
    suggested_tags:postsData.suggested_tags ,
    tags:postsData.tags, 
    files:allFiles.flat() ,
    index:postsData.index,  
    avatar_url:postsData.avatar_url,
    user_email:postsData.user_email, 
    },
    
    ])
    .eq('id', postsData.id)
    .select()
    if (error) {
    console.log(error) 
    }
    formData.set('title', '')
    router.push(pathname+'?message=Post Updated Successfully', {scroll:false})  
    const pt = scrolledPosts.filter((te)=> te.id !== postsData.id) 
    setScrolledPosts([...pt, ...data]) 
 
    router.refresh()
    setTimeout(()=>{
    setEditId(null)
    
    }, 5000)
    
    };

    const openImgDelete=(i)=>{
      setDeleteBtn(prev => !prev)  
       setActiveIdx(i);
    }
    
    const searchParams= useSearchParams(); 
    const val = searchParams.get('message');
    const pathname = usePathname() 

useEffect(
  () => { 
if(val=== 'Post Updated Successfully' ||val=== 'Comment Created Successfully'||val=== 'Comment Updated Successfully' ||  val=== 'There was error. Please try again!'){
 router.push(pathname, {scroll:false}) 
  window.posted='posted' 
 }  
},[val, searchParams, router])
return ( 
<>
{userActions &&<LoginModal setUserActions={setUserActions}/>} 
<div className='flex justify-between'> 
<p onClick={() => router.back()}><FontAwesomeIcon icon={faChevronLeft}width={50} className="text-lg hover:scale-125 my-8 opacity-80 border p-3 m-2 cursor-pointer"/></p> 
{!locateItem &&<p onClick={searchLocation}><FontAwesomeIcon icon={faSearch}width={50} className="text-lg hover:scale-125 my-8 opacity-80 border p-3 m-2 cursor-pointer"/></p> }
{locateItem &&<div ref={searchRef}
className={!locateItem?'display-hidden':'animate-in m-8 block w-70'}> 
<SearchItems
className=''
searchVal={searchVal} 
itemSearches={itemSearches}/>
</div>}
</div>
<div className='w-full flex items-center justify-center'> {notify&&<p className="m-auto fixed z-10 top-0 bg-green-500 border-2 text-cente text-white p-3 text-xl ">{notify}</p>}</div>

<div className='lg:flex lg:justify-center sm:max-w-2xl lg:max-w-6xl m-auto px-4'> 
<div className='xs:w-4/5 sm:w-3/4 md:w-4/6 m-auto py-3'>
{navDropper?
 (<div ref={dropperRef} className="absolute -mr-12 text-white text-center py-3 right-1/4 xl:mr-11 2xl:mr-20 text-md rounded-none shadow-4xl p-3 border w-3/4 max-w-xs z-10 bg-slate-900 mt-52">  
 { postsData?.user_id=== user?.id?
 <div className='p-2 ' > 
 <div className='flex justify-between text-xl p-2 cursor-pointer '><FontAwesomeIcon icon={faDeleteLeft} /><p onClick={()=> postDelete(postsData.id) }>Delete</p></div>
 <div className='flex justify-between text-xl p-2 cursor-pointer' onClick={editAction}><FontAwesomeIcon icon={faPencil} /><p>Edit</p>
  </div>
 </div>
 :null} 
  
 </div>) 
 :
null}  
  
{val && <p className="w-1/2 text-center m-auto my-2 text-white p-2 bg-gray-400">
{val}
</p>} 
 
 <div className='shadow-2xl max-w-3xl m-auto' > 
<div className='m-auto w-full flex flex-col items-center border-b-2'> 
{postsData?.avatar_url?  <Link href={`/profile/${postsData?.user_id}`}><Image src={postsData?.avatar_url} 
width={80} 
height={80}
className='rounded-full'
alt={postsData?.user_email}/></Link>:
<Link href={`/profile/${postsData?.user_id}`}><Image src={'/assets/images/culturays.png'} 
width={80} 
height={80}
className='rounded-full'
alt={postsData?.user_email}/></Link> }  
<Link href={`/profile/${postsData?.user_id}`}><h3 className='p-3 text-lg font-bold '>{postsData?.user_email} </h3></Link>
</div> 

{!editId ?
<div ref={replyRef}> 
<div className='m-2 p-3'>  
<div className='relative' >
<small className="my-4">
{moment(postsData.created_at, "YYYYMMDD").fromNow() }  
</small> 
<Link href={`/forum/post/${postsData.slug}/${postsData.id}`}><p className='text-2xl p-3 underline text-center '>{postsData?.title} </p> </Link>
 {postsData.user_id === user?.id&& <p onClick={() => setNavDropper(prev=> !prev)} className= 'absolute opacity-80 cursor-pointer text-xl pr-5 left-full top-0'> <FontAwesomeIcon icon={faEllipsisVertical} /></p>}
 </div>
 <p className='text-lg py-2 leading-relaxed'>{postsData?.story} </p> 
  </div>
 <div className="flex flex-wrap text-md m-3"> 
{postsData?.tags?.map((xy, vi)=>
xy.split(',').map((ex, xi)=> ex&&
<div className="flex bg-gray-100 mx-1 my-4" key={xi}>
<Link href={`/tag/${ex.replace('#', '')}'`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>
<small className="p-2 hover:bg-gray-400" onClick={()=>deleteTag(postsData, ex)}>x</small>
</div> ))} 
 
</div> 

<div className="flex flex-wrap w-3/4 mx-3" > 
{user?.id=== postsData.user_id && <small className="text-lg text-gray-700 cursor-pointer mx-2 text-center mx-2">Suggested Tags:</small> }
 
 {user?.id=== postsData.user_id &&  postsData?.suggested_tags.length !== 0&&
postsData?.suggested_tags?.filter((e, i, a)=> a.findIndex(item=>item.replace('.', '') === e.replace('.', '')) === i).filter((jx )=> jx!=='').map((ex, xi)=>    
<div className="flex text-sm" key={ex + ' ' + xi}>
  
 <div className="flex w-full flex-wrap overflow-hidden "> 
 {showSuggestion&&!postsData?.tags?.includes(ex)&&ex!==false && ex.split(' ').map((xy, i)=> <p onClick={()=>postTag(postsData , xy)}key={i}className="p-1 m-1 hover:opacity-70 cursor-pointer bg-gray-100" >#{xy.replace('.', '')}  
</p> ) } 
 </div>
</div>
  
) }
{user?.id=== postsData.user_id && showSuggestion&&<p className="cursor-pointer m-1 text-md opacity-70" onClick={()=> setShowSuggestion(prev => !prev)}> <FontAwesomeIcon icon={faAngleUp} /></p> }
{user?.id=== postsData.user_id && !showSuggestion&& <p className="cursor-pointer m-1 text-md opacity-70 "onClick={()=> setShowSuggestion(prev => !prev)}><FontAwesomeIcon icon={faAngleDown} /> </p> }  
</div>

 <div className='m-5 '
> 
{postsData.files?.length > 0 && postsData.files?.map((xy, ix)=>ix === activeSlide && xy&&
<div className={imgMode? 'fixed z-10 bg-gray-800 bg-opacity-80 h-full flex justify-center items-center left-0 top-0 w-full ':' mx-1 scroll-smooth text-center cursor-pointer'} key={xy + ' '+ postsData.title}>
 {xy&& 
 <div className="flex"> 
{imgMode&&<p onClick={prevSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'> 
<FontAwesomeIcon icon={faAngleLeft}/> </p>}
<div className=' '>
<Image 
onClick={openImg}
src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}/${xy}`}  
width={805} 
height={605} 
className='animate-in cursor-pointer rounded-lg mx-1 my-2 border-2 border-gray-300'
alt={postsData.title}
/>
<p className='p-1 text-2xl text-white mt-1 hover:scale-105 hover:opacity-80'>+ {postsData.files?.length -1} </p>
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
</div>:  
<div ref={replyRef} className='p-2 [&_.post-view]:shadow-none [&_.btn-link]:w-1/4 [&_.btn-link]:m-auto [&_.post-view]:text-lg [&_.post-view]:border-gray-900 [&_.post-view]:bg-transparent [&_.edit-view]:bg-black [&_.edit-view]:p-1 [&_.edit-view]:border-slate-900 [&_.edit-view]:border-2'> 
 <CreateForm createPost={createPost} postEdit={postEdit} post={postsData}/> 
 </div>  
 
} 


 <div className="flex justify-evenly mt-4 w-full m-auto">  
 <button onClick={()=>postLike(postsData )}className="hover:scale-105 relative justify-between focus:outline-none left-0 flex m-1 text-lg rounded-none p-1 bg-inherit">
 <FontAwesomeIcon icon={faThumbsUp} width={25}/>
 <p className="px-1 ">{postsData?.likes?.length}</p> 
 </button>  
 <div> 
 <button onClick={()=>handleOpen(postsData)} className="hover:scale-105 relative focus:outline-none justify-between left-0 flex m-1 text-lg rounded-none p-1 ">
 <FontAwesomeIcon width={25}icon={faComment}rotation={180}/>
 <p className="px-1 ">{postsData?.comments?.length}</p>
 </button>
   
 </div> 
 
 <div>
 <button onClick={()=>showAll(postsData.id)} className="m-1 text-lg rounded-none p-1 hover:scale-105"> 
 <FontAwesomeIcon width={25}icon={faShare}  
 />
 </button>   
 </div>  
 
 </div>
 
 {activeReply && onIdx=== postsData.id&&
   <div className="text-center"> 
 <form className='relative animate-in flex justify-center' ref={elRef} onSubmit={(e)=>createComment(e, postsData.id, null)} >  
 <textarea
 rows="3" 
 cols="400"   
 type='text'
 name='title' 
 className='resize-none border-t-2 pt-4 resize-none bg-inherit m-3 text-md leading-normal hover:bg-transparent rounded-b-sm focus:outline-none' 
 placeholder="Speak your Mind!"
 />  
 <label className="block text-2xl top-16 mt-3 w-1/5 absolute right-3/4 mr-11 overflow-hidden float-left clear-left hover:scale-105" htmlFor="file_input">
 <p className="cursor-pointer"> 
 <FontAwesomeIcon 
   icon={faImage}
   width={20}
   />
   </p> 
 <div className="flex">
   <input
   size="60"
 className="absolute top-0 right-0 text-2xl text-text font-bold border-none rounded-lg cursor-pointer focus:outline-none dark:placeholder-gray-400"
 id=""
 type="file"
 name='files'
 multiple 
 accept="image/*,video/*"
 /> 
 </div>
 </label>
 <button type="submit" className="m-4 rounded-full h-20 text-white p-5 text-lg bg-gray-800 block border-none  hover:text-pink-900 m-1" >Reply
 </button> 
 
 </form> 

 </div>
 } 
 
   {userActions?<LoginModal 
   userActions={userActions} 
    setUserActions={setUserActions} />: 
    <ShareButtons  
    item={postsData} 
    /> }
  
  </div> 
  <div className='max-w-2xl m-auto my-2'> 
 <div className={!comment.parent_id?'text-gray-400 p-5 cursor-auto opacity-90 text-sm':'p-5 cursor-pointer opacity-90 text-sm hover:text-gray-400'} onClick={fetchParent} >Show Leading Comments</div> 

<div className="relative ml-6">  
<div title="close" className='absolute -left-3 bg-gray-200 w-0.5 h-full cursor-pointer'/>  
<div className='max-w-2xl m-auto my-2'>  
<div className='border'> 
<div className='flex '> 
<div className="max-w-fit w-24 ">
{comment.avatar_url&& <Link href={`/profile/${postsData?.user_id}`}><Image 
src={comment.avatar_url} 
width={50} 
height={50}
className='rounded-full p-4 h-24 max-h-24 w-full'
alt={comment.user_name}/></Link> } 
 {!comment.avatar_url&& <Link href={`/profile/${postsData?.user_id}`}><Image 
src='/assets/images/placeholderimg.png'
width={30}  
height={50}
className='rounded-full p-4 h-24 max-h-24 w-full'
alt={comment.user_name}/> </Link>} 
</div>   

 <div className='mt-11'> 
<p className="text-xl w-3/4 font-bold"><Link href={`/profile/${comment.user_id}`}>{comment.user_name||comment.user_email}</Link>  </p>
<p className='text-md leading-relaxed cursor-pointer' onClick={fetchParent}>
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
<div className=' '>
<Image 
onClick={openImg}
src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}/${xy}`}  
width={200} 
height={200} 
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
<p >{scrolledComments?.length ||0}</p> 
</button>  

{user?.id=== comment.user_id ?
<>  
<div className="">
   <button onClick={()=>openEdit(comment.id )}className="flex hover:scale-105 focus:outline-none justify-between my-5 text-xl rounded-none p-1"><FontAwesomeIcon width={30}icon={faPencil} /></button>
   
   {editBtn&&activeIdx=== comment.id &&<button onClick={()=>setCommentId(comment?.id)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900">
   Edit</button>} 
   </div>
<div>
     <button onClick={()=>openDelete(comment.id)}className="flex hover:scale-105 focus:outline-none justify-between m-5 text-xl rounded-none p-1"><FontAwesomeIcon width={30}icon={faDeleteLeft} rotation={180} /></button>
   
     {deleteBtn&&activeIdx=== comment.id && <button onClick={()=>deleteComment(comment?.id)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900">
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
    /> } 
 
</div>  
  {isReplying &&replyId=== comment.id && (
 <div className='text-center opacity-90 text-sm rounded-none p-2' ref={txRef}> 
  <CommentForm 
  {...comment}
  createComment={createComment}
  commentEdit={commentEdit}
  />  
  
 </div> 
 )} 
</div> 

<section className='my-4'>
{tx && tx.length > 0 && 
 (
<div className="relative ml-11" > 
<div className='absolute -left-3 bg-gray-200 w-0.5 h-full cursor-pointer'/> 
 
<AllComments
user={user} 
createComment={createComment} 
commentId={commentId}
setCommentId={setCommentId} 
comments={tx}  
postData={postsData}
commentLike={commentLike}
commentEdit={commentEdit}
deleteComment={deleteComment}  
commentsByParentId={commentsByChildId} 
all_comments={post_comments}
rootComments={tx}
isChildComment={isChildComment}
scrolledComments={scrolledComments}
setScrolledComments={setScrolledComments}
/>  
</div>
  )} 
</section>  

<div> 
{isEditing &&(
<CommentForm 
{...comment} 
commentId={commentId}  
setIsEditing={setIsEditing}
elRef={elRef}
editComment={editComment}
createComment={createComment}
commentEdit={commentEdit}
/>
)}
 </div>
</div>

</div> 
 
<div className='hidden lg:block [&_.trendy]:m-0 [&_.trendx]:block [&_.trendx]:w-full overflow-hidden [&_.trendx]:m-0 [&_.trendx]:p-0'>
<Trends 
trends={trends}/>
<Relevant
item={postsData}
related={related}
/>
</div>
</div>
 </>)
}

export default CommentX