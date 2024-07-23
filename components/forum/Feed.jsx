 'use client' 
import { useRouter, usePathname, useSearchParams} from "next/navigation";  
import { useEffect, useState, useRef } from 'react' 
import { createClient } from "../../utils/supabase/client"; 
import Image from "next/image"; 
import CreateForm from "@/app/forum/createpost"
import Bday from "../Bday";
import Avatar from "../Avatar";
import Events from "./Events"; 
import { usePagesContext } from "../Pages-Context";
import { useInView } from "react-intersection-observer";
import { getPosts } from "@/app/forum/actions/loadPosts";
import { events1Details } from "@/app/api/eventData/eventContent";
import Trends from "./Trends";
import useSWR from "swr";

const INITIAL_NUMBER_OF_USERS =2
function sortAscending(pb, pa){ 
  return (pa?.id - pb?.id); 
 } 
const Feed = ({trends, events, ppEL, peopleDt, user}) => {
const [showSuggestion, setShowSuggestion]=useState(false) 
const [navDropper,setNavDropper]= useState(false)  
const [deleteBtn,setDeleteBtn]=useState(false)
const [commentText, setCommentText]=useState('')
const [searchVal, setSearchVal] = useState(null)
const [showIndex, setShowIndex]= useState(null) 

const [parentId,setParentId]=useState(null)
const [editBtn,setEditBtn]=useState(false)
const [comment, setComment]=useState("")
const [count,setCount]=useState(2) 
const [startScroll, setStartScroll]=useState(3)
const [postSearch,setPostsSearched]=useState([]) 
const [active,setActive]=useState(false)
const [onIdx, setOnIdx]=useState(null)
const [postItx,setPostItx]=useState([])
const [is_loading,setLoading]=useState(false)   

const { ref, inView } = useInView()
const elRef = useRef();
const router = useRouter()
const createRef=useRef()  
const {enlargeImgs,activeIdx,setActiveIdx, setShareOptions, scrolledPosts,setScrolledPosts, imgRef,setPost ,activeReply,setActiveReply, post, show,imgZoom,imgIndex,resetImg, notify,  postEdit, postLike,setNotify, createPost, createComment, postDelete, postTag, deleteTag}=usePagesContext()
 
const postsItems =async()=>{
  const initialPosts = await getPosts(0, INITIAL_NUMBER_OF_USERS) 
  setScrolledPosts(initialPosts)
  //return initialPosts  
} 
 
const loadMorePosts = async () => {
const apiP = await getPosts(startScroll, startScroll + count - 1) 
setScrolledPosts(scrolledPosts.concat(apiP))
//  //setScrolledPosts([...scrolledPosts, ...apiP])
setStartScroll((prev)=>prev + apiP.length) 
setCount((prev)=>prev * apiP.length) 
}
useEffect(() => {
  if (inView) {
    loadMorePosts()   
  }

}, [inView])
useEffect(() => {
   postsItems() 
  
  }, []);
const opTitles=scrolledPosts?.sort(sortAscending)

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
 
// console.log(error)
 
 useEffect(()=>{ 
// const pplData= peopleData()
//  setPplInfo(pplData)
 },[])
 
 const changeIndex = (i) => {
  setShowSuggestion(true)
  setShowIndex(i)
  if(showSuggestion && showIndex=== i){
  setShowSuggestion(false)  
   
  } 
 
};
 
  const handleOpen = (post) => {
    setActiveReply(true);
    setOnIdx(post.id);
    setShareOptions(prev => !prev);
  };
  const showAll = (id,i) => { 
    setShareOptions(prev => !prev);
    setActiveIdx(id);
    setEditBtn(false)
    setDeleteBtn(false)
  }
   const openDelete=(id,i)=>{
  setDeleteBtn(prev => !prev)
  setEditBtn(false)
  setShareOptions(false);
setActiveIdx(id);
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
const editingRef=useRef()
const editting=(p)=>{ 
setPost(p)
editingRef.current?.scrollIntoView()
}

const fetcher = (...args ) => fetch(...args).then(async (res) => {
  if (res.ok) {
    const pple  = await res.json() 
    return data
  } 

  return  
})

const { data, isLoading , error } = useSWR(url.toString(), fetcher, {
  data:ppEL,
})



// const { data , isLoading , error} = UseHook({  
// // url: '/api/ppleData', 
// }, { 
//   data: ppEL, 
// }) 


const searchParams= useSearchParams();
const val = searchParams.get('message');
const pathname = usePathname() 
useEffect(
  () => { 
if(val=== 'Post Created Successfully'||val=== 'Post Updated Successfully' || val=== 'There was error. Please try again!'){
 router.push(pathname, {scroll:false}) 
  window.posted='posted'
 //window.scrollTo({ top:800, behavior: "smooth" })
 }  
},[val, searchParams, router ])
// modal to prompt signup 
   


 return (   
<div >
  <div className="w-24 m-auto "> 
  {notify&&<p className="fixed top-0 bg-green-500 border-2 text-center text-white p-5 text-xl">{notify}</p>}
</div>
<div className={active?'hidden bg-slate-800 opacity-90 ':''}>
{isLoading&& !error&&<small className='m-1'>Waiting for data...</small>}
  {/* {!isLoading&&<Bday data={data} />} */}
{error&& <small className='ml-1'>Error loading data...</small>}
 </div>
 <Events
user={user}
events={events}
active={active}
setActive={setActive} 
/>   
<div className={ active?'hidden bg-slate-800 opacity-90':'px-5 sm:px-16 my-2 m-auto xl:flex justify-center'}> 
  <div className='main-forum m-auto xl:m-0 px-6 py-2 m-1.5 max-w-xl md:mt-0' ref={editingRef}> 
<h2 className='p-2 text-2xl font-bold text-white'>Explore the Topic</h2>
  <CreateForm createPost={createPost} postEdit={postEdit} post={post}/>
  {val && 
 <p className="text-center text-white p-2 bg-gray-400">
  {val}
  </p>}
  </div> 
  <Trends trends={trends}/>
   </div>

<Main  
opTitles={opTitles}
createRef={createRef}
show={show}
showSuggestion={showSuggestion}
showIndex={showIndex} 
deleteBtn={deleteBtn}
user={user}
elRef={elRef}
/> 
 <div ref={ref}>
Loading... 
</div> 

   </div> 
  
    )
  }
  
  export default Feed