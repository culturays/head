import NaijaWikiNetflixNewsDetails from "@/components/NetflixNaija/NaijaWikiNetflixNewsDetails" 
import { netflixNewsDets } from "../../netflix-news"
import { headers } from "next/headers"
import { naijaWikiVids } from "@/app/naija-wiki/newCharHandle"

export async function generateMetadata({ params, searchParams }, parent) { 
  const slug =params.slug[0]
  const news_details = await netflixNewsDets(slug) 
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title:`Naija Wiki News- ${news_details?.title}`,
    openGraph: { 
      images: [news_details?.featuredImage.node.sourceUrl],
    },
  }
} 
 
const NetflixNaijaNewsDetailsPage = async({params}) => {
const slug =params.slug[0]
const news_details = await netflixNewsDets(slug)
const content_videos = await naijaWikiVids();
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
