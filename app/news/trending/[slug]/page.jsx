import Trending from "@/components/news/Trending"
import { similarTrending, trending, trends } from "../../articlehandle" 
export async function generateMetadata({ params, searchParams }, parent) {
 const slug = params.slug
    const trending_details= await trending(slug)
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title:`Culturays | Trending - ${trending_details?.title}` ,
      openGraph: { 
        images: [trending_details?.featuredImage.node.sourceUrl],
      },
    }
  }  
const TrendingDetails =async ({params}) => {
  const slug = params.slug 
  const trends_detail =await trending(slug, null)
  const related_to_trend_id= trends_detail.trendinggroup?.relatedTrends?.nodes.map((xy)=> xy.id)
  const related_to_trend= trends_detail.trendinggroup?.relatedTrends?.nodes
 const rm_ids = related_to_trend_id?.concat(trends_detail.id)
 const trends_categories=await similarTrending([trends_detail.id,related_to_trend_id])  

  return (
    <div>
         <Trending
        trends={trends_detail} 
        trends_categories={trends_categories}
        related_to_trend={related_to_trend}
        />  
    </div>
  )
} 

export default TrendingDetails

