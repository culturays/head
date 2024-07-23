import Image from "next/image"
import Link from "next/link" 

const Relevant = ({related, item}) => {
  return (
    <div className='w-full m-auto overflow-x-scroll '> 
    <h2 className='text-2xl font-bold text-center'>Relavant Posts</h2>
  <aside className='flex justify-center w-max m-auto lg:block'>
  
  {related.filter((xy)=> xy.title!== item.title).map((ex, i)=> 
  <div className='border m-1 w-full rounded-lg flex flex-col items-center justify-center cursor-pointer' key={ex.title + ' ' + i}> 
  <Link href={`/forum/post/${ex.slug}/${ex.id}`}> {ex?.files&& 
  <Image  
  src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}/${ex?.files[0]}`}  
  width={300} 
  height={220} 
  alt={ex.title} 
  /> 
   }
   
  <p className='m-2 text-xl py-4 hover:text-gray-400'>{ex.title} </p> 
  </Link></div>
  )}
   
  </aside>
  </div>
  )
}

export default Relevant
