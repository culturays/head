"use server"
import mime from  'mime' ; 
import path, { join }  from'path'   
import { createClient } from './supabase/server';
import axios from 'axios'; 
 async function getFileNameFromUrl(url) {
    return path.basename(new URL(url).pathname); 
  }
    async function getFileNameFromSilverBirds(url) { 
    return path.basename(new URL(url?.split(' ')?.slice(-2)[0]).pathname); 
  }
  
 async function downloadImage(url) { 
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' }, );
      return Buffer.from(response.data, 'binary');
    } catch (error) {
     // console.error('Error downloading the file:');
       throw new Error('Error downloading the file:');
    }
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
 export async function processImages(url, location) {
    ////USE FOR EVENTS IMGS
      if (url){  
    
        const fileName = await getFileNameFromUrl(url); 
        const fileBuffer = await downloadImage(url);
//------------------------------------------

         const mimeType = mime.getType(fileName); 
         const supabase = await createClient()
         if(mimeType !== null){
         const { error } = await supabase.storage
               .from(location) 
               .upload(fileName, fileBuffer, {contentType: mimeType, upsert: true });
         
             if (error) throw new Error(error); 
      
   } 
   //
      console.log(`File uploaded as ${fileName}`);
     // const imgX = await uploadImageToSupabase(fileName, fileBuffer, mimeType);
 
    return fileName
  }
  }
   export async function processSbImages(url, location) { 
       //USE FOR SIIVERBIRDS IMGS
    if (url) { 
     const fileName = await getFileNameFromSilverBirds(url)
        const fileBuffer = await downloadSBImage(url)
//-----------------------------------------------------------
         const mimeType = mime.getType(fileName); 
         const supabase = await createClient()
         if(mimeType !== null){
         const { error } = await supabase.storage
               .from(location) 
               .upload(fileName, fileBuffer, {contentType: mimeType, upsert: true }); 
              // console.log(fileName, fileBuffer)      
             if (error) throw new Error(error); 
      
   } 
     console.log(`File uploaded as ${fileName}`);
       //const imgX = await uploadImageToSupabase(fileName, fileBuffer, mimeType) 
    return fileName
  }
  }
   