"use server"
import mime from  'mime' ;
import fs from 'fs' ;
import path, { join }  from'path' 
import fetch from 'node-fetch'
import https from 'https';
import { fileURLToPath } from "url"; 
import { createClient } from './supabase/server';
import axios from 'axios'; 
 async function getFileNameFromUrl(url) {
    return path.basename(new URL(url).pathname);
  }
  
 async function downloadImage(url) { 
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' }, );
      return Buffer.from(response.data, 'binary');
    } catch (error) {
      console.error('Error downloading the file:', error);
      throw error;
    }
  }
  

 export async function processImages(url) {  
    // for (const url of imageUrls) {
    //   if (url) {    
     // console.log(`File uploaded as ${fileName}`);
      // const imgX = await uploadImageToSupabase(fileName, fileBuffer, mimeType);
         const fileName = await getFileNameFromUrl(url); 
         const fileBuffer = await downloadImage(url);
         const mimeType = mime.getType(fileName); 
         const supabase = await createClient()
         if(mimeType !== null){
         const { error } = await supabase.storage
               .from('event_avatars') 
               .upload(fileName, fileBuffer, {contentType: mimeType, upsert: true });
         
             if (error) throw error; 
      
    } 
    //}}
    return fileName
  }
   