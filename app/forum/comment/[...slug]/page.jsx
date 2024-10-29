 
import CommentX from "@/components/forum/Comments";
import { createClient } from "@/utils/supabase/server";  
import { getNaijaTrends1 } from "@/app/api/trends/naija";
import { getChildComments } from "../../actions/loadComments";
import { getRelatedPosts } from "../../actions/loadPosts";
export const revalidate=1
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.slug.slice(-1) 
  const postView = async () => { 
    const supabase =await createClient();  
    const { data:commented, error} = await supabase
    .from('comments') 
    .select('*') 
    .eq('id', id)
    .single()  
    if (error) {
  
    console.error('Error fetching posts:', error );
    return;
    }
    return commented
    }
   const comment  = await postView()  
  const previousImages = (await parent).openGraph?.images || []

  return {
    title:`Culturays Forum - ${comment?.title}`,
    openGraph: {
      images: [comment?.files],
    },
  }
} 
 
const CommentPage =async ({params, searchParams}) => {
  const supabase =await createClient()    
  const {
  data: { user }, 
  } = await supabase.auth.getUser(); 
  
  const id = params.slug.slice(-1) 
  const commentView = async () => { 
    const supabase =await createClient();  
    const { data:commented, error} = await supabase
    .from('comments') 
    .select('*') 
    .eq('id', id)
    .single() 
    if (error) {
  
    console.error('Error fetching posts:', error );
    return;
    } 
    return commented
    }

 const comment = await commentView() 
 
 const postView = async () => { 
  const supabase = await createClient();  
  const { data:post, error} = await supabase
  .from('posts')
  .select('*') 
  .eq('id', comment.post_id)
  .single()
  if (error) {
  console.error('Error fetching posts:', error );
  return;
  }

  return post
  }
 const post = await postView()
 const postsComment = async () => { 
  const supabase = await createClient();  
  const { data:posts, error} = await supabase
  .from('comments')
  .select('*') 
  .eq('post_id', post.id) 
  if (error) {
  console.error('Error fetching posts:', error );
  return;
  }

  return posts
  }
 const post_comments = await postsComment()  
  const commentChild =async()=>{ 
    const child_of_child = await getChildComments(comment) 
    return child_of_child 
  }
  const initialChild = await commentChild()
  const query = searchParams?.name;
   
  const postSearch=[]
  const related= await getRelatedPosts(post.title)  
  const trends =await getNaijaTrends1('NG')
  return ( 
    <div> 
<hr className="shadow-bottomShadow"/>  
<CommentX 
  comment={comment}  
  postData={post} 
  user={user} 
  initialChild={initialChild}
  post_comments={post_comments}
  searchVal={query} 
  itemSearches={postSearch}
  related={related}
  trends={trends}
  /> 
</div>
  )
}

export default CommentPage
