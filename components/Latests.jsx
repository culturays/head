import { shuffle } from "@/app/naija-wiki/content"
import { vids } from "@/app/naija-wiki/newCharHandle"
import { altPageNewsItems, newsViews, sideBarNewsItems, sidePanelNewsItems } from "@/app/news/rootpostsHandle" 
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"    
//opinions go here
const Latests = async() => {  
  // const [shuffledArray, setShuffledArray] = useState([]);
  // const [passage_News_data, set_Passage_News_data]=useState([])
  // const video_ref=useRef()
// const [isPlaying,setIsplaying]=useState(false)
 const bottom_latest = await newsViews(); 
 const prev_newsView_cursors = bottom_latest?.map((xy)=> xy.cursor) 

 const sidePanelCursors = await sidePanelNewsItems(prev_newsView_cursors)
 const prev_sidepanel_cursors = sidePanelCursors?.map((xy)=> xy.cursor)
 const start_cursor_sidebar = prev_sidepanel_cursors?.concat(prev_newsView_cursors)

 const sidebarItems=await sideBarNewsItems(start_cursor_sidebar) 
 const start_cursor_sidebarItems = sidebarItems?.map((xy)=> xy.cursor)
 const ex_cursor_sidebar = start_cursor_sidebar?.concat(start_cursor_sidebarItems)
 const altNews = await altPageNewsItems()

//  const post_passage= bottom_latest.categories.nodes.map((xy)=> xy.posts.nodes.filter((xy)=> xy.postnewsgroup.passageNews!== null).flat()).flat() 
//   const news_data = post_passage.map((xy)=> xy.postnewsgroup.passageNews).map((fy)=> fy.nodes).flat()
 
//   useEffect(() => {  
//     async function fetchData() {
//       const latest_videos = await vids();
//       const latest = await newsByLatest();
//       const passage_news =latest.posts.nodes.map((xy)=> xy.postnewsgroup.passageNews.nodes)
//       set_Passage_News_data(passage_news)
//       const combinedArray = latest.concat(latest_videos).slice(0,4)      
//       const shuffled = shuffle(combinedArray);
//       setShuffledArray(shuffled);
  
//     }

//  fetchData();
 
//   }, []);
  
// const handlePlay =(e)=>{
//   video_ref.current.play()
// setIsplaying(prev =>!prev)
// } 

{/* {ex.videos&&
<div className="relative w-3/4 h-56 md:w-full max-w-xs overflow-hidden m-auto border border-yellow-600"> 
  <Image className="w-full h-full p-1 "
  width={500}
  height={500}
  src={ex.featuredImage.node.sourceUrl}    
  alt={ex.title}
   />
  <button onClick={handlePlay}className="absolute z-10 text-center text-white text-4xl bottom-6 right-8 cursor-pointer hover:text-gray-400 border border-black py-2 px-4" >
          {isPlaying ?<span ><FontAwesomeIcon icon={faPause}/></span> :<span ><FontAwesomeIcon icon={faPlay}/></span> }
        </button>
  <div className="absolute bg-gray-800 flex items-center justify-center m-4 h-3/4 top-0 bg-opacity-40 mt-11"> 
  <small className="text-yellow-400 text-2xl font-bold">&#124;</small>
<Link href={`/naija-wiki/viodes/video/${ex.categories?.nodes[0]?.slug}/${ex.slug}`}><h2 className="text-white cursor-pointer underline hover:text-gray-400 text-xl">{ex.title} </h2></Link>
</div>
</div>} 
   */}
 
  return (

    <div>
       <h2 className="text-3xl text-gray-700 font-bold text-center p-4  my-2">Recommended</h2>
      <div className="overflow-auto pt-4 hidden-scroll" >
      <div className="flex border-b border-t border-t-4 border-t-black border-b-4 m-auto" style={{width:'1500px'}}> 
      {altNews?.slice(0,3).map((ex, index)=>
         <div className="first:border-r [&:nth-child(2)]:border-r px-4 max-w-sm m-auto" key={index + Math.random()}> 
 <Link href={`/news/topic/${ex.node.slug}`}><h2 className=" hover:text-gray-400 py-8 text-2xl font-mono leading-10 font-thin my-11">{ex.node.title} </h2></Link>
  </div>)}
</div>
</div>
<div className="py-4 my-5 border-t-4 border-yellow-600 bg-black" >
  <h2 className="text-3xl text-gray-300 font-bold text-center p-4 border-b border-yellow-600 my-2">News</h2>
  <div className="xs:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-3xl lg:max-w-6xl m-auto">
   {bottom_latest?.map((ex, index)=> 
<div key={index + Math.random()} className="max-w-max m-auto">
 {!ex.videos&&
<div className="relative h-52 max-w-72 overflow-hidden border border-yellow-600">  
<Image 
className="w-auto h-full p-1"
src={ex?.node.featuredImage?.node.sourceUrl}
width={500}  
height={500}
alt={ex.node.title}/> 
<div className="absolute bg-gray-800 flex items-center justify-center top-0 bg-opacity-40 mx-2 w-full h-full"> 
<small className="text-yellow-400 text-2xl font-bold h-4">&#124;</small> <Link href={`/news/topic/${ex.node.slug}`}><h2 className="text-white cursor-pointer underline hover:text-gray-400 text-xl py-20 px-1">{ex.node.title} </h2></Link>
</div> 
</div>
}   
</div>    
)}  
</div> 
   
<Link href='/news'><p className="underline m-8 hover:text-gray-400 text-white"> See More</p></Link>
</div>   
   </div>)
}
 
export default Latests
