 
 
import NewlyRealeasedNetflixNaija from "@/components/NetflixNaija/NetflixNaijaNew/NewlyReleasedNetflixNaija"
import { addedOnCategory, newsbyNewOnCategory } from "../netflix-news"   
async function New_On_Netflix() {
  const new_on_netflix_naija = await newsbyNewOnCategory()  
  const added_on_netflix_naija =await addedOnCategory()
console.log(new_on_netflix_naija)
  const added_on_children= added_on_netflix_naija.map((ex)=> ex.node.children).map((xy)=> xy.nodes).flat()
  const made_in_africa = added_on_children.filter((xy)=> xy.name === 'Made in Africa')
  const non_africa = added_on_children.filter((xy)=> xy.name !== 'Made in Africa')
  
 return (  
  <>  
 <NewlyRealeasedNetflixNaija
  new_on_netflix_naija={new_on_netflix_naija}
  added_on_netflix_naija={added_on_netflix_naija}
  made_in_africa={made_in_africa}
  non_africa={non_africa}
  />  
 </>
  )
}
 
export default New_On_Netflix
 
 