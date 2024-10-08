import NewOnNetflixDetails from "@/components/NetflixNaija/NetflixNaijaNew/NewOnNetflixDetails"
import { fullListNew, netflixDetails, netflixNews, newsbyNewOnCategory, readNext, whatToWatch } from "../../netflix-news"
import { getTop10, getTop10Series, getPopular, getPopularNonEng, getPopularSeriesNonEng, getPopularSeries } from "@/app/naija-wiki/filmsdata"  
import { headers } from "next/headers"
const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP

export async function generateMetadata({ params, searchParams }, parent) { 
  const slug =params.slug 
  const news_details = await netflixDetails(slug)  
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title:`Culturays | Netflix Naija News - ${news_details?.title}`,
    openGraph: { 
      images: [news_details?.featuredImage.node.sourceUrl],
    },
  }
} 
async function NewNetflixNaijaDetails ({params}) {
const slug = params.slug 
const new_on_details = await netflixDetails(slug)
const what_to_watch= await whatToWatch()
const netflix_news = await netflixNews()
const netflix_10 =await getTop10()
const netflix_10_series =await getTop10Series() 
const get_popular = await getPopular()
const get_popular_series = await getPopularSeries()
const get_popular_non_eng = await getPopularNonEng()
const get_popular_series_non_eng = await getPopularSeriesNonEng()
const full_list_new = await fullListNew()
const netflix_related = new_on_details?.netflixNewsGroup?.netflixNewRelated?.edges
const exitinginrelated= netflix_related?.map((fx)=>fx.cursor)
const new_on_netflix_naija = await newsbyNewOnCategory([new_on_details.id,exitinginrelated ].flat())
return (
    <div> 
  
      <NewOnNetflixDetails
      netflix_10={netflix_10}
      new_on_details={new_on_details}
      netflix_news={netflix_news}
      netflix_10_series={netflix_10_series}
      get_popular={get_popular}
      get_popular_series={get_popular_series}
      get_popular_non_eng={get_popular_non_eng}
      get_popular_series_non_eng={get_popular_series_non_eng}     
      full_list_new={full_list_new} 
      what_to_watch={what_to_watch}
      new_on_netflix_naija={new_on_netflix_naija}
      netflix_related={netflix_related}
      />   
 </div>
  )
}


export default NewNetflixNaijaDetails
 