'use client'
import { useState,useEffect, useRef, useCallback} from "react";  
import { Open_Sans, Concert_One, Prosto_One, Playfair, Inria_Serif, Roboto, Bellota_Text, Nokora, Merriweather, Courgette, Sacramento , Monoton} from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from "next/image";
import Link from "next/link";
import { useFormStatus } from "react-dom"; 
import Avatar from "./Avatar";
import {faDeleteLeft, faPencil, faThumbsUp, faShare,faImage, faComment, faEllipsisVertical,faFilePen, faUser, faHouse, faTrash, faUpload, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser"; 
import {faFacebook, faWhatsapp, faXTwitter} from '@fortawesome/free-brands-svg-icons'
import CreateForm from "@/app/forum/createpost"; 
import { createClient } from "@/utils/supabase/client";
import LoginModal from "./forum/LoginModal";
import { usePagesContext } from "./Pages-Context";
import ShareButtons from "./ShareButtons";         
 
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import nlp from "compromise/three";
import { getUserPosts } from "@/app/forum/actions/postsActions";
import { deleteProfile, updateProfile  } from "@/app/profile/profileActions";

const monoton =Monoton({
  subsets:['latin'], 
   weight:'400',
   display: 'swap', 
   })
const concert =Concert_One({
  subsets:['latin'], 
   weight:'400',
   display: 'swap', 
   })
const prosto =Prosto_One({
subsets:['latin'], 
weight:'400',
display: 'swap', 
})

const robo =Roboto({
subsets:['latin'], 
weight:'400',
display: 'swap', 
})
const inria =Inria_Serif({
subsets:['latin'], 
weight:'700',
display: 'swap', 
})

const play =Playfair({
subsets:['latin'], 
weight:'400',
display: 'swap', 
}) 
 
 const meri =Merriweather({
subsets:['latin'], 
 weight:['400'],
 display: 'swap', 
 })
const curgette =Courgette({
subsets:['latin'], 
 weight:['400'],
 display: 'swap', 
 })

const sacramento =Sacramento({
subsets:['latin'], 
weight:['400'],
display: 'swap', 
}) 
const bellota =Bellota_Text({
subsets:['latin'], 
weight:['300', '400', '700'],
display: 'swap', 
})   
function sortAscending(pb, pa){ 
  return (pa?.id - pb?.id);
 } 

const Profile = ({ 
 
userPosts,
user,
profile,
 
   
}) => {
const [showInput, setShowInput]= useState(false)
const [imgHandle, setImgHandle]=useState('') 
const btnRef =useRef(null) 
const [profileUpdater, setProfileUpdater]=useState(false)
const emailRef = useRef();
const nameRef = useRef();  
const supabase = createClient()
const [uploading, setUploading] = useState(false) 
const [loading, setLoading] = useState(true)
const [userProfile,setUserProfile]=useState({}) 
const [avatar_url, setAvatarUrl] = useState(null)
const [password, setPassword] = useState(null)
const { pending, action } = useFormStatus();
const [userActions,setUserActions]=useState(false) 
const [scrolledPosts,setScrolledPosts]=useState([])
const [scrolledComments,setScrolledComments]=useState([])
const [shareOptions,setShareOptions]=useState(false)
const [notify,setNotify]=useState('')
const [imgZoom,setImgZoom]=useState({})
const [show, setShow] = useState(false); 
const [imgIndex,setImgIndex]= useState('')  
const [activeIdx,setActiveIdx]=useState(null)  
const [post,setPost]= useState({})
const [showIndex, setShowIndex]= useState(null)
const [onIdx, setOnIdx]=useState(null) 
const [editBtn, setEditBtn]=useState(false)
const [showSuggestion, setShowSuggestion]=useState(false)
const [deleteBtn,setDeleteBtn]=useState(false) 
const [activeReply,setActiveReply]=useState(null)
const [openNav,setOpenNav]= useState(false)
const router = useRouter()
const dropperRef=useRef()
const uploadRef = useRef()
const updaterRef=useRef()
const createRef=useRef()  
const pathname = usePathname() 
const editingRef=useRef()
const searchParams= useSearchParams();
const val = searchParams.get('message');
const {id} = useParams()
const elRef=useRef() 
const { ref, inView } = useInView()
const isPending = pending && action 
 
   const [count,setCount]=useState(2) 
   const [startScroll, setStartScroll]=useState(3)
const [chosenFont, setChosenFont]=useState('')
const [showFont, setShowFont]=useState(false)
const font_x =[play, bellota, concert, meri, curgette, sacramento, monoton]
const font_y =[ "play", "bellota", "concert", "meri" , "courgette","sacramento", "monoton"]

const chooseFont =(i)=>{
setChosenFont( font_x[i]?.className )
localStorage.setItem('font_choice', font_x[i]?.className )
setShowFont(false) 
} 
    useEffect(()=>{
   const font= localStorage.getItem('font_choice')
   setChosenFont(font) 
    }, [])
    
useEffect(() => {
setScrolledPosts(userPosts)
}, []);  
const loadMorePosts = async () => {
const apiP = await getUserPosts(startScroll, startScroll + count - 1, id) 
if(apiP){
setScrolledPosts(scrolledPosts?.concat(apiP))
}else return

//  //setScrolledPosts([...scrolledPosts, ...apiP])
setStartScroll((prev)=>prev + apiP?.length) 
setCount((prev)=>prev * apiP?.length) 

}
useEffect(() => { 
//if(inView ) loadMorePosts runs out of posts and produces an error. why?
if (inView) {
loadMorePosts()   
}

}, [inView]) 
const postsSorted=scrolledPosts?.sort(sortAscending)
const getProfile = useCallback(async () => { 
try {
  setLoading(true) 
  setUserProfile({
    fullname: profile.full_name ,
    username: profile.full_name ,
     avatar_url:profile.avatar_url,
     education: profile.education ,
     website: profile.website ,
    address: profile.address ,
    password: profile.password,
    about: profile.about,
  })

 
} catch (error) {
console.log('Error loading user data!')
} finally {
setLoading(false)
}
}, [profile,supabase])

useEffect(() => {
getProfile()
}, [profile,getProfile])
 
  const runUpdateOpen=()=>{
    setProfileUpdater(prev => !prev);   
    setOpenNav(false)
  }
  
  useEffect(() => {
    const handler = (event) => {
      if (!dropperRef.current) {           
        return;
      }
     
      if (!dropperRef.current.contains(event.target)) {
        setOpenNav(false);
      } 
 
    };
      document.addEventListener("click", handler, true);
   
    return () => {
      document.removeEventListener("click", handler);
    };
   
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (!uploadRef.current) {           
        return;
      }
     
      if (!uploadRef.current.contains(event.target)) {
        setShowInput(false);
      }    
 
    };
      document.addEventListener("click", handler, true);
   
    return () => {
      document.removeEventListener("click", handler);
    };
   
  }, [showInput]);


  useEffect(() => {
    const handler = (event) => {
      if (!updaterRef.current) {           
        return;
      }
     
      if (!updaterRef.current.contains(event.target)) {
        setProfileUpdater(false);          
       
      } 
    
 
    };
      document.addEventListener("click", handler, true);
   
    return () => {
      document.removeEventListener("click", handler);
    };
   
  }, [profileUpdater]);
 
  const handleMailsJS = async (e) => {
    e.preventDefault();
    const serviceId = "culturays_12345";
    const templateId = "template_8rg34lq" 
    emailjs.init(process.env.EMAILJS_PUBLIC_API) 

    try {
       setLoading(true);
      await emailjs.send(serviceId, templateId, {
        name:profile.full_name,
        recipient: profile.email, 
        user:user?.user_metadata?.full_name
      });
  
    } catch (error) {
      console.log(error);
    } finally {
        console.log('done')
          setNotify("Email successfully sent. Check your mail");
          setLoading(false);
    }
    setTimeout(
      () =>setNotify(''), 
      2000 
    );  
  }
 

 const uploadAvatar = async (event) => {
  try {
    setUploading(true)

    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = event.target.files[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${user?.id}-${Math.random()}.${fileExt}`
    
     const { error: uploadError } = await supabase.storage.from('profile_avatars').upload(filePath, file)
    if (uploadError) {
      console.log(uploadError)
      throw uploadError
    }  
  
      setUserProfile({...userProfile, avatar_url:filePath})
       updateProfile({
      user, 
      fullname:userProfile.fullname, 
      username:userProfile.fullname, 
      avatar_url: filePath, 
      about:userProfile.about, 
       education:userProfile.education,
      address:userProfile.address,
      password:userProfile.password,
      website:userProfile.website })
    
  } catch (error) {
   console.log('Error uploading avatar!', error)
  } finally { 
    setShowInput(prev=> !prev)
    setUploading(false)
  }
}
 
const update_user=async()=>{ 
  setLoading(true) 
    try {
      await updateProfile({
        user,
        avatar_url:userProfile.avatar_url, 
        email:userProfile.email, 
        education:userProfile.education,
        address:userProfile.address,
        password:userProfile.password,
        website:userProfile.website,
        fullname:userProfile.fullname,
        username:userProfile.username,
        about:userProfile.about, 
        
      })
    
   } catch (error) {
       console.log('Error updating the data!')
  } finally {
    setLoading(false)
    setProfileUpdater(false)
  }
  }
  const accountDelete =async()=>{
    await deleteProfile(user.id)
  }


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
const editting=(p)=>{ 
setPost(p)  
editingRef.current?.scrollIntoView()
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
formData.set('title', '')
router.push(pathname+'?message=Post Updated Successfully', {scroll:false})  

//.filter((te)=> te.slug!== slug)
const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
setScrolledPosts(pt.concat(data)) 
router.refresh()
setTimeout(()=>{ 

}, 3000)

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

  const postTag = async (post, tagToDelete ) => {
    const supabase = createClient(); 
    const updTags = post?.suggested_tags?.map(tag => tag.split(" ").filter((ex)=> ex!== tagToDelete) ).flat() ; 
    const {data, error: sugError } = await supabase
    .from('posts')
    .update({ suggested_tags: [...updTags]})
    .eq('id', post.id) 
    .select()
    if (sugError) {
    console.error('Error updating tags:', sugError.message) 
    } else {
    console.log('Tag updated successfully.');
    const pt = scrolledPosts.filter((ex)=> ex.id !== post.id)  
    setScrolledPosts(pt.concat(data)) 
    router.refresh() 
    } 
    // window.location.reload()
    router.refresh()
    //////////////////////////////////////////////////////////////////
    
    const oldTags = post?.tags?.filter(tag => tag !== tagToDelete);
    // console.log( oldTags )
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
    const { data, error: updateError } = await supabase 
    .from('posts')
    .update({ tags:[ ...oldTags]})
    .eq('id', post.id)
    .select()
    if (updateError) {
    console.error('Error updating tags:', updateError );
    } else { 
    console.log('Tag deleted successfully.'); 
    const pt = scrolledPosts.filter((ex)=> ex.id !== post.id)  
    setScrolledPosts(pt.concat(data))
    router.refresh()
    }
    //window.location.reload()
    router.refresh()
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
       
      // setNotify('Like updated successfully.');
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
    //  setNotify('Like removed successfully.');
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

    const postDelete =async (id) => {  
        try{
          const supabase = createClient();
          const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .delete()
          .eq('post_id', id); 
        
        if (commentsError) {
          throw new Error('Error deleting comments')
          // console.error('Error deleting comments:', commentsError);
          // return;
        }
        
        // Then, delete the post
        const { data , error: postError } = await supabase
          .from('posts')
          .delete()
          .eq('id', id);
        
        if (postError) {
          throw new Error('Error deleting posts')
         
        }
       
        }catch(err){
        console.log(err)
        } 
      router.refresh()
      const pt = scrolledPosts.filter((te)=> te.id!== id) 
      setScrolledPosts(pt )
        //window.location.reload()
        };

        const createComment =async (e, postId, parentId ) => {
           e.preventDefault()
        if(!user) setUserActions(true)
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
      
       }
       e.target.reset()
        }
     
        const commentLike  = async(comment ) => { 
          if(!user) setUserActions(true)
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
  <> 
 <div className="flex justify-center "> 
    {notify&&<p className=" fixed top-0 bg-green-500 border-2 text-center text-white p-5 text-xl">{notify}</p>}
  </div>
  {showInput&& 
    <div className="w-full fixed top-0 z-50 h-full flex items-center justify-center bg-gray-800 bg-opacity-70" >
    <div 
         ref={uploadRef}className="w-full m-11 lg:w-2/5 h-2/5 p-2 bg-white rounded-8 shadow-2xl flex flex-col items-center justify-center" >
      <div style={{ width: 150 }} className="text-center w-1/2 p-2 relative cursor-pointer">
      <div className="border-4 p-5"> 
        <FontAwesomeIcon icon={faUpload} className="text-gray-700" />           
        <label className="button primary block text-lg cursor-pointer" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        </div>
        <input
         className="absolute top-11 h-1/4 opacity-0 bottom-0 w-full cursor-pointer"
          // style={{
          //   visibility: 'hidden',
          //   position: 'absolute',
          // }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div> 
    </div>   
 }
   <Avatar
uid={user?.id}
url={userProfile.avatar_url}
size={150}
setShowInput={setShowInput}
uploadRef={uploadRef} 
/> 
 <div className="relative mx-2" ref={updaterRef}> 
  {profileUpdater?( 

  <div className="absolute w-max z-20 px-8 shadow-2xl mx-2 bg-gray-500 rounded py-6 "> 
<div className="p-1 text-xl m-1 flex justify-center text-gray-300">
<label htmlFor="email" className="m-1 p-3">Email:</label>
<input id="email" type="text" className="bg-transparent m-1" value={user?.email} disabled />
</div>
<div className="p-1 text-xl m-1 flex justify-center ">
<label htmlFor="fullname" className="m-1 p-3 text-gray-300">Full Name:</label>
<input
  id="fullname"
  type="text"
  name='fullname'
  className="bg-gray-300 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600" 
  defaultValue={userProfile.fullname}
  onChange={(e) => setUserProfile({...userProfile, fullname:e.target.value})}
/>
</div>

<div className="p-1 text-xl m-1 flex justify-center">
<label htmlFor="password" className="m-1 text-gray-300 p-3">Password:</label>
<input
id="password"
type="password"
className="bg-gray-300 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600" 
defaultValue={userProfile.password}
onChange={(e) => setUserProfile({...userProfile, password:e.target.value})}
/>
</div>
<div className="p-1 text-xl m-1 flex justify-center">
<label htmlFor="address" className="m-1 text-gray-300 px-3">Address:</label>
<input
id="address"
type="address"
className="bg-gray-300 m-1 mx-5 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600" 
defaultValue={userProfile.address}
onChange={(e) => setUserProfile({...userProfile, address:e.target.value})}
/>
</div>
<div className="p-1 text-xl m-1 flex justify-center">
<label htmlFor="education" className="m-1 text-gray-300 px-3">Education:</label>
<input
id="education"
type="text"
className="bg-gray-300 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600"  
defaultValue={userProfile.education}
onChange={(e) => setUserProfile({...userProfile, education:e.target.value})}
/>
</div>
<div className="p-1 text-xl m-1 flex justify-center">
<label htmlFor="website" className="m-1 text-gray-300 px-3">Website:</label>
<input
id="website"
type="url"
className="bg-gray-300 m-1 mx-5 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600"  
defaultValue={userProfile.website}
onChange={(e) => setUserProfile({...userProfile, website:e.target.value})}
/>
</div>
<div className="p-1 text-xl m-1 flex justify-center">
<label htmlFor="website" className="m-1 text-gray-300 px-3">About:</label>
<textarea
id="about"
type="text"
rows='3'
cols='30'
className="bg-gray-300 m-1 mx-5 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600 resize-none"  
defaultValue={userProfile.about}
onChange={(e) => setUserProfile({...userProfile, about:e.target.value})}
/>
</div>
<div className="p-1 text-xl m-1 ">
<button
className="button primary block bg-gray-600 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-200"
onClick={update_user}
disabled={loading}
>
{loading ? 'Loading ...' : 'Update'}
</button>

</div>
</div>
): 
( 
 
  <div className="absolute bottom-0 sm:bottom-full z-50 cursor-pointer bg-white bg-opacity-10 sm:w-3/4 md:w-1/3 hover:text-gray-300 bg-opacity-60 hover:bg-black text-gray-800 my-4 about_shadow">   
  <p className="text-xl p-2 font-bold">{userProfile.education}</p>
  <p className="text-xl p-2">{userProfile.website}</p>
  <p className="text-xl p-2">{userProfile.address}</p>  
  <p className="text-md p-2 ">{ userProfile.about } But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p> 
     
  </div>) }
   </div>  
   <div className="relative ">  
 {user.id===id ?
  <div ref={dropperRef}className="absolute bottom-full cursor-pointer right-11 text-2xl text-gray-600 z-50" onClick={()=>setOpenNav(prev=> !prev)}><FontAwesomeIcon icon={faEllipsisVertical} /> </div> :null} 

  <div className="absolute right-5 bg-transparent" ref={dropperRef}>
   {openNav?
 (  <nav className='bg-gray-800'> 
    <Link href="/forum"><div className='flex justify-between text-lg p-3 text-white'><FontAwesomeIcon icon={faHouse} width={25} /><p className="mx-2">Home</p></div></Link>
  <div className='flex justify-between text-lg p-3 mx-2 text-white cursor-pointer' onClick={()=> setShowInput(prev => !prev)}><FontAwesomeIcon icon={faImage}width={20} /><p className="mx-2">Change Photo</p></div> 
  <div className='flex justify-between text-lg p-3 mx-2 text-white cursor-pointer' onClick={accountDelete}><FontAwesomeIcon icon={faTrash}width={20} /><p className="mx-2">Delete Profile</p>
  </div>
  <div className='flex justify-between text-lg p-3  text-white cursor-pointer'onClick={runUpdateOpen}><FontAwesomeIcon icon={faPencil}width={20} /><p className="mx-2">Edit Profile</p>
  </div> 
  <div className='flex'> 
 </div>
    </nav>) 
 :
null
}  
 </div> 
 <div className="absolute left-0 right-0 m-auto p-4 cursor-pointer w-3/4 bottom-full"> 
  <div className="flex justify-center my-2 px-2"> 

  <h2 className={`${chosenFont} text-xl sm:text-4xl m-1 font-bold p-6 text-white font-bold`}>{userProfile.fullname}</h2>
  <div onClick={()=> setShowFont(prev =>!prev)} className="cursor-pointer   text-white"><FontAwesomeIcon icon={faPencil}/></div>

  </div>
 <div className="w-4/5 sm:w-1/5 bg-gray-700 m-auto"> {showFont&& font_y.map((ex, ix)=><p  key={ex + ' ' + ix}onClick={()=>chooseFont(ix)}className="p-3 border cursor-pointer text-white text-center">{ex}</p>)}</div>

  <div className="bg-gray-800 hover:border hover:bg-yellow-800 hover:text-gray-400 font-bold text-lg text-center text-white w-1/2 sm:w-1/5 m-auto"onClick={handleMailsJS}> 
 <button type="submit"className="text-2xl p-3" >Invite</button> </div>
  </div> 
</div>
    
 


  <div className='px-5 sm:px-16 my-2 m-auto xl:flex justify-center'> 
    <div className='main-forum m-auto xl:m-0 px-6 py-2 m-1.5 max-w-xl md:mt-0'ref={editingRef} > 
  <h2 className='p-2 text-2xl font-bold text-white'>Explore the Topic</h2>
    <CreateForm 
    createPost={createPost} 
    postEdit={postEdit}
    commentEdit={commentEdit}
    post={post} 
    user={user}
    val={val}
    setPost={setPost}
    />
    {/* {val && 
   <p className="text-center text-white p-2 bg-gray-400">
    {val} 
    </p>} */}
    </div>     
     </div>


   <main className="bg-main-bg"> 
     {userActions &&<LoginModal setUserActions={setUserActions}/>} 
    {postsSorted?.map((xx, i)=> (  
    <div key={xx.title +  ' ' + i }className="sm:max-w-lg md:max-w-xl m-auto p-4 border-gray-900 hover:bg-gray-900 cursor-pointer border rounded my-1">  
   <div className="w-full overflow-hidden md:block justify-center" ref={ref}>
   <div onClick={()=>router.push(`/forum/post/${xx.slug}/${xx.id}`)}className="" ref={createRef}> 
   <h3 className="text-white opacity-70 text-2xl cursor-pointer px-4 text-center underline">
   {xx?.title }  
   </h3> 
   <p className="text-white font-bold text-center text-lg my-1">Genres:</p>
   {xx?.genre?.slice(0,3)?.map((xy, vi)=>
   <div className="text-white text-center" key={vi}>
   <Link href={`/tag/${xy}'`}><p className="m-1 hover:opacity-70 cursor-pointer" >{ xy} </p></Link>
   </div>
   )} 
  
   </div> 
   <div className="h-44 text-white opacity-70 cursor-pointer px-2 text-center py-8">
   <p className="text_truncate_at" style={{lineHeight:'30px'}}>
   {xx?.story} 
   </p>
   <Link href={`/forum/post/${xx?.slug}/${xx.id}`}><small className="hover:text-green-400  text-white opacity-70 cursor-pointer px-2">See full story</small></Link> </div>
   <div className="flex flex-wrap text-sm "> 
   {xx?.tags?.map((xy, vi)=> 
   xy.split(',').map((ex, xi)=> ex&&
   <div className="flex bg-gray-100 mx-1 my-8" key={xi}>
    
   <Link href={`/tag/${ex.replace('#', '')}'`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>
   <small className="p-2 hover:bg-gray-400" onClick={()=>deleteTag(xx, ex)}>x</small>
   </div> ))} 
    
   </div> 
   <div className="flex flex-wrap w-3/4" > 
   {user?.id=== xx.user_id && <small className="text-xs text-white opacity-70 cursor-pointer text-center mx-2 my-4">Suggested Tags:</small> }
 
    {user?.id=== xx.user_id &&  xx?.suggested_tags?.length !== 0&&
   xx?.suggested_tags.map((xy)=> xy.split(' ').filter((jx )=> jx!=='').map((mx)=> mx.replace(/\./g,'')).filter((item, index, self) =>  index === self.findIndex((t) => t === item)) ).map((ex, xi)=> 
   i===showIndex&&  
   <div className="flex text-sm" key={ex + ' ' + xi}>  
    <div className="flex w-full flex-wrap overflow-hidden ">
    {showSuggestion&&!xx?.tags?.includes(ex)&&ex!==false && ex.map((xy, i)=> <p onClick={()=>postTag(xx , xy)}key={i}className="p-1 m-1 hover:opacity-70 cursor-pointer bg-gray-100" >#{xy} 
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
  
    <div className="text-white flex justify-between mt-4 w-full m-auto flex justify-evenly mt-4">  
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
   
   {editBtn&&activeIdx=== xx.id &&<button onClick={()=>editting(xx)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900">
   Edit</button>} 
   </div> 
   <div>
     <button onClick={()=>openDelete(xx.id, i)}className=" flex m-1 text-lg rounded-none p-1 hover:shadow-3xl"><FontAwesomeIcon width={20}icon={faDeleteLeft} rotation={180} /></button>
   
   {deleteBtn&&activeIdx === xx.id &&<button onClick={()=>postDelete(xx?.id)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900">
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
    activeIdx={activeIdx}
    shareOptions={shareOptions}
    />   }
    </div> 
   )
     )}  
   </main> 

 </>
    );
};

export default Profile;