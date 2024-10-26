import News from '@/components/News'
import React from 'react' 
import { news__Articles } from './articlehandle'
import newsFeed from '@/utils/newsfeed'

const NewsPage = async() => {
  const newsData= await news__Articles()
 
 
 return (  
   <div>
    <News 
 newsData={newsData} 
 />  
   </div>

 )
 
}

export default NewsPage
