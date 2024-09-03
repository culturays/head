import { getNaijaTrends1 } from '@/app/api/trends/naija'
import { trends } from '@/app/news/newshandle'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link' 

const Nav =async () => {
  const trendsData =await trends() 
 const trending_data = trendsData.slice(0,4) 
 if(!trending_data )throw new Error('An error has occured.')
  return (
    <nav className='flex shadow-detailShadow pt-8 justify-center my-1'> 
    <div className='text-center'> 
  <p className='text-2xl text-gray-700 font-bold'>Trending <span></span> <span>&#10141;</span></p> 
  <p className='text-gray-700 text-right w-screen text-xl hover:text-orange-700'> <Link href='/search-page' ><FontAwesomeIcon icon={faMagnifyingGlass} width={100}/></Link></p>
<div className='text-md text-gray-700 font-medium flex justify-center flex-col xs:flex-row  ' >
  {trending_data?.map((ex)=> 
    <ul key={ex.title}>  
     <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><li className='py-2 underline md:px-2 hover:text-orange-700 hover:font-bold text-center mx-1'>{ex.title}</li></Link> 
    </ul> 
     )}  
  
     </div>  
   
     </div> 
   
   </nav>  
  )
}

export default Nav
