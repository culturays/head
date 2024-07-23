import { createClient } from "@/utils/supabase/server";


export default async function sitemap() {
    async function getData(){
        const supabase = createClient();
        const {data}= await supabase.from('posts')
        .select('*') 
        return {data}
    
      }
      const {data} = await getData()
      const posts = data.map((post)=>({ 
         url:`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.slug}`,
         lastModified:new Date(post.created_at),
         changeFrequency:'daily',
         priority:0.7

      }) )
    return [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
     ...posts,
    ]
  }