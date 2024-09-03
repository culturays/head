 import Business from "@/components/News/Business"
import { businessBlog } from "../newshandle"
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
