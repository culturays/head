import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import cheerio from "cheerio" 
import googleTrends from 'google-trends-api'
const ourPassword = process.env.NEXT_PUBLIC_WP_SECRET
const ourUsername = "Christina Ngene"
export async function getNaijaTrends1(location) {
   const titleObj= []
     
            try {
                const trends = await googleTrends.dailyTrends({
                  // trendDate: new Date().getDate()-1
                    geo: location,
                });
                const trendsData = JSON.parse(trends);
                const trendingSearches = trendsData.default.trendingSearchesDays[0].trendingSearches; 
                trendingSearches.forEach((search, index) => { 
                    titleObj.push({title:search.title.query})
                   // console.log(`${index + 1}. ${search.title.query}`);
                });
               
            } catch (err) {
                console.error('Error fetching trends data:', err);
            }  

    const submitForm = async () => { 
      const data = new FormData()
       for (const xy of titleObj) {  
        Object.entries({title:xy.title }).forEach(([key, value]) => {
        data.append(key, value);
      })
       
        try {
          const response = await fetch('https://content.culturays.com/wp-json/wp/v2/trending', { 
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
   }
  
  }
  // const daily_intervals = ()=> { 
  //   const intervalId = setInterval(()=>{ 
  //   submitForm() 
  //   },1000 * 60 * 60 * 24); 
  //   return () => { 
  //     clearInterval(intervalId);
  //   };
  // }
  submitForm() 
  // const stopDailyInterval = daily_intervals();
  // setTimeout(() => {
  //   stopDailyInterval(); 
  //  }, 30000);  
  return titleObj   
   }