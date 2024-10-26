import { newchars } from './newCharHandle'
import { getTop10} from './filmsdata'
import Main from '@/components/NaijaWiki/Main'   
import { createClient } from '@/utils/supabase/server'  
import { netflixAfrica, netflixDeals, netflixInter, netflixNews, netflixNigNaija, netflixPopular, netflixSocials, netflixStories } from '../netflix-naija/netflix-news'
import { vids } from '../news/articlehandle'
 
const NaijaWikiPage =async ({searchParams, params}) => {  
const naija_wiki =async ()=>{  
const supabase = createClient() 
const { data:cinema_titles , error } = await supabase 
.from('cinema_titles')
.select('*') 
if(error)throw new Error('An Error has occured!')
return { cinema_titles } 
 
}
const {cinema_titles} =await naija_wiki() 
           
return (
<div>
  <Main cinema_titles={cinema_titles}/>  
</div>
  )
}

export default NaijaWikiPage