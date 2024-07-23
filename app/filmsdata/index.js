"use server"
import axios from "axios";
import cheerio from "cheerio"
import puppeteer from 'puppeteer-core'
import {executablePath} from 'puppeteer' 
export async function getTop10() {
const top10Data=[]
const top10s=[]
const top10Names=[]
const queryParams = {
limit: 10, 
};
 const params = new URLSearchParams(queryParams); 
const res12=await axios.get(`https://www.netflix.com/tudum/top10/nigeria` ) 
.then((response)=>{
  const html = response.data
const $ = cheerio.load(html)
new Promise((resolve)=> {
  setTimeout(()=>{
resolve(true)
  },5000)
 })
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
  
$('.tbl-cell-rank', html).each(async function(){      
const rank = $(this).text() 
top10s.push({ 
rank:rank, 
}  ) 
 })
  
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
})
     
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