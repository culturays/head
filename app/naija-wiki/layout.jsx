
import { Open_Sans, Nokora } from 'next/font/google';
import CharacterQuestion from "./characterQuestion/page";
import Latests from "@/components/Latests"; 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `https://${process.env.NEXT_PUBLIC_BASE_URL}/naija-wiki` 
: "http://localhost:3000/naija-wiki";

export const metadata = {
metadataBase: new URL(defaultUrl), 
 title:"Naija Wiki",  
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
<div className={ noko.className }>  
{children}
<div className='relative '> 
<CharacterQuestion/> 
</div>
<div className=''> 
{/* <Latests/>  */}
</div>
</div>
)
}

export default Layout
