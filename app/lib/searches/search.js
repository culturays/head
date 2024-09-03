"use server"
import { createClient } from "@/utils/supabase/server";
import { agent, fetchWithRetry } from "@/utils/fetchwithretry"; 
export const searchValues = async (name) => { 
    const searches=[] 
    const supabase = createClient()
    const { data:posts, error } = await supabase
    .from('posts')
    .select("*")
    .filter('title', 'ilike', `%${name}%`);
    
    if (error) {
    throw new Error(error.message)

    // console.error('Error fetching posts:', error.message);
    // return;
    }
  
    const { data:events, error:eventErr} = await supabase
    .from('events')
    .select("*")
    .filter('title', 'ilike', `%${name}%`);
    
    if (eventErr) {
    throw new Error(eventErr.message)
 
    }
    
   try{
    
        const post_response = await fetchWithRetry('https://content.culturays.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `
              {
                posts(where: { search: "${name}" }) {   
                  edges {
                    node {
                      id
                      title
                      content
                      excerpt
                      date
                      author {
                        node {
                          name
                        }
                      }
                      categories {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                      tags {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            `
          })
          
        }).then(response => response) 
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
         const post_res = post_response.data.posts.edges.map((xy)=> xy.node)

        const char_response = await fetchWithRetry('https://content.culturays.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `
              {
                chars(where: { search: "${name}" }) {   
                  edges {
                    node {
                      id
                      title
                      content
                      excerpt
                      date
                      author {
                        node {
                          name
                        }
                      }
                      charCategories {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                      contentTags {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            `
          })
        }).then(response =>   response)   
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const char_res = char_response.data.chars.edges.map((xy)=> xy.node)

        const vid_response = await fetchWithRetry('https://content.culturays.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `
              {
                culturaysVideos(where: { search: "${name}" }) {   
                  edges {
                    node {
                      id
                      title
                      content
                      excerpt
                      date
                      author {
                        node {
                          name
                        }
                      }
                      culturaysVideoCategories {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                      contentTags {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            `
          })
        }) .then(response =>  response)  
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
         const vid_res = vid_response.data.culturaysVideos.edges.map((xy)=> xy.node)
//
// const char_result =await char_response.json(); 
// if(char_result.errors)throw new Error (char_result.errors[0].message) 
//   const wp_chars=char_result.data.chars.edges.map((ef)=> ef.node).flat() 
 
searches.push(vid_res )
searches.push(post_res )
searches.push(char_res)
 searches.push(posts)
 searches.push(events) 
    return searches.flat()
 
  } catch (error) {
    console.error('Error fetching search values:', error); 
    if (error.message.includes('SocketError')) {
      console.error('Socket error: the other side closed the connection');
    }
  
  } 
    
    }
    