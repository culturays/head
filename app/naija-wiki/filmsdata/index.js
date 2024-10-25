"use server"
import axios from "axios";
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer-core'
import {executablePath} from 'puppeteer'  
export async function getTop10() {
const top10Data=[]
const top10s=[]
const top10Names=[]
 
const dateObject = new Date(); 
const year = dateObject.getFullYear();
const month = String(dateObject.getMonth() +1 ).padStart(2, '0');
const day = String(dateObject.getDate() ).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`; 
const finalString = `${formattedDate}`;
const queryParams = {
  week: finalString,  
  }; 
 const params =  new URLSearchParams(queryParams);  
const res12=await axios.get(`https://www.netflix.com/tudum/top10/nigeria`) 
.then((response)=>{
if(response.status!==200)throw new Error(response.status)
const html = response.data
const $ = cheerio.load(html)
// $('#maincontent > div > div > div', html).each(function(){
// const acName = $(this).text().replace(/\n/g,'').trim()
// const acUrl = $(this).attr('href')           
// popAct.push({  
// filmsAc: acName,
// urls:acUrl,
// }) 
// }) 

 $('.tbl-cell-name', html).each(async function(){      
    const title = $(this).text() 
    top10s.push({ 
     title:title, 
  } 
 )  
 }) 
  
// $('.tbl-cell-rank', html).each(async function(){      
// const rank = $(this).text() 
// top10s.push({ 
// rank:rank, 
// }  ) 
//  })
  
$('picture > img', html).each(async function(){      
const img = $(this).attr('src')  
top10s.push({ 
img:img  
 } ) 
})
$('#maincontent > div > div > div', html).each(async function(){      
const date = $(this).text() 
top10s.push({ 
date:date   
 } ) 
})

}).then(response =>response )
.catch(err => console.error(err)); 
await new Promise(resolve => setTimeout(resolve, 1000));   
return top10s       
} 

 
export async function getTop10Series() {
  const top10Data=[]
  const top10s=[]
  const top10Names=[]
  const queryParams = {
  limit: 10, 
  };
  
   const params = new URLSearchParams(queryParams); 
  const res12=await axios.get(`https://www.netflix.com/tudum/top10/nigeria/tv` ) 
  .then((response)=>{
  if(response.status!==200)throw new Error(response.status)
  const html = response.data
  const $ = cheerio.load(html)
  // $('#maincontent > div > div > div', html).each(function(){
  // const acName = $(this).text().replace(/\n/g,'').trim()
  // const acUrl = $(this).attr('href')           
  // popAct.push({  
  // filmsAc: acName,
  // urls:acUrl,
  
  // }) 
  // }) 
  
   $('.tbl-cell-name', html).each(async function(){      
      const name = $(this).text() 
      top10s.push({ 
       name:name, 
    } 
   )  
   }) 
    
  // $('.tbl-cell-rank', html).each(async function(){      
  // const rank = $(this).text() 
  // top10s.push({ 
  // rank:rank, 
  // }  ) 
  //  })
    
  $('picture > img', html).each(async function(){      
  const img = $(this).attr('src')  
  top10s.push({ 
  img:img  
   } ) 
  })
  $('#maincontent > div > div > div', html).each(async function(){      
  const date = $(this).text() 
  top10s.push({ 
  date:date   
   } ) 
  })
  
  }).then(response =>response )
  .catch(err => console.error(err)); 
  await new Promise(resolve => setTimeout(resolve, 1000));   
  return top10s       
  } 
  
export async function getPopular(){ 
  const top10Data=[]
  const top10s=[]
  const top10Names=[]
  const queryParams = {
  limit: 10, 
  };
  
   const params = new URLSearchParams(queryParams); 
  const res12=await axios.get(`https://www.netflix.com/tudum/top10/most-popular` ) 
  .then((response)=>{
  if(response.status!==200)throw new Error(response.status)
  const html = response.data
  const $ = cheerio.load(html)
  // $('#maincontent > div > div > div', html).each(function(){
  // const acName = $(this).text().replace(/\n/g,'').trim()
  // const acUrl = $(this).attr('href')           
  // popAct.push({  
  // filmsAc: acName,
  // urls:acUrl,
  
  // }) 
  // }) 
  //#most-popular > div > div.px-3 > div > div.all-time-table.mx-auto.mb-12.p-2.md\:py-8.md\:px-2.md\:max-w-screen-lg.sm\:max-w-screen-md > table > tr:nth-child(2) > td.py-1.leading-tight.font-600
  $('td:nth-child(2)', html).each(async function(){      
    const title = $(this).text()
   
    top10s.push({ 
     title:title, 
  } 
 )  
 }) 
  
    
  // $('.tbl-cell-rank', html).each(async function(){      
  // const rank = $(this).text() 
  // top10s.push({ 
  // rank:rank, 
  // }  ) 
  //  })
 
  
  }).then(response =>response )
  .catch(err => console.error(err)); 
  await new Promise(resolve => setTimeout(resolve, 1000));   
  return top10s  
}

