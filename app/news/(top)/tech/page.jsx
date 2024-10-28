import Tech from "@/components/News/Tech";
 import { techBlog } from "../../rootpostsHandle"; 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/tech` 
  : "http://localhost:3000/tech";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Tech",   
}; 

const TechPage =async ({searchParams}) => { 
 const tech_news = await techBlog() 
 const tech_posts = tech_news.map((xy)=>xy.posts.nodes).flat()
 const category_title=tech_news.map((xy)=>xy.slug)[0] 

  return (
    <div >  
  <Tech
tech_news={tech_posts}
category_title={category_title }
/>  
 </div>
  )
}

export default TechPage
