
import Main from "@/components/Main"
import { events3Details, getNaijaEvents3 } from "./naija-events/eventData/eventContent"
import { replaceSpecialCharacters } from "@/utils/replacechar"
import { createClient } from "@/utils/supabase/server"
import { scrapeSilverBird } from "./naija-wiki/filmsdata"
import { processSbImages } from "@/utils/processImages" 
import MainBottom from "@/components/MainBottom"
import SideBar from "../components/Side"
import { getNaijaTrends1 } from "./api/trends/naija"
import { getGoogleNewsTitles, getNaijaNews1 } from "./api/news/route"
import { CronJob } from 'cron';  
// (async () => { 
//   //await getNaijaTrends1('NG')
//  // await getNaijaNews1()
//  //console.log('News Titles:',newstitles);  
// })();
  
const Home =async ({searchParams}) => { 
  const location = 'Lagos, Nigeria'; 
  const newstitles=await getGoogleNewsTitles(location)
  await getNaijaNews1()
  await getNaijaTrends1('NG')
  
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
   console.log('it ran ')
   async function getEvs(){
    const supabase = createClient()
    const { data, error } = await supabase
      .from('events')
      .upsert([grouped])
      .select();                         
    if (error) { 
      console.error('Error inserting items:', error);
    }  

    }
    setTimeout(()=>{
     getEvs()

    },1000)
 
 
 } 
  return () => clearTimeout(fxnTimeout);

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
    
    const imgMime=await processSbImages( silverB_imgs[i], 'cinema_imgs' );
    grouped.push({ 
     title: silverB_titles[i], 
     url: silverB_urls[i],
   img_url: imgMime ,
       release_date: silverB_released[i],
       genre: silverB_gnr[i], 
       dur: silverB_dur[i]
     });
    }  
    console.log('it ran ')
   async function getCines(){
    const supabase = createClient()
    const { data, error } = await supabase
      .from('cinema_titles')
      .upsert(grouped)
      .select();                         
    if (error) { 
      console.error('Error inserting items:', error);
    } 


    }
    setTimeout(()=>{
     getCines()

    },1000)
 return () => clearTimeout(fxnTimeout);
    }  
    
    const fxnTimeout = setTimeout(() => {
    CronJob.from({
    cronTime: '10 8 * * 1', 
    onTick:dailyEv3(),
    start: true,
    timeZone: 'Africa/Lagos'
    });

      CronJob.from({
    cronTime: '10 8 * * 1',
    onTick:dailyWiki(),
    start: true,
    timeZone: 'Africa/Lagos'
    });

  },3000); 
   

return (
<div> 
 <div className="md:flex md:justify-center px-11" style={{maxWidth:'1700px'}}> 
  <Main/>  
  <SideBar/>  
</div>
  <MainBottom />  
</div> 
 )
}

export default Home