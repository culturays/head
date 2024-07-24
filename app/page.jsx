import AuthButton from "@/components/AuthButton" 
import ConfirmModal from "@/components/ConfirmModal"
import Footer from "@/components/Footer"
import Header from "@/components/Header" 
import NewsLetter from "@/components/NewsLetter"
import SearchItems from "@/components/SearchItems"
import { createClient } from "@/utils/supabase/server"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { headers } from "next/headers"
import Link from "next/link"
import { Suspense } from "react"
 
const Home =async ({searchParams }) => {
const name = searchParams.name;
const confirmParam= searchParams.confirm 

const searchValues = async () => { 
const supabase = createClient(); 
const { data, error } = await supabase
.from('content')
.select("*")
.filter('title', 'ilike', `%${name}%`);
 
if (error) {
console.error('Error fetching posts:', error.message);
return;
} 
return data
}

 const postSearch=await searchValues()
// const headersList = headers();
// const pathname = headersList.get('referer') || "" 
  
return (
<div> 
 <Header />   
 <AuthButton confirmParam={confirmParam} /> 
<div className='thoughts-text bg-culturaysBg text-white p-8 text-center flex justify-between'> 
<p>Trending <span></span> <span>&#10141;</span></p>
<Link href='/search-page'><FontAwesomeIcon icon={faMagnifyingGlass}/></Link>
</div> 
 
 <SearchItems searchVal={name} itemSearches={postSearch}/> 
<div className="flex p-8 lg:px-32"> 
<NewsLetter/>  
</div>  
<Footer />    
</div> 
 )
}

export default Home