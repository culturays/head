import { newsByLatest, newsPosts, newsViews, nextNewsPosts, postCategories, postLastAndScrolledCategories, postNextCategories, postsOutline, sideBarNewsItems, sidePanelNewsItems } from "./news/rootpostsHandle" 
import Main from "@/components/Main"
import { events3Details, getNaijaEvents3 } from "./naija-events/eventData/eventContent"
import { replaceSpecialCharacters } from "@/utils/replacechar"
import { createClient } from "@/utils/supabase/server"
import { scrapeSilverBird } from "./naija-wiki/filmsdata"
import { processSbImages } from "@/utils/processImages"
import SideBar from "@/components/Side"
import MainBottom from "@/components/MainBottom"
import newsFeed from "@/utils/newsfeed"
import netflixNewsFeed from "@/utils/netflixNaijaFeed"
import topicsFeed from "@/utils/topicsFeed"
import articleFeed from "@/utils/articleFeed"
import nollywoodFeed from "@/utils/nollywoodFeed"
import { Suspense } from "react"
import Test from "@/components/Test"

// (async () => {
//   const location = 'Lagos, Nigeria';  
//   const newsTitles = await getGoogleNewsTitles(location)
// //const newsTitles = await getNaijaNews1()
//   console.log('News Titles:', newsTitles);
// })();
  
