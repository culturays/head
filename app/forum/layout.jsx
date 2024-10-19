 
import { Open_Sans, Nokora } from 'next/font/google'; 
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
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/forum` 
  : "http://localhost:3000/forum";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Forum",
  //title:{absolute:"Forum"},
  description: "",
  alternates: {
    canonical: 'https://www.culturays.com/forum',
 
  },
};  

const Layout = ({children}) => {
  return ( 
<div className={`${noko.className}`} >   
{children}  
</div> 
)
}

export default Layout
