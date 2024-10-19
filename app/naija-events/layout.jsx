import NewsLetter from "@/components/NewsLetter";
import Top10 from "@/components/Top10El"; 
 
// import '@styles/globals.css'
// import '@styles/events.css'
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/naija-events` 
  : "http://localhost:3000/naija-events";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Naija Events",
  description: "",
  alternates: {
    canonical: 'https://www.culturays.com/naija-events',
  
  },
}; 
 
const Layout = ({children}) => {
  
  return (  

    <div> 
{children} 
<Top10 />  
<div className="flex p-8 lg:px-32"> 
<NewsLetter/>  
</div>

{/* <Latests/>  */}
    </div>
 )
}

export default Layout
