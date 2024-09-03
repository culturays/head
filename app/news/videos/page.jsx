import { naijaWikiVids } from "@/app/naija-wiki/newCharHandle"
import VideoPage from "@/components/News/Videos";

const Videos = async () => { 
  const content_videos = await naijaWikiVids(); 
   return ( 
    <>    
  <VideoPage 
  content_videos={content_videos}
  />   
  
   </>
    )
   
  }
  
  
 

export default Videos
