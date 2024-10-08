import { newsDetailData } from "@/app/news/rootpostsHandle"
import NewsDetail from "@/components/NewsDetail" 
export async function generateMetadata({ params, searchParams }, parent) { 
  const slug = params.slug[0] 
  const news_details= await newsDetailData(slug)
  const previousImages = (await parent).openGraph?.images || [] 
  return {
    title:`Culturays | News - ${news_details?.title}`,
    openGraph: { 
      images: [news_details?.featuredImage.node.sourceUrl],
    },
  }
}    

const NewsDetailPage = async ({params}) => {
const slug = params.slug[0] 
  const news_detail= await newsDetailData(slug)
 
  return (
    <div>
         <NewsDetail 
      post={news_detail}      
      />  
    </div>
  ) 
}

export default NewsDetailPage
