import { trending } from "@/app/news/newshandle"
import Trending from "@/components/News/Trending" 

const TrendingPage =async ({params}) => {
  const slug = params.slug 
  const trends =await trending(slug[0]) 
  return (
    <div>
      <Trending trends={trends} />
    </div>
  )
}

export default TrendingPage