const Home =async ({searchParams}) => {  
const dailyEv3 =async()=>{ 
 const eventExp = await getNaijaEvents3()  
const result = await Promise.all(eventExp.titleAObj.map(async one=> {  
const evData = await events3Details(one.atitle)
 return evData 
  }))
 
 const grouped={}
 
  const data = result.map((ex)=> ex.data) 
 for (const ez of data ) {
   for (const ex of ez ) { 
     if (ex.title !== undefined){
     grouped['title']||=[]
    grouped.title=ex.title.replace(/\t/g, '').replace(/\n/g, '')
     
   }
   if (ex.slug !== undefined){ 
    grouped.slug=replaceSpecialCharacters(ex.slug.replace(/’/g, "").replace(/&/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/ /g,"-"))  
     
   } 
  //&& (ex.imgMime.includes('.jpg')|| ex.imgMime.includes('.png'))
   if (ex.imgMime !== undefined ){   
     grouped.img_url=ex.imgMime 
      
    } 
    if (ex.desc !== undefined ){ 
     grouped.desc=ex.desc  
      
    }
    if (ex.day !== undefined ){ 
     grouped.day=ex.day 
       
    }
       if (ex.venSlug !== undefined ){ 
     grouped.loc_slug=replaceSpecialCharacters(ex.venSlug.replace(/’/g, "").replace(/&/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/ /g,"-").replace(/,/g,""))  
      
    } 
   //  if (ex.cost !== undefined ){ 
   //   grouped.genre=ex.cost.replace(/\t/g, '').replace(/\n/g, '').replace(/’/g, "").replace(/&/g, "").split(',').join(' ')
   //  } 
    if (ex.gnr !== undefined ){ 
     grouped.genre=replaceSpecialCharacters(ex.gnr.replace(/’/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/&/g, ""))   
      
    } 
    if (ex.gnrSlug !== undefined ){ 
     grouped.genre_slug=replaceSpecialCharacters(ex.gnrSlug.replace(/’/g, "").replace(/&/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/ /g,"-").replace(/,/g,""))  
      
    } 
   //  if (ex.cost !== undefined ){ 
   //   grouped.genre=ex.cost.replace(/\t/g, '').replace(/\n/g, '').replace(/’/g, "").replace(/&/g, "").split(',').join(' ')
   //  } 
    if (ex.ven !== undefined ){ 
     grouped.location=replaceSpecialCharacters(ex.ven.replace(/’/g, "").replace(/\t/g, '').replace(/\n/g, '').replace(/&/g, ""))   
      
    } 
   } 
 
    try {    
         const supabase = createClient()
        const { data, error } = await supabase 
       .from('events')
       .upsert([grouped])
       .select()
                   
     if (error) { 
       console.error('Error inserting event:', error);
     } else {
       // console.log('Inserted event:', data); 
    }                           
 } catch (error) {
   console.error('Unexpected error:', error);
 } 
 } 
  console.log('it ran')
   } 
    
  const dailyWiki =async()=>{
    const silverBTitles= await scrapeSilverBird() 
    const silverB_titles = silverBTitles.filter((xy)=> xy.title !==undefined).map((ex)=> ex.title)  
    const silverB_urls = silverBTitles.filter((xy)=> xy.titleUrl !==undefined).map((ex)=> ex.titleUrl) 
    const silverB_imgs = silverBTitles.filter((xy)=> xy.img_url !==undefined).map((ex)=> ex.img_url)   
     const silverB_dur = silverBTitles.filter((xy)=> xy.dur !==undefined).map((ex)=> ex.dur)
    const silverB_gnr = silverBTitles.filter((xy)=> xy.genre !==undefined).map((ex)=> ex.genre)
    const silverB_released = silverBTitles.filter((xy)=> xy.release_date !==undefined).map((ex)=> ex.release_date)
   const minLength = Math.max(silverB_titles.length,silverB_urls.length, silverB_imgs.length, silverB_dur.length, silverB_gnr.length, silverB_released.length);   
   const grouped = [];
   
   for (let i = 0; i < minLength; i++) { 
    const imgMime=await processSbImages( silverB_imgs[i], 'cinema_imgs' ).catch(console.error);
    console.log(imgMime) 
    grouped.push({ 
     title: silverB_titles[i], 
     url: silverB_urls[i],
      img_url: imgMime ,
       release_date: silverB_released[i],
       genre: silverB_gnr[i], 
       dur: silverB_dur[i]
     });
    }  
   
    try {  
        const supabase = createClient()
         const { data, error } = await supabase
           .from('cinema_titles')
           .upsert(grouped)
           .select();                         
         if (error) { 
           console.error('Error inserting items:', error);
         } else {
           console.log('It ran');
        }
     } catch (error) {
       console.error('Unexpected error:', error);
     }  
    } 
    const now = new Date();
    const delay = 1000 * 60 * 60 * 24;  
    const start = delay - (now.getDay() * 60 +now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();
   
    setTimeout(function doSomething() {
       dailyEv3()
        dailyWiki(); 
       setTimeout(doSomething, delay); 
    }, start); 
    // const daily_intervals = ()=> { 
    //   const intervalId = setInterval(()=>{ 
    
    //   },1000 * 60 * 60); 
    //   return () => { 
    //     clearInterval(intervalId);
    //   };
    // }
    
    // const stopDailyInterval = daily_intervals();
    // setTimeout(() => {
    //   stopDailyInterval(); 
    //  }, 30000);    

 const latestPosts=await newsByLatest() 
 const posts_cursor=latestPosts?.categories.nodes.map((xy)=> xy.posts.pageInfo.endCursor) 
 const post_data = await postCategories(posts_cursor) 
 const postCategory_next_cursor =(post_data?.categories.edges.map((xt)=>xt.cursor )||[])
 const postCategory_cursor =post_data?.categories.edges.map((xy)=> xy.node.posts.edges).flat().map((t)=> t.cursor)
// const news_outline=await postsOutline() 
//const newsViewCursors = await newsViews()
//  const prev_newsView_cursors = newsViewCursors?.map((xy)=> xy.cursor)
//  const sidePanelCursors = await sidePanelNewsItems(prev_newsView_cursors)
//  const prev_sidepanel_cursors = sidePanelCursors?.map((xy)=> xy.cursor)
//  const start_cursor_sidebar = prev_sidepanel_cursors?.concat(prev_newsView_cursors)
//  const sidebarItems=await sideBarNewsItems(start_cursor_sidebar)
//  const sibarNewsCursor =sidebarItems?.map((xy)=> xy.cursor)
//  const allExitingPostCursors=posts_cursor?.concat(postCategory_cursor)?.concat(start_cursor_sidebar)?.concat(sibarNewsCursor)
// //////////////////////////////////////
//  const postsData= await newsPosts(allExitingPostCursors)
// const news_post_cursor = postsData?.posts?.edges.map((xy)=> xy.cursor)
// const postsCursors = allExitingPostCursors?.concat(news_post_cursor)
// // /////////////////////////////////////// 

// const posts_notIn_newsPosts= await nextNewsPosts(postsCursors)
// const last_two_categories = posts_notIn_newsPosts?.categories.edges.map((xt)=>xt.cursor)
// const last_cursors=postCategory_next_cursor?.concat(last_two_categories).push("YXJyYXljb25uZWN0aW9uOjUwMQ==")
// //////////////////////////////////////////////////////////////////
//  //const unusedPostsinPostCategories = await categoriesUnusedPosts(allExitingPostCursors)
// //////////////////////////////////////////////////////////////////
// const next_posts_categories =await postNextCategories(postCategory_next_cursor)
// const last_categories = await postLastAndScrolledCategories(last_cursors)
// const post_end_cursor=last_categories?.length>0 &&last_categories[0]?.node.posts.pageInfo.endCursor 

//  const latest_post_categories = latestPosts?.categories.nodes.map((xy)=> xy.posts.nodes) 

// // //  ///Post Data after mapping
//  const posts_all=posts_notIn_newsPosts?.categories.edges.map((xy)=> xy.node.posts).filter((ex)=> ex.nodes.length>0) 
//  await newsFeed()
//  await netflixNewsFeed()
//  await nollywoodFeed()
//  await articleFeed()
//  await topicsFeed()  

return (
<div>  
  <Test 
  latestPosts={latestPosts}
    posts_cursor={posts_cursor} 
    post_data={post_data} 
    />
  {/* <div className="md:flex md:justify-center" style={{maxWidth:'1700px'}}> 
<Main  
posts={postsData?.posts.edges} 
latestPosts={latest_post_categories} 
post_categories={post_data?.categories.edges }
news_outline={news_outline} 
// next_posts_categories={next_posts_categories.categories.edges }
posts_notIn_newsPosts={posts_all} 
post_next_cursor={postCategory_next_cursor}
last_two_categories={last_two_categories}
post_end_cursor={post_end_cursor}
last_cursors={last_cursors}
news_post_cursor={news_post_cursor} 
/>   
  <SideBar/> 
</div>
  */}
 {/* <MainBottom 
 posts_notIn_newsPosts={posts_all} 
 post_end_cursor={post_end_cursor}
 news_post_cursor={news_post_cursor}
 last_cursors={last_cursors} 
 />   */}
</div> 
 )
}

export default Home