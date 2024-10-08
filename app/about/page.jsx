import About from "@/components/About" 
import { usersList } from "../creator/usersHandle"
 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/about` 
  : "http://localhost:3000/about";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"About",  
   
}; 

const AboutUs =async () => {
  const listedUsers= await usersList()
   return ( 
<About 
listedUsers={listedUsers}
/>  
)
}

export default AboutUs 

 

 
