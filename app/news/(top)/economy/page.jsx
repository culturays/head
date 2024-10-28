import Economy from "@/components/News/Economy"
 import { economyBlog } from "../../rootpostsHandle";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/economy` 
  : "http://localhost:3000/economy";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Economy",   
}; 
const EconomyPage =async ({searchParams}) => { 
 const economy_news = await economyBlog() 
 const economy_posts = economy_news.map((xy)=>xy.posts.nodes).flat()
  const category_title=economy_news.map((xy)=>xy.slug)[0]
  return (
    <div >
   <Economy
economy_news={economy_posts}
category_title={category_title }
/>  
  </div>
  )
}

export default EconomyPage
