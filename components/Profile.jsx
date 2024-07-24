//  'use client'
// import { useState,useEffect, useRef, useCallback} from "react";  
// import { Open_Sans, Concert_One, Prosto_One, Playfair, Inria_Serif, Roboto, Bellota_Text, Nokora, Merriweather, Courgette, Sacramento , Monoton} from 'next/font/google';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Image from "next/image";
// import Link from "next/link";
// import { useFormStatus } from "react-dom"; 
  import Avatar from "./Avatar";
// import {faDeleteLeft, faPencil, faThumbsUp, faShare,faImage, faComment, faEllipsisVertical,faFilePen, faUser, faHouse, faTrash, faUpload, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// import emailjs from "@emailjs/browser"; 
// import {faFacebook, faWhatsapp, faXTwitter} from '@fortawesome/free-brands-svg-icons'
 import CreateForm from "@/app/forum/createpost";
// // import { postEdit, createPost, postLike,  createComment, commentEdit, getUserPosts } from "@/app/forum/actions/postsActions";
// import { createClient } from "@/utils/supabase/client";
// import LoginModal from "./forum/LoginModal";
// import { usePagesContext } from "./Pages-Context";
// import ShareButtons from "./ShareButtons";         
// import { deleteProfile, updateProfile } from "@/app/forum/actions/profileActions";
// import { useParams, useRouter } from "next/navigation";
// import { useInView } from "react-intersection-observer";

// const monoton =Monoton({
//   subsets:['latin'], 
//    weight:'400',
//    display: 'swap', 
//    })
// const concert =Concert_One({
//   subsets:['latin'], 
//    weight:'400',
//    display: 'swap', 
//    })
// const prosto =Prosto_One({
// subsets:['latin'], 
// weight:'400',
// display: 'swap', 
// })

// const robo =Roboto({
// subsets:['latin'], 
// weight:'400',
// display: 'swap', 
// })
// const inria =Inria_Serif({
// subsets:['latin'], 
// weight:'700',
// display: 'swap', 
// })

// const play =Playfair({
// subsets:['latin'], 
// weight:'400',
// display: 'swap', 
// }) 
 
//  const meri =Merriweather({
// subsets:['latin'], 
//  weight:['400'],
//  display: 'swap', 
//  })
// const curgette =Courgette({
// subsets:['latin'], 
//  weight:['400'],
//  display: 'swap', 
//  })

// const sacramento =Sacramento({
// subsets:['latin'], 
// weight:['400'],
// display: 'swap', 
// }) 
// const bellota =Bellota_Text({
// subsets:['latin'], 
// weight:['300', '400', '700'],
// display: 'swap', 
// })   
// function sortAscending(pb, pa){ 
//   return (pa?.id - pb?.id);
//  } 

