import React from 'react'
import { nollywoodBlog } from '../newshandle'
import Nollywood from '@/components/News/Nollywood'

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
