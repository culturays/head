import { newsViews, postsOutline, sideBarNewsItems, sidePanelNewsItems } from "@/app/news/rootpostsHandle"
import NewsLetter from "../../components/NewsLetter"
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Link from "next/link"
import { dateFormatter } from "@/utils/dateFormat"

const SideBar = async() => {
    const newsViewCursors = await newsViews()
    const prev_newsView_cursors = newsViewCursors?.map((xy)=> xy.cursor)  
    const sidePanelCursors = await sidePanelNewsItems(prev_newsView_cursors)
    const prev_sidepanel_cursors = sidePanelCursors?.map((xy)=> xy.cursor)
    const start_cursor_sidebar = prev_sidepanel_cursors?.concat(prev_newsView_cursors)
    const sidebarItems=await sideBarNewsItems(start_cursor_sidebar)
    const news_outline=await postsOutline() 
    const naija_wiki =async ()=>{  
        const supabase = createClient() 
        const { data:cinema_titles , error } = await supabase 
        .from('cinema_titles')
        .select('*')
        if(error)throw new Error('An Error has occured!')
        return { cinema_titles } 
            
        }   
     const {cinema_titles} =await naija_wiki()
     const coming_titles= cinema_titles?.filter((ex)=> ex.genre?.includes('Coming Soon'))
  return (
 <div className='side_view_lg py-3 px-3 m-auto lg:m-0 border-l-4 max-w-md'> 
 
 <div className='py-3 px-3 m-auto lg:m-0 border-l-4 max-w-sm'>
<h2 className='text-gray-600 font-bold text-4xl text-center lg:text-left py-4'>Summary</h2>
<hr className='h-1 w-4/5 m-auto my-4'/>
<div className='m-auto lg:m-0 max-w-md md:max-w-sm'>
  <div dangerouslySetInnerHTML={{__html: news_outline[0]?.content||'Summary'}}className='text-lg leading-8 py-3 text-gray-600 [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-900'/> 
{news_outline[0]?.featuredImage?.node.sourceUrl&& <Image
 className='xs:h-64 lg:h-56'
 src={news_outline[0]?.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={news_outline[0]?.featuredImage?.node.altText}/> }
</div> 
 </div>
 <div className='[&_.news-letter-unflexed>form]:lg:flex-wrap [&_.news-letter-unflexed]:w-80 [&_.news-letter-unflexed]:max-w-auto [&_.news-letter-unflexed]:md:m-0 [&_.news-letter-unflexed]:my-2 [&_.news-letter-buttonwidth]:md:w-auto [&_.news-letter-nowidth]:w-auto'>
<NewsLetter/>
</div> 
 <div className='m-auto max-w-md lg:m-0 '>
 {sidebarItems?.slice(1).map((ex)=>
<div className='shadow flex my-3' key={ex.node.title + ' ' + Math.random()}>
 <div className='w-1/4 lg:w-1/2 mx-1 py-6 '> 
 <Image
 className='xs:h-20 h-11 md:h-11 lg:h-20'
 src={ex.node?.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.node?.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-4/5 mx-2 py-6'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/topic/${ex.node.slug}`}><h2 className='font-bold text-base hover:text-gray-400' >{ex.node?.title}</h2></Link>
</div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ex?.node.author.node.slug}`}><p >{ ex?.node.author.node.name }</p> </Link>
 <p>{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p>
</div>
</div>
</div>
)} 

</div>
 <div className='max-w-sm lg:max-w-md py-6 m-auto border-b border-t border-yellow-600 border-b-4 border-t-4 lg:m-0 xl:max-w-sm'> 
{sidebarItems?.slice(0, 1).map((ex, i)=>
<div key={ex.node.title + ' ' + Math.random()}> 
<div> 
 <Image
 className='h-56 lg:h-44 xl:h-56'
 src={ex.node?.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.node?.featuredImage?.node.altText}/> 
 
 </div> 
<Link href={`/news/topic/${ex.node.slug}`}><h2 className='text-xl font-medium text-gray-800 py-4 hover:text-gray-400 border-l px-2 border-r my-2'>{ex.node.title}</h2></Link>
</div>
)}

</div>  

<div className='my-4 text-xl max-w-lg lg:max-w-md xl:max-w-sm m-auto border lg:m-0'>  
<div className="py-11 max-w-md m-auto bg-slate-50">
 <div className='flex py-3 items-center px-1'> 
<h2 className="text-gray-700 font-medium text-3xl p-3 leading-10">Netflix Naija</h2>
<hr className='h-1 w-1/2 mt-4 bg-black'/>
</div>

  <div className="py-8 text-gray-600 flex justify-evenly hover:scale-105 px-2"> 
 <hr className="w-1/6 my-3 bg-gray-800"/> 
  <Link href='/netflix-naija/coming-to-netflix'><h3 className="cursor-pointer px-1">Coming to Netflix Naija </h3></Link> 
 <hr className="w-1/6 my-3 bg-gray-600"/> 
  
 </div> 
 
 <div className="py-8 text-gray-600 flex justify-evenly hover:scale-105 px-2"> 
 <hr className="w-1/6 my-3 bg-gray-600"/>
 <Link href='/netflix-naija/new-on-netflix'><h3 className="cursor-pointer px-1">New on Netflix Naija </h3></Link> 
 <hr className="w-1/6 my-3 bg-gray-600"/> 
 
 </div>
   <div className='flex py-3 items-center px-1'> 
 <h2 className="text-gray-700 font-medium text-3xl p-3 leading-10">Coming to Cinema</h2>
<hr className='h-1 w-1/2 mt-4 bg-black'/>
</div>
  {coming_titles.map((ity, index)=> 
 <div className='px-11 text-center'key={index}> 
 <ul className='px-1'>  
  
 <a target='_blank' href={ity.url}><ol className='text-gray-600 p-2 hover:scale-105 px-2 text-base'>
   {ity.title}
 </ol></a>
 </ul> 
 </div>
 
 )}  
 </div>
</div> 

</div> 
  )
}

export default SideBar
