import About from "@/components/About" 
 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/about` 
  : "http://localhost:3000/about";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"About",  
  
}; 

const AboutUs =async () => { 
   return ( 
<About/>  
)
}

export default AboutUs 

 

 
