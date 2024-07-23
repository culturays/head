"use server"
import {  processImages } from "@/utils/processImages";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import cheerio from "cheerio"  
import mime from 'mime' ; 

export async function getNaijaEvents3(){
const titleObj = []
const titleAObj = []
const imgObj = []
const dateObj = []
const descObj = []
const priceObj = []
const groupedObj ={}
// try{
    
// const res12=await axios.get('https://allevents.in/lagos/al') 
// .then(async(response)=>{
//   const html = response.data  
// const $ = cheerio.load(html) 
//   $('ul > li >  div.banner-cont.php-banner-cont', html).each(async function(){
//   const img = $(this).attr('style') 
// imgObj.push({img:img})   
//   })
  

//   $('div.title a', html).each(async function(){   
//   const atitle = $(this).attr('href') 
//     titleAObj.push({atitle:atitle}) 
      
// }) 


// $('div.title h3', html).each(async function(){  
//     const title = $(this).text()
//     titleObj.push({title:title}) 
      
// }) 

// $('div.subtitle', html).each(async function(){  
//     const desc = $(this).text()
//     descObj.push({desc:desc}) 
    
//   })
//     $('div.date', html).each(async function(){      
//         const dateX = $(this).text()  
//         dateObj.push({dateX:dateX}) 
//                })
//               $('div.price-container', html).each(async function(){      
//                   const cost = $(this).text()
//                   priceObj.push({cost:cost}) 
//                }) 
//         })
       
//         return { titleObj, titleAObj, imgObj,dateObj, descObj, priceObj}  
        
//       }catch(err){
//         if(err) return
//       } 

      }
      export async function events3Details(id) { 
        const nameObj= []
        const imgObj= []
        const descObj= []
        const locObj= []
        const dateObj =[]
        const genreObj= []  
        const fullObj= {}
      try{
//  await axios.get(id).then((response) => {
// // new Promise((resolve)=> {
// // setTimeout(()=>{
// // resolve(true)
// // },5000)
// // }) 
// const html = response.data
// const $ = cheerio.load(html) 
// $('h1', html).each(async function(){            
// const ev = $(this).attr('title')
// fullObj['data'] ||= []  
//  fullObj['data']?.push( {title:ev.trim().replace(/\t/g,'').replace(/\n/g,'') })  
// fullObj['data'].push( {slug:ev.trim().toLowerCase()})  
// })   

// $('.event-thumb', html).each(async function(){    
// const img = $(this).attr('src') 
// if(img!== undefined){ 
//  const imgMime=await processImages(img).catch(console.error); 
// fullObj['data'].push( {imgMime} )  
//     }  
//     })     
//   $('#event_description > p', html).each(async function(){      
// const desc = $(this).text()           
// fullObj['data'].push( {desc} ) 
// }) 
// $('div.venue-li >p > span', html).each(async function(){      
// const ven = $(this).text()
// fullObj['data'].push( {ven:ven.trim().replace(/\t/g,'').replace(/\n/g,'')} ) 
// fullObj['data'].push( {venSlug:ven?.trim().toLowerCase().split(',')[0]})
  
// })  
// $('div.small-event-list > a', html).each(async function(){      
// const gnr = $(this).text()
// fullObj['data'].push( {gnr:gnr.trim().replace(/\t/g,'').replace(/\n/g,'')} ) 
// fullObj['data'].push( {gnrSlug:gnr?.trim().toLowerCase().split(',')[0]})
  
// }) 
// //#event-detail-fade > 
// $('div.event-head.wdiv.padding-10 > div > div:nth-child(6) > span:nth-child(4) > span', html).each(async function(){      
//  const day = $(this).text()  
// fullObj['data'].push( {day:day.trim().replace(/\t/g,'').replace(/\n/g,'')} ) 
// })
 
          
//  }); 

}catch(err){ 
    console.log(err)   
 } 

    // const resultX = removeDuplicatesBd(genreObj)  
    return fullObj
}
    