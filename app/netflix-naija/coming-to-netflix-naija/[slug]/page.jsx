import ToNetflixDetails from "@/components/NetflixNaija/NetflixNaijaComing/ComingToNetflixDetails"
import { netflixDetails, byNetflixCategory,byMonthly, byFirstLook } from "../../netflix-news"
import ComingByNetflixCategory from "@/components/NetflixNaija/NetflixNaijaComing/ComingByNetflixCategory"
import ComingMonthly from "@/components/NetflixNaija/NetflixNaijaComing/ComingMonthly"
import FirstLook from "@/components/NetflixNaija/NetflixNaijaComing/FirstLook"

 async function To_Netflix_Details ({params}) {
  const slug = params.slug
  const coming_to_netflix_details = await netflixDetails(slug)
   const netflix_news =coming_to_netflix_details.netflixCategories.nodes
    const by_netflix_category = await byNetflixCategory(slug)
     const by_monthly= await byMonthly(slug)
      const by_first_look = await byFirstLook(slug)  

   return (
     <div>
    {by_netflix_category?(
    <ComingByNetflixCategory 
    netflix_news={netflix_news}
    coming_to_netflix_details={coming_to_netflix_details}
    />
    ):by_monthly?(
     <ComingMonthly
      netflix_news={netflix_news}
     coming_to_netflix_details={coming_to_netflix_details}
     />
    ):by_first_look?(
    <FirstLook
    netflix_news={netflix_news}
    coming_to_netflix_details={coming_to_netflix_details}
    />
  ):(
  <ToNetflixDetails
    netflix_news={netflix_news}
    coming_to_netflix_details={coming_to_netflix_details}
    />)
  }
  </div>
   )
 }


 export default To_Netflix_Details