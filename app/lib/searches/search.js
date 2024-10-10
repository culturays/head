"use server"
import { createClient } from "@/utils/supabase/server";
import { agent, fetchWithRetry } from "@/utils/fetchwithretry"; 
export const searchValues = async (name) => {   
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
            query SEARCHES  {
     contentNodes(where: { search: "${name}"}) {
     nodes {
      contentTypeName
      ... on Post {
        id
        title
        slug
        tags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Video {
         id
        title
        slug
        contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Trending {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Tech {
        id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Society {
        id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Nollywood {
       id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on NetflixNaijaPost {
       id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
            netflixCategories(where: {name: "News"}) {
          nodes {
            netflixNaijaPosts {
              nodes {
                 id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
              }
            }
          }
        }
      }
      ... on Health {
        id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Environment {
      id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Economy {
     id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Char {
        id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Business {
        id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Award {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
          }
           
        }
      }
      ... on Article {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
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
        const response = post_response.data.contentNodes.nodes 
        return response 
  } catch (error) {
    console.error('Error fetching search values:', error); 
    if (error.message.includes('SocketError')) {
      console.error('Socket error: the other side closed the connection');
    }
  
  } 
    
    }
    