 
import Creator from '@/components/Creator' 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/creator` 
  : "http://localhost:3000/creator";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Christina Ngene",
  description: "Christina is creator and originator of Culturays.",
}; 

function Culturayscreator() {
 
  return (
<div> 
<Creator />  
</div> 
  )
}

export default Culturayscreator