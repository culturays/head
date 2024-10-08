 import Business from "@/components/News/Business"
import { businessBlog } from "../../articlehandle"

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/business` 
  : "http://localhost:3000/business";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Business",   
}; 

const BusinessPage =async ({searchParams}) => { 
  const business_news = await businessBlog() 
  return (
    <div >
 <Business
business_news={business_news}
/>  
 
    </div>
  )
}

export default BusinessPage





