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

  return (
    <div >  
  <Tech
tech_news={tech_news} 
/>  
 </div>
  )
}

export default TechPage
