'use client' 
 
import { usePathname, useRouter, useSearchParams} from 'next/navigation'  
import AllComments from './AllComments'
import { useState,useEffect, useRef,useMemo } from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faDeleteLeft, faPencil,faShare,faEllipsisVertical, faThumbsUp, faComment, faAngleDown, faAngleUp, faImage, faAngleLeft, faAngleRight, faSearch } from '@fortawesome/free-solid-svg-icons' 
import Link from 'next/link' 
import Image from 'next/image' 
import { usePagesContext } from '../Pages-Context'
import CreateForm from '@/app/forum/createpost'  
import ShareButtons from '../ShareButtons' 
import moment from 'moment'
import { useInView } from 'react-intersection-observer' 
import LoginModal from './LoginModal'
import { createClient } from '@/utils/supabase/client'
import { getComments } from '@/app/forum/actions/loadComments' 
import Trends from './Trends'  
import Relevant from './Relevant' 
//use trends and related items here
let initialVal=""  
function sortAscending(pb, pa){ 
  return (pa?.id - pb?.id);
 }
function PostX ({
  initiaComms, 
  postData, 
  searchVal, 
  itemSearches, 
  trends, 
  commentsX, 
  comments, 
  user,
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
const [startScroll,setStartScroll]=useState(2)
const [ post, setPost ]=useState({})
const { ref, inView } = useInView() 
const { notify , createPost, imgRef, setImgIndex, imgIndex, setActiveIdx, show, setShow, setShareOptions,setImgZoom, imgZoom, activeIdx, setNotify}=usePagesContext()
const dropperRef=useRef()
const replyRef=useRef()
const elRef=useRef() 
const observerRef= useRef()

useEffect(() => {
  setScrolledComments(initiaComms) 
}, []); 

const loadMorePosts = async () => {
  const apix = await getComments(startScroll, startScroll + count -1, postData)

  if(apix){
  setScrolledComments(scrolledComments?.concat(apix))  
  } 
  setStartScroll((prev)=>prev + apix?.length) 
  setCount((prev)=>prev * apix?.length) 
  }

useEffect(() => { 
    if (inView &&scrolledComments) {
      loadMorePosts()   
    }
  
  }, [inView, count ]) 
 //count - a dependency?
useEffect(()=>{ 
if(editId){ 
setPost(postData)
} 

 },[editId, post, setPost])  

 const openDelete=(i)=>{
  setDeleteBtn(prev => !prev)  
  setActiveIdx(i);
} 

const commentsByParentId = useMemo(() => {
 const groupParent = {} 
 scrolledComments?.forEach(comment => { 
 groupParent[comment?.parent_id] ||= []
   groupParent[comment?.parent_id].push(comment) 
  })
 
  return groupParent
  }, [scrolledComments])
 const rootComments =commentsByParentId[null]
 
useEffect(() => {
const handler = (event) => {
if (!dropperRef.current) {           
return;
}

if (!dropperRef.current.contains(event.target)) {
setNavDropper(false); 
} 

};
document.addEventListener("click", handler, true);

return () => {
document.removeEventListener("click", handler);
};

}, [navDropper, setEditId ]);


useEffect(() => {
const handler = (event) => {
if (!imgRef.current) {           
return;
}

if (!imgRef.current.contains(event.target)) {
setShow(false);
setActiveIdx(null)
setDeleteBtn(null)
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
  
 const editAction=()=>{
  setNavDropper(false)
  setEditId(postData?.id )
}
 
function enlargeImgs(ex,ix) {  
  setImgIndex(ex)
  imgRef.current?.scrollIntoView({ behavior: 'smooth',block: 'center'}) 
  setImgZoom({
  width:'fit-content',
  height:'auto',  
  transition: "width 0.5s ease", 
}
  )

 setShow(prev => !prev)
}
  
const changeIndex = (i) => {
 setShowSuggestion(true)
 setShowIndex(i)
 if(showSuggestion && showIndex=== i){
 setShowSuggestion(false)  
  
 } 

};
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
const searchParams= useSearchParams();
const val = searchParams.get('message');
const pathname = usePathname() 

useEffect(
  () => { 
if(val=== 'Post Updated Successfully' ||val=== 'Comment Created Successfully'||val=== 'Comment Updated Successfully' ||  val=== 'There was error. Please try again!'){
 router.push(pathname, {scroll:false}) 
  window.posted='posted' 
 }  
},[val, searchParams, router ])
  
 
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
 
  const [activeSlide,setActiveSlide] =useState(0) 
  const [imgMode, setImgMode]=useState(false)
  const prevSlide=()=> { 
    const slide =activeSlide - 1 < 0
      ?postData.files.length - 1
      :activeSlide -1;
      setActiveSlide(slide);
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
const openImgDelete=(i)=>{
  setDeleteBtn(prev => !prev)  
   setActiveIdx(i);
}


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
                const updGnr= post.genre.filter((tx)=> !tx.includes(k) ).flat()
                genreList.push([...updGnr, k] )  
                } 
                }
                }
                const gnrItx =genreList.concat(post.genre).flat().filter( function( item, index, inputArray ) {
                return inputArray.indexOf(item) === index;
                })
                
                const allFiles=[]
                const supabase = createClient();
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
                
                //.filter((te)=> te.slug!== slug)
                const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
                setScrolledPosts(pt.concat(data)) 
                router.refresh()
                setTimeout(()=>{
                setEditId(null)
                
                }, 3000)
                
                };
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
                  if(file.name=== ''){
                  allFiles.push(null)
                  
                  }else{
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
                  router.refresh()
                  const newComment = data[0];
                  // setScrolledPosts([...scrolledPosts, ...updtPosts])
                  setScrolledComments([...scrolledComments, ...data]) 
                  }catch(err){
                  console.log(err)
                  }
                  setActiveReply(null) 
                
                 }
                 e.target.reset()
                  }
               
                  const commentLike  = async(comment ) => { 
                    const supabase = createClient(); 
                    const likeidx = comment?.likes?.findIndex((id)=> id === user.id)  
                    const updLks= comment?.likes?.filter((ex)=> ex !==user.id ) 
                    if(!user){
                      setUserActions(true)
                    }else{ 
                    if(likeidx=== -1){ 
                    const {data:comments, error: lkrror } = await supabase
                    .from('comments')
                    .update({likes: [...comment?.likes, user.id]} )
                    .eq('id', comment.id) 
                    .select()
                    
                    if (lkrror) {
                    console.error('Error updating likes:', lkrror );
                    } else { 
                
                  const pt = scrolledComments.filter((te)=> te?.id !== comment?.id) 
                   setScrolledComments([...pt, ...comments]) 
                     router.refresh()  
                 
                      }    
                    } 
                     
                    if(likeidx !== -1){  
                    const {data:comments, error } = await supabase
                    .from('comments')
                    .update({ likes:[...updLks]})
                    .eq('id', comment.id) 
                    .select()
                    if(error){
                    console.log(error)
                    }
                    else {  
                      const pt = scrolledComments.filter((te)=> te.id !== comment.id) 
                      setScrolledComments([...pt, ...comments])  
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
                    
              
                const deleteComment =async (commentx) => {
                  try{
                  const supabase = createClient();  
                    const {data, error } = await supabase
                    .from('comments')
                    .delete()
                    .eq('id', commentx.id) 
                    if(error){
                      throw new Error('Error deleting comment')
                    
                    }
                    const {data:parentDeleted, error:parentError } = await supabase
                    .from('comments')
                    .delete()
                    .eq('parent_id', commentx.id)
                    if(parentError){
                      throw new Error('Error deleting comment')
                    
                    }
                    const comms = scrolledComments.filter((te)=> te.id!== commentx.id) 
                    const rmId = rootComments.filter((te)=> te.id!== commentx.id).map((ex)=> ex.id)
                    setScrolledComments(comms) 
                   
                    const {data:updatePost, error:updateError } = await supabase
                    .from('posts')
                    .update({comments:[...rmId]})
                    .eq('id', commentx.post_id)

                    if(updateError){
                      console.log(updateError)
                      throw new Error('Error updating post')
                    
                    }
                    }catch(err){
                    console.log(err)
                    }  
                    router.refresh()
                   
                    };
                    const postDelete =async (id_) => { 
                      try{
                        const supabase = createClient();  
                        const { data: commentsData, error: commentsError } = await supabase
                        .from('comments')
                        .delete()
                        .eq('post_id', id_);
                      
                      if (commentsError) {
                        throw new Error('Error deleting comments')
                        // console.error('Error deleting comments:', commentsError);
                        // return;
                      }
                      
                      // Then, delete the post
                      const { data , error: postError } = await supabase
                        .from('posts')
                        .delete()
                        .eq('id', id_);
                      
                      if (postError) {
                        throw new Error('Error deleting posts')
                       
                      }
                      if(!postData ||!data){
                      router.back()
                      
                      } 
                      }catch(err){
                      console.log(err)
                      } 
                       
                     
                      // const pt = scrolledPosts.filter((te)=> te.id!== id_) 
                      // setScrolledPosts(pt )
                      //window.location.reload()
                      };
                      
                      
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
                      console.error('Error updating tags:', updateError );
                      } else { 
                      console.log('Tag updated successfully.'); 
                      
                      }
                      //window.location.reload()
                      router.refresh()
                      } 
              
return ( 
<>
{userActions &&<LoginModal setUserActions={setUserActions}  />} 
<div className='flex justify-between relative'> 
<p onClick={() => router.back()}><FontAwesomeIcon icon={faChevronLeft}width={50} className="text-lg hover:scale-125 my-8 opacity-80 border p-3 m-2 cursor-pointer"/></p> 
 <Link href='/search-page'><p onClick={searchLocation}><FontAwesomeIcon icon={faSearch}width={50} className="text-lg hover:scale-125 my-8 opacity-80 border p-3 m-2 cursor-pointer"/></p></Link>  

</div>
<div className='w-full flex items-center justify-center'> {notify&&<p className="m-auto fixed z-10 top-0 bg-green-500 border-2 text-center text-white p-3 text-xl">{notify}</p>}</div>
 
 <div className='lg:flex lg:justify-center sm:max-w-2xl lg:max-w-6xl m-auto px-4'> 
{/* xs:w-4/5 sm:w-3/4 md:w-4/6 m-auto */}
<div className='py-3'> 
  {navDropper?
 (<div ref={dropperRef} className="absolute -mr-12 text-white text-center py-3 right-1/4 xl:mr-11 2xl:mr-20 text-md rounded-none shadow-4xl p-3 border w-3/4 max-w-xs z-10 bg-slate-900 mt-52">  
 { postData?.user_id=== user?.id?
 <div className='p-2 ' > 
 <div className='flex justify-between text-xl p-2 cursor-pointer '><FontAwesomeIcon icon={faDeleteLeft} /><p onClick={()=> postDelete(postData.id) }>Delete</p></div>
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
<div className='shadow-2xl m-auto lg:max-w-xl xl:max-w-2xl'>
  <div > 
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
<Link href={`/profile/${postData?.user_id}`}><h3 className='p-3 text-lg font-bold '>{postData?.user_email} </h3></Link>
</div>

</div>
{!editId ?
<div ref={replyRef}> 
<div className='m-2 p-3'>  
<div className='relative' >
<small className="my-4">
{moment(postData.created_at, "YYYYMMDD").fromNow() }  
</small> 
<p className='text-2xl p-3 underline text-center '>{postData?.title} </p> 
 {postData.user_id === user?.id&& <p onClick={() => setNavDropper(prev=> !prev)} className= 'absolute opacity-80 cursor-pointer text-xl pr-5 left-full top-0'> <FontAwesomeIcon icon={faEllipsisVertical} /></p>}
 </div>
 <p className='text-lg py-2 leading-relaxed'>{postData?.story} </p> 
  </div>
 <div className="flex flex-wrap text-md m-3"> 
{postData?.tags?.map((xy, vi)=>
xy.split(',').map((ex, xi)=> ex&&
<div className="flex bg-gray-100 mx-1 my-4" key={xi}>
<Link href={`/tag/${ex.replace('#', '')}`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>
<small className="p-2 hover:bg-gray-400" onClick={()=>deleteTag(postData, ex)}>x</small>
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
 
    <CreateForm createPost={createPost} postEdit={postEdit} post={postData} />  
</div> 
} 

 <div className=" flex justify-evenly mt-4 w-full m-auto">  
 <button onClick={()=>postLike(postData )}className="hover:scale-105 relative justify-between focus:outline-none left-0 flex m-1 text-lg rounded-none p-1 bg-inherit">
 <FontAwesomeIcon icon={faThumbsUp} width={25}/>
 <p className="px-1 ">{postData?.likes?.length}</p> 
 </button>  
 <div> 
 <button onClick={()=>handleOpen(postData)} className="hover:scale-105 relative focus:outline-none justify-between left-0 flex m-1 text-lg rounded-none p-1 ">
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
 
 {activeReply && onIdx=== postData.id&&
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
    /> }

  </div> 

<section className='my-4' >
{rootComments && rootComments.length > 0 && 
 (
<div className="" > 
<AllComments
user={user}
createComment={createComment} 
commentId={commentId}
setCommentId={setCommentId} 
comments={rootComments}  
postData={postData}
commentLike={commentLike}
commentEdit={commentEdit}
deleteComment={deleteComment}  
commentsByParentId={commentsByParentId} 
all_comments={comments}
rootComments={rootComments}
/> 
</div>
  )} 
</section> 
  
</div>

<div className='hidden lg:block [&_.trendy]:m-0 [&_.trendx]:block [&_.trendx]:w-full overflow-hidden [&_.trendx]:m-0 [&_.trendx]:p-0'>
<Trends 
trends={trends}/>
<Relevant
item={postData}
related={related}
/>
</div>
</div>
<div ref={ref}>Loading...</div>
 </>)
}

export default PostX