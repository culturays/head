 import Business from "@/components/News/Business"
import { businessBlog } from "../../rootpostsHandle";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/business` 
  : "http://localhost:3000/business";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Business",   
}; 

const BusinessPage =async ({searchParams}) => { 
  const business_news = await businessBlog() 
  const business_posts = business_news.map((xy)=>xy.posts.nodes)
   
  return (
    <div >
  <Business
business_news={business_posts }
/>  
  </div>
  )
}

export default BusinessPage





