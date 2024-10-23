"use client"
import Image from "next/image"
import { useRouter, usePathname, useSearchParams} from "next/navigation";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons"
import { faDeleteLeft, faPencil, faShare, faAngleDown, faUser, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import ShareButtons from "../ShareButtons" 
import { useFormStatus } from "react-dom"; 
import useSWR from "swr"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import LoginModal from "./LoginModal"
import { useInView } from "react-intersection-observer"
import CreateForm from "@/app/forum/createpost"
import nlp from 'compromise/three'
import Events from "@/components/forum/Events"; 
import { createClient } from "@/utils/supabase/client"; 
import Bday from "../Bday";
import Trends from "./Trends"; 
function sortAscending(pb, pa){  
  return (pb?.id - pa?.id);
 } 
const Main = ({ user, trends, events, bday, initialPosts }) => { 
const router = useRouter()   
const [onIdx, setOnIdx]=useState(null)
const [activeReply,setActiveReply]=useState(null)
const [showSuggestion, setShowSuggestion]=useState(false)  
const [deleteBtn,setDeleteBtn]=useState(false) 
const [searchVal, setSearchVal] = useState(null)
const [showIndex, setShowIndex]= useState(null) 
const [editBtn,setEditBtn]=useState(false)
const [comment, setComment]=useState("")
const [count,setCount]=useState(2) 
const [startScroll, setStartScroll]=useState(3)
const [postSearch,setPostsSearched]=useState([]) 
const [active,setActive]=useState(false)
const [post,setPost]=useState({}) 
const [activeIdx, setActiveIdx]=useState(false)
const [userActions,setUserActions]=useState(false)
const [scrolledPosts, setScrolledPosts]=useState([])
const [notify, setNotify]=useState(false)
const [ show, setShow]=useState(false)
const [imgIndex, setImgIndex]=useState(false)
const [imgZoom,setImgZoom]=useState(false)
const[shareOptions, setShareOptions]=useState(false) 
const imgRef = useRef()
const elRef = useRef();
const createRef=useRef()  
const { ref, inView } = useInView()
    const { pending, action } = useFormStatus(); 
    const isPending = pending && action
    
    useEffect(() => {
      setScrolledPosts(initialPosts)
      }, []);  
     
    const loadMorePosts = async () => {
      const supabase = createClient() 
      const { data:apiP , error } = await supabase 
      .from('posts')
      .select('*') 
      .range(startScroll, startScroll + 1) 
      if(error) return
    if(apiP &&apiP?.length>0){ 
      setScrolledPosts(scrolledPosts?.concat(apiP))
     }else return 
    //  //setScrolledPosts([...scrolledPosts, ...apiP])
    setStartScroll((prev)=>prev + apiP?.length) 
    setCount((prev)=>prev * apiP?.length) 
    }
    useEffect(() => {  
      if (inView) {
        loadMorePosts()   
      }
    
    }, [inView]) 
    const opTitles=scrolledPosts?.sort(sortAscending) 
    function enlargeImgs(i, ix) {  
      setImgIndex(scrolledPosts[i]?.files[ix])
     //imgRef.current?.scrollIntoView({ behavior: 'smooth',block: 'center'}) 
      setImgZoom({
      width:'200%',
      height:'auto',  
      transition: "width 0.5s ease", 
    }
      )
    
      setShow(prev=> !prev) 
      if(show){
        setDeleteBtn(false)
        setImgZoom({
          width:'max-content', 
          transition: "width 0.5s ease",
         
        }
          )
      } 
    }
  const handleOpen = (post) => { 
        setOnIdx(post.id); 
        setShareOptions(false);
        if(!user){
          setUserActions(true) 
       }else{
        setActiveReply(true);
       } 
       
      };
      
  const showAll = (id,i) => {
    setActiveIdx(id); 
    setEditBtn(false)
    setDeleteBtn(false)
    if(!user){
       setUserActions(true) 
    }else{
        setShareOptions(prev => !prev);
    }  
  }
   const openDelete=(id,i)=>{
  setDeleteBtn(prev => !prev)
  setEditBtn(false)
  setShareOptions(false);
setActiveIdx(id);
} 

const changeIndex = (i) => {
  setShowSuggestion(true)
  setShowIndex(i)
  if(showSuggestion && showIndex=== i){
  setShowSuggestion(false)  
   
  } 
 
};
const openEdit=(id,i)=>{
  setEditBtn(prev => !prev)
  setDeleteBtn(false)
  setActiveIdx(id);
  setShareOptions(false)
  }
 
  
  const editting=(p)=>{ 
  setPost(p)  
  editingRef.current?.scrollIntoView()
  }
  async function resetImg(imgs,img) {
    const supabase= createClient()
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
  
  const createPost = async (formData) => { 
    const supabase = createClient(); 
      //?.index + 2 reflects the length of items in the range in forumPosts. should chang accordingly
     //const index =posts[posts?.length  - 1]?.id + 3
     const title = formData.get('title')
     const story = formData.get('story') 
     const family = formData.get('family')
     const work = formData.get('work')
     const school = formData.get('school')  
     const friends = formData.get('friends')
     const folktale = formData.get('folktale')
     const entertainment = formData.get('entertainment')
     const files = formData.getAll("files");
     const slug=title?.trim()?.toLowerCase().replace(/ /g,"-")
     const storyX = story?.split(' ').filter((ex)=> !ex.includes('#')).join(' ')
    const genre=[{
    family,
    work,
    entertainment,
    school,
    friends,
    folktale
    }]
    const genreList =[] 
    
    for (const [key, value]  of genre.flat().entries()) { 
    for(const [k,v] of Object.entries(value) ){
      // console.log(`Key: ${k}, Value: ${v}`);
      if(v){
        genreList.push(k) 
      } 
    }
    }
    
     if(!title ) return 
      const nouns = nlp(story).match('#Noun').text();  
      const hashNo =nlp(story).hashTags().text()
     //.json({normal:true}) 
     const people = nlp(story).people().text()
     const places = nlp(story).places().text()
     const adj = nlp(story).nouns().adjectives().text()
     const nounDoc = nlp(story).people().normalize().text() 
     const allFiles=[]
    
     for (let i = 0; i < files.length; i++) {
      const file=files[i];
      const filePath = `${Date.now()}-${file.name}`; 
     if(file.name=== ''||file.name.includes(' ')){ 
     router.push(pathname+'?message=Please choose a valid file!')
     }
     else{
     allFiles.push(filePath)  
     const { error: uploadError } = await supabase.storage.from('posts_imgs').upload(filePath?.replace(/ /g,"-"), file,{upsert: true})
     if (uploadError)
        {
       throw new Error('An error has occured') 
       // redirect("/forum?message=Error Loading Image")
     } 
      }
     
      };
     if(!user){
      setUserActions(true)
    }else{ 
     const { data, error } = await supabase
     .from('posts')
     .insert([
     {    
     title, 
     story:storyX, 
     user_id:user?.id,
     comments:[],
     username:user?.user_metadata.full_name,
     likes:[],
     suggested_tags:[
       nouns, 
       people,
       places, 
       adj ,
       nounDoc 
     ] ,
      tags:[hashNo], 
     files: allFiles, 
     is_approved:false,
     slug,
     avatar_url: user?.user_metadata.picture,
     user_email:user?.email,
      genre: genreList 
     }, 
      
     ])
     .select()   
   
    router.refresh() 
    if (error) {
    console.log(error)
    router.push(pathname+'?message=There was error. Please try again!', {scroll:false}) 
     
    }  
    router.push(pathname+'?message=Post Created Successfully', {scroll:false}) 
    const pt = scrolledPosts.filter((te)=> te.slug !== slug) 
    setScrolledPosts([...pt, ...data]) 
  } 
  
  createRef.current.scrollIntoView()
    } 
  
  
    const postLike = async (post, user) => { 
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
      const createComment =async (e, postId, parentId) => {
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
        throw new Error('Upload Error')
 
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
        //.eq('id', post.id)
        .select()
        
        if(error){
        console.log(error)
        }  
        router.refresh()
        const newComment = data[0];
        
        // Update the post's comments array
        const updatedPosts = scrolledPosts.map((p) => { 
          if (p.id === postId) {
            return {
              ...p,
              comments: [...p.comments, parentId]
            };
          }
          return p;
        });
        
        setScrolledPosts(updatedPosts);
        }catch(err){
        console.log(err)
        }
        setActiveReply(null)
      //  setIsReplying(null)
        setTimeout(
        () =>setNotify(''), 
        2000 
        )
       } 
        }
      
  
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
    router.push(pathname+'?message=Post Updated Successfully', {scroll:false})  
    
    //.filter((te)=> te.slug!== slug)
    const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
    setScrolledPosts(pt.concat(data)) 
    router.refresh()
    createRef.current.scrollIntoView()
    };

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
  const { data, error } = await supabase
  .from('comments')
  .update([
  {    
  title,   
  slug , 
  user_id:comment?.user_id,
  post_id:comment?.post_id,
  parent_id:comment?.parent_id,
  avatar_url:comment?.avatar_url,
  user_name:comment?.user_email,
  likes:[],
  files:comment?.files.concat(allFiles), 
  },
  
  ])
  .eq('id', comment.id)
  .select()
  if (error) {
  console.log(error) 
  }
  formData.set('title', '')
  router.push(pathname+'?message=Comment Updated Successfully', {scroll:false})  
  
  //.filter((te)=> te.slug!== slug)
  const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
  //setScrolledComments(pt.concat(data)) 
  setScrollChild(pt.concat(data))
  router.refresh()
  setTimeout(()=>{
  setComment(null)
  
  }, 3000)
  
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
    
    }catch(err){
    console.log(err)
    } 
     
   router.refresh()
    const pt = scrolledPosts.filter((te)=> te.id!== id_) 
    setScrolledPosts(pt )
    //window.location.reload()
    };
    const postTag = async (post, tagToDelete ) => {
      const supabase = createClient(); 
      const updTags = post?.suggested_tags?.map(tag => tag.split(" ").filter((ex)=> ex!== tagToDelete) ).flat() ; 
      const { data, error: sugError } = await supabase
      .from('posts')
      .update({ suggested_tags: [...updTags]})
      .eq('id', post.id) 
      .select()
      if (sugError) {
      console.error('Error updating tags:', sugError.message) 
      } else {
      console.log('Suggested Tag updated successfully.', data);
      const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
      setScrolledPosts(pt.concat(data)) 
      router.refresh()
      } 
      // window.location.reload()
    
      //////////////////////////////////////////////////////////////////
      
      const oldTags = post?.tags?.filter(tag => tag !== tagToDelete);
      console.log( tagToDelete )
      const {data:updateData, error: updateError } = await supabase 
      .from('posts')
      .update({ tags:[ ...oldTags, tagToDelete]})
      .eq('id', post.id) 
      .select()
      if (updateError) {
      console.error('Error updating tags:', updateError );
      } else { 
      console.log('Tag updated successfully.', updateData); 
      const pt = scrolledPosts.filter((ex)=> ex.id !== post.id)  
      setScrolledPosts(pt.concat(updateData)) 
      router.refresh() 
      }
     
      //window.location.reload()
      };
      const deleteTag =async (post, tagToDelete)=>{
      const supabase = createClient(); 
      const oldTags = post?.tags?.filter(tag => tag !== tagToDelete);  
      const {data, error: updateError } = await supabase 
      .from('posts')
      .update({ tags:[ ...oldTags]})
      .eq('id', post.id)
      .select()
      if (updateError) {
      console.error('Error deleting tags:', updateError );
      } else { 
      console.log('Tag deleted successfully.'); 
      const pt = scrolledPosts.filter((ex)=> ex.id !== post.id)  
      setScrolledPosts(pt.concat(data))
      router.refresh()
      }
      //window.location.reload()
    
      } 
 

      useEffect(()=>{
        const searchValues = async () => {
          const supabase = createClient();  
          const { data, error } = await supabase
            .from('posts')   
            .select("*")
            .filter('title', 'ilike', `%${searchVal}%`);
          
          if (error) {
            console.error('Error fetching posts:', error.message);
            return;
          }
         
          setPostsSearched( data)
        
        }
         searchValues()
        },[searchVal]) 
        
        
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
          
        const editingRef=useRef() 
        const fetcher = (...args ) => fetch(...args).then(async (res) => {
          if (res.ok) {
            const people_data = await res.json() 
            return people_data
          } 
       
          return bday 
        })
       
        const { data: pepResource, isLoading, error } = useSWR('/api/ppleData', fetcher, {
          fallbackData: bday,
        })      
      
        const searchParams= useSearchParams();
        const val = searchParams.get('message');
        const pathname = usePathname() 
        useEffect(
          () => { 
        if(val=== 'Post Created Successfully'||val=== 'Post Updated Successfully' || val=== 'There was error. Please try again! '||'Please choose a valid file!'){
         router.push(pathname, {scroll:false})   
         //window.scrollTo({ top:800, behavior: "smooth" })
         }  
         return () => {
          window.posted=''
        };
        
        },[val, searchParams, router])

 
  return (
  
    <div>  
    <div className="w-24 m-auto "> 
    {notify&&<p className="fixed top-0 text-center text-white p-3 text-lg z-10">{notify}</p>}
  </div>
  <div className={active?'hidden bg-slate-800 opacity-90':''}>
  {isLoading&& !error&&<small className='m-1'>Waiting for data...</small>}
    {!isLoading&&<Bday data={pepResource.bday} />}  
  {error&& <small className='ml-1'>Error loading data...</small>}
   </div>
   <Events
  user={user}
  events={events}
  active={active}
  setActive={setActive}  
  /> 
  <div className="m-auto lg:flex justify-center">
  <div className={active?'hidden bg-slate-800 opacity-90':'m-2 [&_.trendy]:mt-16 [&_.trendy]:m-0 [&_.trendy]:p-0 '}> 
    <div className='main-forum relative m-auto xl:m-0 px-6 py-2 m-1.5 max-w-xl md:mt-0' ref={editingRef}> 
  <div className='thoughts-text text-white p-8 text-center '> 
     <h2 className='p-2 text-2xl font-bold text-white'>Explore the Topic</h2>
<p className="text-xl">Drop your thought to hear from other people! </p>  
</div>
 
    <CreateForm 
    createPost={createPost} 
    postEdit={postEdit}
    commentEdit={commentEdit}
    post={post} 
    user={user}
    val={val}
    setPost={setPost}
    />
 
    {val && 
   <p className="absolute w-full top-0 left-0 text-center text-white p-3 bg-gray-400">
    {val} 
    </p>}
    </div> 
  </div> 
 <Trends trends={trends}/>  

     </div>
    <main className="bg-main-bg"> 
     {userActions &&<LoginModal setUserActions={setUserActions}/>} 
    {opTitles?.map((xx, i)=> ( 
   
    <div key={xx.title +  ' ' + i }className="sm:max-w-lg md:max-w-xl m-auto p-4 border my-1 border-t-4 border-gray-900 hover:bg-gray-900 cursor-pointer">  
   <div className="w-full overflow-hidden md:block justify-center" >
   <div onClick={()=>router.push(`/forum/post/${xx.slug}/${xx.id}`)}className="" ref={createRef}> 
   <h3 className="text-white opacity-70 text-2xl cursor-pointer px-4 text-center underline">
   {xx?.title }  
   </h3> 
   <p className="text-white font-bold text-center text-lg my-1">Genres:</p>
   {xx?.genre?.slice(0,3)?.map((xy, vi)=>
   <div className="text-white text-center" key={vi}>
   <Link href={`/topic/${xy}'`}><p className="m-1 hover:opacity-70 cursor-pointer" >{ xy} </p></Link>
   </div> 
   )}  
   
   </div> 
   <div className=""> 
   <p style={{lineHeight:'28px'}} className="text-white opacity-70 cursor-pointer p-4 text-center">
   {xx?.story} <Link href={`/forum/post/${xx.slug}/${xx.id}`}><small className="hover:text-green-400">See full story</small></Link>
   </p></div>
   <div className="flex flex-wrap text-sm my-8"> 
   {xx?.tags?.map((xy, vi)=> 
   xy.split(',').map((ex, xi)=> ex&&
   <div className="flex bg-gray-100 m-1 " key={xi}>
   <Link href={`/topic/${ex.replace('#', '')}'`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>
 {xx?.user_id === user?.id &&  <small className="p-2 hover:bg-gray-400" onClick={()=>deleteTag(xx, ex)}>x</small>}
   </div> ))} 
    
   </div>  
   
   <div className="flex flex-wrap w-3/4" > 
   {user?.id=== xx?.user_id && <small className="text-xs text-white opacity-70 cursor-pointer text-center mx-2">Suggested Tags:</small> }
    
    {user?.id=== xx?.user_id && xx?.suggested_tags?.length !== 0&&
   xx?.suggested_tags?.filter((e, i, a)=> a.findIndex(item=>item.replace('.', '') === e.replace('.', '')) === i).filter((jx )=> jx!=='').map((ex, xi)=> 
   i===showIndex&&  
   <div className="flex text-sm" key={ex + ' ' + xi}>  
    <div className="flex w-full flex-wrap overflow-hidden ">
    
    {showSuggestion&&!xx?.tags?.includes(ex)&&ex!==false && ex.split(' ').map((xy, i)=> <p onClick={()=>postTag(xx , xy)}key={i}className="p-1 m-1 hover:opacity-70 cursor-pointer bg-gray-100" >#{xy.replace('.', '')} 
   </p> ) } 
    </div>
   </div>
     
   ) }
   {user?.id=== xx.user_id && showSuggestion&&<p className="cursor-pointer m-1 text-sm opacity-70 text-white" onClick={()=>changeIndex(i)}> <FontAwesomeIcon icon={faAngleUp} /></p> }
   {user?.id=== xx.user_id && !showSuggestion&& <p className="cursor-pointer m-1 text-sm opacity-70 text-white"onClick={()=>changeIndex(i)}><FontAwesomeIcon icon={faAngleDown} /> </p> }  
   </div>
   </div> 
    
    <div className="flex overflow-auto w-auto scroll-smooth">  
     {xx?.files?.flat().map((itx,ix)=> itx &&
     <div key={itx} className="mx-1 min-w-fit relative scroll-smooth" ref={imgIndex===itx?imgRef:null} title="double click to view"> 
   
    <Image 
   onClick={()=>enlargeImgs( i, ix)}  
   className={imgIndex===itx?'animate-in cursor-pointer mx-1 w-full h-40 my-4':'cursor-pointer mx-1 w-full h-40 my-4'} 
   src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}/${itx}`} 
   width={150} 
   height={150}
   style={imgIndex===itx?imgZoom:null }
   alt={xx.title}
   />  
    {show&&
     <> 
     {!deleteBtn && <span onClick={()=>openDelete(ix)} className={imgIndex===itx?'absolute top-4 text-gray-700 text-xl text-center rounded-full border bg-opacity-60 w-16 p-4 m-2 font-bold hover:scale-105 cursor-pointer':'hidden'}>X</span> }
    {deleteBtn&&activeIdx=== ix && <span className={imgIndex===itx?'absolute left-4 top-4 text-white text-center py-3 m-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900':'hidden'}onClick={()=>resetImg(xx, itx)} >Delete Photo</span>} </> }
 
   </div> 
   )}
    </div> 
     <div className='text-white flex justify-center opacity-70 mt-8'> 
    <span className="m-2">by</span>    
     {xx?.avatar_url?     
     <Link href={`/profile/${xx?.user_id}`}>      
       <Image 
     width={40}
     height={40}
     src={xx?.avatar_url} 
     alt={xx?.username} 
     className='border cursor-pointer rounded-full opacity-70 hover:scale-105'/>
     </Link>:
     
     <Link href={`/profile/${xx?.user_id}`}><p className='border cursor-pointer rounded-full w-full p-2 opacity-70 hover:scale-105'><FontAwesomeIcon icon={faUser} width={25}className="avatar_"/></p></Link> }  
   { xx?.username&& <Link href={`/profile/${xx?.user_id}`}><p className="text-sm m-2 hover:scale-105" >{xx?.username} 
     </p></Link>} 
     {!xx?.username&& <Link href={`/profile/${xx?.user_id}`}><p className="text-sm m-2 hover:scale-105" >{xx?.user_email} 
     </p></Link>}     
   </div>
  
    <div className="text-white flex justify-between mt-4 w-full m-auto flex justify-evenly mt-4" ref={ref}>  
   <button onClick={()=> postLike(xx, user)}className="relative justify-between focus:outline-none left-0 flex m-1 text-lg rounded-none p-1 bg-inherit">
   <FontAwesomeIcon icon={faThumbsUp} width={20}/>
   <p className="px-1 hover:shadow-3xl">{xx?.likes?.length}</p>
   </button>  
 <div> 
   <button onClick={()=>handleOpen(xx)} className="relative focus:outline-none justify-between left-0 flex m-1 text-lg rounded-none p-1">
   <FontAwesomeIcon width={20}icon={faComment}rotation={180}/>
   <p className="px-1 hover:shadow-3xl">{xx.comments?.length}</p>
   
   </button> 
   </div> 

   {user?.id=== xx?.user_id ?
   <>
   <div className="">
   <button onClick={()=>openEdit(xx.id, i)}className="relative justify-between left-0 flex m-1 text-lg rounded-none p-1 hover:shadow-3xl"><FontAwesomeIcon width={20}icon={faPencil} /></button>
   
   {editBtn&&activeIdx=== xx.id &&<button onClick={()=>editting(xx)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-44 z-10 bg-slate-900">
   Edit</button>} 
   </div> 
   <div>
     <button onClick={()=>openDelete(xx.id, i)}className=" flex m-1 text-lg rounded-none p-1 hover:shadow-3xl"><FontAwesomeIcon width={20}icon={faDeleteLeft} rotation={180} /></button>
   
   {deleteBtn&&activeIdx === xx.id &&<button onClick={()=>postDelete(xx?.id)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-44 z-10 bg-slate-900">
   Delete
   </button>}
   </div> 
   </>
   
   :null}
   <div>
   <button onClick={()=>showAll(xx.id, i)} className="m-1 text-smlg rounded-none p-1 hover:shadow-3xl"> 
   <FontAwesomeIcon width={20}icon={faShare}  
   />
   </button>   
   </div>  
   
   </div>  
 
     {activeReply && onIdx=== xx.id&&
     <div className="text-center"> 
     <form className='rxn-form animate-in flex justify-center' ref={elRef} onSubmit={(e)=>createComment(e, xx.id, null)} >    
   <textarea
   rows="2"
   cols="50"  
   type='text'
   name='title'   
   className='w-full resize-none bg-inherit mt-1 text-sm p-5 leading-normal' 
   placeholder="Speak your Mind!"
   />  
   <button type="submit" aria-disabled={pending} className="block border-none p-3 hover:text-pink-900 m-2 text-lg" >
   {isPending ? 'Waiting' : 'Reply'}
   </button> 
   
   </form> 
    
   <Link href={`/forum/post/${xx.slug}/${xx.id}`} className="text-white m-1 text-sm rounded-none p-2">View All Comments</Link>
   </div>
   }
   {userActions?<LoginModal 
   userActions={userActions} 
    setUserActions={setUserActions} />: 
    <ShareButtons  
    item={xx}
    shareOptions={shareOptions}
    activeIdx={activeIdx}
    />   }
    </div> 
   )
     )}   
 
  
   </main>  
  
   </div> 
 
   )
}

export default Main
