import Videos from "@/components/News/Videos";
import { vids } from "../articlehandle";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/videos` 
  : "http://localhost:3000/videos";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Videos",   
}; 
const VideosPage = async () => {
const content_videos = await vids(); 
  
   return ( 
    <> 
<Videos
  content_videos={content_videos}
  />  
 
   </>
    )
    
  }
  
  
 

export default VideosPage
