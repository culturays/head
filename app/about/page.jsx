import About from "@/components/About"
import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchItems from "@/components/SearchItems"; 
import { Suspense } from "react";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/about` 
  : "http://localhost:3000/about";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"About",  
  description: "Culturays is an independent news outlet operating under Ngenet Studio and focused on events from around the world that affect Nigeria and the rest of Africa.",
}; 
const AboutUs =async ({searchParams}) => { 
  const name = searchParams.name;
  const postSearch=[]
  return ( 
<Suspense fallback={<p>Loading...</p>}>  
<div> 
<nav className="h-18">
<div className=" items-center text-sm">            
<Header/> 
<AuthButton/>
<SearchItems 
searchVal={name} 
itemSearches={postSearch}
/> 
</div>        
</nav>    
<About/> 
<Footer />   
</div> 
</Suspense> 
)
}

export default AboutUs 
