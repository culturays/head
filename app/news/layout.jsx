import Latests from "@/components/Latests";
import NewsLetter from "@/components/NewsLetter";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` 
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "News",
  description: "",
};
 
const Layout = ({children}) => {
  return ( 
<div> 
{children}
 
<NewsLetter/>  
<Latests/> 
</div>
 
  )
}

export default Layout
