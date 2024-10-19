
import { Open_Sans, Nokora } from 'next/font/google';  

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `https://${process.env.NEXT_PUBLIC_BASE_URL}/netflix-naija/coming-to-netflix` 
: "http://localhost:3000/netflix-naija/coming-to-netflix";
 
export const metadata = {
metadataBase: new URL(defaultUrl), 
 title:"Coming to Netflix Naija",  
description: "Culturays is an independent news outlet operating under Ngenet Studio and focused on events from around the world that affect Nigeria and the rest of Africa.",
}; 

 const openSans = Open_Sans({ 
    subsets: ['latin'], 
    variable:'--font-opensans',
    weight:'300',
    display: 'swap',  
});

export const noko =Nokora({
  subsets:['latin'], 
   weight:['300', '400', '700'],
   display: 'swap', 
   })
 
const Layout = ({children}) => {
   
  return (  
    <div className={noko.className}>  
  {children} 
</div>
 )
}

export default Layout
