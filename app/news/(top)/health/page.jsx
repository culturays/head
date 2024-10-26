 
import Health from "@/components/News/Health"
 import { healthBlog } from "../../rootpostsHandle";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/health` 
  : "http://localhost:3000/health";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Health",   
};
const HealthPage =async ({searchParams}) => {  
 const health_news = await healthBlog()
 const health_posts = health_news.map((xy)=>xy.posts.nodes)
 
  return ( 
   <div> 
  <Health
health_news= {health_posts}
/> 
  </div>  
  )
}

export default HealthPage
