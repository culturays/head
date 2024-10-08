"use client"
import { fetchNewInter } from "@/app/netflix-naija/netflix-news"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer" 
 
function useDebouncedValue(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
  
      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])
  
    return debouncedValue
  }
 
const InterContent = ({end_ng_cursor,end_inter_cursor, setEnd_inter_cursor }) => { 
      const [scrolledContent, setScrolledContent]=useState([])    
      const {ref, inView } =useInView(); 
      const debouncedSearchNaija = useDebouncedValue(end_inter_cursor, 500); 
      const loadMorePosts = useCallback(async () => {
 
        const apiP = await fetchNewInter(2, debouncedSearchNaija);
        const naijaNew_content = apiP.map((ex) => ex.node.netflixNaijaPosts)
                                      .map((xy) => xy.nodes)
                                     .flat();
       
        if (naijaNew_content.length>0) {
          setScrolledContent(prevContent => [...prevContent, ...naijaNew_content]);
        } 
      
        // or try this if (end_ng_cursor !== null ) {
        //   setScrolledContent(prevContent => [...prevContent, ...naijaNew_content]);
        // } 
        const hasMorePosts = apiP.map((ex) => ex.node.netflixNaijaPosts)
                                  .map((xy) => xy.pageInfo)
                                  .map((pi) => pi.hasNextPage)
                                  .flat();
       
        if (hasMorePosts[0] && end_inter_cursor !== null) {
          const getMore = apiP.map((ex) => ex.node.netflixNaijaPosts)
                              .map((xy) => xy.pageInfo)
                              .map((pi) => pi.endCursor)
                              .flat();
      
          const nextCursor = getMore[0];
          setEnd_inter_cursor(nextCursor); 
        } else {
          setEnd_inter_cursor(null);
        } 
       
      }, [debouncedSearchNaija, inView]);  
        
      useEffect(() => { 
        if (inView&& debouncedSearchNaija !== null ) {
          loadMorePosts();
       
      }
      }, [loadMorePosts]);  
  
  
  return (
    <section >  
<div className='my-6'>
<h2 className='bg-black p-8 text-gray-300 text-3xl text-center w-full'>Foreign</h2>
{scrolledContent.map((xy)=>
<div className='flex xs:px-11 md:px-4 md:border-r md:border-r-dotted' key={xy.title + ' '+ xy.id + Math.random()}>
    <div className="w-1/2 my-4 xl:w-1/3">
<Image 
  src={xy.featuredImage.node.sourceUrl}
  width={1200}
  height={675}
  alt={xy.featuredImage.node.altText} 
  /></div>
  <div className="w-1/2 px-2 my-4"> 
  <Link href={`/netflix-naija/news/${xy.slug}`}><h2 className='text-lg font-bold text-gray-700 hover:text-gray-500 cursor-pointer'>{ xy.title}</h2></Link>
<small className="text-red-600 my-4 italic">{moment(xy.date).fromNow()}</small>
  </div> 
</div> 
)}
 
</div>
 {/* {console.log(end_inter_cursor === null &&end_ng_cursor === null)} */}
{end_ng_cursor === null&& end_inter_cursor==='' ?
<p ref={ref} className="p-4">Loading</p>: ''
 }

</section>
  )
}

export default InterContent
