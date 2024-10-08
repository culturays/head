import News from '@/components/News'
import React from 'react' 
import { news__Articles } from './articlehandle'
import newsFeed from '@/utils/newsfeed'

const NewsPage = async() => {
  const newsData= await news__Articles()
  await newsFeed()
//   const passage_news = newsData.filter((xy)=> xy.node.newsNewsGroup.passageNewsArticles!== null)
// const news_data = passage_news.map((xy)=> xy.node.newsNewsGroup.passageNewsArticles).map((fy)=> fy.nodes).flat()
 
 return (  
   <div>
 <News 
 newsData={newsData} 
 />  
   </div>

 )
 
}

export default NewsPage
