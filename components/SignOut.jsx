import { headers } from 'next/headers';
import React from 'react'

const SignOut = async() => {
const headersList = await headers();
const confirm= headersList.get('referer') || "" 
  return (
    <div>
       {confirm?.includes('logout?')? 
 <form action='/auth/signout' method='post' className="m-1 flex m-auto justify-center">  
   <button type="submit"
    className="cursor-pointer text-xl px-3 text-center py-2 w-1/2 text-red-400 m-1 hover:bg-gray-100 hover:bg-opacity-70">Yes</button > 
 </form> 
 
    :null}
    </div>
  )
}

export default SignOut
