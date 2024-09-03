 
import ComingToNetflixNaija from "@/components/NetflixNaija/NetflixNaijaComing/ComingToNetflixNaija"
import { newsbyComingtoCategory } from "../netflix-news"  
 
const ComingToNetflixNaijaPage = async() => {
  const coming_to_netflix_naija = await newsbyComingtoCategory()
  //make sure to fetch all children catgeory for mapping
  return (
    <div>
  <ComingToNetflixNaija
 coming_to_netflix_naija=
 {coming_to_netflix_naija}  
 />   
    </div>
  )
}

export default ComingToNetflixNaijaPage

 
  
