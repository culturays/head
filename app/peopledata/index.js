import axios from "axios"
import cheerio, { xml } from "cheerio"
//   import { MongoClient } from "mongodb";
//  const client = await MongoClient.connect('mongodb+srv://teech:KbigquWWr4N9PkX@cluster0.pmxgu.mongodb.net/peopledb?retryWrites=true&w=majority')
//  const dbs= client.db() 
export async function getPeople() {
//     const popAct=[]
//     const queryParams = {
//         limit: 10, 
//       };
//       const params = new URLSearchParams(queryParams);
// //  const res = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerians?${params}` )
// //  const res2 = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_actors?${params}` )
// // const res3 = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_musicians?${params}` )
// // const res4 = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_writers?${params}` )
// //const res5 = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_poets?${params}` ) 
// // const res6 = await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_sportspeople?${params}` )
// //   const res7=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_women_artists` )
// //const res8=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_artists` )
// //  const res9=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_scientists_and_scholars` )
// // const res10=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_film_directors` )
// // const res11=await axios.get(`https://en.wikipedia.org/wiki/List_of_pastors_in_Nigeria` ) 
// const res12=await axios.get(`https://en.wikipedia.org/wiki/List_of_Nigerian_media_personalities` ) 
// .then((response)=>{
//   const html = response.data
//   const $ = cheerio.load(html)
           
//                 $('ul li a:nth-child(1)', html).each(function(){
//                   const acName = $(this).text().replace(/\n/g,'').trim()
//                   const acUrl = $(this).attr('href')           
//                   popAct.push({  
//                   filmsAc: acName,
//                    urls:acUrl,
               
//                   }) 
//                   }) 
                  
//                      $('ul:nth-child(61) > li:nth-child(2) > a', html).each(function(){
//                     const acName = $(this).text().replace(/\n/g,'').trim()
//                     const acUrl = $(this).attr('href')           
//                     popAct.push({  
//                     filmsAc: acName,
//                      urls:acUrl,
                 
//                     }) 
//                     })
//                   $(' ul > li:nth-child(1) > a', html).each(function(){
//                     const acName = $(this).text().replace(/\n/g,'').trim()
//                     const acUrl = $(this).attr('href')           
//                     popAct.push({  
//                     filmsAc: acName,
//                      urls:acUrl,
                 
//                     }) 
//                     })
//             })
// const pplN= popAct?.filter((ux)=> ux.filmsAc !== '').filter((ux)=> !ux?.filmsAc?.includes('List')).filter((ux)=> !ux?.filmsAc?.includes('Article')).filter((ux)=>  ux?.filmsAc?.charAt(0) !== ux?.filmsAc?.charAt(0).toLowerCase() )  

//  //await dbs.collection("peopledb").insertOne({pplN})   
//  // client.close()     
//   return pplN       
} 
      
  
export const popPeople =async ()=>{ 
//    const olx = await getPeople()
//   const pplN= olx?.filter((ux)=> ux.filmsAc !== '').filter((ux)=> !ux?.filmsAc?.includes('List')).filter((ux)=> !ux?.filmsAc?.includes('Article')).filter((ux)=> ux?.filmsAc?.charAt(0) !== ux?.filmsAc?.charAt(0).toLowerCase() )  
// // const peopleX =await dbs.collection('peopledb').find({ } ).toArray()
 
// const popNigNames = [] 
// const popNigImgs = [] 
// const popNigBdays= []  

//  const ppleUrl = pplN.filter((xxu)=> xxu.urls!== '').filter((xxu)=> xxu.urls!== undefined).filter((xxu)=> !xxu.urls.includes('#')).filter((xxu)=> !xxu.urls.includes('List_')).filter((xxu)=> !xxu.urls.includes('wikipedia')).filter((xxu)=> !xxu.urls.includes('Privacy Policy')).filter((xxu)=> !xxu.urls.includes('Wikimedia')).filter((xxu)=> !xxu.urls.includes('wikimedia')).filter((xxu)=> !xxu.urls.includes('Wikipedia')).filter((xxu)=> !xxu.urls.includes('Foundation')).filter((xxu)=> !xxu.urls.includes('foundation')).filter((xxu)=> !xxu.urls.includes('Nigeria')).filter((xxu)=> !xxu.urls.includes('Flag')).filter((xxu)=> !xxu.urls.includes('Wikidata')).filter((xxu)=> !xxu.urls.includes('Lists')).filter((xxu)=> !xxu.urls.includes('http')).filter((xxu)=> !xxu.urls.includes('League')).filter((xxu)=> !xxu.urls?.includes('Association')).filter((xxu)=> !xxu.urls.includes('World'))

// // // const ngs = [] 
// const urlCol= ppleUrl.filter((element)=>!element.urls?.includes('index.php?'))
// const getCopies = urlCol.filter( function( item, index, inputArray ) {
//     return inputArray.indexOf(item) === index;
//   })
 
//   try{
// await axios.all(getCopies.map(async(endpoint) =>await axios.get(`https://en.wikipedia.org/${endpoint.urls?.replace(/_\((actress)\)/g, "").replace(/_\((actor)\)/g, "")}`))).then((allResponses) => {  
//     allResponses.forEach((response) => {  
//     const html = response.data
//     const $ = cheerio.load(html)  
//     // $('div.mw-content-ltr.mw-parser-output > table > tbody', html).each(async function(){      
//     //     const pple = $(this).text()
//     //     popNig.push({pple:pple} )   
        
//     //     })
//     //     $('div.mw-content-ltr.mw-parser-output > table.infobox.biography.vcard > tbody', html).each(async function(){      
//     //       const pple = $(this).text()  
//     //       popNig.push({pple:pple} )  
          
//     //       })
        
//           // $('.infobox-data > span:first-child', html).each(async function(){      
//           //   const info = $(this).text()
//           //   popNigNames.map((ex, i)=>
//           //   popNigInfo.push({
//           //     name:ex.pple,
//           //      info:info
//           //    } ) 
      
//           //    )  
         
            
//           //   }) 
//   // //  $('div.mw-content-ltr.mw-parser-output > p:nth-child(5)', html).each(async function(){      
//   // //           const data = $(this).text()
//   // //           if(!data){
//   // //            return
//   // //           }
//   // //           popNig.push({data:data} ) 
            
//   // //           }) 


//   //           //  $('div.mw-content-ltr.mw-parser-output > table.infobox.vcard > tbody', html).each(async function(){      
//   //           // const pple = $(this).text()
//   //           // popNig.push({pple:pple} )  
            
//   //           // })
//   //           //  $('div.mw-content-ltr.mw-parser-output > table.infobox.vcard.plainlist > tbody', html).each(async function(){      
//   //           // const pple = $(this).text()
//   //           // popNig.push({pple:pple} )  
            
//   //     // })
// $('.fn', html).each(async function(){      
// const pple = $(this).text()
// popNigNames.push( { name:pple})})

// $('tbody img', html).each(async function(){    
// const img = $(this).attr('src')
// if(!img.includes('icon')&&!img.includes('Flag_') &&!img?.includes('Medal')&&!img?.includes('.svg')&&!img?.includes('.gif')&&!img?.includes('Nigeriafilm')&&!img?.includes('Login_Manager')){
// const yxt = popNigNames.filter((ex)=>img?.includes(ex.name) || img?.includes(ex?.name?.split(' ').join('_') ))   
//       popNigImgs.push({
//         name:yxt[0]?.name,
//          img:img,
         
//        } ) 

//       }
//       }) 
      
// $('.bday', html).each(async function(){      
//     const bday = $(this).text() 
//     popNigNames.map((ex, i)=>  
//     popNigBdays.push({
//       name:ex.name,
//       bday:bday,
     
//   } ) 
//   ) 
  
//     })   
// });
// }); 
 
// const removeDuplicatesBd = (data) => {
//   const seen = new Set(); 
//   return data.reduce((unique, current) => { 
//     const key = current.name   ;  
//   if (!seen.has(key)) {  
//       seen.add(key); 
//       unique.push(current);
//     }    
//     return unique;
//   }, []);
// }; 

// const resultX = removeDuplicatesBd(popNigBdays );
 
// const uniqueArray = resultX.filter((currentItem, currentIndex) => {
// const hasDuplicate = resultX.some((otherItem, otherIndex) => {
//   return (
//       otherIndex !== currentIndex && 
//       otherItem.bday === currentItem.bday // Compare birthdays
//   );  
// });
// return !hasDuplicate;
// }); 
// const diff= [] 
// uniqueArray.filter((ex)=> 
// popNigImgs.filter((ux)=> {  
// if(ux?.img.includes(ex?.name.split(' ').join('_').replace(/([a-z])([A-Z])/g, '$1 $2'))){ 
// diff.push({name:ex.name, img: ux.img, bday: ex.bday})

// }
// })
//   )
 
// const imgItems= popNigImgs.filter((ux)=> !ux.img?.includes('icon')).filter((ux)=> !ux.img?.includes('Flag_')).filter((ux)=> !ux.img?.includes('Medal')).filter((ux)=> !ux.img?.includes('.svg')).filter((ux)=> !ux.img?.includes('.gif')).filter((ux)=> !ux.img?.includes('Nigeriafilm')).filter((ux)=> !ux.img?.includes('Login_Manager')).slice(1)
//  //await dbs.collection("bd").insertOne({diff}) 
// //getCopies.slice( 1000 ).map(x=> console.log(x.urls)) 
// //client.close()
//  }catch(err){ 
//     console.log(err)   
//  } 
   }   
  