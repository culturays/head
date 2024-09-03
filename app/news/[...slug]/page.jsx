import NewsDetails from "@/components/News/NewsDetails" 
import { news_details_all } from "../newshandle"
import { headers } from "next/headers"
const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP

export async function generateMetadata({ params, searchParams }, parent) { 
  const slug = params.slug[1]
const slug_category = params.slug[0]
  const news_details= await news_details_all(`${CULTURAYS_CONTENT_WP}/${slug_category}/${slug}/`)
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title:`News- ${news_details?.title}`,
    openGraph: { 
      images: [news_details?.featuredImage.node.sourceUrl],
    },
  }
}  

const NewsDetailPage = async ({params}) => {
const slug = params.slug[1]
const slug_category = params.slug[0]
  const news_detail= await news_details_all(`${CULTURAYS_CONTENT_WP}/${slug_category}/${slug}/`)
 
  return (  
    <div>
      <NewsDetails
      news_detail={news_detail}      
      /> 
    </div>
  ) 
}

export default NewsDetailPage
