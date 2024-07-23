// import AuthButton from "@components/AuthButton";

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Open_Sans, Nokora } from 'next/font/google';
export const noko =Nokora({
  subsets:['latin'], 
   weight:['300', '400', '700'],
   display: 'swap', 
   })

  const Layout = ({children}) => {
    return (   
      <div className={noko.className}> 
    <nav className="h-18">
          <div className=" items-center text-sm">            
         <Header/>      
          </div>        
        </nav> 
          {children} 
        <Footer/>     
      </div>
    )
  }
  
  export default Layout
  