export async function getPopularSeries(){
  const top10Data=[]
  const top10s=[]
  const top10Names=[]
  const queryParams = {
  limit: 10, 
  };
  
   const params = new URLSearchParams(queryParams); 
  const res12=await axios.get(`https://www.netflix.com/tudum/top10/most-popular/tv` ) 
  .then((response)=>{
  if(response.status!==200)throw new Error(response.status)
  const html = response.data
  const $ = cheerio.load(html)
  // $('#maincontent > div > div > div', html).each(function(){
  // const acName = $(this).text().replace(/\n/g,'').trim()
  // const acUrl = $(this).attr('href')           
  // popAct.push({  
  // filmsAc: acName,
  // urls:acUrl,
  
  // }) 
  // }) 
  
  $('td:nth-child(2)', html).each(async function(){      
    const title = $(this).text()
   
    top10s.push({ 
     title:title, 
  } 
 )  
 }) 
    
  // $('.tbl-cell-rank', html).each(async function(){      
  // const rank = $(this).text() 
  // top10s.push({ 
  // rank:rank, 
  // }  ) 
  //  })
  
  
  }).then(response =>response )
  .catch(err => console.error(err)); 
  await new Promise(resolve => setTimeout(resolve, 1000));   
  return top10s  

}

export async function getPopularNonEng(){ 
  const top10Data=[]
  const top10s=[]
  const top10Names=[]
  const queryParams = {
  limit: 10, 
  };
  
   const params = new URLSearchParams(queryParams); 
  const res12=await axios.get(`https://www.netflix.com/tudum/top10/most-popular/films-non-english` ) 
  .then((response)=>{
  if(response.status!==200)throw new Error(response.status)
  const html = response.data
  const $ = cheerio.load(html)
  // $('#maincontent > div > div > div', html).each(function(){
  // const acName = $(this).text().replace(/\n/g,'').trim()
  // const acUrl = $(this).attr('href')           
  // popAct.push({  
  // filmsAc: acName,
  // urls:acUrl,
  
  // }) 
  // }) 
  $('td:nth-child(2)', html).each(async function(){      
    const title = $(this).text()
   
    top10s.push({ 
     title:title, 
  } 
 )  
 }) 
  
    
  // $('.tbl-cell-rank', html).each(async function(){      
  // const rank = $(this).text() 
  // top10s.push({ 
  // rank:rank, 
  // }  ) 
  //  })
 
  
  }).then(response =>response )
  .catch(err => console.error(err)); 
  await new Promise(resolve => setTimeout(resolve, 1000));   
  return top10s  
}

export async function getPopularSeriesNonEng(){
  const top10Data=[]
  const top10s=[]
  const top10Names=[]
  const queryParams = {
  limit: 10, 
  };
  
   const params = new URLSearchParams(queryParams); 
  const res12=await axios.get(`https://www.netflix.com/tudum/top10/most-popular/tv-non-english` ) 
  .then((response)=>{
  if(response.status!==200)throw new Error(response.status)
  const html = response.data
  const $ = cheerio.load(html)
  // $('#maincontent > div > div > div', html).each(function(){
  // const acName = $(this).text().replace(/\n/g,'').trim()
  // const acUrl = $(this).attr('href')           
  // popAct.push({  
  // filmsAc: acName,
  // urls:acUrl,
  
  // }) 
  // }) 
  
  $('td:nth-child(2)', html).each(async function(){      
    const title = $(this).text()
   
    top10s.push({ 
     title:title, 
  } 
 )  
 }) 
  
    
  // $('.tbl-cell-rank', html).each(async function(){      
  // const rank = $(this).text() 
  // top10s.push({ 
  // rank:rank, 
  // }  ) 
  //  })
  
  
  }).then(response =>response )
  .catch(err => console.error(err)); 
  await new Promise(resolve => setTimeout(resolve, 1000));   
  return top10s  

}

const NETFLIX_URL = 'https://www.netflix.com/login';

 const login = async (page, email, password) => {
    await page.goto(NETFLIX_URL, { waitUntil: 'networkidle2' });
    
    await page.type('input[name="userLoginId"]', email);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
};

