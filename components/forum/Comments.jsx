'use client' 
import {usePathname, useRouter, useSearchParams} from 'next/navigation'   
import CommentForm from './CommentForm'
import AllComments from './AllComments'
import { useState,useEffect, useRef,useMemo } from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft,faDeleteLeft, faPencil,faShare,faEllipsisVertical, faThumbsUp, faComment, faAngleDown, faAngleUp, faImage, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons' 
import Link from 'next/link' 
import Image from 'next/image' 
import CreateForm from '@/app/forum/createpost' 
import ShareButtons from '../ShareButtons'
import { dateFormatter } from '@/utils/dateFormat'
import moment from 'moment'
import { useInView } from 'react-intersection-observer' 
import LoginModal from './LoginModal'
import { createClient } from '@/utils/supabase/client' 
import Relevant from './Relevant'  
import Trends from './Trends'
let initialVal=""  
function sortAscending(pb, pa){
  return (pb?.id - pa?.id);
 }
 function CommentX({searchVal, itemSearches, trends, post_comments, postData, user, comment, related}){ 
const [userActions,setUserActions]=useState(false)
const [locateItem, setLocateItem]=useState(false)
const [notify,setNotify]=useState('')
const [ post, setPost ]=useState({})
const [navDropper,setNavDropper]= useState(false)
const [editId,setEditId]=useState(null)
const [imgMode, setImgMode]=useState(false)
const [showSuggestion, setShowSuggestion]=useState(false)
const [deleteBtn,setDeleteBtn]=useState(false)
const [activeIdx,setActiveIdx]=useState(null)
const [replyId,setReplyId]=useState(null) 
const [activeReply,setActiveReply]=useState(null)
const [scrolledPosts, setScrolledPosts]=useState([]) 
const [scrolledComments, setScrolledComments]=useState([])
const [activeSlide,setActiveSlide] =useState(0) 
const [imgIndex,setImgIndex]= useState('')
const [isChildComment, setIsChildComment]= useState(false)
const [isEditingComment, setIsEditingComment] = useState(false) 
const [onIdx, setOnIdx]=useState(null)
const [editBtn,setEditBtn]=useState(false) 
const [postReply,setPostReply]=useState(null) 
const [shareOptions,setShareOptions]=useState(false)
const [commentObj,setCommentObj]=useState(null)
const [currentParent, setCurrentParent]=useState([])
const [show, setShow] = useState(false);
const [activeCommentReply, setActiveCommentReply]=useState(false)
const dropperRef=useRef()
const replyRef=useRef()
const elRef=useRef() 
const observerRef= useRef() 
const txRef=useRef()  
const imgRef = useRef()
const router = useRouter() 
const { ref, inView } = useInView()  
const searchParams= useSearchParams(); 
const val = searchParams.get('message');
const pathname = usePathname() 
useEffect(()=>{ 
  if(editId){ 
  setPost(postData)
  } 
  
   },[editId, post, setPost])
useEffect(
  () => { 
if(val=== 'Post Updated Successfully' ||val=== 'Comment Created Successfully'||val=== 'Comment Updated Successfully' ||  val=== 'There was error. Please try again!'){
 router.push(pathname, {scroll:false}) 
  window.posted='posted' 
 }  
},[val, searchParams, router])

const editAction=()=>{
  setNavDropper(false)
  setEditId(postData?.id )
}
const handleOpen = (post) => {
  setOnIdx(post.id);  
  setShareOptions(false);
  if(!user){
   setUserActions(true) 
}else{
 setPostReply(true);
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
   setEditBtn(false)
   setPostReply(null)
 }
const prevSlide=()=> { 
const slide =activeSlide - 1 < 0
?postData.files.length - 1
:activeSlide -1;
setActiveSlide(slide);
}
const openImgDelete=(i)=>{
  setDeleteBtn(prev => !prev)  
   setActiveIdx(i);
}
const nextSlide=()=> {
const slide = activeSlide + 1 <  postData.files.length
? activeSlide + 1
: 0;
setActiveSlide(slide); 
}
const openImg =()=>{
setImgMode(prev=>!prev)
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
   const openEdit=(id,i)=>{
    setEditBtn(prev => !prev)
    setDeleteBtn(false)
    setActiveIdx(id);
    setShareOptions(false)
   }
   
   const editting=()=>{ 
    setEditBtn(false)
    setCommentObj(comment)
     setIsEditingComment(true) 
   // editingRef.current?.scrollIntoView()
    }
       const openDelete=(id,i)=>{
      setDeleteBtn(prev => !prev)
      setEditBtn(false)
      setShareOptions(false);
      setActiveIdx(id);
    }   
//     // const openDelete=(i)=>{
//     //   setDeleteBtn(prev => !prev)  
//     //   setActiveIdx(i);
//     // } 
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
    useEffect(() => {
      const handler = (event) => {
      if (!replyRef.current) {           
      return;
      }
      
      if (!replyRef.current.contains(event.target)) {
      setEditId(null)
      
      } 
      
      };
      document.addEventListener("click", handler, true);
      
      return () => {
      document.removeEventListener("click", handler);
      };
      
      }, [setEditId]); 
        
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
const tx =scrolledComments?.length>0&& scrolledComments?.sort(sortAscending)


    const postTag = async (post, tagToDelete ) => {
      const supabase = createClient(); 
      const updTags = post?.suggested_tags?.map(tag => tag.split(" ").filter((ex)=> ex!== tagToDelete) ).flat() ; 
      const { error: sugError } = await supabase
      .from('posts')
      .update({ suggested_tags: [...updTags]})
      .eq('id', post.id) 
      .select()
      if (sugError) {
      console.error('Error updating tags:', sugError.message) 
      } else {
      console.log('Tag updated successfully.');
      
      } 
      // window.location.reload()
      router.refresh()
      //////////////////////////////////////////////////////////////////
      
      const oldTags = post?.tags?.filter(tag => tag !== tagToDelete);
      // console.log( oldTags )
      const { error: updateError } = await supabase 
      .from('posts')
      .update({ tags:[ ...oldTags, tagToDelete]})
      .eq('id', post.id);
      if (updateError) {
      console.error('Error updating tags:', updateError );
      } else { 
      console.log('Tag updated successfully.'); 
      
      }
      router.refresh() 
      //window.location.reload()
      };
      const deleteTag =async (post, tagToDelete)=>{
      const supabase = createClient(); 
      const oldTags = post?.tags?.filter(tag => tag !== tagToDelete);  
      const { error: updateError } = await supabase 
      .from('posts')
      .update({ tags:[ ...oldTags]})
      .eq('id', post.id);
      if (updateError) {
      console.error('Error deleting tags:', updateError );
      } else { 
      console.log('Tag deleted successfully.'); 
      
      }
      //window.location.reload()
      router.refresh()
      }


const createComment =async (e, postId, parentId ) => {
e.preventDefault()
const supabase = createClient()
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
if(file.name!==''){
allFiles.push(filePath)
const { error: uploadError } = await supabase.storage.from('posts_imgs').upload(filePath, file,{upsert: true})
if (uploadError) {
throw new Error('Error Loading Image') 
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

       
if(parentId&&parentId ===comment.id){ 
  setScrolledComments(prev=> [...prev, ...data ])
  }else{
 router.push(`/forum/comment/${data[0].id}`, {scroll:false,shallow:true});
     router.refresh()
  }
 
  router.refresh()
}catch(err){
console.log(err)
}
setActiveReply(null) 
setActiveCommentReply(null)

} 
 
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
const postEdit = async(formData) => { 
  
  const supabase = createClient();
              
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
                 const updGnr= post.genre.filter((tx)=> !tx.includes(k) ).flat()
                 genreList.push([...updGnr, k] )  
                 } 
                 }
                 }
                 const gnrItx =genreList.concat(post.genre).flat().filter( function( item, index, inputArray ) {
                 return inputArray.indexOf(item) === index;
                 })
                 
                 const allFiles=[]
               
                 for (let i = 0; i < files.length; i++) {
                 const file=files[i];
                 const filePath = `${Date.now()}-${file.name}`; 
                 if(!file.name ){ 
                 allFiles.push(post.files||null)
                 }else{
                 allFiles.concat(post.files).push(filePath)
                 
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
                 user_id:post.user_id, 
                 comments:post.comments,
                 likes:post.likes,           
                 username:post.username,
                 suggested_tags:post.suggested_tags ,
                 tags:post.tags, 
                 files:allFiles.flat() ,
                 index:post.index,  
                 avatar_url:post.avatar_url,
                 user_email:post.user_email, 
                 },
                 
                 ])
                 .eq('id', post.id)
                 .select()

                 if (error) {
                 console.log(error) 
                 }
                 formData.set('title', '')
                 router.push(pathname+'?message=Post Updated Successfully', {scroll:false})  
                 const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
                 setScrolledPosts(pt.concat(data)) 
                 router.refresh()
                 setEditId(null)

  };
    
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
const { data , error } = await supabase
.from('comments')
.update([
{    
title,   
slug , 
user_id:commentObj?.user_id,
post_id:commentObj?.post_id,
parent_id:commentObj?.parent_id,
avatar_url:commentObj?.avatar_url,
user_name:commentObj?.user_email,
likes:commentObj?.likes, 
files:commentObj?.files.concat(allFiles), 
},

])
.eq('id', commentObj.id)
.select()
if (error) {
console.log(error) 
}
formData.set('title', '')
const pt = scrolledComments.filter((te)=> te?.id !==commentObj.id) 
 router.push(pathname+'?message=Comment Updated Successfully', {scroll:false}) 
 scrolledComments.forEach(item => {
  if (item.id === commentObj.id) {
      item.title = data[0].title;   
  }
 
  //setScrolledComments([...pt, item ]) 
});
// setScrolledComments([...pt, dt ])  
//setScrolledComments(pt.concat(comment_obj)) 
 
