import Image from "next/image" 
import { getTop10 } from "@/app/naija-wiki/filmsdata";

const Top10 =async () => {

    const latest10 = await getTop10() 
    const top10Names = latest10.map((ex)=> ex.title)
  return (
    <div className='bg-gray-800 text-white my-11'> 
    <h2 className='text-3xl font-bold p-8 text-center'>Top 10 Movies/Series on Netflix Naija Today</h2>
    <div className='grid grid-col-1 mt-5 overflow-auto gap-0'> 
    
     <div className='p-4 flex w-max'> 
    {latest10.filter((ux)=> ux.img).map((ex,i)=> 
    <div key={i} className="w-5/12" > 
     <Image  
    src={ex.img} 
    width={280} 
    height={280}
    alt='Top 10 on Nextflix Naija'
  
    />

     <div className='text-xl py-4 text-center'>
      {top10Names.map((xx, ix)=> ix === i&&
    <h2 key={ix} className="py-2">
    {xx} 
    </h2>
     )}</div>
     </div> 
    )}
    </div>
    
     </div> 
     </div>
  )
}

export default Top10
