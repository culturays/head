"use client" 
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faAngleDown, faAngleRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short", 
  timeZone: 'Africa/Lagos',
})
const Trends = ({trends}) => {  
  return (
<div className="mx-2"> 
<h2 className="text-2xl font-bold text-center border-b-4 w-4/5 m-auto py-2 my-2">Trending in Nigeria Now</h2>
 
 <p className="text-end text-2xl"><small >  
 {dateFormatter.format(Date.parse(new Date())).split(',')[0]}
 </small></p> 
 
  <div className="flex lg:block lg:h-96 overflow-y-hidden lg:overflow-y-auto" >  
 {trends.map((exTrend, i)=> 
 <div key={exTrend.title} className="px-2 cursor-pointer border flex justify-between py-11 items-center hover:bg-opacity-70 hover:bg-green-50 max-w-96">    
 <p className="p-2 text-lg">{i+1}.</p>
 <h3 className="p-2 text-lg"><a target='_blank' href="https://trends.google.com/trends/trendingsearches/daily?geo=NG&hl=en-US">{exTrend.title}</a></h3>  
 <p className=" p-1 mt-4 xl:mt-0 text-xl opacity-70"><a target='_blank' href="https://trends.google.com/trends/trendingsearches/daily?geo=NG&hl=en-US"><FontAwesomeIcon icon={faAngleRight}/></a></p>  
 </div> 
 )}
 
   </div>
    </div>
  )
}

export default Trends