router.refresh()
 
e.target.reset()
setCommentObj(null)
};



const deleteComment =async (comment ) => {
try{
const supabase = createClient();  
const {data, error } = await supabase
.from('comments')
.delete()
.eq('id', comment.id)
if(error){
  console.log(error)
return

}
const {data:parentDeleted, error:parentError } = await supabase
.from('comments')
.delete()
.eq('parent_id', comment.id)
if(parentError){
  throw new Error('Error deleting comment')

}
const comms = scrolledComments.filter((te)=> te.id!== comment.id) 
const rmId = tx.filter((te)=> te.id!== comment.id).map((ex)=> ex.id)
setScrolledComments(comms) 

const {data:updatePost, error:updateError } = await supabase
.from('posts')
.update({comments:[...rmId]})
.eq('id', comment.post_id)

}catch(err){
console.log(err)
} 
 
 if(comment.parent_id=== null)return router.back()
////const pt = scrolledPosts.filter((te)=> te.id!== commentId) 
const comms = scrolledComments.filter((te)=> te.id!== comment.id) 
setScrolledComments(comms)
// router.refresh() 

};

const fetchParent = async()=>{ 
  if(!comment.parent_id)return
    const parent_Comment = commentsByParentId[comment.parent_id] 
    const [id]=parent_Comment
    setCurrentParent(parent_Comment) 
    setIsChildComment(prev=>!prev)  
    router.push(`/forum/comment/${id.id}`, {scroll:false})  
 } 
  
