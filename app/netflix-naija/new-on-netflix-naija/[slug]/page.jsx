import NewOnNetflixDetails from "@/components/NetflixNaija/NetflixNaijaNew/NewOnNetflixDetails"
import { fullListNew, netflixDetails, whatToWatch } from "../../netflix-news"
import { getTop10, getTop10Series, getPopular, getPopularNonEng, getPopularSeriesNonEng, getPopularSeries } from "@/app/naija-wiki/filmsdata"  
import { headers } from "next/headers"
 
async function NewNetflixNaijaDetails ({params}) {
const slug = params.slug 
const news_details = await netflixDetails(slug) 
const what_to_watch= await whatToWatch()
 const netflix_news =news_details.netflixCategories.nodes 
const netflix_10 =await getTop10()
const netflix_10_series =await getTop10Series() 
const get_popular = await getPopular()
const get_popular_series = await getPopularSeries()
const get_popular_non_eng = await getPopularNonEng()
const get_popular_series_non_eng = await getPopularSeriesNonEng()
const full_list_new = await fullListNew() 
const url = new URL(headers().get('pathname')); 
 
return (
    <div> 
      {url.pathname.includes('new-on-netflix-naija')?
    <NewOnNetflixDetails
      netflix_10={netflix_10}
      news_details={news_details}
      netflix_news={netflix_news}
      netflix_10_series={netflix_10_series}
      get_popular={get_popular}
      get_popular_series={get_popular_series}
      get_popular_non_eng={get_popular_non_eng}
      get_popular_series_non_eng={get_popular_series_non_eng}     
      full_list_new={full_list_new} 
      what_to_watch={what_to_watch}
      /> :<></>}  
 </div>
  )
}


export default NewNetflixNaijaDetails
 