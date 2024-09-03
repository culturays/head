import Characters from "@/components/NaijaWiki/Characters";
import { newchars } from "../../newCharHandle" 
import { searchValues } from "@/app/lib/searches/search";  
export const metadata = {  
   title:"Naija Wiki | Characters",  
  description: "Culturays is an independent news outlet operating under Ngenet Studio and focused on events from around the world that affect Nigeria and the rest of Africa.",
  }; 
  
const CharactersPage =async ({searchParams, params}) => {
const charsList = await newchars()
const listChars= charsList?.filter((xx)=> xx.charactertitles.filmname.toLowerCase().replace(/ /g,'-') ===params.slug )
  return (
    <div>  
 <Characters
 listChars={listChars}

 />  

    </div>
  )
}

export default CharactersPage
