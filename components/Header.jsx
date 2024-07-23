'use client'
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";  
import { useSearchParams } from "next/navigation";
const Header = () => {
const [ barState, setBarState]= useState(false)
const menuClick=()=>{
setBarState(prev=> !prev) 
} 

    
 return ( 
 <> 
  <header className="flex justify-between w-full"> 
<div className="md:m-3 flex mt-5">       
<Link href='/'><h1 className="head-forum font-bold text-5xl m-3 font-mono tightest"> 
<span className="py-1 px-3 head-forum-span text-6xl">C</span>ulturays
</h1></Link>
<Link href='/forum'className="text-2xl text-gray-500 mt-12 ml-1"><small >| Forum</small></Link>
</div> 
{barState&&
<div className="absolute bg-gray-800 w-full top-0 my-2 animate-in cursor-pointer bg-opacity-90">  
<p className="opacity-70 mx-2" onClick={menuClick}>
<FontAwesomeIcon icon={faXmark} className="text-white w-6 h-11 cursor-pointer "/>
</p>
<div className="animate-in relative top-0">       
<ul className="text-white p-3 flex flex-col text-center justify-center">
<Link href='/news'>
<li className="p-1 m-1 cursor-pointer ">
News
</li></Link> 
<li className="p-1 m-1 cursor-pointer">
Menu2
</li>
<li className="p-1 m-1 cursor-pointer">
Menu3
</li>

</ul>

</div>
</div>

} 

<button onClick={menuClick} className="m-1 mx-3 my-3 cursor-pointer sm:hidden text-2xl" type="button">  
<FontAwesomeIcon 
className="__fonts"
icon={faBars}
width={35}
height={35} />          
  
</button>  
</header> 
<nav className="absolute top-0 w-full cursor-pointer sm:block hidden">
<div className="m-2">       
<ul className="relative flex text-center justify-center m-auto">
<Link href={`/trends`}><li className="p-2 m-1 cursor-pointer sm:border-b-2 md:border-b-2 opacity-80 hover:scale-105">
Forum Menu1
</li></Link> 
<Link href='/nollywood'><li className="p-2 m-1 cursor-pointer sm:border-b-2 md:border-b-2 opacity-80 hover:scale-105">
Nollywood
</li></Link>
<Link href='/menu'><li className="p-2 m-1 cursor-pointer sm:border-b-2 md:border-b-2 opacity-80 hover:scale-105">
Forum Menu3
</li></Link>
</ul>

</div>
</nav>
 
</>
 
  )
}

export default Header