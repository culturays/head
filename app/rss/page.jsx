import { faRss } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link"
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` 
  : "http://localhost:3000"; 

const CulturaysRss = () => {
  return (
    <div className="h-full">    
      <ul className="max-w-max m-auto p-11 border border-black ">
      <li className="text-3xl font-bold"><FontAwesomeIcon icon={faRss}className="text-orange-700" /> Rss Feed</li>  
     <Link href={`${defaultUrl}/rss.xml`}><li className="hover:text-gray-400 underline text-gray-700 py-4 border w-60 m-2 p-4">News</li></Link>
      <Link href={`${defaultUrl}/rss1.xml`}><li className="hover:text-gray-400 underline text-gray-700 py-4 border w-60 m-2 p-4">Articles</li></Link>
      <Link href={`${defaultUrl}/rss2.xml`}><li className="hover:text-gray-400 underline  text-gray-700 py-4 border w-60 m-2 p-4">Netflix Naija</li></Link>
      <Link href={`${defaultUrl}/rss3.xml`}><li className="hover:text-gray-400 underline text-gray-700 py-4 border w-60 m-2 p-4">Nollywood</li></Link>
       <Link href={`${defaultUrl}/rss4.xml`}><li className="hover:text-gray-400 underline text-gray-700 py-4 border w-60 m-2 p-4">Topics</li></Link> 
       
      </ul> 
    </div>
  )
}

export default CulturaysRss
