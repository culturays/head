 
import ComingToNetflixNaija from "@/components/NetflixNaija/NetflixNaijaComing/ComingToNetflixNaija"
import { netflixNews, newsbyComingtoCategory } from "../netflix-news"  
 
const ComingToNetflixNaijaPage = async() => {
const coming_to_netflix_naija = await newsbyComingtoCategory()
const netflixNaija=coming_to_netflix_naija.map((xy)=> xy.node.netflixNaijaPosts.edges).flat()
const category_children=coming_to_netflix_naija.map((ex)=> ex.node.children.edges).flat()
const coming_to_netflix_class= category_children.filter((ex)=> ex.node.slug==='coming-to-netflix-class').map((fx)=> fx.node.netflixNaijaPosts.edges).flat()  
const coming_to_netflix_category =category_children.filter((ex)=> ex.node.slug==='category-coming-to-netflix').map((fx)=> fx.node.netflixNaijaPosts.edges).flat() 
const netflix_news_data = await netflixNews()
const coming_to_netflix_grouped =netflixNaija.concat(coming_to_netflix_class).concat(coming_to_netflix_category) 
 
  return (
   <div>
 <ComingToNetflixNaija
  netflix_news_data={netflix_news_data}
 coming_to_netflix_naija=
 {coming_to_netflix_naija} 
 coming_to_netflix_grouped={coming_to_netflix_grouped}
 />  
    </div>
  )
}

export default ComingToNetflixNaijaPage

 
  
