 
import SideBar from "@/components/Side" 
import ArticleDetail from "@/components/News/ArticleDetail"  
import { news_details_all } from "../articlehandle"
const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP

export async function generateMetadata({ params, searchParams }, parent) { 
  const {slug} =await params 
  const news_details= await news_details_all(`${CULTURAYS_CONTENT_WP}/${slug[0]}/${slug[1]}/`) 
  
  const previousImages = (await parent).openGraph?.images || [] 
  return {
    title:`Culturays | News - ${news_details?.title}`,
    openGraph: { 
      images: [news_details?.featuredImage.node.sourceUrl],
    },
  }
}   

const ArticleDetailPage = async ({params}) => {
const {slug} =await params 
 const news_detail= await news_details_all(`${CULTURAYS_CONTENT_WP}/${slug[0]}/${slug[1]}/`) 
 
  return ( 
    <div className="bg-gray-50"> 
    <div className="lg:flex justify-center m-auto px-4 bg-white" style={{maxWidth:'1500px' }}>
       <ArticleDetail 
      news_detail={news_detail}   
      />  
      <div> 
       <SideBar/> 
      </div>
    </div></div>
  ) 
}

export default ArticleDetailPage
