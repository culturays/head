import Header from "@/components/Header"
import { techBlog } from "../newshandle"
import Footer from "@/components/Footer" 
import SearchItems from "@/components/SearchItems"
import { searchValues } from "../../lib/searches/search"
import Tech from "@/components/Tech"

const TechPage =async ({searchParams}) => {
  const name = searchParams.name;
  const tech_news = await techBlog()
  const postSearch=await searchValues(name) 
  return (
    <div >
   <Header/>
   <SearchItems searchVal={name} itemSearches={postSearch}/>  
   <div > 
<Tech
tech_news={tech_news}
/>
  </div> <Footer/>
    </div>
  )
}

export default TechPage
