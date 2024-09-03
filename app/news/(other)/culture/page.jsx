 "use client"
 import ChangingText from "@/components/Changing" 
import { useEffect, useState } from "react"
import { otherContentAndPeoplePage } from "../../newshandle"

const PeoplePage = () => {
const [other_content, setOtherContent]= useState([])
  const get_other_content= async ()=>{
    const people_content= await otherContentAndPeoplePage() 
    setOtherContent([...people_content]) 
  } 

  useEffect(()=> {
    get_other_content()
  },[])

  return ( <>dfgf</>
//  <ChangingText 
//  texts={other_content} 
//  interval={2000}/> 
  
 )
} 

export default PeoplePage
