import SideBar from "@/components/Side"  
import { top_news_details_all } from "../rootpostsHandle"
import TopNewsDetails from "@/components/News/TopNewsDetails"
const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP

export async function generateMetadata({ params, searchParams }, parent) { 
  const slug = params.slug[1]
const slug_category = params.slug[0]
  const news_details= await top_news_details_all(`${CULTURAYS_CONTENT_WP}/${slug_category}/${slug}/`)
  const previousImages = (await parent).openGraph?.images || [] 
  return {
    title:`Culturays | News - ${news_details?.title}`,
    openGraph: { 
      images: [news_details?.featuredImage.node.sourceUrl],
    },
  }
}   

const TopNewsDetail = async ({params}) => {
const slug = params?.slug[1]
// const slug_category = params.slug[0]
 const news_detail= await top_news_details_all(slug) 
 
  return ( 
    <div className="bg-gray-50"> 
    <div className="lg:flex justify-center m-auto px-4 bg-white" style={{maxWidth:'1500px' }}>
      <TopNewsDetails
      news_detail={news_detail }   
      /> 
      <div> 
       <SideBar/> 
      </div>
    </div></div>
  ) 
}

export default TopNewsDetail
