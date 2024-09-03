"use client" 
import CharacterQuestion from "@/app/naija-wiki/characterQuestion/page"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Latests from "../Latests"
import Link from "next/link"

const Characters = ({listChars }) => {
  const [charactertitles]= listChars 
  const titleIdx = listChars.map((ex)=>ex.charactertitles.charRel?.edges ).flat()  
   const char_itx = titleIdx.filter((e, i, a) => {
    return a.indexOf(e?.node?.title) !== i && a?.findIndex(item => item?.node?.title === e?.node?.title) === i;
  }); 
  const replaceHTMLTags=(string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "")
    const newString = string.replace(regex, "");
    return newString
     }
 
  return (
    <div> 
  <div className=''>

<h3 className="p-20 text-center text-4xl font-bold bg-gray-700 text-white">{charactertitles?.charactertitles.filmname} Characters</h3>

</div> 
 <section > 
  <div className='md:flex p-11 border lg:w-4/5' >  
    <div className="border p-3 h-1/5 md:w-1/2 lg:w-1/3"> 
  <Image
  className=""
    src={charactertitles.charactertitles.filmImg1.node.sourceUrl}
    width={1250}
    height={650}
    alt={charactertitles.charactertitles.filmname}/> 
    </div>
<div className="md:w-1/2 lg:w-3/4"> 
  <div className="flex border"> 
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Title: </p><span className="text-2xl font-bold w-3/4 p-3">{charactertitles.charactertitles.filmname}</span>  
</div> 

<div className="flex border">
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4"> Description: </p><span className="text-lg w-3/4 p-3"> {charactertitles.charactertitles.filmAbout}</span> </div>
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Genre:</p><span className="text-lg w-3/4  p-4"> {charactertitles.charactertitles.genre}</span> </div>
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Director: </p><span className="text-lg w-3/4 p-4" style={{lineHeight:'50px'}}>{charactertitles.charactertitles.filmDirector}</span></div> 
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Year: </p><span className="text-lg w-3/4 p-4">{charactertitles.charactertitles.releaseDate}</span>
</div> 
</div>
 </div> 
 
  <table className="border lg:w-1/2">  
   <tbody className="" >  
  { char_itx.map((xx, i)=>
  <tr key={i + ' ' + xx.title} >  
    <td className="border"> 
 <Link href={`/naija-wiki/character/${xx.node.slug}`}><h3 className="text-xl font-bold p-3 text-center"> {xx.node.title} </h3></Link> 
       <div className=" border p-2 m-2 "> 
       <div className="w-1/4  ">
      <Image
  className=""
    src={xx.node.featuredImage.node.sourceUrl}
    width={1250}
    height={650}
    alt={xx.node.featuredImage.node.altText}/> 
    </div> 
 <ul className=""> 
  <p className="list-disc text-xl font-bold my-2 my-4"> <FontAwesomeIcon icon={faArrowRight} className="text-sm font-lighter mx-4" />{xx.node.charactertitles.portrayedby} </p>  
 <li className="list-disc text-lg my-2 p-4 m-4">{replaceHTMLTags(xx.node.excerpt)} </li>  
 <li className="list-disc text-lg my-2 p-4 m-4">{replaceHTMLTags(xx.node.content)} </li>  
  
 </ul>
    </div>
    </td>
    
 </tr> ) }   
</tbody>  

</table>   
</section> 
   


   </div>
  )
}

export default Characters
