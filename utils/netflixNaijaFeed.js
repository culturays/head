"use server"
import fs from 'fs';
import { Feed } from "feed";
import { contentFeed } from '@/app/news/articlehandle'; 
import { netflixNews } from '@/app/netflix-naija/netflix-news';

async function netflixNewsFeed(){
    const netflix__News = await netflixNews() 
    const netflixFeed =netflix__News?.map((ex)=> ex.node.netflixNaijaPosts.nodes).flat()  
   const site_url='https://culturays.com';
    const pubDate= new Date()
    const author = 'Christina Ngene'  
      const feed = new Feed({
        title: 'Culturays | RSS Feed',
        description: 'Culturays is the news site for trends in business and domestic industries in Africa.',
        id: site_url,
        link: site_url,
        image: `${site_url}/assets/icons/favicon.ico`,
        favicon: `${site_url }/assets/icons/favicon.ico`,
        copyright: `All rights reserved ${pubDate.getFullYear()}, Culturays`,
        updated: pubDate,
        date:pubDate,
        generator: "Feed for Culturays",
        feedLinks: {
          rss2: `${site_url}/rss.xml`,
          json: `${site_url }/rss/feed.json`,
        },
        author,
      });
     netflixFeed?.map((post) => {
      const url = `${site_url}/netflix-naija/news/${post.slug}`;     
      feed.addItem({
        title: post.title,
        id: url, 
        link: url,
        description: post.excerpt,
        content: post.excerpt,
        author: post?.author?.node.name ,
        contributor: [ post?.author?.node.name ],
        date: new Date(post.date),
      image: post?.featuredImage?.node.sourceUrl.split('?')[0]
      });
 fs.writeFileSync("./public/rss2.xml", feed.rss2(), { recursive: true} );
    });

     
   }
   export default netflixNewsFeed 