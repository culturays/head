import Character from '@/components/NaijaWiki/Character' 
import { newcharCall,relatedChars } from '../../newCharHandle' 

export async function generateMetadata({ params, searchParams }, parent) { 
  const slug = params.slug  
  const char_details= await newcharCall(slug)
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title:`Culturays | News- ${char_details?.title}`,
    openGraph: { 
      images: [char_details?.featuredImage.node.sourceUrl],
    },
  }
}  
 async function CharacterPage ({searchParams , params}) { 
 const character_data = await newcharCall(params.slug) 
const related_chars = await relatedChars() 
const name = searchParams.name;  
 const title = character_data.title
 
   return (  
   <>   
   <Character 
   character_data={character_data}
   related_chars={related_chars}
   />  
 
  </>
   )
 }
 
 export default CharacterPage    