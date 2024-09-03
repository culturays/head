import { agent, fetchWithRetry } from "@/utils/fetchwithretry";
export async function tag (slug) { 
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query POSTTAG($id: ID!, $idType: TagIdType) {
      tag(id: $id, idType:$idType){
       id
          name
          slug
          posts {
            edges {
              node {
                id
                postId
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                categories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                tags {
                  nodes {
                    id
                    name
                    slug
                  }
                }   
              }
            }
          } 
      }
       }   
        ` ,
        variables:{
          id: slug,
          idType: 'SLUG' 
        }
      
      })
      
      }).then(response => response)  
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest.data.tag 
      return response 
   
 }
export async function contentTag (slug) { 
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query POSTTAG($id: ID!, $idType: ContentTagIdType) {
      contentTag(id: $id, idType:$idType){
       id
          name
          slug
          awards {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          } allNetflixNaija {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          } businesses {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          } chars {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          } culturaysVideos {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          } economies {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          } environments {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          } health {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          } latests {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          } others {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
             societies {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
             technologies {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
             trends {
            edges {
              node {
                id 
                slug
                title 
                date
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
                contentCategories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                   contentTags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
      }
       }   
        ` ,
        variables:{
          id: slug,
          idType: 'SLUG' 
        }
      
      })
      
      }).then(response =>  response)  
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest.data.contentTag 
      return response 
 }


