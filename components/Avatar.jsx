'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

export default function Avatar({  url, size }) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState(url) 
  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from('profile_avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])
 

 
  return (
    <> 
    {avatarUrl ? (
    <>  
       <div className="absolute w-screen h-screen bg-transparent top-0" style={{'backgroundImage': `url(${avatarUrl})` ,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'100rem' ,backgroundColor:'transparent'}} />
    <div className="absolute w-full h-2/3 rounded-bl-full border left-1/4 top-0 md:left-1/2 xl:left-3/4 z-10" style={{'backgroundImage': `url(${avatarUrl})` ,backgroundRepeat:'no-repeat'}}/>  
     
   </> ) : (
      <div className="avatar no-image" style={{ height: size, width: size }} />
    )}  
  </>
  )
}


