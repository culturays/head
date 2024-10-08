import { createClient } from "@/utils/supabase/server";
import { netflixNews } from "./netflix-naija/netflix-news";
import { contentFeed } from "./news/articlehandle";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` 
  : "http://localhost:3000";
export const revalidate = 3600
export default async function sitemap() { 
      const netflix__News = await netflixNews()
      const netflixFeed = netflix__News.map((ex)=> ex.node.netflixNaijaPosts.nodes).flat()   
       const contentData=await contentFeed()
       const articleData= contentData.filter((xy)=> xy.contentTypeName === 'article')
       const nollywood_news = contentData.filter((xy)=> xy.contentTypeName === 'nollywood')
       const postsData= contentData.filter((xy)=> xy.contentTypeName === 'post')
 
      const netflix_posts = netflixFeed.map((post)=>({ 
         url:`${defaultUrl}/netflix-naija/news/${post.slug}`,
         lastModified:new Date(post.date),
         changeFrequency:'daily',
         priority:0.7 

      }) )  
       const article_posts = articleData.map((post)=>({ 
         url:`${defaultUrl}/news/article/${post.slug}`,
         lastModified:new Date(post.date),
         changeFrequency:'daily',
         priority:0.7

      }) )
     const nollywood_posts = nollywood_news.map((post)=>({ 
         url:`${defaultUrl}/news/nollywood/${post.slug}`,
         lastModified:new Date(post.date),
         changeFrequency:'daily',
         priority:0.7

      }) )
         const post_posts = postsData.map((post)=>({ 
         url:`${defaultUrl}/news/topic/${post.slug}`,
         lastModified:new Date(post.date),
         changeFrequency:'daily',
         priority:0.7

      }) )
    return [
      {
        url: `${defaultUrl}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url:`${defaultUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url:`${defaultUrl}/forum`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
     ...netflix_posts,
     ...article_posts,
     ...nollywood_posts,
    ...post_posts
    ]
  }