import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import Link from "next/link";  
import {faFacebookF, faGoogle, faInstagram, faWhatsapp, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import AuthButton from '@/app/AuthButton';
import { headers } from 'next/headers';
import Nav from './Nav';
import SearchItems from './SearchItems';
import TabNav from './TabNav';
 
const SocialNav = async() => {
  const headersList = headers();
  const pathname = headersList.get('referer') || ""  
  const handleLogout=async()=>{ 
    "use server"
    redirect(`${pathname}?confirm=logout?`)
     }
 
 return (
 <div> 
   <div className="flex flex-col items-center leading-none my-4">  
<div className="flex social-forum">
<Link target="_blank" href="https://www.facebook.com/CulturaysSpot">
<p className="m-1 p-2"><FontAwesomeIcon
width={20}
height={20}
icon={faFacebookF}></FontAwesomeIcon></p>
</Link>

<Link target= "_blank" href= "https://whatsapp.com/channel/0029VaH6uMMFsn0dN8Vzwr2v">
< p className="m-1 p-2">
<FontAwesomeIcon
width={20}
height={20}
icon={faWhatsapp}/></p>
</Link>

<Link target= "_blank" href= "https://twitter.com/culturays">
<p className="m-1 p-2">
     <FontAwesomeIcon
   width={20}
   height={20}
  icon={faXTwitter}/></p>
  </Link>
  <Link target= "_blank" href= "https://news.google.com/publications/CAAqBwgKMO_gzgswnvzlAw/sections/CAQqEAgAKgcICjDv4M4LMJ785QMwpZvoCA?ceid=US:en&oc=3"> 
  <p className="m-1 p-2"> <FontAwesomeIcon
   width={20}
   height={20}
  icon={faGoogle}/>
  </p>
  </Link >
  <Link target= "_blank" href= "https://www.instagram.com/culturays_/"> 
  <p className="m-1 p-2"><FontAwesomeIcon
   width={20}
   height={20}
  icon={faInstagram}/> </p></Link>
    </div>

    </div>
   
<AuthButton handleLogout={handleLogout}/> 
<Nav />
<SearchItems /> 
<TabNav/> 
   </div> )
  }
  
  export default SocialNav