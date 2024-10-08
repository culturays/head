import Economy from "@/components/News/Economy"
import { economyBlog } from "../../articlehandle"
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/economy` 
  : "http://localhost:3000/economy";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Economy",   
}; 
const EconomyPage =async ({searchParams}) => { 
  const economy_news = await economyBlog()
 
  return (
    <div >
  <Economy
economy_news={economy_news } 
/>  
  </div>
  )
}

export default EconomyPage
