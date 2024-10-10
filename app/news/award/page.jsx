import Awards from "@/components/News/Awards"   
 import { awardsBlog } from "../articlehandle"; 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/award` 
  : "http://localhost:3000/award";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Awards",   
}; 

const AwardsPage = async() => {
 const awards_content = await awardsBlog() 
  return (
    <div>
 <Awards
 awards_content={awards_content}
      />  
    </div>
  )
}

export default AwardsPage
