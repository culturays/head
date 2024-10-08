import AuthButton from "@/app/AuthButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header"; 
import Latests from "@/components/Latests";
import NewsLetter from "@/components/NewsLetter";
import Top10 from "@/components/Top10El";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
 
// import '@styles/globals.css'
// import '@styles/events.css'
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/naija-events` 
  : "http://localhost:3000/naija-events";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Naija Events",
  description: "",
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