const pushUrl = ()=>{
  setIsChildComment(false)  
   router.push(`/forum/comment/${comment.id}`, {scroll:false}) 
   // router.push(`/forum/comment/${slug.slug}/${id.id}`, {scroll:false})  
   } 
  return( 
    <> 
 {userActions &&<LoginModal setUserActions={setUserActions}  />} 
<div className='flex justify-between relative'> 
<p onClick={() => router.back()}><FontAwesomeIcon icon={faChevronLeft}width={50} className="text-lg hover:scale-125 my-8 opacity-80 border p-3 m-2 cursor-pointer"/></p> 
 {/* <Link href='/search-page'><p onClick={searchLocation}><FontAwesomeIcon icon={faSearch}width={50} className="text-lg hover:scale-125 my-8 opacity-80 border p-3 m-2 cursor-pointer"/></p></Link>   */}

</div>
<div className='w-full flex items-center justify-center'> {notify&&<p className="m-auto fixed z-10 top-0 bg-green-500 border-2 text-center text-white p-3 text-xl">{notify}</p>}</div>
 
 <div className='lg:flex justify-center max-w-5xl m-auto px-4'> 
 
 {navDropper?
 (<div ref={dropperRef} className="relative">  
 { postData?.user_id=== user?.id?
 <div className='p-2 absolute text-white text-center z-10 py-3 left-96 text-md rounded-none shadow-4xl p-3 border w-56 bg-slate-900 top-48'> 

 <div className='flex justify-between text-xl p-2 cursor-pointer'><FontAwesomeIcon icon={faDeleteLeft}width={20} /><p onClick={()=> postDelete(postData.id) }>Delete</p></div>

 <div className='flex justify-between text-xl p-2 cursor-pointer' onClick={editAction}><FontAwesomeIcon icon={faPencil} /><p>Edit</p> 
  </div>
 </div>
 :null} 
  
 </div>) 
 :
null}

  <div className='py-3'> 
 {val && <p className="w-1/2 text-center m-auto my-2 text-white p-2 bg-gray-400">
{val}
</p>}

<div className='shadow-2xl m-auto max-w-2xl px-3'>
  
<div className='m-auto flex flex-col items-center border-b-2'> 
{postData?.avatar_url? <Link href={`/profile/${postData?.user_id}`}><Image src={postData?.avatar_url} 
width={80} 
height={80}
className='rounded-full'
alt={postData?.user_email}/></Link>:
<Link href={`/profile/${postData?.user_id}`}><Image src={'/assets/images/culturays.png'} 
width={80} 
height={80} 
className='rounded-full'
alt={postData?.user_email}/></Link> }  
<Link href={`/profile/${postData?.user_id}`}><h3 className='p-3 text-lg font-bold'>{postData?.user_email} </h3></Link>
</div>

 
{!editId ?
<div ref={replyRef}> 
<div className='m-2 p-3'>  
<div className='relative ' >
<small className="my-4">
{moment(postData.created_at, "YYYYMMDD").fromNow() }  
</small> 
<Link href={`/forum/post/${postData.slug}/${postData.id}`}><h3 className='text-2xl p-3 underline text-center '>{postData?.title} </h3> </Link>
 {postData.user_id === user?.id&& <p onClick={() => setNavDropper(prev=> !prev)} className='absolute z-50 opacity-80 cursor-pointer text-xl right-0 top-0'> <FontAwesomeIcon icon={faEllipsisVertical} /></p>}
 </div>
 <p className='text-lg py-2 leading-relaxed'>{postData?.story} </p> 
  </div> 
 <div className="flex flex-wrap text-md m-3"> 
{postData?.tags?.map((xy, vi)=>
xy.split(',').map((ex, xi)=> ex&&
<div className="flex bg-gray-100 mx-1 my-4" key={xi}>
<Link href={`/search-page/?searchVal=${ex.replace('#', '')}`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>

  {postData.user_id === user.id && <small className="p-2 hover:bg-gray-400 cursor-pointer" onClick={()=>deleteTag(postData, ex)}>x</small>} 
</div> ))} 
 
</div> 

<div className="flex flex-wrap w-3/4 mx-3" > 
{user?.id=== postData.user_id && <small className="text-lg text-gray-700 cursor-pointer mx-2 text-center mx-2">Suggested Tags:</small> }
 
 {user?.id=== postData.user_id &&  postData?.suggested_tags.length !== 0&&
postData?.suggested_tags?.filter((e, i, a)=> a.findIndex(item=>item.replace('.', '') === e.replace('.', '')) === i).filter((jx )=> jx!=='').map((ex, xi)=>    
<div className="flex text-sm" key={ex + ' ' + xi}>
  
 <div className="flex w-full flex-wrap overflow-hidden "> 
 {showSuggestion&&!postData?.tags?.includes(ex)&&ex!==false && ex.split(' ').map((xy, i)=> <p onClick={()=>postTag(postData , xy)}key={i}className="p-1 m-1 hover:opacity-70 cursor-pointer bg-gray-100" >#{xy.replace('.', '')}  
</p> ) } 
 </div>
</div>
  
) }
{user?.id=== postData.user_id && showSuggestion&&<p className="cursor-pointer m-1 text-md opacity-70" onClick={()=> setShowSuggestion(prev => !prev)}> <FontAwesomeIcon icon={faAngleUp} /></p> }
{user?.id=== postData.user_id && !showSuggestion&& <p className="cursor-pointer m-1 text-md opacity-70 "onClick={()=> setShowSuggestion(prev => !prev)}><FontAwesomeIcon icon={faAngleDown} /> </p> }  
</div>

 <div className='m-5 '
> 
{postData.files?.length > 0 && postData.files?.map((xy, ix)=>ix === activeSlide && xy&&
<div className={imgMode? 'fixed z-10 bg-gray-800 bg-opacity-80 h-full flex justify-center items-center left-0 top-0 w-full ':' mx-1 scroll-smooth text-center cursor-pointer'} key={xy + ' '+ postData.title}>
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
alt={postData.title}
/>
<p className='p-1 text-2xl text-white mt-1 hover:scale-105 hover:opacity-80'>+ {postData.files?.length -1} </p>
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
 <CreateForm postEdit={postEdit} post={postData} val={val} setPost={setPost} />  
</div> 
} 

 <div className=" flex justify-evenly mt-4 w-full m-auto">  
 <button onClick={()=>postLike(postData, user )}className="hover:scale-105 relative justify-between focus:outline-none left-0 flex m-1 text-lg rounded-none p-1 bg-inherit">
 <FontAwesomeIcon icon={faThumbsUp} width={25}/>
 <p className="px-1 ">{postData?.likes?.length}</p> 
 </button>  
 <div> 
 <button onClick={()=>handleOpen(postData)} className="hover:scale-105 relative focus:outline-none justify-between left-0 flex m-1 text-lg rounded-none p-1">
 <FontAwesomeIcon width={25}icon={faComment}rotation={180}/>
 <p className="px-1 ">{postData.comments.length}</p>
 </button>
   
 </div> 
 
 <div>
 <button onClick={()=>showAll(postData.id)} className="m-1 text-lg rounded-none p-1 hover:scale-105"> 
 <FontAwesomeIcon width={25}icon={faShare}  
 />
 </button>   
 </div>  
 
 </div>
 {postReply &&
   <div className="text-center"> 
 <form className='relative animate-in flex justify-center' ref={elRef} onSubmit={(e)=>createComment(e, postData.id, null)} >  
 <textarea
 rows="3" 
 cols="400"   
 type='text'
 name='title' 
 className='resize-none border-t-2 pt-4 resize-none bg-inherit m-3 text-md leading-normal hover:bg-transparent rounded-b-sm focus:outline-none' 
 placeholder="Speak your Mind!"
 />  
 <label className="block text-2xl top-16 mt-3 w-1/3 relative overflow-hidden float-left clear-left hover:scale-105" htmlFor="file_input">
 <p className="cursor-pointer"> 
 <FontAwesomeIcon 
   icon={faImage}
   width={20}
   />
   </p> 
 <div className="flex justify-center">
   <input
   size="80"
 className="absolute top-0 z-20 opacity-10 text-2xl text-text font-bold border-none rounded-lg cursor-pointer focus:outline-none dark:placeholder-gray-400"
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
    item={postData}
    shareOptions={shareOptions}
    activeIdx={activeIdx}
    /> }

  </div> 
 

  <div className='max-w-2xl px-2 m-auto my-2'> 
  <div className={!comment.parent_id?'text-gray-400 p-5 cursor-auto opacity-90 text-sm':'p-5 cursor-pointer opacity-90 text-sm hover:text-gray-400'} onClick={fetchParent} >Show Leading Comments</div>
  <div className="relative ml-6">  
<div title="close" className='absolute -left-3 bg-gray-200 w-0.5 h-full cursor-pointer'/>  
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
<p >{scrolledComments?.length ||0}</p> 
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

   {/* {!childComments?.length?'' : !isChildComment&&childComments?.indexOf(childComments[0])===childComments?.length-1 ?<p className='cursor-pointer'onClick={pushUrl}>+ { childComments?.length }</p> :isChildComment&& childComments?.indexOf(childComments[0])!==childComments?.length-1 ?<p className='cursor-pointer'onClick={()=> setIsChildComment(prev =>!prev)}>- { childComments?.length }</p>:<p className='cursor-pointer'onClick={()=> setIsChildComment(prev =>!prev)}>+ { childComments?.length} more</p>}  */}

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
//editComment={editComment}    
comments={childComments}  
//handleLike={handleLike}
postData={postData}
user={user}
shareOptions={shareOptions}
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
//editComment={editComment}
createComment={createComment}
commentEdit={commentEdit}
/>

</>
  )}  

</div> 
</div> 
    </div>
    <section className='my-4'>
{tx && tx.length > 0 && 
 (
<div className="relative left-14 w-11/12" > 
<div className='absolute -left-3 bg-gray-200 w-0.5 h-full cursor-pointer'/> 
 
<AllComments
user={user} 
createComment={createComment} 
commentObj={commentObj} 
setCommentObj={setCommentObj} 
comments={tx}  
postData={postData}
commentLike={commentLike}
commentEdit={commentEdit}
deleteComment={deleteComment}  
commentsByParentId={commentsByChildId} 
all_comments={post_comments}
rootComments={tx}
isChildComment={isChildComment}
scrolledComments={scrolledComments}
setScrolledComments={setScrolledComments}
activeIdx={activeIdx}
setActiveIdx={setActiveIdx}
activeReply={activeReply}
shareOptions={shareOptions}
setShareOptions={setShareOptions}
setActiveReply={setActiveReply}
setIsEditingComment={setIsEditingComment}
isEditingComment={isEditingComment}
/>  
</div>
  )} 
</section> 
</div>
<div className='hidden lg:block overflow-hidden '>
<Trends 
trends={trends}/>
<Relevant 
item={postData}
related={related}
/>
</div>

</div> 
    </>
  )
 }
export default CommentX

