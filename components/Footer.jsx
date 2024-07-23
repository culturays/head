import Image from "next/image"
import Link from "next/link"
import ContactUs from "./ContactUs"
import Consent from "./Consent"

const Footer = () => {
  return (
<footer className="bg-culturaysBg p-4 text-white flex flex-col justify-between w-full border-t border-t-foreground/10">
 
<div className=""> 
<Image
className="rounded-full cursor-pointer bg-white"
width={50}
height={50}
src='/assets/images/culturays-no-bg.png'
alt='Culturays Logo Image'/> 
<Link href='/'><h2 className="cursor-pointer text-4xl my-1 font-bold">  
Culturays</h2></Link>

<ul> 
<Link href='/forum'><li className="text list-disc p-3 mx-11">Forum</li></Link>   
</ul>

 <ContactUs />   

</div>
<div className="m-auto text-xs">
<a href= "https://sites.google.com/view/culturays/home" target="_blank" rel="noopener noreferrer">
<p className="p-1 hover:opacity-70 text-center">Privacy Policy </p>
</a> 
 
<Link href="/about">
<p className="p-1 hover:opacity-70 text-center">About</p></Link> 
 
<Link href="/">
<p className="p-1">
Copyright{" "}
© Ngenet Studio, 2024
</p>
</Link>

</div>
  <Consent /> 
</footer>  
)
}

export default Footer
