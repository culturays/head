"use client"
import Link from "next/link"; 
import ChangingText from "./Changing" 
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft, faCaretUp } from "@fortawesome/free-solid-svg-icons"; 
import { newsViews, sideBarNewsItems, sidePanelNewsItems } from "@/app/news/rootpostsHandle";
import { useEffect, useState } from "react";

const TabNav = ({trends}) => {
 const [sideBarData, setSideBarData]= useState([])
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  content:"",
  inaccurate:"",
  biased:"",
});

const [closeQuestion, setCloseQuestion]= useState(false) 
 
 const [other_content, setOtherContent]= useState([]) 
  const [followUps, setFollowUps]= useState([])
   const get_other_content= async ()=>{
      // const otherContent= await sideBarNews()
      // const follow_up = await sideBarNews()
      const sideNewsursor= await newsViews()    
      const prev_cursor = sideNewsursor?.map((xy)=> xy.cursor) 
      const sidebar_news=await sidePanelNewsItems(prev_cursor) 
      setSideBarData(sidebar_news)
      // setFollowUps([...follow_up.slice(0,10)] )
      // setOtherContent([...otherContent.slice(0,5)]) 
    }
    useEffect(()=> {
      get_other_content()
    },[sideBarData])  
  
    const pastNews = sideBarData.filter((ex)=> ex.newsNewsGroup.passageNewsArticles !== null).map((xy)=> xy.newsNewsGroup.passageNewsArticles.nodes).flat() 
 
  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
 const fieldChecked = e.target.checked;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
      [fieldName]: fieldChecked,
    }));
  }
 
  const [success, setSuccess] = useState({
    succeeded: false, 
    })
    const [status, setStatus] = useState(null)  
  const submitForm=async (e)=>{
    e.preventDefault()
    const form = {name:formData.name, email:formData.email, content:formData.content, biased:formData.biased , inaccurate:formData.inaccurate }
    
    const response =await fetch('/api/surveyhandler', {
    method: "POST",
    headers:{ 
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
    }) 
    const content = await response.json() 
      
      if(response.ok){
       setStatus('Success! Thank you for your response!')
       setSuccess(!success.succeeded)
       }else{
         setStatus('Error')
        setSuccess(success.succeeded)
       }  
       e.target.reset();
       }
 
       const replaceHTMLTags=(string)=>{
        const regex = /(<([^>]+)>)/gi; 
        const newString = string.replace(regex, "");
        return newString
         }
    
  return (
  <div className="">   
  <div className={closeQuestion?'hidden': "text-8xl text-orange-600 mx-24 -mt-10 cursor-pointer hover:text-gray-400"} onClick={()=>setCloseQuestion(prev=> !prev)}> 
  <FontAwesomeIcon icon={faCaretDown} />  
 </div>
   <div className={closeQuestion?'fixed text-6xl w-max h-8 text-orange-600 cursor-pointer bottom-0 top-0 left-0': "hidden"} onClick={()=>setCloseQuestion(prev=> !prev)}> 
  <FontAwesomeIcon icon={faCaretLeft} />  
 </div>
  {closeQuestion &&
  <div className="grid_slide fixed pb-80 bg-gray-900 bottom-0 top-0 left-4 bg-opacity-90 h-full overflow-y-auto px-1 z-40 border lg:w-11/12 xs:w-4/5 max-w-md animate-in text-gray-200">  

  <div className="my-4 text-xl p-6 "> 
 <h2 className="text-gray-300 font-medium text-3xl">Explore More</h2> 
 
<div className="p-6 text-gray-200 flex justify-between hover:scale-105"> 
<hr className="w-1/4 my-3"/>
<Link href='/news/nollywood'><h3 className="cursor-pointer" onClick={()=>setCloseQuestion(false)}>Nollywood </h3></Link> 
<hr className="w-1/4 my-3"/> 
 
</div>
 
<div className="p-6 text-gray-200 flex justify-between hover:scale-105"> 
<hr className="w-1/4 my-3"/> 
<Link href='/news/award'><h3 className="cursor-pointer" onClick={()=>setCloseQuestion(false)}>Awards</h3></Link>  
<hr className="w-1/4 my-3"/>  
</div>
<div className="p-6 text-gray-200 flex justify-between hover:scale-105"> 
<hr className="w-1/4 my-3"/> 
<Link href='/news/videos'><h3 className="cursor-pointer" onClick={()=>setCloseQuestion(false)}>Videos</h3></Link>  
<hr className="w-1/4 my-3"/>  
</div>
 
</div>
<hr className="my-4 h-1"/>
<div className="relative my-4 p-6 bg-white text-gray-700">
 <h3 className="font-medium text-3xl">What You Missed</h3>
 <div className=""> 
  {sideBarData?.map((ex, i)=>  
<div key={ex.node.title + ' ' + i} className="m-1 p-2 flex border-b border-b-red-500" >
 <div className="w-1/2 mx-1 px-1">   
<Image  
src={ex.node.featuredImage.node.sourceUrl}  
width={1200}
height={675}
  className='object-cover '
  alt={ex.node.featuredImage.node.altText}
  />
   </div> 
 
  <div className=" w-3/4 mx-1 px-1 text-lg"> 
 <Link href={`/news/topic/${ex.node.slug}`}>
 <div dangerouslySetInnerHTML={{__html:ex.node.excerpt}} className="text-ellipsis overflow-hidden " style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}/>
 </Link> 
</div>
</div>

)}  
</div>  
</div>

<hr className="my-4 h-1"/>

<div className="w-11/12 m-auto px-4"> 
   <h3 className="p-3 text-2xl font-bold m-2 text-center text-gray-300">Tell us what you think...</h3>  
       <div className="flex flex-col md:p-4 p-1">   
      {status ?
        <div>{status} 
     </div>:''
   }

 <form className="flex flex-col bg-gray-900 text-gray-200 py-4" onSubmit={submitForm}>
         <div className="flex flex-col mx-1"> 
            <label className="font-bold p-2 m-1">Email :</label>
            <input type="text" className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black" placeholder="Email" name="email" onChange={handleInput} value={formData.email} />
          </div> 
          <div className="flex flex-col mx-1"> 
            <label className="font-bold p-2 m-1">Name:</label>
            <input type="text"className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black" placeholder="Name" name="name" onChange={handleInput} value={formData.name} />
          </div>
          <div className="flex flex-col mx-1"> 

            <div className="flex"> 
            <label className="font-bold p-2 m-1">
         Are the content of this site inaccurate?</label>
            <input type="checkbox"className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black" name="inaccurate" onChange={handleInput} value={formData.inaccurate} /></div>
            <div className="flex"> 
            <label className="font-bold p-2 m-1">
           Was this site biased?</label>
            <input type="checkbox"className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black" name="biased" onChange={handleInput} value={formData.biased} /></div>
          </div>
          <div className="flex flex-col mx-1"> 
            <label className="font-bold p-2 m-1">Tell us what&apos;s happening in your area now.</label>
            <textarea type="text"className="resize-none p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black" placeholder="Reply" name="content" onChange={handleInput} value={formData.content} />
          </div>           
       
          <button type="submit" className="bg-gray-800 text-white mt-3 cursor-pointer font-bold hover:bg-opacity-80 rounded border w-1/2 m-auto h-max p-3" >Send</button> 
        </form> 
     </div> 
     </div>  
      </div> 
}  
 
 </div>
  )
}

export default TabNav
