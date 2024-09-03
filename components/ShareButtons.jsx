"use client"
import { faFacebook, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faCopy, faLink } from "@fortawesome/free-solid-svg-icons" 
import { usePathname } from "next/navigation"

const ShareButtons = ({item, activeIdx, shareOptions}) => {
const pathname= usePathname()
const copyToClipboard = async (text) => {
  try {
      const permissions = await navigator.permissions.query({name: "clipboard-write"})
      if (permissions.state === "granted" || permissions.state === "prompt") {
          await navigator.clipboard.writeText(text);
          alert('Text copied to clipboard!');
      } else {
          throw new Error("Can't access the clipboard. Check your browser permissions.")
      }
  } catch (error) {
      alert('Error copying to clipboard:', error);
  }
}


const parts = pathname.split('/').filter(Boolean);
const firstTwoItems = parts.slice(0, 2);  
 
  return (
    <div className="relative"> 
    {shareOptions &&activeIdx=== item.id &&(
    <div className="share-view absolute text-white flex justify-center items-center mt-1 text-md rounded-none shadow-4xl p-3 border z-10 bg-slate-800 right-0 max-w-lg"> 
    <a target="_blank"rel="noreferrer" href={`https://twitter.com/intent/tweet?text=${item?.title}&url=https://culturays.com/${firstTwoItems[0]}/${firstTwoItems[1]}/${item.slug}`} ><FontAwesomeIcon icon={faXTwitter} width={30} className="shadow-sharebtn p-1 hover:opacity-70 " /></a> 
 
    <a target="_blank" rel="noreferrer"href={`https://web.whatsapp.com/send?text=https://culturays.com/${firstTwoItems[0]}/${firstTwoItems[1]}/${item.slug}&url=https://culturays.com/${firstTwoItems[0]}/${firstTwoItems[1]}/${item.slug}`}><FontAwesomeIcon icon={faWhatsapp}width={30} className= "shadow-sharebtn p-1 hover:opacity-70"/></a> 

    <a target="_blank"rel="noreferrer"href={`https://www.facebook.com/sharer/sharer.php?u=https://culturays.com/${firstTwoItems[0]}/${firstTwoItems[1]}/${item.slug}&t=${item?.title}`}><FontAwesomeIcon width={30}icon={faFacebook} className= "shadow-sharebtn p-1 hover:opacity-70" /></a> 
    <p onClick={()=>copyToClipboard(`https://culturays.com/${firstTwoItems[0]}/${firstTwoItems[1]}/${item.slug}` )} ><FontAwesomeIcon width={30}icon={faLink} className=  "cursor-pointer shadow-sharebtn p-1 hover:opacity-70" /></p> 
    </div>) } 
    </div>
  )
}

export default ShareButtons


