 
import NewsLetter from "@/components/NewsLetter"; 
 
const Layout = ({children}) => {
  return ( 
 
<div> 
{children} 
  <NewsLetter/>  
</div>
 
  )
}

export default Layout
