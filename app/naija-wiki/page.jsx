import { naijaWikiVids, newchars } from './newCharHandle'
import { getTop10, scrapeSilverBird } from './filmsdata'
import Main from '@/components/NaijaWiki/Main'   
import { createClient } from '@/utils/supabase/server' 
import { news_posts } from '../news/newshandle' 
import { processSbImages } from '@/utils/processImages'
import { netflixAfrica, netflixCollaborations, netflixCulture, netflixDeals, netflixInter, netflixNews, netflixNigNaija, netflixPopular, netflixSocials, netflixStories } from '../netflix-naija/netflix-news'
 
const NaijaWikiPage =async ({searchParams, params}) => { 
const newChars = await newchars()
const silverBTitles= await scrapeSilverBird()   
const naijaWikiVideos =await naijaWikiVids()
const netFlixTop10= await getTop10() 
const news_items= await news_posts()
 
const dailyWiki =async()=>{
 
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
      // console.log('Inserted event:', data);
     }
  } catch (error) {
    console.error('Unexpected error:', error);
  }  
 } 
   
 const daily_intervals =  ()=> {
  //
  const intervalId = setInterval(()=>{ 
    dailyWiki(); 
  },7 * 24 * 60 * 60 * 1000);
  return () => {
    clearInterval(intervalId);
  };
}
const stopDailyInterval = daily_intervals();
setTimeout(() => {
  stopDailyInterval(); 
 }, 20000);

const naija_wiki =async ()=>{  
const supabase = createClient() 
const { data:cinema_titles , error } = await supabase 
.from('cinema_titles')
.select('*')
if(error)throw new Error('An Error has occured!')
return { cinema_titles } 

}
const {cinema_titles} =await naija_wiki() 
const netflix__News = await netflixNews()
// const trends =await getNaijaTrends1('NG')
const netflix__africa = await netflixAfrica()
const netflix__collaborations = await netflixCollaborations()
const netflix_deals = await netflixDeals()
const netflix_culture = await netflixCulture()
const netflix_stories = await netflixStories()
const netflix_socials= await netflixSocials()
const netflix_popular = await netflixPopular()
const netflix_inter = await netflixInter()
const netflix__NG_naija = await netflixNigNaija()
// const trending_data = trends.slice(0,3)
 const news_blog =netflix__News?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.nodes).flat()
  const africa_blog =netflix__africa?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.nodes).flat()
   const collaborations_blog =netflix__collaborations?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.nodes).flat()
    const deals_blog =netflix_deals?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.nodes).flat()
     const culture_blog =netflix_culture?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.nodes).flat()
      const stories_blog =netflix_stories?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.nodes).flat()
       const socials_blog =netflix_socials?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.nodes).flat()
        const popular_blog =netflix_popular?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.nodes).flat()
         const inter_blog =netflix_inter.edges?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.nodes).flat()
          const naija_blog =netflix__NG_naija?.edges?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.nodes).flat()
          const inter_cursor=netflix_inter?.edges?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.pageInfo) 
          const naija_cursor= netflix__NG_naija?.edges?.map((ex)=> ex.node.allNetflixNaija).map((xy)=> xy.pageInfo)
            
return (
<div>
   <Main  
newChars={newChars}
cinema_titles={cinema_titles}
naijaWikiVideos={naijaWikiVideos}
news_items={news_items}
news_blog={news_blog}
netFlixTop10={netFlixTop10}
africa_blog={africa_blog}
collaborations_blog={collaborations_blog}
deals_blog={deals_blog}
culture_blog={culture_blog}
stories_blog={stories_blog}
socials_blog={socials_blog}
popular_blog={popular_blog}
inter_blog={inter_blog}
naija_blog={naija_blog}
inter_cursor={inter_cursor}
naija_cursor={naija_cursor}
/>


</div>
  )
}

export default NaijaWikiPage