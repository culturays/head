import NewsLetter from "@/components/NewsLetter"; 
 
export const metadata = { 
  title: "Trending",
  description: "",
};
 
const Layout = ({children}) => {
  return (  
<div> 
{children} 
 <NewsLetter/>  
 
</div>
 
  )
}

export default Layout
