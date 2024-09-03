import Character from '@/components/NaijaWiki/Character' 
import { newcharCall,relatedChars } from '../../newCharHandle'  
import CharacterQuestion from '../../characterQuestion/page'

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