import NaijaWikiNetflixNewsDetails from "@/components/NetflixNaija/NaijaWikiNetflixNewsDetails" 
import { netflixNewsDets } from "../../netflix-news" 
import { vids } from "@/app/news/articlehandle"

export async function generateMetadata({ params, searchParams }, parent) { 
  const slug =params.slug[0]
  const news_details = await netflixNewsDets(slug)  
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title:`Culturays | Naija Wiki News- ${news_details?.title}`,
    openGraph: { 
      images: [news_details?.featuredImage.node.sourceUrl],
    },
  }
} 
 
const NetflixNaijaNewsDetailsPage = async({params}) => {
const slug =params.slug[0]
const news_details = await netflixNewsDets(slug)
const content_videos = await vids();
 
  return (
    <div>
    <NaijaWikiNetflixNewsDetails
    news_details={news_details}
    content_videos={content_videos}
    />
    </div>
  )
}

export default NetflixNaijaNewsDetailsPage
