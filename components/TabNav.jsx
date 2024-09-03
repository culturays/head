 "use client"  
import Link from "next/link";
import React, { useEffect, useState } from "react"
import ChangingText from "./Changing";
import { followUpContent , otherContentAndPeoplePage} from "@/app/news/newshandle";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const TabNav = ({trends}) => { 
  const [other_content, setOtherContent]= useState([])
  const [followUps, setFollowUps]= useState([])
  
    const get_other_content= async ()=>{
      const otherContent= await otherContentAndPeoplePage()
      const follow_up = await followUpContent()
      setFollowUps([...follow_up.slice(0,10)] )
      setOtherContent([...otherContent.slice(0,5)]) 
    }
 
    useEffect(()=> {
      get_other_content()
    },[other_content,followUps]) 
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content:"",
    inaccurate:"",
    biased:"",
  });
 
 const [closeQuestion, setCloseQuestion]= useState(false) 
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
         {/* <h3>Upcoming Movies/Series</h3>
  {rmDuplicates.filter((vx)=> vx.charactertitles.actorsUpcomingMovie !== null).filter((vy)=>  moment(new Date(vy.charactertitles.actorsUpcomingMovie.split('-')[1]), "DD/MM/YYYY").isAfter(moment(new Date(), "DD/MM/YYYY"), 
    'day')  ).map((ity, index)=> 
<div className={styles.upcomingIts}key={index}> 
<ul>  
 
<Link href={`/moviewikiafrica/film/${ity.charactertitles.actorsUpcomingMovie.split('-')[0].toLowerCase().replace(/ /g,'-')}`}><li>
  {ity.charactertitles.actorsUpcomingMovie.split('-')[0]}
</li></Link>
</ul> 
</div>

)}  
   */}
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

   <ChangingText 
   texts={other_content} 
   interval={3000}
   /> 

  <div className="my-4 text-xl p-6 "> 
 <h2 className="text-gray-300 font-medium text-3xl">Explore More</h2>
 
 <div className="p-6 text-gray-200 flex justify-evenly hover:scale-105"> 
<hr className="w-1/4 my-3"/> 
 <Link href='/news/madeinafrica'><h3 className="cursor-pointer">Made in Africa </h3></Link> 
<hr className="w-1/4 my-3"/> 
 
</div>
<div className="p-6 text-gray-200 flex justify-between hover:scale-105"> 
<hr className="w-1/4 my-3"/>
<Link href='/news/nollywood'><h3 className="cursor-pointer">Nollywood </h3></Link> 
<hr className="w-1/4 my-3"/> 
 
</div>

<div className="p-6 text-gray-200 flex justify-between hover:scale-105"> 
<hr className="w-1/4 my-3"/>
<Link href='/news/festivals'><h3 className="cursor-pointer">Festivals </h3></Link>  
<hr className="w-1/4 my-3"/> 
 
</div>

<div className="p-6 text-gray-200 flex justify-between hover:scale-105"> 
<hr className="w-1/4 my-3"/> 
<Link href='/news/awards'><h3 className="cursor-pointer">Awards</h3></Link>  
<hr className="w-1/4 my-3"/> 
 
</div>

</div>

<hr className="my-4 h-1"/>

<div className="relative my-4 p-6 bg-white text-gray-700">
 <h3 className="font-medium text-3xl">News Follow Up</h3>
<div className=""> 
  
{followUps.filter((xy)=> xy?.node.followUpGroup?.followUp === true).map((ex,i)=> ex?.node.contentTypeName !== 'other'?
<div key={ex.node.title + ' ' + i} className=" m-1 p-2 flex border-b border-b-red-500" >
 <div className="w-1/2 mx-1 px-1">  
<Image  
src={ex.node.featuredImage.node.sourceUrl}  
width={1200}
height={675}
  className='object-cover '
  alt={ex.node.featuredImage.node.altText}
  />
   </div> 
 
  <div className="text_truncate_at w-3/4 mx-1 px-1 text-lg"> 
 <Link href={`/news/${ex.node.contentTypeName}/${ex.node.slug}`}><p className="cursor-pointer"> { replaceHTMLTags(ex.node.excerpt)} Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p> </Link> 
</div>
</div>
:
<div key={ex.node.title + ' ' + i} className=" m-1 p-2 flex border-b border-b-red-500" >
<div className="w-1/2 mx-1 px-1">  
<Image  
src={ex.node.featuredImage.node.sourceUrl}  
width={1200}
height={675}
 className='object-cover '
 alt={ex.node.featuredImage.node.altText}
 />
  </div> 
 
  <div className="text_truncate_at w-3/4 mx-1 px-1 text-lg "> 
<Link href={`/news/${ex.node.otherCategories.nodes[0].slug}/${ex.node.slug}`}><p className="cursor-pointer"> { replaceHTMLTags(ex.node.excerpt)} anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p></Link>  
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
            <label className="font-bold p-2 m-1">Tell us what's happening in your area now.</label>
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
