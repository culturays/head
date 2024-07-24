import Privacy from "@/components/Privacy" 
import { Suspense } from "react"

const PrivacyPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>  
   <Privacy/>
    </Suspense> 
  )
}
 
export default PrivacyPage
