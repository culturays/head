import Tag from "@/components/Tag";
import { contentTag, tag } from "./taghandles"; 
  
const TagPage = async({params}) => { 
 const slug =params.slug
const content_tag_response = await contentTag(slug)
 const tag_response = await tag(slug)
 
  return (
    <div>
      <Tag
           content_tag_response={content_tag_response} 
           tag_response={tag_response}

      />
    </div>
  )
}

export default TagPage