const Profile = ({ 
setEmail,
email, 
setUserImage,
handleSubmitComment,
users,
handleInviteSubmit,
setthetext,
thetext, 
postItems,
setPostList,
userPosts,
user,
profile,
editId,
setEditId,
rootComments,
commentText,
setCommentText, 
setPostId,
postId,
postLike, 
userUpdate,
   
}) => {
// const [showInput, setShowInput]= useState(false)
// const [imgHandle, setImgHandle]=useState('') 
// const btnRef =useRef(null)
// const [navDropper,setNavDropper]= useState(false)
// const [profileUpdater, setProfileUpdater]=useState(false)
// const emailRef = useRef();
// const nameRef = useRef(); 
// const [post,setPost]= useState({})
// const [showIndex, setShowIndex]= useState(null)
// const supabase = createClient()
// const [uploading, setUploading] = useState(false) 
// const [loading, setLoading] = useState(true)
// const [fullname, setFullname] = useState(null)
// const [username, setUsername] = useState(null)
// const [website, setWebsite] = useState(null)
// const [education, setEducation] = useState(null)
// const [address, setAddress] = useState(null)
// const [avatar_url, setAvatarUrl] = useState(null)
// const [password, setPassword] = useState(null)
// const [onIdx, setOnIdx]=useState(null)
// const [userActions,setUserActions]=useState(false)
// const [activeReply,setActiveReply]=useState(null)
// const [editBtn, setEditBtn]=useState(false)
// const { pending, action } = useFormStatus();
// const [showSuggestion, setShowSuggestion]=useState(false)
// const [deleteBtn,setDeleteBtn]=useState(false) 
// const {id} = useParams()
// const { ref, inView } = useInView()
// const isPending = pending && action 
// const { activeIdx, show,setImgIndex, notify, setImgZoom,
//    setShow, imgZoom, imgIndex, resetImg, imgRef, 
//    postDelete, postTag, setShareOptions, deleteTag, 
//    setActiveIdx, setNotify}=usePagesContext()
//    const [count,setCount]=useState(2) 
//    const [startScroll, setStartScroll]=useState(3)
//    const [scrolledPosts, setScrolledPosts]=useState([])
    
// useEffect(() => {
// setScrolledPosts(userPosts)
// }, []);  
// const loadMorePosts = async () => {
// const apiP = await getUserPosts(startScroll, startScroll + count - 1, id) 
// if(apiP){
// setScrolledPosts(scrolledPosts?.concat(apiP))
// }else return

// //  //setScrolledPosts([...scrolledPosts, ...apiP])
// setStartScroll((prev)=>prev + apiP?.length) 
// setCount((prev)=>prev * apiP?.length) 

// }
// useEffect(() => { 
// //if(inView ) loadMorePosts runs out of posts and produces an error. why?
// if (inView) {
// loadMorePosts()   
// }

// }, [inView]) 
// const postsSorted=scrolledPosts?.sort(sortAscending)


// const getProfile = useCallback(async () => {

// try {
// setLoading(true) 
// setFullname(profile.full_name)
// setUsername(profile.full_name) 
// setAvatarUrl(profile.avatar_url)
// setEducation(profile.education)
// setWebsite(profile.website)  
// setAddress(profile.address)
// setPassword(profile.password) 
// } catch (error) {
// console.log('Error loading user data!')
// } finally {
// setLoading(false)
// }
// }, [profile,supabase])

// useEffect(() => {
// getProfile()
// }, [profile,getProfile])



// const dropperRef=useRef()
// const uploadRef = useRef()
// const updaterRef=useRef()
//   const runUpdateOpen=()=>{
//     setProfileUpdater(prev => !prev);   
//   setNavDropper(false)
//   }
  
//   useEffect(() => {
//     const handler = (event) => {
//       if (!dropperRef.current) {           
//         return;
//       }
     
//       if (!dropperRef.current.contains(event.target)) {
//         setNavDropper(false);          
       
//       } 
    
 
//     };
//       document.addEventListener("click", handler, true);
   
//     return () => {
//       document.removeEventListener("click", handler);
//     };
   
//   }, [navDropper ]);

//   useEffect(() => {
//     const handler = (event) => {
//       if (!uploadRef.current) {           
//         return;
//       }
     
//       if (!uploadRef.current.contains(event.target)) {
//         setShowInput(false);          
       
//       } 
    
 
//     };
//       document.addEventListener("click", handler, true);
   
//     return () => {
//       document.removeEventListener("click", handler);
//     };
   
//   }, [showInput]);


//   useEffect(() => {
//     const handler = (event) => {
//       if (!updaterRef.current) {           
//         return;
//       }
     
//       if (!updaterRef.current.contains(event.target)) {
//         setProfileUpdater(false);          
       
//       } 
    
 
//     };
//       document.addEventListener("click", handler, true);
   
//     return () => {
//       document.removeEventListener("click", handler);
//     };
   
//   }, [profileUpdater]);


//   const handleMailsJS = async (e) => {
//     e.preventDefault();
//     const serviceId = "culturays_12345";
//     const templateId = "template_8rg34lq" 
//     emailjs.init(process.env.EMAILJS_PUBLIC_API) 
//     try {
//        setLoading(true);
//       await emailjs.send(serviceId, templateId, {
//         name:profile.full_name,
//         recipient: profile.email, 
//         user:user?.user_metadata?.full_name
//       });
  
//     } catch (error) {
//       console.log(error);
//     } finally {
//         console.log('done')
//           setNotify("Email successfully sent. Check your inbox");
//           setLoading(false);
//     }
//     setTimeout(
//       () =>setNotify(''), 
//       2000 
//     ); 
//   }
 
//   const [chosenFont, setChosenFont]=useState('')
//   const [showFont, setShowFont]=useState(false)
//    const font_x =[play, bellota, concert, meri, curgette, sacramento, monoton]
//    const font_y =[ "play", "bellota", "concert", "meri" , "courgette","sacramento", "monoton"]
   
//    const chooseFont =(i)=>{
//   setChosenFont( font_x[i]?.className )
//   localStorage.setItem('font_choice', font_x[i]?.className )
//   setShowFont(false) 
// } 
//  useEffect(()=>{
// const font= localStorage.getItem('font_choice')
// setChosenFont(font) 
//  }, [])
//  const uploadAvatar = async (event) => {
//   try {
//     setUploading(true)

//     if (!event.target.files || event.target.files.length === 0) {
//       throw new Error('You must select an image to upload.')
//     }

//     const file = event.target.files[0]
//     const fileExt = file.name.split('.').pop()
//     const filePath = `${uid}-${Math.random()}.${fileExt}`

//      const { error: uploadError } = await supabase.storage.from('profile_avatars').upload(filePath, file)
//     if (uploadError) {
//       console.log(uploadError)
//       throw uploadError
//     } 
//    onUpload(filePath)

//   } catch (error) {
//    console.log('Error uploading avatar!')
//   } finally { 
//     setShowInput(prev=> !prev)
//     setUploading(false)
//   }
// }
// const update_user=async()=>{ 
//   setLoading(true) 
//     try {
//       await updateProfile({
//         user,
//         avatar_url, 
//         email, 
//         education,
//         address,
//         password,
//         website,
//         fullname,
//         username,  
//       })
    
//    } catch (error) {
//        console.log('Error updating the data!')
//   } finally {
//     setLoading(false)
//     setProfileUpdater(false)
//   }
//   }
//   const accountDelete =async()=>{
//     await deleteProfile(user.id)
//   }
//   const createRef=useRef()  
//    const editingRef=useRef()
//    const router =useRouter()
//   const editting=(p)=>{ 
//   setPost(p)
  
//   editingRef.current?.scrollIntoView()
//   }
 
 return (
  <> 
    {/* <div className="w-24 m-auto "> 
    {notify&&<p className="fixed top-0 bg-green-500 border-2 text-center text-white p-5 text-xl">{notify}</p>}
  </div>
  {showInput&& 
    <div className="w-full fixed top-0 z-20 h-full flex items-center justify-center bg-gray-800 bg-opacity-70" >
    <div 
         ref={uploadRef}className="w-full m-11 lg:w-2/5 h-2/5 p-2 bg-white rounded-8 shadow-2xl flex flex-col items-center justify-center" >
      <div style={{ width: 150 }}  className="text-center w-1/2 p-2 relative cursor-pointer">
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
 }   */}
  {/* {profileUpdater?( 
<div className="relative" ref={updaterRef}>
  <div className="absolute z-20 top-44 px-11 text-white "> 
<div className="p-2 text-2xl m-2">
<label htmlFor="email" className="m-1">Email:</label>
<input id="email" type="text" className="bg-transparent" value={user?.email} disabled />
</div>
<div className="p-2 text-2xl m-2">
<label htmlFor="fullName" className="m-1">Full Name:</label>
<input
  id="fullName"
  type="text"
  className="bg-gray-600 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80" 
  value={fullname || ''}
  onChange={(e) => setFullname(e.target.value)}
/>
</div>

<div className="p-2 text-2xl m-2">
<label htmlFor="password" className="m-1">Password:</label>
<input
id="password"
type="password"
className="bg-gray-600 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80" 
value={password || ''}
onChange={(e) => setPassword(e.target.value)}
/>
</div>
<div className="p-2 text-2xl m-2">
<label htmlFor="address" className="m-1">Address:</label>
<input
id="address"
type="address"
className="bg-gray-600 m-1 mx-5 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80" 
value={address || ''}
onChange={(e) => setAddress(e.target.value)}
/>
</div>
<div className="p-2 text-2xl m-2">
<label htmlFor="education" className="m-1">Education:</label>
<input
id="education"
type="text"
className="bg-gray-600 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80"  
value={education || ''}
onChange={(e) => setEducation(e.target.value)}
/>
</div>
<div className="p-2 text-2xl m-2">
<label htmlFor="website" className="m-1">Website:</label>
<input
id="website"
type="url"
className="bg-gray-600 m-1 mx-5 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80"  
value={website || ''}
onChange={(e) => setWebsite(e.target.value)}
/>
</div>
<div className="p-2 text-lg m-2 ">
<button
className="button primary block bg-gray-600 m-1 p-3 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80"
onClick={update_user}
disabled={loading}
>
{loading ? 'Loading ...' : 'Update'}
</button>

</div>
</div>
</div>): 
(<div className="relative" >
  <div className="absolute z-20 top-44 px-11 text-white bg-gray-700 m-4 w-fit bg-opacity-20">   
  <p className="text-xl p-3">{education}</p>
  <p className="text-xl p-3">{website}</p>
  <p className="text-xl p-3">{address}</p>
  <p className="text-xl p-3">{'about'}</p>
  </div>  
  </div> )}   */}
     
  <div className="relative">  
    <div className="bg-gray-700 z-10 relative h-screen bg-opacity-50"></div> 
   <Avatar
// uid={user?.id}
// url={avatar_url}
// size={150}
// setShowInput={setShowInput}
// uploadRef={uploadRef}
// onUpload={(url) => {
//   setAvatarUrl(url)
//  updateProfile({user, fullname, username, website, avatar_url: url })
// }}
/>
 {/* {user.id===id?
  <div className="cursor-pointer flex justify-end text-2xl relative -top-20 absolute z-10 text-white" onClick={()=>setNavDropper(prev=> !prev)}><FontAwesomeIcon icon={faEllipsisVertical}width={100} /> </div> :null}
   {navDropper?
 (<div className="absolute z-20 block p-4 right-0 mr-8 -mt-16 bg-transparent" ref={dropperRef}>
    <nav className='bg-gray-800'> 
    <Link href="/forum"><div className='flex justify-between text-lg p-3 text-white'><FontAwesomeIcon icon={faHouse} width={25} /><p className="mx-2">Home</p></div></Link>
  <div className='flex justify-between text-lg p-3 mx-2 text-white cursor-pointer' onClick={()=> setShowInput(prev => !prev)}><FontAwesomeIcon icon={faImage}width={20} /><p className="mx-2">Change Photo</p></div> 
  <div className='flex justify-between text-lg p-3 mx-2 text-white cursor-pointer' onClick={accountDelete}><FontAwesomeIcon icon={faTrash}width={20} /><p className="mx-2">Delete Profile</p>
  </div>
  <div className='flex justify-between text-lg p-3  text-white cursor-pointer'onClick={runUpdateOpen}><FontAwesomeIcon icon={faPencil}width={20} /><p className="mx-2">Edit Profile</p>
  </div> 
  <div className='flex'> 
 </div>
        </nav>
 </div>) 
 :
null
}  
  */}
 <div className="m-auto w-3/12 relative"> 
  <div className="flex absolute -top-20 text-center left-1/4 z-10"> 

  <h2 className={`${chosenFont} text-4xl m-1 font-bold p-2 text-white `}>{fullname}</h2>
  <div onClick={()=> setShowFont(prev =>!prev)} className="cursor-pointer text-white"><FontAwesomeIcon icon={faPencil}/></div>

  </div>
  {showFont&& font_y.map((ex, ix)=><div onClick={()=>chooseFont(ix)} className="text-center w-3/4 h-full" key={ex + ' ' + ix}><p className=" p-3 border cursor-pointer">{ex}</p></div>)}
  <div className="bg-gray-800 p-4 hover:bg-gray-300 text-lg text-center text-white "onClick={handleMailsJS}> 
  <label className="cursor-pointer">Invite</label><span className="m-1 "></span><input type="submit" className="cursor-pointer" /> </div>
  </div> 

  </div>  
  <div className={'px-5 sm:px-16 my-2 m-auto xl:flex justify-center'}> 
    <div className='main-forum m-auto xl:m-0 px-6 py-2 m-1.5 max-w-xl md:mt-0' > 
  <h2 className='p-2 text-2xl font-bold text-white'>Explore the Topic</h2>
    <CreateForm 
    // createPost={createPost} 
    // postEdit={postEdit}
    // commentEdit={commentEdit}
    // post={post} 
    // user={user}
    
    />
    {/* {val && 
   <p className="text-center text-white p-2 bg-gray-400">
    {val} 
    </p>} */}
    </div>     
     </div>
     {/* <main className="bg-main-bg"> 
     {userActions &&<LoginModal setUserActions={setUserActions}/>} 
    {postsSorted?.map((xx, i)=> ( 
   
    <div key={xx.title +  ' ' + i }className="sm:max-w-lg md:max-w-xl m-auto p-4 border-t-4 border-gray-900 hover:bg-gray-900 cursor-pointer">  
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
   <p className="text-white opacity-70 cursor-pointer p-4 text-center">
   {xx?.story } <Link href={`/forum/post/${xx?.slug}/${xx.id}`}><small className="hover:text-green-400">See full story</small></Link>
   </p>
   <div className="flex flex-wrap text-sm "> 
   {xx?.tags?.map((xy, vi)=> 
   xy.split(',').map((ex, xi)=> ex&&
   <div className="flex bg-gray-100 mx-1 my-8" key={xi}>
   <Link href={`/tag/${ex.replace('#', '')}'`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>
   <small className="p-2 hover:bg-gray-400" onClick={()=>deleteTag(xx, ex)}>x</small>
   </div> ))} 
    
   </div>  
   
   <div className="flex flex-wrap w-3/4" > 
   {user?.id=== xx.user_id && <small className="text-xs text-white opacity-70 cursor-pointer text-center mx-2">Suggested Tags:</small> }
    
    {user?.id=== xx.user_id &&  xx?.suggested_tags?.length !== 0&&
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
    />   }
    </div> 
   )
     )}  
   </main>  */}

 </>
    );
};

export default Profile;