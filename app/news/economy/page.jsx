import Economy from "@/components/News/Economy"
import { economyBlog } from "../newshandle"
const EconomyPage =async ({searchParams}) => { 
  const economy_news = await economyBlog() 
  return (
    <div >
  <Economy
economy_news={economy_news}
/>  
  </div>
  )
}

export default EconomyPage
