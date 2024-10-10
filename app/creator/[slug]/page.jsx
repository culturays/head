 
import Creator from '@/components/Creator' 
import { userItem } from '../usersHandle';
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/creator` 
  : "http://localhost:3000/creator";

  export async function generateMetadata({ params, searchParams }, parent) { 
    const slug = params.slug  
    const user_details= await userItem(slug)
    const previousImages = (await parent).openGraph?.images || []
    return {
      title:`Culturays | Creator - ${user_details?.name}`,
      openGraph: { 
        images: [user_details?.avatar.url],
      },
    }
  }  
function Culturayscreator() {
 
  return (
<div> 
  <Creator /> 
</div> 
  )
}

export default Culturayscreator