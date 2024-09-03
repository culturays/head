import Header from "@/components/Header" 
import Footer from "@/components/Footer" 
import SearchItems from "@/components/SearchItems"
import { searchValues } from "../../lib/searches/search" 
import Society from "@/components/News/Society"

const BusinessPage =async ({searchParams}) => {
  const name = searchParams.name; 
  const postSearch=await searchValues(name) 
  return (
    <div >
   <Header/>
   <SearchItems 
   searchVal={name} 
   itemSearches={postSearch}/>  
   <div > 
<Society 
/>
  </div> <Footer/>
    </div>
  )
}

export default BusinessPage
