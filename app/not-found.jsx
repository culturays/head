 
import Link from 'next/link' 
import { Suspense } from 'react'
 
export default function FourOhFour() {  
  return (
  <>
    <Suspense>    
 <h1>404 - Page Not Found</h1>
    <Link href="/">
       Go back home 
    </Link>
   </Suspense>
  </>)
}