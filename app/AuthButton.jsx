import Link from "next/link";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";    
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthButton() {
const supabase = createClient();
const {   
  data: { user },
} = await supabase.auth.getUser()
const headersList = headers();
const pathname = headersList.get('referer') || "" 

 const handleLogout=async()=>{ 
  "use server"
 await redirect(`${pathname}?confirm=logout?`)
   }
 return user? ( 
<div className="flex flex-col items-center pb-2 leading-none"> 
<div className="flex items-center"> 
<Link href={`/profile/${user.id}`}><p className="m-1 text-lg hover:scale-105">Hey, {user.email}!</p></Link>  
</div>

<form className="m-1 flex m-auto justify-center">  
{!user.user_metadata.picture && <Link href={`/profile/${user.id}`}>
 <FontAwesomeIcon 
 width={15}
 height={15} 
 className="p-3 m-1 cursor-pointer border rounded-full"icon={faUser}/></Link> } 
  {user.user_metadata.picture&& 
   <Link href={`/profile/${user.id}`}>
   <div > 
      <Image
 src={user.user_metadata.picture} 
 width={50}
 height={50}
 className="cursor-pointer border rounded-full hover:scale-105 h-10 w-10"
 alt={user.user_metadata.full_name}
 /> 
 </div></Link> } 
 <button formAction={handleLogout}className="button block m-1 ml-2 rounded-md no-underline bg-btn-background text-lg hover:scale-105 mt-5" type="submit">
   Sign out
 </button> 
</form>

</div>
):(  
<div className="flex flex-col items-center pb-2 leading-none text-xs">
<Link
href="/login"
className="flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-xs"
>
<button className="text-lg rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
  Login
</button>
</Link>

</div>
) 
}
