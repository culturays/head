import { agent, fetchWithRetry } from "@/utils/fetchwithretry";
export async function tag (slug, exclude) { 
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
    method: 'POST',
    timeout: 5000 ,
    agent: agent,
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({ 
      query:`
      query POSTTAGS {
tags(where: {slug: "${slug}"}){
  nodes { 
    name
    id
    slug
     posts { 
        nodes {
        id
          slug
          title
          contentTypeName
          tags{
          nodes{
          id
          name
          slug
          }
          }
          featuredImage{
          node{
          altText
          sourceUrl
          }
          }
        }
     
    } 
    }
    }
    }
      `  
      
    })
    
    }).then(response =>  response)    
    .then(data =>data) 
    .catch(error => console.error('Error:', error)); 
    const response = wprest.data.tags
    return response
   
 }

export async function contentTag (slug,exclude) { 
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query POSTTAGS {
contentTags(where: {slug: "${slug}"}){
    nodes { 
      name
      id
      slug
       awards { 
          nodes {
          id
            slug
            title
            contentTypeName
            contentTags {
            nodes{
            id
            name
            slug
            }
            }
            featuredImage{
            node{
            altText
            sourceUrl
            }
            }
          }
       
      }
          
         chars{
        nodes { id
          slug
          title
          contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
             featuredImage{
            node{
            altText
            sourceUrl
            }
            }
        }
      }
      
      trends{
        nodes { id
          slug
          title
          contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
             featuredImage{
            node{
            altText
            sourceUrl
            }
            }
        }
      }
     articles{
        nodes { id
          slug
          title
          contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
             featuredImage{
            node{
            altText
            sourceUrl
            }
            }
        }
      }
      netflixNaijaPosts{
        nodes { id
          slug
          title
          contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
             featuredImage{
            node{
            altText
            sourceUrl
            }
            }
        }
      }
       nollywoods { 
          nodes { id
            slug
            title
            contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
               featuredImage{
            node{
            altText
            sourceUrl
            }
            }
         
        }
      }
        
        videos { 
          nodes { id
            slug
            title
            contentTypeName
          videosGroup {
        videoUrl {
          node {
            title
            slug
            mediaItemUrl
            date
            altText
          }
        }
          related{
          nodes{
          ... on Video{
          id
           title
          slug
          }
         
          }
          }
      }
               contentTags {
            nodes{  id
            name
            slug
            }
            }
               featuredImage{
            node{
            altText
            sourceUrl
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
      const response = wprest.data.contentTags
      return response
 }


export async function content_TAGS (slug,exclude) { 
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query POSTTAGS {
   contentTags { 
      nodes {
        articles {
          nodes {
            id
            title
          }
        }
        awards {
          nodes {
            id
            title
          }
        }
        
         netflixNaijaPosts {
          nodes {
            id
            title
          }
        }
         nollywoods {
          nodes {
            id
            title
          }
        }
        
         trends {
          nodes {
            id
            title
          }
        }
         videos {
          nodes {
            id
            title
          }
        }
         chars {
          nodes {
            id
            title
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
      const response = wprest.data.contentTags
      return response
 }