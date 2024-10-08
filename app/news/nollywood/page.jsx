import React from 'react'
import { nollywoodBlog } from '../articlehandle'
import Nollywood from '@/components/News/Nollywood'
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/nollywood` 
  : "http://localhost:3000/nollywood";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Nollywood",   
}; 
const NollywoodPage =async () => {
const nollywood_news = await nollywoodBlog()
 
  return (
    <div>      
    <Nollywood
     nollywood_news={nollywood_news}
     />   
    </div>
  )
} 

export default NollywoodPage
