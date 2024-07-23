 
import AuthButton from '@/components/AuthButton';
import Creator from '@/components/Creator'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SearchItems from '@/components/SearchItems';
import { Suspense } from 'react';
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/creator` 
  : "http://localhost:3000/creator";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Christina Ngene",
  description: "Christina is creator and originator of Culturays.",
}; 

function Culturayscreator({searchParams}) {
  const name = searchParams.name; 
  const postSearch=[] 
  return (
<Suspense>
<div> 
<nav className="h-18">
<div className=" items-center text-sm">            
<Header/> 
<AuthButton/>
<SearchItems searchVal={name} itemSearches={postSearch}/> 
</div>        
</nav> 
<Creator /> 
<Footer />   
</div> 
 </Suspense>  )
}

export default Culturayscreator

 