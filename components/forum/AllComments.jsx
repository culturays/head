"use client"
//import { usePagesContext } from "../Pages-Context";
import CommentComp from "./CommentComp" 
function sortAscending(pb, pa){ 
  return (pa?.id - pb?.id);
 } 
const AllComments = ({  
comments, 
postData,  
handleLike, 
userData,
editComment,  
commentObj,
setCommentObj, 
isChildComment,
setIsChildComment, 
user,
commentLike,
commentEdit,
createComment, 
deleteComment,
commentsByParentId,
all_comments,
rootComments,
show,
 setShow ,
 setImgIndex,
 imgIndex,
activeIdx,
setActiveIdx,
shareOptions,
setShareOptions, 
setIsEditingComment,
isEditingComment,
activeCommentReply,
setActiveCommentReply 
}) => {
 const commentTitles=comments?.sort(sortAscending) 
 

 return (
<> 
<div className="">    
{commentTitles?.map((comment, i) => (
<div key={i} className={`${isChildComment?"relative ml-6":''}`}> 
{isChildComment&& 
<div title="close" onClick={()=>setIsChildComment(prev=>!prev)} className='absolute -left-3 bg-gray-200 w-0.5 h-full cursor-pointer'/> }

<CommentComp 
// {...comment}
idx={i} 
comments={comments}
comment={comment} 
// commentData={commentData}      
commentObj={commentObj}
setCommentObj={setCommentObj} 
postData={postData}  
handleLike={handleLike} 
userData={userData}
// editComment={editComment}
user={user}
commentLike={commentLike}
commentEdit={commentEdit}
createComment={createComment}
deleteComment={deleteComment}
commentsByParentId={commentsByParentId}
all_comments={all_comments}
rootComments={rootComments}
show={show}
setShow={setShow}
setImgIndex={setImgIndex} 
imgIndex={imgIndex}  
activeIdx={activeIdx}  
setActiveIdx={setActiveIdx}
shareOptions={shareOptions}
setShareOptions={setShareOptions} 
setIsEditingComment={setIsEditingComment}
isEditingComment={isEditingComment}
activeCommentReply={activeCommentReply}
setActiveCommentReply={setActiveCommentReply}
/>
 
</div>))} 
 </div> 
 </> )
}

export default AllComments

