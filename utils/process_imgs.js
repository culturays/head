"use server"
import mime from 'mime' ; 
import path, { join }  from'path'   
import { createClient } from './supabase/server';
import axios from 'axios'; 

 async function getFileNameFromUrl(url) {
    try{
   return path.basename(new URL(url).pathname); 
    }catch(error){
      console.log(error)
    }
     
    }
  
    async function downloadImage(url) {  
 
        try {
          const response = await axios.get(url, { responseType: 'arraybuffer' }, );
          return Buffer.from(response.data, 'binary');
        } catch (error) { 
           console.error('Error downloading the file:');
           throw new Error('Error downloading the file:');
        }
      }


      export async function processImgs(url, location) { 
          if (url){ 
           
            const fileName = await getFileNameFromUrl(url); 
            const fileBuffer = await downloadImage(url); 
             const mimeType = mime.getType(fileName); 
             const supabase = await createClient()        
             if(mimeType !== null){ 
             const { error } = await supabase
                    .storage
                   .from(location) 
                   .upload(fileName, fileBuffer, {contentType: mimeType, upsert: true, cacheControl: '3600' });
             if(error){
                console.log(error)

             }
      } 
       
          //console.log(`File uploaded as ${fileName}`);
         // const imgX = await uploadImageToSupabase(fileName, fileBuffer, mimeType);
     
        return fileName
      }
      }
    
    