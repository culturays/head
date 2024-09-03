import Header from "@/components/Header" 
import Footer from "@/components/Footer" 
import SearchItems from "@/components/SearchItems"
import { searchValues } from "../../lib/searches/search" 
import Health from "@/components/News/Health"

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
<Health 
/>
  </div> <Footer/>
    </div>
  )
}

export default BusinessPage
