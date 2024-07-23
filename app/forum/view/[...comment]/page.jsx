import AuthButton from "@/components/AuthButton";
import CommentComp from "@/components/forum/CommentComp";
import CommentX from "@/components/forum/Comments";
import { createClient } from "@/utils/supabase/server";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { headers } from "next/headers"
import Link from "next/link";
import { NextRequest } from "next/server";
import { getChildComments } from "../../actions/loadComments";
import { revalidatePath } from "next/cache";
import { getRelatedPosts } from "../../actions/loadPosts";
import { getNaijaTrends1 } from "@/app/api/trends/naija";
export const revalidate=1
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.comment.slice(-1) 
  const postView = async () => { 
    const supabase = createClient();  
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
  const supabase = createClient()    
  const {
  data: { user }, 
  } = await supabase.auth.getUser(); 
  
const id = params.comment.slice(-1) 
  const commentView = async () => { 
    const supabase = createClient();  
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

  const confirmParam= searchParams.confirm
  const headersList = headers()
  const referer = headersList.get("referer")
  const commentChild =async()=>{ 
    const child_of_child = await getChildComments(comment) 
    return child_of_child 
  }
  const initialChild = await commentChild()
  const query = searchParams?.name;
  const searchValues = async () => { 
  const supabase = createClient();  
  const { data, error } = await supabase
  .from('posts')
  .select("*")
  .filter('title', 'ilike', `%${query}%`);
  
  if (error) {
  console.error('Error fetching posts:', error.message);
  return;
  } 
  return data
  }
  const postSearch=[]
  const related= await getRelatedPosts(post.title)  
  const trends =await getNaijaTrends1('NG')
  return ( 
    <div>
<AuthButton confirmParam={confirmParam} />  
<hr className="shadow-bottomShadow"/>  
<CommentX 
  comment={comment}  
  postsData={post} 
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
