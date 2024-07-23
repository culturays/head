import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
 const dateFormatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: 'Africa/Lagos',
      })
      
     
const Trends = ({trends}) => {
   
  return (
<div className="trendy m-auto md:p-4 mt-8 mx-11">
<h2 className="text-2xl font-bold text-center">Trending in Nigeria Now</h2>
<p className="text-end text-2xl"><small >  
{dateFormatter.format(Date.parse(new Date())).split(',')[0]}
</small></p>  
 <div className="trendx sm:flex xl:block p-6 h-fit overflow-x-scroll xl:overflow-y-scroll xl:max-w-sm xl:h-80 m-auto sm:w-screen sm:-mx-16 xl:mx-auto">
{trends.map((exTrend, i)=> 
<div key={exTrend.title} className="p-2 cursor-pointer border flex justify-between hover:bg-opacity-70 hover:bg-green-50"> 
 <p className=" p-2 text-lg sm:text-lg">{i+1}.</p>
<h3 className=" p-2 text-xl sm:text-lg"><a target='_blank' href="https://trends.google.com/trends/trendingsearches/daily?geo=NG&hl=en-US">{exTrend.title}</a></h3>  
<p className=" p-1 mt-4 xl:mt-0 text-xl opacity-70"><a target='_blank' href="https://trends.google.com/trends/trendingsearches/daily?geo=NG&hl=en-US"><FontAwesomeIcon icon={faAngleRight}/></a></p>
</div> 
)}
  
  </div>
    </div>
  )
}

export default Trends
