 
import Health from "@/components/News/Health"
import { healthBlog } from "../../articlehandle"
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/health` 
  : "http://localhost:3000/health";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Health",   
};
const HealthPage =async ({searchParams}) => {  
  const health_news = await healthBlog()
  return ( 
   <div> 
<Health
health_news= {health_news}
/>
  </div>  
  )
}

export default HealthPage