export const scrapeCategory = async (page, categoryUrl) => {
    await page.goto(categoryUrl, { waitUntil: 'networkidle2' });    
    const content = await page.content(); 
    const $ = cheerio.load(content);  
    const titles = [];     
     $('a', content).each(function(){
           const title = $(this).text() 
          const tUrl = $(this).attr('href') 
           titles.push({            
            title,tUrl
                   
            }) 
          
            })
    // $('span.jawbone-title-link').each((index, element) => {
    //     titles.push($(element).text());
    // }); 
    return titles;
};
export const netFlixData =async () => {
  const netflixes=[]
  const browser = await puppeteer.launch({ headless: true, executablePath: executablePath() });
  const page = await browser.newPage();
  
   //const email = 'your-email@example.com';
    //const password = 'your-password';
//   await login(page, email, password);
  
  // Replace with the actual URL of the category you want to scrape
  const categoryUrl = 'https://www.netflix.com/browse/genre/81284582?bc=34399';
 
  const titles = await scrapeCategory(page, categoryUrl); 
  titles.forEach((title, index) => {
    netflixes.push(title)
      //console.log(`${index + 1}. ${title:title.title, url:title.tUrl}`);
  });
  
  await browser.close();
  return netflixes
}

export const scrapeSilverBird = async () => {
  const silverbirdsCinemas=[]
try{
  await axios.get('https://silverbirdcinemas.com/')
  .then(async(response)=>{
    if(response.status !== 200) throw new Error(response.status)
    const html = response.data
    const $ = cheerio.load(html)
    $('.entry-title a ' ,html).each(function(){
    const title = $(this).text().replace(/\n/g,'').trim() 
      const titleUrl= $(this).attr('href') 
      silverbirdsCinemas.push({
      title,
       titleUrl
    }) 
      
    }) 
    $('.entry-date' ,html).each(function(){
      const release_date = $(this).text().replace(/\n/g,'').trim() 
      silverbirdsCinemas.push({
        release_date, 
      }) 
        
      })
      // $('div.desc-mv > p:nth-child(1)' ,html).each(function(){
      //   const itemDate = $(this).text()   ; 
      //   silverbirdsCinemas.push({
      //     itemDate, 
      //   }) 
          
      //   })
        
        $('.desc-mv > p:nth-child(2)' ,html).each(function(){
          const genre = $(this).text(); 
            silverbirdsCinemas.push({
              genre, 
            }) 
              
            }) 
        $('.desc-mv> p:nth-child(3)' ,html).each(function(){
          const dur = $(this).text(); 
            silverbirdsCinemas.push({
              dur, 
            }) 
              
            }) 
    
    
    // $('.rate' ,html).each(function(){
    //   const rate = $(this).text().replace(/\n/g,'').trim()
    //   silverbirdsCinemas.push({
    //     rate, 
    //         }) 
        
    //   })
    $('img.attachment-240x412', html).each(async function(){
    const img_url = $(this).attr('srcset') 
    silverbirdsCinemas.push( {
      img_url 
      } ) 
      
    }) 
    }) .then(response =>response )
      .catch(err => console.error(err));
  await new Promise(resolve => setTimeout(resolve, 1000));
} catch(err){
console.log(err)
}   
  return silverbirdsCinemas
};


// export const scrapeSilverBirdComingSoon = async (page, categoryUrl) => {
//   const silverbirdsCinemas=[]
//   try{   
//     await axios.get('https://silverbirdcinemas.com/')   
//     .then(async(response)=>{
// const html = response.data
// const $ = cheerio.load(html)
// $('.carousel-title a' ,html).each(function(){
// const itemTitle = $(this).text().replace(/\n/g,'').trim() 
//   const titleUrl= $(this).attr('href') 
// silverbirdsCinemas.push({
//   itemTitle,
//   titleUrl
// }) 
  
// }) 
 
// $('.carousel-release span' ,html).each(function(){
//   const itemRelease = $(this).text().replace(/\n/g,'').trim() 
//   silverbirdsCinemas.push({
//     itemRelease, 
//   }) 
    
//   })    
 
// $('.carousel-thumb img' ,html).each(async function(){
// const itemImg = $(this).attr('srcset')  
// silverbirdsCinemas.push( {
// itemImg
// } ) 
  
// }) 

// })    
 
// }catch(error){ 
//   console.log(error)
// } 
// const titles_ = silverbirdsCinemas.filter((tx)=> tx.itemTitle)      
// const imgs_ = silverbirdsCinemas.filter((tx)=>tx.itemImg)
//  const date_ = silverbirdsCinemas.filter((tx)=> tx.itemRelease )

//   return {titles_,date_, imgs_ };
// };