"use server"
import mime from  'mime' ; 
import path, { join }  from'path'   
import { createClient } from './supabase/server';
import axios from 'axios'; 

    async function getFileNameFromSilverBirds(url) { 
  return path.basename(new URL(url?.split(' ')?.slice(-2)[0]).pathname); 
  }


 async function downloadSBImage(url) {
    try {
      const response = await axios.get(url?.split(' ')?.slice(-2)[0], { responseType: 'arraybuffer' }, );
      return Buffer.from(response.data, 'binary');
    } catch (error) {
     // console.error('Error downloading the file:');
       throw new Error('Error downloading the file:');
    }
  }

   export async function processSbImages(url, location) { 
       //USE FOR SIIVERBIRDS IMGS
    if (url) {  
     const fileName = await getFileNameFromSilverBirds(url)
        const fileBuffer = await downloadSBImage(url)
         const mimeType = mime.getType(fileName); 
         const supabase = await createClient()
         async function getSbs(){
  if(mimeType !== null){
         const { error } = await supabase.storage
               .from(location) 
               .upload(fileName, fileBuffer, {contentType: mimeType, upsert: true }); 
             if (error) throw new Error(error); 
       
   } 

         }
         setTimeout(async()=>{
        await getSbs()
     
         },3600)
    // console.log(`File uploaded as ${fileName}`);
       //const imgX = await uploadImageToSupabase(fileName, fileBuffer, mimeType) 
    return fileName
  }
  }
   