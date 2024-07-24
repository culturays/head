import { Suspense } from "react"

const NewsPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}> 
    <div>
      news
    </div>
  </Suspense>
  )
}
 
export default NewsPage
