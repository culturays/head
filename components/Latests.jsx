 "use client"
 
import { shuffle } from "@/app/naija-wiki/content"
import { naijaWikiVids } from "@/app/naija-wiki/newCharHandle"
import { newsByLatest } from "@/app/news/newshandle"
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"   
import { useEffect, useRef, useState } from "react" 

const Latests = () => {  
  const [shuffledArray, setShuffledArray] = useState([]);
  const video_ref=useRef()
const [isPlaying,setIsplaying]=useState(false)
  useEffect(() => {
    async function fetchData() {
      const latest_videos = await naijaWikiVids();
      const latest = await newsByLatest(); 
      const combinedArray = latest.concat(latest_videos).slice(0,4)
      const shuffled = shuffle(combinedArray);
      setShuffledArray(shuffled);
    }

    fetchData();
  }, []);

const handlePlay =(e)=>{
  video_ref.current.play()
setIsplaying(prev =>!prev)
}


  return (
<div className="p-4 my-5 border-t-4 border-yellow-600 my-6 bg-black" >
  <h2 className="text-3xl text-gray-300 font-bold text-center p-4 border-b border-yellow-600 my-2">News</h2>
  <div className="md:grid grid-cols-2 lg:grid-cols-4 md:w-3/4 lg:w-full m-auto xl:w-4/5">
  {shuffledArray.map((ex)=> 
<div key={ex.title } className="">
  
{!ex.videos&&
<div className="relative w-3/4 h-56 max-w-xs md:w-full overflow-hidden m-auto border border-yellow-600">
<Image
className="w-auto h-full p-1"
src={ex.featuredImage.node.sourceUrl}
width={500}  
height={500}
alt={ex.title}/> 
<div className="absolute bg-gray-800 flex items-center justify-center m-2 top-0 bg-opacity-40 mt-11"> 
<small className="text-yellow-400 text-2xl font-bold">&#124;</small> <Link href={`/news/${ex.categories?.nodes[0]?.slug}/${ex.slug}`}><h2 className="text-white cursor-pointer underline hover:text-gray-400 text-xl py-20 px-1">{ex.title} </h2></Link>
</div> 
</div>
} 

  {ex.videos&&
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
  

</div>    
)}   
</div> 
   
<Link href='/news' ><p className="underline my-8 hover:text-gray-400 text-white"> See More</p></Link>
</div> 
  )
}
 
export default Latests
