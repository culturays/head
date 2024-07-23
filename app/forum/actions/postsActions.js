"use server"

import { createClient } from "@/utils/supabase/server" ;
import nlp from "compromise/three";
 
export const getUserPosts = async (offset,limit, id) => {

  try{
    "use server"
    const supabase = createClient();  
      const { data:posts , error } = await supabase 
      .from('posts')
      .select('*')
      .eq('user_id', id)
     .range(offset,limit)  
       //revalidatePath('/forum') 
     return posts
    
    }catch(err){
      if(err) return
    } 
} 

export const createPost = async (formData) => {
"use server"
const supabase = createClient(); 
const {   
  data: { user }, 
  } = await supabase.auth.getUser(); 
  
      //?.index + 2 reflects the length of items in the range in forumPosts. should chang accordingly
     //const index =posts[posts?.length  - 1]?.id + 3
     const title = formData.get('title')
     const story = formData.get('story') 
     const family = formData.get('family')
     const work = formData.get('work')
     const school = formData.get('school')  
     const friends = formData.get('friends')
     const folktale = formData.get('folktale')
     const entertainment = formData.get('entertainment')
     const files = formData.getAll("files");
     const slug=title?.trim()?.toLowerCase().replace(/ /g,"-")
     const storyX = story?.split(' ').filter((ex)=> !ex.includes('#')).join(' ')
    const genre=[{
    family,
    work,
    entertainment,
    school,
    friends,
    folktale
    }]
    const genreList =[] 
    
    for (const [key, value]  of genre.flat().entries()) { 
    for(const [k,v] of Object.entries(value) ){
      // console.log(`Key: ${k}, Value: ${v}`);
      if(v){
        genreList.push(k) 
      } 
    }
    }
    
     if(!title ) return 
      const nouns = nlp(story).match('#Noun').text();  
      const hashNo =nlp(story).hashTags().text()
     //.json({normal:true}) 
     const people = nlp(story).people().text()
     const places = nlp(story).places().text()
     const adj = nlp(story).nouns().adjectives().text()
     const nounDoc = nlp(story).people().normalize().text() 
     const allFiles=[]
    
     for (let i = 0; i < files.length; i++) {
     const file=files[i];
     const filePath = `${Date.now()}-${file.name}`; 
    if(file.name=== ''){
    allFiles.push(null)
    
    }else{
    allFiles.push(filePath)
    
    const { error: uploadError } = await supabase.storage.from('posts_imgs').upload(filePath, file,{upsert: true})
    if (uploadError)
       {
      throw uploadError
      // redirect("/forum?message=Error Loading Image")
    } 
     } 
    
     };
     if(!user){
     return
    }else{ 
     const { data, error } = await supabase
     .from('posts')
     .insert([
     {    
     title, 
     story:storyX, 
     user_id:user?.id,
     comments:[],
     username:user?.user_metadata.full_name,
     likes:[],
     suggested_tags:[
       nouns, 
       people,
       places, 
       adj ,
       nounDoc 
     ] ,
      tags:[hashNo], 
     files: allFiles, 
     is_approved:false,
     slug,
     avatar_url: user?.user_metadata.picture,
     user_email:user?.email,
      genre: genreList 
     },
      
     ])
     .select()   
 
    if (error) {
    console.log(error) 
     
    }  
   
  } 
  
  
    }

    export const postEdit = async(formData) => { 
      "use server"      
        const supabase = createClient();
        const title = formData.get('title') 
        const story = formData.get('story')  
        const slug=title?.trim()?.toLowerCase().replace(/ /g,"-")
        const storyX = story.split(' ').filter((ex)=> !ex.includes('#')).join(' ')
        const family = formData.get('family')
        const work = formData.get('work')
        const school = formData.get('school')
        const friends = formData.get('friends')
        const folktale = formData.get('folktale')
        const entertainment = formData.get('entertainment')
        const files = formData.getAll("files");
        const genre=[{
        family,
        work,
        entertainment,
        school,
        friends,
        folktale
        }]
        const genreList =[] 
        
        for (const [key, value] of genre.flat().entries()) { 
        for(const [k,v] of Object.entries(value) ){
        //console.log(`Key: ${k}, Value: ${v}`); 
        if(v){ 
        const updGnr= post.genre.filter((tx)=> !tx.includes(k) ).flat()
        genreList.push([...updGnr, k] )  
        } 
        }
        }
        const gnrItx =genreList.concat(post.genre).flat().filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) === index;
        })
        
        const allFiles=[]
        for (let i = 0; i < files.length; i++) {
        const file=files[i];
        const filePath = `${Date.now()}-${file.name}`; 
        if(!file.name ){ 
        allFiles.push(post.files||null)
        }else{
        allFiles.concat(post.files).push(filePath)
        
        const { error: uploadError } = await supabase.storage.from('posts_imgs').upload(filePath, file,{upsert: true})
        if (uploadError)
        {
        throw uploadError 
        } 
        } 
        
        }; 
        const { data, error } = await supabase
        .from('posts')
        .update([
        {    
        title,  
        story:storyX, 
        slug,
        is_approved:true,
        genre:gnrItx,
        user_id:post.user_id, 
        comments:post.comments,
        likes:post.likes,           
        username:post.username,
        suggested_tags:post.suggested_tags ,
        tags:post.tags, 
        files:allFiles.flat() ,
        index:post.index,  
        avatar_url:post.avatar_url,
        user_email:post.user_email, 
        },
        
        ])
        .eq('id', post.id)
        .select()
        if (error) {

        console.log(error) 
        }
        formData.set('title', '')
        router.push(pathname+'?message=Post Updated Successfully', {scroll:false})  
        
        //.filter((te)=> te.slug!== slug)
        const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
        setScrolledPosts(pt.concat(data)) 
        router.refresh()
        setTimeout(()=>{
        setEditId(null)
        
        }, 3000)
        
        };


       export const postLike = async (post, user) => { 
          if(!user){
            setUserActions(true)
          }else{ 
          const supabase = createClient(); 
          const likeidx = post?.likes?.findIndex((id)=> id === user?.id)  
          const updLks= post?.likes?.filter((ex)=> ex !==user?.id )
          if(likeidx=== -1){ 
          const {data:posts, error: lkrror } = await supabase
          .from('posts')
          .update({likes: [...post?.likes, user?.id]} )
          .eq('id', post.id) 
          .select()
          
          if (lkrror) {
          console.error('Error updating likes:', lkrror );
          } else {
           
           setNotify('Like updated successfully.');
            setTimeout(
              () =>setNotify(''), 
              2000 
            );  
           
           router.refresh()  
           const pt = scrolledPosts.filter((te)=> te.id !== post.id) 
           setScrolledPosts([...pt, ...posts]) 
            }    
          } 
           
          if(likeidx !== -1){  
          
          const {data:posts, error } = await supabase
          .from('posts')
          .update({ likes:[...updLks]})
          .eq('id', post.id) 
          .select()
          if(error){
          console.log(error)
          }
          else {   
          setNotify('Like removed successfully.');
          setTimeout(
            () =>setNotify(''), 
            2000 
          ); 
          } 
          const pt = scrolledPosts.filter((te)=> te.id !== post.id) 
          setScrolledPosts([...pt, ...posts]) 
          }
         
          // const updtPosts= posts.filter((ex)=> ex.id === post.id)
          // const pt = scrolledPosts.filter((te)=> te.id !== post.id) 
          router.refresh()
         }
          }
        export const createComment =async (e, postId, parentId) => {
            e.preventDefault()
            const formData = new FormData(e.target);
            const title = formData.get('title');
            const slug = title?.toLowerCase().replace(/ /g,"-") 
            const replies = []
              
            // const postId = e.currentTarget.getAttribute('id')
            //const postComms=post?.comments?.filter((ex)=> ex.slug!==slug )
            const allFiles=[]
            const files = formData.getAll("files");
            for (let i = 0; i < files.length; i++) {
            const file=files[i];
            const filePath = `${Date.now()}-${file.name}`; 
            if(file.name=== ''){
            allFiles.push(null)
            
            }else{
            allFiles.push(filePath)
            
            const { error: uploadError } = await supabase.storage.from('posts_imgs').upload(filePath, file,{upsert: true})
            if (uploadError)
            {
            throw uploadError
            // redirect("/forum?message=Error Loading Image")
            } 
            } 
            
            };
            if(!user){
              setUserActions(true)
            }else{ 
            try{
            const supabase = createClient();  
            const { data, error } = await supabase 
            .from('comments')
            .insert([ 
            {    
            title, 
            slug,
            likes:[],
            replies:[],
            post_id:postId,
            parent_id: parentId ,
            user_id:user.id,
            files:allFiles, 
            avatar_url: user?.user_metadata.picture,
            user_name:user?.user_metadata.full_name,
            user_email:user?.email,
            }  
            ])
            //.eq('id', post.id)
            .select()
            
            if(error){
            console.log(error)
            }  
            router.refresh()
            const newComment = data[0];
            
            // Update the post's comments array
            const updatedPosts = scrolledPosts.map((p) => { 
              if (p.id === postId) {
                return {
                  ...p,
                  comments: [...p.comments, parentId]
                };
              }
              return p;
            });
            
            setScrolledPosts(updatedPosts);
            }catch(err){
            console.log(err)
            }
            setActiveReply(null)
          //  setIsReplying(null)
            setTimeout(
            () =>setNotify(''), 
            2000 
            )
           } 
            }


          export const commentEdit = async(e) => { 
              const formData = new FormData(e.target);
              const title = formData.get('title')  
              const files = formData.getAll('files')
              const slug = title?.toLowerCase().replace(/ /g,"-")
              const allFiles=[]
              const supabase = createClient();
              for (let i = 0; i < files.length; i++) {
              const file=files[i];
              const filePath = `${Date.now()}-${file.name}`; 
              if(!file.name ){ 
              allFiles.push(post.files||null)
              }else{
              allFiles.concat(post.files).push(filePath)
              
              const { error: uploadError } = await supabase.storage.from('comment_imgs').upload(filePath, file,{upsert: true})
              if (uploadError)
              {
              throw uploadError 
              } 
              } 
              
              }; 
              const { data, error } = await supabase
              .from('comments')
              .update([
              {    
              title,   
              slug , 
              user_id:comment?.user_id,
              post_id:comment?.post_id,
              parent_id:comment?.parent_id,
              avatar_url:comment?.avatar_url,
              user_name:comment?.user_email,
              likes:[],
              files:comment?.files.concat(allFiles), 
              },
              
              ])
              .eq('id', comment.id)
              .select()
              if (error) {
              console.log(error) 
              }
              formData.set('title', '')
              router.push(pathname+'?message=Comment Updated Successfully', {scroll:false})  
              
              //.filter((te)=> te.slug!== slug)
              const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
              //setScrolledComments(pt.concat(data)) 
              setScrollChild(pt.concat(data))
              router.refresh()
              setTimeout(()=>{
              setComment(null)
              
              }, 3000)
              
              };



 










              // const postEdit = async(formData) => { 
 
              //   const title = formData.get('title') 
              //   const story = formData.get('story')  
              //   const slug=title?.trim()?.toLowerCase().replace(/ /g,"-")
              //   const storyX = story.split(' ').filter((ex)=> !ex.includes('#')).join(' ')
              //   const family = formData.get('family')
              //   const work = formData.get('work')
              //   const school = formData.get('school')
              //   const friends = formData.get('friends')
              //   const folktale = formData.get('folktale')
              //   const entertainment = formData.get('entertainment')
              //   const files = formData.getAll("files");
              //   const genre=[{
              //   family,
              //   work,
              //   entertainment,
              //   school,
              //   friends,
              //   folktale
              //   }]
              //   const genreList =[] 
                
              //   for (const [key, value] of genre.flat().entries()) { 
              //   for(const [k,v] of Object.entries(value) ){
              //   //console.log(`Key: ${k}, Value: ${v}`); 
              //   if(v){ 
              //   const updGnr= post.genre.filter((tx)=> !tx.includes(k) ).flat()
              //   genreList.push([...updGnr, k] )  
              //   } 
              //   }
              //   }
              //   const gnrItx =genreList.concat(post.genre).flat().filter( function( item, index, inputArray ) {
              //   return inputArray.indexOf(item) === index;
              //   })
                
              //   const allFiles=[]
              //   const supabase = createClient();
              //   for (let i = 0; i < files.length; i++) {
              //   const file=files[i];
              //   const filePath = `${Date.now()}-${file.name}`; 
              //   if(!file.name ){ 
              //   allFiles.push(post.files||null)
              //   }else{
              //   allFiles.concat(post.files).push(filePath)
                
              //   const { error: uploadError } = await supabase.storage.from('posts_imgs').upload(filePath, file,{upsert: true})
              //   if (uploadError)
              //   {
              //   throw uploadError 
              //   } 
              //   } 
                
              //   }; 
              //   const { data, error } = await supabase
              //   .from('posts')
              //   .update([
              //   {    
              //   title,  
              //   story:storyX, 
              //   slug,
              //   is_approved:true,
              //   genre:gnrItx,
              //   user_id:post.user_id, 
              //   comments:post.comments,
              //   likes:post.likes,           
              //   username:post.username,
              //   suggested_tags:post.suggested_tags ,
              //   tags:post.tags, 
              //   files:allFiles.flat() ,
              //   index:post.index,  
              //   avatar_url:post.avatar_url,
              //   user_email:post.user_email, 
              //   },
                
              //   ])
              //   .eq('id', post.id)
              //   .select()
              //   if (error) {
              //   console.log(error) 
              //   }
              //   formData.set('title', '')
              //   router.push(pathname+'?message=Post Updated Successfully', {scroll:false})  
                
              //   //.filter((te)=> te.slug!== slug)
              //   const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
              //   setScrolledPosts(pt.concat(data)) 
              //   router.refresh()
              //   setTimeout(()=>{
              //   setEditId(null)
                
              //   }, 3000)
                
              //   };
              // const postLike = async (post ) => { 
              //   if(!user){
              //     setUserActions(true)
              //   }else{ 
              //   const supabase = createClient(); 
              //   const likeidx = post?.likes?.findIndex((id)=> id === user?.id)  
              //   const updLks= post?.likes?.filter((ex)=> ex !==user?.id )
              //   if(likeidx=== -1){ 
              //   const {data:posts, error: lkrror } = await supabase
              //   .from('posts')
              //   .update({likes: [...post?.likes, user?.id]} )
              //   .eq('id', post.id) 
              //   .select()
                
              //   if (lkrror) {
              //   console.error('Error updating likes:', lkrror );
              //   } else {
                 
              //    setNotify('Like updated successfully.');
              //     setTimeout(
              //       () =>setNotify(''), 
              //       2000 
              //     );  
                 
              //    router.refresh()  
              //    const pt = scrolledPosts.filter((te)=> te.id !== post.id) 
              //    setScrolledPosts([...pt, ...posts]) 
              //     }    
              //   } 
                 
              //   if(likeidx !== -1){  
                
              //   const {data:posts, error } = await supabase
              //   .from('posts')
              //   .update({ likes:[...updLks]})
              //   .eq('id', post.id) 
              //   .select()
              //   if(error){
              //   console.log(error)
              //   }
              //   else {   
              //   setNotify('Like removed successfully.');
              //   setTimeout(
              //     () =>setNotify(''), 
              //     2000 
              //   ); 
              //   }  
              //   const pt = scrolledPosts.filter((te)=> te.id !== post.id) 
              //   setScrolledPosts([...pt, ...posts]) 
              //   }
               
              //   // const updtPosts= posts.filter((ex)=> ex.id === post.id)
              //   // const pt = scrolledPosts.filter((te)=> te.id !== post.id) 
              //   router.refresh()
              //  }
              //   }
              //   const createComment =async (e, postId, parentId ) => {
              //     e.preventDefault()
              //     const supabase = createClient()
              //     const formData = new FormData(e.target);
              //     const title = formData.get('title');
              //     const slug = title?.toLowerCase().replace(/ /g,"-") 
              //     const replies = []
                 
              //     // const postId = e.currentTarget.getAttribute('id')
              //     //const postComms=post?.comments?.filter((ex)=> ex.slug!==slug )
              //     const allFiles=[]
              //     const files = formData.getAll("files");
              //     for (let i = 0; i < files.length; i++) {
              //     const file=files[i];
              //     const filePath = `${Date.now()}-${file.name}`; 
              //     if(file.name=== ''){
              //     allFiles.push(null)
                  
              //     }else{
              //     allFiles.push(filePath)
                  
              //     const { error: uploadError } = await supabase.storage.from('posts_imgs').upload(filePath, file,{upsert: true})
              //     if (uploadError)
              //     {
              //     throw uploadError
              //     // redirect("/forum?message=Error Loading Image")
              //     } 
              //     } 
                  
              //     };
              //     if(!user){
              //       setUserActions(true)
              //     }else{ 
              //     try{
              //     const supabase = createClient();  
              //     const { data, error } = await supabase 
              //     .from('comments')
              //     .insert([ 
              //     {    
              //     title, 
              //     slug,
              //     likes:[],
              //     replies:[],
              //     post_id:postId,
              //     parent_id: parentId ,
              //     user_id:user.id,
              //     files:allFiles, 
              //     avatar_url: user?.user_metadata.picture,
              //     user_name:user?.user_metadata.full_name,
              //     user_email:user?.email,
              //     }  
              //     ])
               
              //     .select()
                  
              //     if(error){
              //     console.log(error)
              //     }  
              //   router.refresh()
              //     const newComment = data[0];
              //     // setScrolledPosts([...scrolledPosts, ...updtPosts])
              //     setScrolledComments([...scrolledComments, ...data]) 
              //     }catch(err){
              //     console.log(err)
              //     }
              //     setActiveReply(null) 
              //     setTimeout(
              //     () =>setNotify(''), 
              //     2000 
              //     )
              //    } 
              //     }
               
              //     const commentLike  = async(comment ) => { 
              //       const supabase = createClient(); 
              //       const likeidx = comment?.likes?.findIndex((id)=> id === user.id)  
              //       const updLks= comment?.likes?.filter((ex)=> ex !==user.id ) 
              //       if(!user){
              //         setUserActions(true)
              //       }else{ 
              //       if(likeidx=== -1){ 
              //       const {data:comments, error: lkrror } = await supabase
              //       .from('comments')
              //       .update({likes: [...comment?.likes, user.id]} )
              //       .eq('id', comment.id) 
              //       .select()
                    
              //       if (lkrror) {
              //       console.error('Error updating likes:', lkrror );
              //       } else { 
              //        setNotify('Like updated successfully.');
              //        setTimeout(
              //           () =>setNotify(''), 
              //           2000 
              //         );  
              //     const pt = scrolledComments.filter((te)=> te?.id !== comment?.id) 
              //      setScrolledComments([...pt, ...comments]) 
              //        router.refresh()  
                 
              //         }    
              //       } 
                     
              //       if(likeidx !== -1){  
              //       const {data:comments, error } = await supabase
              //       .from('comments')
              //       .update({ likes:[...updLks]})
              //       .eq('id', comment.id) 
              //       .select()
              //       if(error){
              //       console.log(error)
              //       }
              //       else {  
              //         const pt = scrolledComments.filter((te)=> te.id !== comment.id) 
              //         setScrolledComments([...pt, ...comments]) 
                     
              //       setNotify('Like removed successfully.');
              //       setTimeout(
              //         () =>setNotify(''), 
              //         2000 
              //       ); 
              //       } 
                   
              //       router.refresh()
              //     }
                  
              //     }
              //      }
              
              
              //      const commentEdit = async(e) => { 
              //       const formData = new FormData(e.target);
              //       const title = formData.get('title')  
              //       const files = formData.getAll('files')
              //       const slug = title?.toLowerCase().replace(/ /g,"-")
              //       const allFiles=[]
              //       const supabase = createClient();
              //       for (let i = 0; i < files.length; i++) {
              //       const file=files[i];
              //       const filePath = `${Date.now()}-${file.name}`; 
              //       if(!file.name ){ 
              //       allFiles.push(post.files||null)
              //       }else{
              //       allFiles.concat(post.files).push(filePath)
                    
              //       const { error: uploadError } = await supabase.storage.from('comment_imgs').upload(filePath, file,{upsert: true})
              //       if (uploadError)
              //       {
              //       throw uploadError 
              //       } 
              //       } 
                    
              //       }; 
              //       const { data:comment, error } = await supabase
              //       .from('comments')
              //       .update([
              //       {    
              //       title,   
              //       slug , 
              //       // user_id:comment?.user_id,
              //       // post_id:comment?.post_id,
              //       // parent_id:comment?.parent_id,
              //       // avatar_url:comment?.avatar_url,
              //       // user_name:comment?.user_email,
              //       // likes:[],
              //       // files:comment?.files.concat(allFiles), 
              //       },
                    
              //       ])
              //       .eq('id', commentId)
              //       .select()
              //       if (error) {
              //       console.log(error) 
              //       }
              //       formData.set('title', '')
              //       router.push(pathname+'?message=Comment Updated Successfully', {scroll:false})  
              //       const pt = scrolledComments.filter((te)=> te?.id !==commentId) 
              //      setScrolledComments([...pt, ...comment]) 
              //       //.filter((te)=> te.slug!== slug)
              //       // const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
              //       // setScrolledComments(pt.concat(data)) 
              //       // setScrollChild(pt.concat(data))
              //       router.refresh()
              //       setTimeout(()=>{
              //      // setComment(null)
                    
              //       }, 3000)
                    
              //       };
                    
              
              //   const deleteComment =async (commentId ) => {
              //     try{
              //       const supabase = createClient();  
              //       const {data, error } = await supabase
              //       .from('comments')
              //       .delete()
              //       .eq('id', commentId)
              //       if(error){
              //       return
                    
              //       }
              //       console.log(data)
              //       }catch(err){
              //       console.log(err)
              //       } 
              //       //delete from posts as well
              //       setNotify('Comment Deleted Successfully')    
              //       setTimeout(
              //       () =>setNotify(''), 
              //       2000 
              //       );  
                    
              //       // if(pathname.includes('/post/')){
              //       // router.back()
                    
              //       // }
                  
              //       //const pt = scrolledPosts.filter((te)=> te.id!== commentId) 
              //       const comms = scrolledComments.filter((te)=> te.id!== commentId) 
              //      setScrolledComments(comms)
              //       router.refresh() 
              //       };
              