 
import NewsLetter from '@/components/NewsLetter';
import Top10 from '@/components/Top10El'; 
const Layout = ({children}) => {
   
  return (
<div>  
  {children}
  <Top10 /> 
  <NewsLetter/> 
</div>
)
}

export default Layout
