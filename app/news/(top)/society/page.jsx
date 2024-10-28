 
import Society from "@/components/News/Society"
 import { societyBlog } from "../../rootpostsHandle";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/society` 
  : "http://localhost:3000/society";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Society",   
}; 
 
const SocietyPage =async ({searchParams}) => {
 const society_news = await societyBlog() 
 const society_posts = society_news.map((xy)=>xy.posts.nodes).flat()
 const category_title=society_news.map((xy)=>xy.slug)[0] 

  return (
    <div > 
 <Society 
society_news={society_posts}
category_title={category_title }
/> 
   </div>
  )
}

export default SocietyPage
