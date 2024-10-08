 
import Tags from "@/components/Tags"; 
import { contentTag, tag } from "../taghandles";
export async function generateMetadata({ params, searchParams }, parent) {
  const slug =params.slug[0]
     const tag_details= await contentTag(slug)
     const tag_response = await tag(slug)    
     const tagged=tag_details?.nodes.concat(tag_response.nodes)
     const previousImages = (await parent).openGraph?.images || [] 
     return {
       title:`Culturays | All News About ${tagged[0]?.name}`,
       openGraph: { 
         images: ['/assets/images/culturays.png'],
       },
     }
   } 
const TagPage = async({params}) => { 
 const slug =params.slug[0]
//  const id= params.slug[1].replace('%3D','')
 const content_tag_response = await contentTag(slug)
  const tag_response = await tag(slug)
 
  return (
    <div>  
     <Tags
        content_tag_response={content_tag_response}
        tag_response={tag_response}
      />   
    </div>
  )
}

export default TagPage
