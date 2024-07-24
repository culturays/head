import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";  
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/news` 
  : "http://localhost:3000/news";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "News",
  description: "",
};
 
const Layout = ({children}) => {
  return ( 
<div>
<nav className="h-18">
<div className=" items-center text-sm">            
<Header/> 
</div> 
</nav>  
<AuthButton/> 
<div className='thoughts-text bg-culturaysBg text-white p-8 text-center flex justify-between'> 
<p>Trending <span></span> <span>&#10141;</span></p>
</div>
{children}  
<Footer/>   
</div>
 
  )
}

export default Layout
