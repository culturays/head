import { newchars } from './newCharHandle'
import { getTop10} from './filmsdata'
import Main from '@/components/NaijaWiki/Main'   
import { createClient } from '@/utils/supabase/server' 
import { processSbImages } from '@/utils/processImages'
import { netflixAfrica, netflixDeals, netflixInter, netflixNews, netflixNigNaija, netflixPopular, netflixSocials, netflixStories } from '../netflix-naija/netflix-news'
import { vids } from '../news/articlehandle'
 
const NaijaWikiPage =async ({searchParams, params}) => { 
const newChars = await newchars()
const naijaWikiVideos =await vids()
const netFlixTop10= await getTop10()

const naija_wiki =async ()=>{  
const supabase = createClient() 
const { data:cinema_titles , error } = await supabase 
.from('cinema_titles')
.select('*')
if(error)throw new Error('An Error has occured!')
return { cinema_titles } 
 
}
const {cinema_titles} =await naija_wiki() 
const netflix__News = await netflixNews()
////const trends =await getNaijaTrends1('NG') 
const netflix_africa= await netflixAfrica() 
const netflix_popular = await netflixPopular()
const netflix_inter = await netflixInter()
const netflix__NG_naija = await netflixNigNaija()
////const trending_data = trends.slice(0,3)
 const news_blog =netflix__News?.map((ex)=> ex.node.netflixNaijaPosts).map((xy)=> xy.nodes).flat()
 const africa_blog =netflix_africa?.map((ex)=> ex.node.netflixNaijaPosts).map((xy)=> xy.nodes).flat()
 
        const popular_blog =netflix_popular?.map((ex)=> ex.node.netflixNaijaPosts).map((xy)=> xy.nodes).flat()
         const inter_blog =netflix_inter.edges?.map((ex)=> ex.node.netflixNaijaPosts).map((xy)=> xy.nodes).flat()
          const naija_blog =netflix__NG_naija?.edges?.map((ex)=> ex.node.netflixNaijaPosts).map((xy)=> xy.nodes).flat()
          const inter_cursor=netflix_inter?.edges?.map((ex)=> ex.node.netflixNaijaPosts).map((xy)=> xy.pageInfo) 
          const naija_cursor= netflix__NG_naija?.edges?.map((ex)=> ex.node.netflixNaijaPosts).map((xy)=> xy.pageInfo)
           
return (
<div>
  <Main  
newChars={newChars}
cinema_titles={cinema_titles}
naijaWikiVideos={naijaWikiVideos} 
news_blog={news_blog}
netFlixTop10={netFlixTop10}
africa_blog={africa_blog} 
popular_blog={popular_blog}
inter_blog={inter_blog}
naija_blog={naija_blog}
inter_cursor={inter_cursor}
naija_cursor={naija_cursor}
/>  
</div>
  )
}

export default NaijaWikiPage