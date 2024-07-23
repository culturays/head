import { createClient } from "@/utils/supabase/server";
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
   
 
        const response = await fetch('https://content.culturays.com/graphql', {
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
        });
        const result = await response.json(); 
        if(result.errors)throw new Error(result.errors[0].message) 
       const wp_posts= result.data.posts.edges.map((ef)=> ef.node).flat()
    searches.push(wp_posts)
    searches.push(posts)
    searches.push(events)
    return searches.flat()
    }
    