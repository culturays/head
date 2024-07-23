import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import cheerio from "cheerio" 
import googleTrends from 'google-trends-api'
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
            //fetching directly of sending to supabase first
      const submitForm = async () => { 
        const data = new FormData()
        for (const xy of titleObj) {
        Object.entries({title:xy.title }).forEach(([key, value]) => {
        data.append(key, value);
        })
             const supabase = createClient()
        try {
        // const { data:trendData, error } = await supabase
        // .from('trends')
        // .insert([data])
        // .select()
         
                } catch (error) {
                  console.error('Error submitting form:', error);
                }
           } 
        }
    // await submitForm() 
  
  return titleObj   
   }