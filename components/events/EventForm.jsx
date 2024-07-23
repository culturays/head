 'use client'

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation"
import style from '../../styles/events.module.css'
import { createClient } from "@/utils/supabase/client";
const EventForm = ({eventEdit, user, setActive, active }) => {

const [uploading, setUploading] = useState(false)
const router=useRouter()
const modalEl = useRef();
const clearEl = useRef(); 
const {slug}= useParams()

const addEventTitle = async (event) => {
  event.preventDefault();
  try {
setUploading(true)
const formData = new FormData(event.target);
const title = formData.get('title');
const file= formData.get('file');
const date= formData.get('date');
const location= formData.get('location');
const description= formData.get('description');
const genre= formData.get('genre');
const artist= formData.get('artist');
const excerpt=description.split(' ').slice(0,10).join(' ')
const slug=title.toLowerCase().replace(/ /g,"-").trim()

if (!file ) {
      throw new Error('You must select an image to upload.')
    } 

  // const file =event.target.files[0]
const files = file.name.split('.').pop()
const filePath = `${user.id}-${Math.random()}.${files}`

const supabase = createClient();
const { error: uploadError } = await supabase.storage.from('event_avatars').upload(filePath, file,{upsert: true})

const { data, error } = await supabase
.from('events')
.insert([
{ title,
date,
location,
is_pending: true,
user_id:user.id,
event_file:filePath,
slug ,
description,
genre,
excerpt:excerpt +  '...',
artist:artist 
},
])
.select();

  if (uploadError) {
    throw uploadError
  }


  if (error) {
      console.log(error);
    }
  }

  catch (err) {
  console.log(err);
  } finally {
    setUploading(false)
  }
  setActive(null)
  clearEl.current?.reset();
  router.refresh();
}
const updateEventTitle = async (event) => {
  event.preventDefault();
  try {

  const formData = new FormData(event.target);
  const title = formData.get('title');
  const date= formData.get('date');
  const location= formData.get('location');
  const description= formData.get('description');
  const genre= formData.get('genre');
  const excerpt= description.split(' ').slice(0,10).join(' ')

  const supabase = createClient();
  // const { data, error } = await supabase
  //   .storage
  //   .updateBucket('avatars', {
  //     public: false,
  //     allowedMimeTypes: ['image/png'],
  //     fileSizeLimit: 1024
  //   })
  const { data, error } = await supabase
  .from('events')
  .update([
  {
  title,
  date,
  location,
  is_pending: false,
  user_id:user.id,
  slug,
  description,
  genre,
  excerpt
  },
  ])
  .eq('id', eventEdit.id)
  .select();

  if (error) {
  console.log(error);
  }
  }

  catch (err) {
  console.log(err);
  }
  router.refresh()
  setActive(null)
  // clearEl.current?.reset();

  }

useEffect(() => {
const handler = (event) => {
if (!modalEl.current) {
return;
}

if (!modalEl.current.contains(event.target)) {
setActive(false);

}

};
document.addEventListener("click", handler, true);

return () => {
document.removeEventListener("click", handler);
};

}, [active]);

 
return (
<div className="flex justify-center items-center fixed z-10 top-0 h-screen bg-slate-800 opacity-90 w-full">
<form className='m-2 flex  ' onSubmit={eventEdit.id?updateEventTitle:addEventTitle} ref={clearEl} >
<div className="bg-black p-20 mt-11 rounded-md" ref={modalEl}>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="title">
Event Title</label>
<textarea
cols={40}
name='title'
defaultValue={eventEdit.title}
className='focus:outline-none leading-6 px-3 py-1 text-sm resize-none dark:bg-gray-700 dark:text-white m-1 rounded-b-md border-black'
placeholder="Title"
/>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="title">
Description</label>
<textarea
cols={40}
name='description'
defaultValue={eventEdit.description}
className='focus:outline-none leading-6 px-3 py-1 text-sm resize-none dark:bg-gray-700 dark:text-white m-1 rounded-b-md border-black '
placeholder="Description"
/>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="location">
Genre</label>
<textarea
cols={40}
name='genre'
defaultValue={eventEdit.genre}
className='focus:outline-none leading-6 px-3 py-1 text-sm resize-none dark:bg-gray-700 dark:text-white m-1 rounded-b-md border-black'
placeholder="Genre"
/>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="location">
Artist</label>
<textarea
cols={40}
name='artist'
defaultValue={eventEdit.artist}
className='focus:outline-none leading-6 px-3 py-1 text-sm resize-none dark:bg-gray-700 dark:text-white m-1 rounded-b-md border-black'
placeholder="Artist"
/>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="location">
Location</label>
<textarea
cols={40}
name='location'
defaultValue={eventEdit.location}
className='focus:outline-none leading-6 px-3 py-1 text-sm resize-none dark:bg-gray-700 dark:text-white m-1 rounded-b-md border-black'
placeholder="Location"
/>
<label className="block mb-2 text-sm font-medium text-gray-900 text-white" htmlFor="date">
Date</label>
<div className="custom-date-picker my-2">
<input
  type="date"
  name="date"
  min={new Date().toISOString().split('T')[0]}
  // max={"2025-04-30"} // Set max date as needed
  defaultValue={eventEdit.date}
  className={`text-sm p-2 rounded-b-md dark:bg-gray-700 dark:text-white ${style.datepickerbg}`}
/>
</div>
 
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
{uploading ? 'Uploading ...' : 'Upload'}</label>
<div className="flex "
><input
className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
id="file_input"
type="file"
name='file'
accept="image/*"
// onChange={uploadAvatar}
disabled={uploading}/>
<button type="submit" >
<FontAwesomeIcon icon={faAngleRight} className="text-white text-lg opacity-70 mt-2 mx-4 p-1 cursor-pointer"/>
</button>
</div>
</div>
</form>

</div>
)
}

export default EventForm
