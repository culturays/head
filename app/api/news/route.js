import axios from "axios";
import * as cheerio from 'cheerio'; 
import { CronJob } from "cron";
const ourPassword = process.env.NEXT_PUBLIC_WP_SECRET
const ourUsername = "Christina Ngene"

export async function getNaijaNews1() {
    const eventName=[] 
    const eventAll= []
    const eventLoc= []
    const imgObj= [] 
    
      const res12=await axios.get('https://news.google.com/home?hl=en-NG&gl=NG&ceid=NG:en') 
      .then(async(response)=>{
        const html = response.data
      const $ = cheerio.load(html)
    
       $('a.gPFEn', html).each(async function(){
       const title = $(this).text() 
          imgObj.push({ 
             title ,             
            } 
           )  
       }) 
   
       $('.vr1PYe', html).each(async function(){      
          const author = $(this).text() 
          imgObj.map((ex)=>{  
          eventName.push( {
          author:author, 
           title:ex.title 
          }
       )} ) 
      
      }) 
     
       $('.hvbAAd', html).each(async function(){      
          const date = $(this).text()              
          eventName.map((ex)=>{ 
          eventAll.push({
          author:ex.author,
          title:ex.title,
          date:date  
      }) }) 
       })
 
    })
       const removeDuplicatesBd = (data) => {
      const seen = new Set(); 
      return data.reduce((unique, current) => { 
        const keyName = current.author  ;
        const keyTitle = current.title ; 
        const keyTime = current.date ;    
   
        if(!seen.has(keyName)){
          if(!seen.has(keyTitle)){
            if(!seen.has(keyTime)){         
              seen.add(keyTitle);
              seen.add(keyName );  
              seen.add(keyTime ); 
          unique.push(current)
         }}     
          }  
        return unique;
      }, []);
    };  
     
    const resultX = removeDuplicatesBd(eventAll)
    const submitForm = async () => { 
      const data = new FormData()
       for (const xy of resultX) {  
        Object.entries({title:xy.title }).forEach(([key, value]) => {
        data.append(key, value);
      })
      console.log('it ran away')
      //to post to latest postType 'https://content.culturays.com/wp-json/wp/v2/latest'
        try {
          const response = await fetch('https://content.culturays.com/wp-json/wp/v2/latest', { 
            method: "POST",  
            body:data,  
            headers: {
              'Accept': 'application/json', 
            'Authorization': 'Basic ' + Buffer.from(`${ourUsername}:${ourPassword}`).toString('base64')
            },
          });
      
          if (!response.ok) {
            console.log(response.statusText)
            throw new Error(`HTTP error! status: ${response.statusText}`);
          } 
      
          const result = await response.json(); 
       
        } catch (error) {
          console.error('Error submitting form:', error);
        }
   } }
 
   CronJob.from({
    cronTime: '40 5 * * *', 
    onTick: submitForm,
    start: true,
    timeZone: 'Africa/Lagos'
  });
   return resultX
 
   }
  
 
// export const getGoogleNewsTitles = async (location) => {
//   const newsTitlesGoogle=[]
//     try {
         
//         const url = `https://news.google.com/search?q=${encodeURIComponent(location)}&hl=en-US&gl=NG&ceid=NG:en`; 
//         const { data } = await axios.get(url); 
//         const $ = cheerio.load(data); 
//         const newsTitles = [];
//         $('h3').each((index, element) => {
//             newsTitles.push($(element).text());
//         });
 
//        // console.log(`Google News titles for ${location}:`);
//         newsTitles.forEach((title, index) => { 
//           newsTitlesGoogle.push({
//             title
//           })
//            // console.log(`${index + 1}. ${title}`);
//         });
//     } catch (err) {
//         console.error('Error fetching Google News data:', err);
//     }
//     return newsTitlesGoogle
// };


export const getGoogleNewsTitles = async (location) => {
  const newsTitlesGoogle = [];
  try {
      const url = `https://news.google.com/search?q=${encodeURIComponent(location)}&hl=en-US&gl=NG&ceid=NG:en`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      $('article').each((index, element) => {
          const titleElement = $(element).find('a.JtKRv');
          const title = titleElement.text();

          const dateElement = $(element).find('time');
          const date = dateElement.attr('datetime');

          const authorElement = $(element).find('.vr1PYe');
          const author = authorElement.text()

          newsTitlesGoogle.push({
              title,
              date,
              author
          });
      });
  } catch (err) {
      console.error('Error fetching Google News data:', err);
  }
  const removeDuplicatesBd = (data) => {
    const seen = new Set(); 
    return data.reduce((unique, current) => { 
      const keyName = current.author  ;
      const keyTitle = current.title ; 
      const keyTime = current.date ;    
 
      if(!seen.has(keyName)){
        if(!seen.has(keyTitle)){
          if(!seen.has(keyTime)){         
            seen.add(keyTitle);
            seen.add(keyName );  
            seen.add(keyTime ); 
        unique.push(current)
       }}     
        }  
      return unique;
    }, []);
  };  
   
  const resultX = removeDuplicatesBd(newsTitlesGoogle)
  const submitForm = async () => { 
    const data = new FormData()
     for (const xy of resultX) {  
      Object.entries({title:xy.title }).forEach(([key, value]) => {
      data.append(key, value); 
      console.log('it ran fast')
    })
   
      try {
        const response = await fetch('https://content.culturays.com/wp-json/wp/v2/latest', { 
          method: "POST",  
          body:data,  
          headers: {
            'Accept': 'application/json', 
          'Authorization': 'Basic ' + Buffer.from(`${ourUsername}:${ourPassword}`).toString('base64')
          },
        });
    
        if (!response.ok) {
          console.log(response.statusText)
          throw new Error(`HTTP error! status: ${response.statusText}`);
        } 
    
        const result = await response.json();     
      } catch (error) {
        console.error('Error submitting form:', error);
      }
 } }
 CronJob.from({
  cronTime: '30 5 * * *', 
  onTick: submitForm,
  start: true,
  timeZone: 'Africa/Lagos'
});

return newsTitlesGoogle;
};

