
import Environment from "@/components/News/Environment";
  import { environmentBlog } from "../../rootpostsHandle";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/environment` 
  : "http://localhost:3000/environment";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Environment",   
}; 
const EnvironmentPage =async () => {
   const environment_news = await environmentBlog()
   const environment_posts = environment_news.map((xy)=>xy.posts.nodes).flat()
    const category_title=environment_news.map((xy)=>xy.slug)[0] 
  
  return ( 
   <div> 
 <Environment 
environment_news={environment_posts}
category_title={category_title }
/>  
  </div> 
  )
} 

export default EnvironmentPage
