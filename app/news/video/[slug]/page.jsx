 
import VideoDetail from "@/components/News/VideoDetail"
import { viddetails } from "../../articlehandle"

export async function generateMetadata({ params, searchParams }, parent) {
  const slug = params.slug
     const vid_details= await viddetails(slug)
     const previousImages = (await parent).openGraph?.images || []
    
     return {
       title:`Culturays | Video - ${vid_details?.title}`,
       openGraph: { 
         images: [vid_details?.featuredImage.node.sourceUrl],
       },
     }
   }  

const VideoDetailsPage=async ({params}) => {
  const slug = params.slug
  const vid_details= await viddetails(slug)
  return (
    <div>
<VideoDetail  
vid_details={vid_details}  
  
/> 
    {/* <video className='inline' onClick={handlePlay} poster={posterSrc} ref={videoRef}>        
        <source src={videoSrc} type="video/mp4"/>
        <source src={videoSrc} type="video/ogg"/>
        <source src={videoSrc} type="video/webm"/>
        <object data={videoSrc} >
        <embed src={videoSrc}/>
        </object>
    </video> */}
    </div> 
  )
}

export default VideoDetailsPage
 