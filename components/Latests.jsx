 
import { newsByLatest } from "@/app/api/newshandle"
import Image from "next/image"
import Link from "next/link"  
const Latests =async () => {  
const latestPosts = await newsByLatest() 
const latestPs = latestPosts.data?.posts?.nodes 

  return (
<div className="p-4 my-5 border-t-2 border-b-2 border-dotted">
  <h2 className="text-3xl text-gray-800 font-bold">News</h2>
<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 py-3 m-auto ">
{latestPs?.slice(0,3).map((ex)=> 
<div key={ex.title } className="flex h-36 xs:h-40">
<div className="w-1/2">
<Image 
src={ex.featuredImage.node.sourceUrl}
width={300} 
height={300}
alt={ex.title}/>  
</div> 
<div className="w-3/4 px-1"> 
<Link href={`/news/${ex.categories.nodes[0].slug}/${ex.slug}`}><h2 className="font-medium cursor-pointer underline hover:text-gray-400">{ex.title} </h2></Link>
</div>
 
</div>    
)}
</div> 

<Link href='/news' className="underline mx-8 hover:text-gray-400">See More</Link>
</div> 
  )
}
 
export default Latests
