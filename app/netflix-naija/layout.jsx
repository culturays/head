
import { Open_Sans, Nokora } from 'next/font/google';  
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `https://${process.env.NEXT_PUBLIC_BASE_URL}/netflix-naija` 
: "http://localhost:3000/netflix-naija";
 
export const metadata = {
metadataBase: new URL(defaultUrl), 
 title:"Netflix Naija",  
description: "Culturays is an independent news outlet operating under Ngenet Studio and focused on events from around the world that affect Nigeria and the rest of Africa.",
alternates: {
  canonical: 'https://www.culturays.com/netflix-naija',
 
},
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
