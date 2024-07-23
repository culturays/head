import { tag } from "@/app/api/newshandle";
  
const Tag = async({searchParams}) => { 
 async function taggedItems() {
    'use server'
    const response = await tag(searchParams)
    // const data = await response.json();
  
    // Return the fetched data as props
    return {
      props: {
        response,
      },
    };
  }

  await taggedItems()
  return (
    <div>
      
    </div>
  )
}

export default Tag
