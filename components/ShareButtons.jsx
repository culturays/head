"use client"

import { faFacebook, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePagesContext } from "./Pages-Context" 
import { faCopy, faLink } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from "next/navigation"

const ShareButtons = ({item}) => {
const {activeIdx, shareOptions}=usePagesContext()
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
  return (
    <div className=""> 
    {shareOptions &&activeIdx=== item.id &&(
    <div className="absolute text-white flex justify-center items-center m-auto mt-1 text-md rounded-none shadow-4xl p-3 border z-10 bg-slate-900 w-3/5 max-w-lg"> 
    <a target="_blank"rel="noreferrer" href={`https://twitter.com/intent/tweet?text=https://culturays.com/forum/post/${item.id}&text=${item?.title}`} ><FontAwesomeIcon icon={faXTwitter} width={30} className="shadow-sharebtn p-1 hover:opacity-70" /></a> 
    <a target="_blank" rel="noreferrer"href={`https://web.whatsapp.com/send?text=https://culturays.com/forum/post/${item.id}`}><FontAwesomeIcon icon={faWhatsapp}width={30} className= "shadow-sharebtn p-1 hover:opacity-70"/></a> 
    <a target="_blank"rel="noreferrer"href={`https://www.facebook.com/sharer/sharer.php?u=https://culturays.com/forum/post/${item.id}&t=${item?.title}`}><FontAwesomeIcon width={30}icon={faFacebook} className= "shadow-sharebtn p-1 hover:opacity-70" /></a> 
    <p onClick={()=>copyToClipboard(`${process.env.NEXT_PUBLIC_BASE_URL}forum/post/${item.slug}/${item.id}` )} ><FontAwesomeIcon width={30}icon={faLink} className=  "cursor-pointer shadow-sharebtn p-1 hover:opacity-70" /></p> 
    </div>) } 
    </div>
  )
}

export default ShareButtons


