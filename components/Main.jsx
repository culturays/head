"use client"
import React, { useCallback, useEffect, useState } from 'react' 
import MainSlider from './MainSlider'
import Image from 'next/image'
import { dateFormatter } from '@/utils/dateFormat'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
// import { fetchNewPosts } from '@/app/news/rootpostsHandle'
import moment from 'moment'
import {newsByLatest, newsPosts, newsViews, nextNewsPosts, postCategories, postLastAndScrolledCategories, sideBarNewsItems, sidePanelNewsItems  } from '@/app/news/rootpostsHandle'
const replaceHTMLTags=(string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "") 
  const newString = string.replace(regex, "");
  return newString
   }  
 
const Main = ({   
    cinema_titles,
      post_categories, 
       posts, 
      }) => { 
const [activeSet, setActiveSet]=useState(true)
const [actIdx ,setActIdx]=useState(-1)
const [categoryPost,setCategoryPost]=useState([])
const [categoryName,setCategoryName]=useState('') 
const [scrolledContent, setScrolledContent]=useState([])    
const { inView } =useInView();
 
const [debouncedValue, setDebouncedValue] = useState(null)
const [top_Latest, setTopLatest]=useState([])
const [top_PostsCa, setTopPostsCa]=useState([])
const [top_NewsView, setTopTopNewsView]=useState([])
const [top_SidePanelCursors, setSidePanelCursors]=useState([])
const [top_SidebarItems, setSidebarItems]=useState([])
const [top_PostsData, setPostsData]=useState([])
const [top_Posts_notIn_newsPosts, setPosts_notIn_newsPosts]=useState([]) 
const [top_Last_categories, setLast_categories]=useState([]) 

const topLatest=async()=>{
const latestPosts=await newsByLatest()
const newsViewCursors = await newsViews()
// const sidePanelCursors = await sidePanelNewsItems(prev_newsView_cursors)
// const sidebarItems=await sideBarNewsItems(start_cursor_sidebar)
// const postsData= await newsPosts(allExitingPostCursors)
// const posts_notIn_newsPosts= await nextNewsPosts(postsCursors) 
// const last_categories = await postLastAndScrolledCategories(last_cursors)
// const [end_post_cursor, setEnd_post_cursor] = useState(post_end_cursor);

setTopLatest(latestPosts)
setTopTopNewsView(newsViewCursors)
// setSidePanelCursors(sidePanelCursors)
// setSidebarItems(sidebarItems)
// setPostsData(postsData?.posts.edges)
// setPosts_notIn_newsPosts(posts_notIn_newsPosts) 
// setLast_categories(last_categories)
}
useEffect(()=>{
topLatest()

},[top_Latest])
 const latest_post_categories = top_Latest?.categories?.nodes.map((xy)=> xy?.posts?.nodes) 
   
// const posts_cursor=top_Latest?.categories?.nodes?.map((xy)=> xy?.posts?.pageInfo?.endCursor) 

// const postsTop = async()=>{  
// const post_data = await postCategories(posts_cursor)
// setTopPostsCa(post_data?.categories.edges ) 
// }
// useEffect(()=>{
//   postsTop()

// },[])

// const postCategory_next_cursor =top_PostsCa?.categories?.edges?.map((xt)=>xt?.cursor)
// const postCategory_cursor =top_PostsCa?.categories?.edges?.map((xy)=> xy?.node?.posts?.edges)?.flat()?.map((t)=> t?.cursor)

// const prev_newsView_cursors = top_NewsView?.map((xy)=> xy.cursor)
// const prev_sidepanel_cursors = top_SidePanelCursors?.map((xy)=> xy.cursor)
// const start_cursor_sidebar = prev_sidepanel_cursors?.concat(prev_newsView_cursors)

// const post_end_cursor=top_Last_categories?.length>0 &&top_Last_categories[0]?.node.posts.pageInfo.endCursor 
// const sibarNewsCursor =top_SidebarItems?.map((xy)=> xy.cursor)
 //const allExitingPostCursors=posts_cursor?.concat(postCategory_cursor)?.concat(start_cursor_sidebar)?.concat(sibarNewsCursor)
// //////////////////////////////////////

// const news_post_cursor = top_PostsData?.map((xy)=> xy.cursor)
// const postsCursors = allExitingPostCursors?.concat(news_post_cursor)
// // // /////////////////////////////////////// 
// const last_two_categories = top_Posts_notIn_newsPosts?.categories?.edges?.map((xt)=>xt.cursor)
// const last_cursors=postCategory_next_cursor?.concat(last_two_categories)?.push("YXJyYXljb25uZWN0aW9uOjUwMQ==")
  
// // ////////////////////////////////////////////////////////////////// 


//    // // //  ///Post Data after mapping
//    const posts_all=top_Posts_notIn_newsPosts?.categories?.edges?.map((xy)=> xy?.node.posts)?.filter((ex)=> ex?.nodes?.length>0) 
   //  await newsFeed()
   //  await netflixNewsFeed()
   //  await nollywoodFeed()
   //  await articleFeed()
   //  await topicsFeed()  

//  useEffect(()=>{  
// if(categoryName){   
// const currentPosts= top_PostsCa.flat().filter((ex)=> ex.node.name=== categoryName).map((xy)=> xy?.node?.posts).map((ex)=> ex.edges).flat()
// setCategoryPost(currentPosts)
// }else { 
// setCategoryPost(top_PostsData)  
// }
// },[categoryName]) 

//     useEffect(() => {
//       const handler = setTimeout(() => {
//         setDebouncedValue(end_post_cursor )
//       }, 500)
  
//       return () => {
//         clearTimeout(handler)
//       }
//     }, [end_post_cursor, 500])
    
//     const loadMorePosts = useCallback(async () => {
//            const apiP = await fetchNewPosts(2, debouncedValue, last_cursors, news_post_cursor); 
//            const post_res = apiP.categories.nodes.map((xy)=> xy.posts) 
//            const post_content = post_res.map((ex) => ex.nodes).map((xy)=> xy)
//             .flat();
   
//            if (post_content.length>0) {
//              setScrolledContent(prevContent => [...prevContent, ...post_content]);
//            } 

//           const hasMorePosts = apiP.categories.nodes.map((xy)=> xy.posts.pageInfo.hasNextPage)
//           if (hasMorePosts && end_post_cursor !== null) { 
//              const nextCursor =apiP.categories.nodes.map((xy)=> xy.posts.pageInfo.endCursor )
//              setEnd_post_cursor(nextCursor[0]); 
//            } else {
//              setEnd_post_cursor(null);
//            } 
//           if( scrolledContent.length===20)setEnd_post_cursor(null);
//          }, [debouncedValue, inView]);           
//         useEffect(() => { 
//       if (inView&& debouncedValue !== null ) {
//         loadMorePosts(); 
//     }
// }, [loadMorePosts]);
   
//      const changeSet = () => {
//      setActiveSet(true)
//      setActIdx(-1);
//      setCategoryName('')  
//    };
 
//   const changeView = (i,name) =>{
//     setActiveSet(false)
//     setActIdx(i);
//     setCategoryName(name) 
  
//     };
 
 const coming_titles= cinema_titles?.filter((ex)=> ex.genre?.includes('Coming Soon'))
//   //unused
   //posts_notIn_newsPosts[1].nodes.slice(5)
  //posts_notIn_newsPosts[2].nodes.slice(5)
   //posts_notIn_newsPosts[3].nodes.slice(5) 
   //posts_notIn_newsPosts[6].nodes.slice(8)
   //posts_notIn_newsPosts[5].nodes.slice(8)
   //posts_notIn_newsPosts[8].nodes.slice(8)
   //posts_notIn_newsPosts[7].nodes.slice(9)
    //posts_notIn_newsPosts[9].nodes

  return ( 
<div>  
  <MainSlider data={latest_post_categories} interval={5000} /> 

  {/* <div className='lg:flex justify-center xl:px-4 ' > 
<div className='py-20 md:px-1 m-auto' > 
<div className='py-5'>
<div className='flex border-b shadow-sm justify-around items-center '> 
<h3 className='text-xl font-bold w-max mx-4'>Don&#39;t Miss</h3>  
 <hr className='bg-black h-1 w-2/3 my-4'/>
 <div className='' >
   <ul className='flex justify-end flex-wrap py-2'> 
  <li 
      className={activeSet ? 
        'font-bold text-base cursor-pointer text-gray-500 mx-2 decoration-cyan-400 underline decoration-4' : 
        'text-base cursor-pointer text-gray-500 mx-2'} 
           onClick={changeSet} >
      All
    </li> 
    {post_categories?.map((xy, idx) =>  
      <li 
        className={actIdx === idx ? 
          'font-bold text-base cursor-pointer text-gray-500 mx-2 decoration-cyan-400 underline decoration-4 hover:text-gray-800' : 
          'text-base cursor-pointer text-gray-400 mx-2 hover:text-gray-800'} 
          onClick={() => changeView(idx, xy.node.name)}  
        key={xy.node.name + ' ' + Math.random()}>
        {xy.node.name}
      </li> 
    )}   
  </ul> 
</div> 
</div>  
 
</div>

  <div className='lg:flex justify-center max-w-7xl m-auto '> 
<div className='px-2 m-auto my-8 xs:max-w-md lg:max-w-xl '> 
 {categoryPost?.slice(0,1).map((ex, i)=>
<div className='shadow-2xl' key={ex.node.title + ' ' + Math.random()}>
  <div className='h-3/4'> 
  <Image 
  src={ex?.node.featuredImage?.node.sourceUrl } 
  width={1200} 
  height={675} 
  alt={ex?.node.featuredImage?.node.sourceUrl }/>  
  </div>
 
  <Link href={`/news/topic/${ex.node.slug}`}><h2 className='p-4 text-2xl font-bold hover:text-gray-400'>{ex.node?.title}</h2></Link >
  <Link href={`/news/topic/${ex.node.slug}`}><div className='leading-8 p-4 hover:text-gray-400' dangerouslySetInnerHTML={{__html:ex.node?.excerpt}}/> </Link >
 
<div className='flex text-gray-400 justify-between items-center p-4 leading-8 '> 
<Link href={`/creator/${ex.node?.author.node.slug}`}><p>{ ex.node?.author.node.name }</p></Link>  
 <p >{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p> 
</div>  
</div>
)}  

</div>
 
  <div className='max-w-md my-8 m-auto xl:max-w-xl'>
  {categoryPost?.slice(1).map((ex)=>
<div className='shadow flex my-6 first:md:my-0 first:md:py-0 md:pb-4' key={ex.node.title + ' ' + Math.random()}>
  <div className='w-1/4 mx-2 py-6 md:py-0'> 
  <Image
  className='h-11 xs:h-20 '
  src={ex?.node.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex?.node.featuredImage?.node.altText}/> 
  
  </div>

  <div className='w-4/5 mx-2 py-6 md:py-0 md:pb-4'> 
  <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/topic/${ex.node.slug}`}><h2 className='font-bold text-base hover:text-gray-500' >{ex?.node.title}</h2></Link>
 </div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ ex?.node.author.node.slug}`}><p >{ ex?.node.author.node.name }</p></Link> 
  <p>{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p>
</div>
</div>
</div>
)}  
 </div> 
</div>  

 <hr/>
   
 
</div>   

</div>  
 
 <hr className='h-1 w-4/5 m-auto my-4'/>
 <div className="bg-white w-full my-8">   
 <div className="xs:grid grid-cols-2 justify-center xs:items-start items-center xl:grid-cols-4 max-w-2xl lg:max-w-max m-auto py-8 "> 
  <div className='max-w-sm m-auto  border-r xs:m-0'>   
 { posts_all?.length>0&& posts_all[0]?.nodes.slice(0,5).map((it, index)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.tags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.tags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div>   
 <div className='max-w-sm m-auto border-r xs:m-0'>   
 { posts_all?.length>0&&posts_all[1]?.nodes.slice(0,5).map((it, index)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.tags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.tags.nodes[0]?.slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.tags.nodes[0]?.name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div> 
 
<div className='max-w-sm m-auto xs:m-0 border-r'>   
 { posts_all?.length>0&&posts_all[2]?.nodes.slice(0,5).map((it, index)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.tags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.tags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div>  

 <div className='max-w-sm m-auto xs:m-0 border-r'>   
 { posts_all?.length>0&&posts_all[3]?.nodes.slice(0,5).map((it, index)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.tags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.tags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div>  
</div> 

</div>  */}
</div>  
  )
}

export default Main
