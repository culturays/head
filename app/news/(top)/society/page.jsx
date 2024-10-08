 
import Society from "@/components/News/Society"
import { societyBlog } from "../../articlehandle";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/society` 
  : "http://localhost:3000/society";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Society",   
}; 
 
const SocietyPage =async ({searchParams}) => {
  const society_news = await societyBlog()
  return (
    <div > 
<Society 
society_news={society_news}
/>
   </div>
  )
}

export default SocietyPage
