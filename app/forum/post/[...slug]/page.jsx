 
import Post from "@/components/forum/Post"; 
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers"
import { getChildComments, getComments } from "../../actions/loadComments";
import { getNaijaTrends1 } from "@/app/api/trends/naija"; 
import { getRelatedPosts } from "../../actions/loadPosts"; 
 
const INITIAL_NUMBER_OF_POSTS =1
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.slug.slice(-1) 
  const postView = async () => { 
    const supabase =await createClient();  
    const { data:post, error} = await supabase
    .from('posts')
    .select('*') 
    .eq('id', id)
    .single() 
    if (error) {
  
    console.error('Error fetching posts:', error );
    return;
    }
    return post
    }
   const post = await postView()  
  const previousImages = (await parent).openGraph?.images || []

  return {
    title:`Culturays Forum - ${post?.title}`,
    openGraph: { 
      images: [post?.files],
    },
  }
} 
  
 
const PostPage =async ({searchParams,params}) => {
  const supabase = createClient()    
  const {
  data: { user }, 
  } = await supabase.auth.getUser(); 
  
const id = params.slug.slice(-1) 

const postView = async () => { 
  const supabase = createClient();  
  const { data:post, error} = await supabase
  .from('posts')
  .select('*') 
  .eq('id', id)
  .single() 
  if (error) {

  console.error('Error fetching posts:', error );
  return;
  }
  return post
  }
 const post = await postView()

  const commentView = async () => { 
    const supabase = createClient();  
    const { data:comments, error} = await supabase
    .from('comments') 
    .select('*') 
    .eq('post_id', post?.id)
    .order('id', { asscending: true })
   
    if (error) {  
    console.error('Error fetching posts:', error );
    return;
    }
       
    return comments
    }
 const comment= searchParams.comment
const commentsX = [] 
const comments = await commentView() 
const confirmParam= searchParams.confirm
const headersList = headers()
const referer = headersList.get("referer") 
 
const commentItems =async()=>{ 
  const initialPosts = await getComments(0, INITIAL_NUMBER_OF_POSTS, post)  
  return initialPosts  
}
const initiaComms = await commentItems() 
const trends =await getNaijaTrends1('NG')
const query = searchParams?.name;  
const postSearch=[]
const related= await getRelatedPosts(post.title) 

return (
<div> 
   <Post  
  postData={post} 
  initiaComms={initiaComms}
  comments={comments} 
  commentsX={commentsX} 
  user={user}
  trends={trends}
  searchVal={query} 
  itemSearches={postSearch}
  related={related} 
/>  
</div> 
  )
}

export default PostPage
 