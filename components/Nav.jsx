import { trends } from '@/app/news/articlehandle' 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link' 
import Test from './Test'

const Nav =async () => {
  const trendsData =await trends() ||[]
   const trending_data = trendsData?.slice(0,4) 
  return (
    <nav className='flex shadow-detailShadow pt-6 justify-center my-1'> 
    <div className='text-center'> 
   <p className='hover:text-gray-500 text-2xl text-gray-700 font-bold'>Trending <span></span> <span>&#10141;</span></p> 
  <p className='text-gray-700 text-right w-screen text-xl hover:text-orange-700'><Link href='/search-page'><FontAwesomeIcon icon={faMagnifyingGlass} width={100}/></Link></p>
<div className='text-md text-gray-700 font-medium flex justify-center xs:flex-row flex-wrap' >
  {trending_data?.map((ex)=> 
    <ul key={ex.title}>  
     <Link href={`/news/trending/${ex.slug}`}><li className='w-32 sm:w-48 m-auto overflow-hidden text-ellipsis py-2 leading-9 text-lg underline md:px-2 hover:text-orange-700 hover:font-bold'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.title}</li></Link> 
    </ul> 
     )}  
  
     </div>
      </div> 
   <Test trendsData={trendsData} />
   </nav>  
  )
}

export default Nav
