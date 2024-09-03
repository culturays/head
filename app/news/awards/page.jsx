import Awards from "@/components/Awards"  
import { awardsContent } from "../newshandle";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/awards` 
  : "http://localhost:3000/awards";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Awards",   
}; 

const AwardsPage = async() => {
    const awards_content = await awardsContent()
  return (
    <div>
      <Awards
      awards_content={awards_content}
      /> 
    </div>
  )
}

export default AwardsPage
