import {agent, fetchWithRetry } from "@/utils/fetchwithretry"

export async function newsbyNewOnCategory(notIn){ 
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json' 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID]) {
     netflixCategories(where: {name: "New on Netflix"}) {
         edges {
      node {
        name
        slug 
        netflixNaijaPosts(where:{notIn:$notIn}) {
        edges{
        cursor
          node {
            title
            slug
           excerpt
            id
            date
            content
            author{
            node{
            name
            slug
            avatar{
            url
            }
            }
            }
             featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                } 
               contentTags{
                     nodes{
                     name
                     slug
                     }
                     }
           children {
              edges {
                node {
                  id
                  ... on NetflixNaijaPost {
                    id  
                  slug
                title
                excerpt
                content
                date
                 netflixNewsGroup { 
                  netflixEmbeds
                    genre
                  director
                  cast
                  filmTitle
                }
              contentTags { 
                  nodes{
                    name
                    slug
                  } 
              }
              netflixCategories { 
                  nodes{
                    name
                    slug
                  } 
              }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                } 
                  }
                }
              }
            }
            netflixNewsGroup {
              netflixEmbeds
              genre
              filmTitle
              embedText
              director
              cast
            }
         
          }
        }
      }}
    }
       } 
       }  
       ` ,variables:{notIn:notIn}
      
      })
      
      }).then(response => response)
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.netflixCategories.edges
      return response
}

export async function newsbyComingtoCategory(notIn){
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID]) {
      netflixCategories(where: {name: "Coming to Netflix"}) {
         edges {
      node {
        name
        slug
         children {
         edges{
         cursor
        node {
          name
          slug
          netflixNaijaPosts(first:50) {
          edges{
          
          
            node {
              title
           slug
           excerpt
            id
            date
            content
                author{
            node{
            name
            slug 
             avatar{
            url
            }
            }
            }
              featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
                  contentTags { 
                  nodes {
                    name
                    slug
                  } 
              }
              netflixCategories { 
                  nodes {
                    name
                    slug
                  } 
              }

            }
          }
        }
      }}}
        netflixNaijaPosts(where:{notIn:$notIn}) {
        edges{
        cursor
          node {
            title
            slug
           excerpt
            id
            date
            content
                author{
            node{
            name
            slug 
             avatar{
            url
            }
            }
            }
              featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
                  contentTags { 
                  nodes {
                    name
                    slug
                  } 
              }
              netflixCategories { 
                  nodes {
                    name
                    slug
                  } 
              }
           children {
              edges {
                node {
                  id
                  ... on NetflixNaijaPost {
                    id  
                  slug
                title
                excerpt
                content
                date
                 netflixNewsGroup { 
                  netflixEmbeds
                    genre
                  director
                  cast
                  filmTitle
                }
              contentTags { 
                  nodes {
                    name
                    slug
                  } 
              }
              netflixCategories { 
                  nodes {
                    name
                    slug
                  } 
              }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                } 
                  }
                }
              }
            }
            netflixNewsGroup {
              netflixEmbeds
              genre
              filmTitle
              embedText
              director
              cast
            }
         
          }
        }
      }
    }
       }  }}

       ` ,variables:{notIn:notIn}
      
      })
      
      }).then(response =>  response)  
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.netflixCategories.edges
      return response 
} 
 


export async function addedOnCategory(req, res){
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
         netflixCategories(where: {name: "Added on Netflix"}) {
          edges {
      node {
        name
        slug 
        
          children {       
            nodes {
              slug
              name
              netflixNaijaPosts {
               nodes {
                    title
                     excerpt
                     contentTags{
                     nodes{
                     name
                     slug
                     }
                     }
                     featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
                content
                date
                 netflixNewsGroup { 
                  netflixEmbeds
                    genre
                  director
                  cast
                  filmTitle
                      netflixNewsRelated {
                    edges {
                      node {
                        ... on NetflixNaijaPost {
                          id
                          slug
                          title
                          excerpt
                             contentTags{
                     nodes{
                     name
                     slug
                     }
                     }
                          featuredImage {
                            node {
                              altText
                              sourceUrl
                              caption
                            }
                          }
                          date
                        }
                      }
                    }
                  }
                }
                  }
                
              }
            }
         
        }
        netflixNaijaPosts {
          nodes {
            title
            slug
           excerpt
            id
            date
            content
               parent {
            node {
              ... on NetflixNaijaPost {
                id
                title
                slug
                children {
                  nodes {
                    ... on NetflixNaijaPost {
                      id
                      title
                      slug
                    }
                  }
                }
              }
            }
          }
               contentTags{
                     nodes{
                     name
                     slug
                     }
                     }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
           children { 
                nodes {
                  id
                  ... on NetflixNaijaPost {
                    id  
                  slug
                title
                excerpt
                content
                date
                   contentTags{
                     nodes{
                     name
                     slug
                     }
                     }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
                 netflixNewsGroup { 
                  netflixEmbeds
                    genre
                  director
                  cast
                  filmTitle
                      netflixNewsRelated {
                    edges {
                      node {
                        ... on NetflixNaijaPost {
                          id
                          slug
                          title
                          excerpt
                             contentTags{
                     nodes{
                     name
                     slug
                     }
                     }
                          featuredImage {
                            node {
                              altText
                              sourceUrl
                              caption
                            }
                          }
                          date
                        }
                      }
                    }
                  }
                }
              contentTags { 
                  nodes {
                    name
                    slug
                  } 
              }
              netflixCategories { 
                  nodes {
                    name
                    slug
                  } 
              }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                } 
                  }
                }    
            }
            netflixNewsGroup {
              netflixEmbeds
              genre
              filmTitle
              embedText
              director
              cast
                  netflixNewsRelated {
                    edges {
                      node {
                        ... on NetflixNaijaPost {
                          id
                          slug
                          title
                          excerpt
                             contentTags{
                     nodes{
                     name
                     slug
                     }
                     }
                          featuredImage {
                            node {
                              altText
                              sourceUrl
                              caption
                            }
                          }
                          date
                        }
                      }
                    }
                  }
            }
         
          }
        }
      }
    }
 }  }  
       ` 
      
      }) 
      
      })
      .then(response => response)  
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.netflixCategories.edges
     return response
}

 export async function readNext(after){
 const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query NEXTPOSTS($after: String!){
    netflixNaijaPosts(first:4,after:$after) {
    edges {
      node {
        title
        slug
        date
        contentTags{
        nodes{
        name
        slug
        }
        }
          netflixCategories { 
          nodes {
            name
            slug
          }
        }
    
        author{
        node{
        name
        slug
        }
        }
        featuredImage {
          node {
            altText
            sourceUrl
            caption
          }
        }
      }
    }
  }
    }
      `,
      variables: { after: after },
    
    
    })}).then(response => response)  
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.netflixNaijaPosts.edges
     return response

 }


export async function byNetflixCategory(slug){
 
          
} 


export async function netflixDetails(slug){ 
    try{
     const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
  method: 'POST',
  timeout: 5000 ,
  agent: agent,
  headers:{
  'Content-Type':'application/json'
  },
  body: JSON.stringify({
  query:`
  query POSTTYPE($id: ID!, $idType: NetflixNaijaPostIdType) {
  netflixNaijaPost(id: $id, idType: $idType) {
      title
    id
    excerpt 
    slug 
    contentTypeName
    contentTags {
      nodes {
        slug
        name
      }
    }
    netflixCategories {
      nodes {
        name
        slug
      }
    }
  featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
    date
    content
    author {
      node {
        name 
        slug
        avatar{
            url
            }
      }
    }
    netflixNewsGroup {
      intro
      netflixEmbeds
       mostAnticpatedAfrican
        mostAnticpatedForeign
        mostAnticpatedNollywood
      netflixNewRelated {
       edges {
          cursor
        node{
          ... on NetflixNaijaPost {
            id
            date
            content
            excerpt
            slug
            title 
          featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
            contentTags {
              nodes {
                name
                slug
              }
            }
            netflixCategories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
                slug
                  avatar{
            url
            }
              }
            }
          }
        }
  }}
          netflixComingRelated {
       edges {
          cursor
        node{
          ... on NetflixNaijaPost {
            id
            date
            content
            excerpt
            slug
            title 
          featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
            contentTags {
              nodes {
                name
                slug
              }
            }
            netflixCategories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
                slug
                  avatar{
            url
            }
              }
            }
          }
        }
  }}
      netflixNewsRelated {
        nodes {
          ... on NetflixNaijaPost {
            id
            date
            content
            excerpt
            slug
            title 
          featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
            contentTags {
              nodes {
                name
                slug
              }
            }
            netflixCategories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
                slug
                  avatar{
            url
            }
              }
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
  idType: 'URI'   
  }
  
  })
  
  }).then(response =>  response)   
    .then(data =>data) 
    .catch(error => console.error('Error:', error));
const response = wprest?.data.netflixNaijaPost
return response
    } catch (error) {
       console.error('Error fetching data:', error); 
     } 
  }

  export async function fullListNew(req, res){
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent,
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS { 
 netflixCategories(where: {name: "Full List Newly Added"}) {
    edges {
      node {
        netflixNaijaPosts { 
            nodes {
              slug
              title
              id
              excerpt
              date
              content
            
          }
        }
      }
    }
    }
    }
 `   })
        
        }).then(response =>  response)   
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data.netflixCategories.edges
       return response
  }

  export async function whatToWatch() {
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "What to Watch"}) {
    edges {
      node {
        netflixNaijaPosts(first:1) { 
            nodes {
              slug
              title
              id
              excerpt
              date
              content 
                 featuredImage {
                node {
                  altText
                  sourceUrl
                  
                }
              }
         author{
      node{
      name
      }}
  netflixNewsGroup { 
  intro 
  
  }  }
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
       const response = wprest?.data.netflixCategories.edges
       return response
  }


  export async function netflixNews() {
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "News"}) {
    edges {
      node {
      name
      slug         
          netflixNaijaPosts(first:20) { 
          nodes { 
          id
            slug
            title
            date
            excerpt 
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  } 
   netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
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
      const response = wprest?.data.netflixCategories.edges
      return response
  }
 

  export async function netflixPopular() {
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "Popular"}) {
    edges {
      node {
      name
      slug         
          netflixNaijaPosts(first:50) { 
          nodes { 
          id
            slug
            title
            date
            excerpt 
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  }  netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
              }
          }
        }
      }
              
  }
        }
      }
   
    
       ` 
      
      })
      
      }).then(response => response )  
      .then(data =>data) 
      .catch(error => console.error('Error:', error));     
      const response = wprest?.data.netflixCategories.edges
      return response
  }
 

  export async function netflixAfrica() {
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "Africa"}) {
    edges {
      node {
      name
      slug         
          netflixNaijaPosts(first:50) { 
          nodes { 
          id
            slug
            title
            date
            excerpt 
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  }  netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
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
      const response = wprest?.data.netflixCategories.edges
      return response
  }
 
  
 export async function netflixNewsDets(slug){
 
    try{
     const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
  method: 'POST',
  timeout: 5000 ,
  agent: agent,
  headers:{
  'Content-Type':'application/json'
  },
  body: JSON.stringify({
  query:`
  query NETFLIXNEWS($id: ID!, $idType: NetflixNaijaIdType) {
  netflixNaija(id: $id, idType: $idType) {
      title
    id
    excerpt
    slug
    contentTags {
      nodes {
        slug
        name
      }
    }
    featuredImage {
      node {
         caption
        sourceUrl
        altText
      }
    }
    date
    content
    author {
      node {
        name
      }
    }
         netflixNewsGroup {
      intro
      netflixEmbeds
      netflixNewsRelated {
        nodes {
          ... on NetflixNaija {
            id
            date
            content
            excerpt
            slug
            title
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           contentTags {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    }
 netflixCategories {
      nodes {
        name
        slug
         children {
          nodes {
            name
            netflixNaijaPosts {
             edges{
              node { 
              slug
                title
                excerpt
                content
                date
                   author{
                      node{
                      name
                      }
                      }
                 netflixNewsGroup { 
                  netflixEmbeds
                    genre
                  director
                  cast
                  filmTitle
                }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                  }
                } 
              }}
            }
          }
        }
        netflixNaijaPosts {
          nodes {
            content
            date
            id
            title
            excerpt 
             slug
               author{
                node{
                name
                }
                }
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           contentTags {
              nodes {
                name
                slug
              }
            }
             netflixNewsGroup {
              netflixNewsRelated {
                edges {
                  node {
                    date
                    id
                    slug
                    ... on NetflixNaija {
                      id
                      content
                      title
                      slug
                    }
                  }
                }
              }
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
    const response = wprest?.data.netflixNaija 
    return response
    } catch (error) {
       console.error('Error fetching data:', error); 
     } 
  }
  export async function netflixInter() {
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "International"}) {
    edges { 
      node {
      name
      slug 
          
          netflixNaijaPosts(first: 2) {
             pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
          nodes { 
          id
            slug
            title
            date
            excerpt 
             
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  }  netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
              }
          }
        }
      }
              
  }
        }
      }
   
    
       ` 
      
      })
      
      }).then(response => response )  
      .then(data =>data) 
      .catch(error => console.error('Error:', error));     
     const response= wprest?.data.netflixCategories
     return response
  }


  export async function netflixNigNaija() {
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "Naija"}) {
    edges { 
      node {
      name
      slug      
      netflixNaijaPosts(first:2) {
         pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
          nodes { 
          id
            slug
            title
            date
            excerpt
            
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  }  netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
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
      const response= wprest?.data.netflixCategories 
      return response
  }

  export const fetchNew  = async (first, after ) => {  

    const wp_naija = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS($first: Int, $after: String) { 
     netflixCategories(where: {name: "Naija"}) {
    edges { 
      node {
      name
      slug         
          netflixNaijaPosts(first:$first, after: $after){
           pageInfo {
                hasNextPage
                endCursor
              }
          nodes { 
          id
            slug
            title
            date
            excerpt 
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  }  netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
              }
          }
        }
      }
              
  }
        }
      }
   
    
       ` ,
        variables: { first: first, after: after }, 
      
      })
      
      }).then(response => response)   
      .then(data =>data) 
      .catch(error => console.error('Error:', error));     
    const res_naija = wp_naija?.data.netflixCategories.edges
    return res_naija
  }

 export const fetchNewInter = async (first, after ) => {  

  const wp_naija = await fetchWithRetry('https://content.culturays.com/graphql',{
    method: 'POST',
    timeout: 5000 ,
    agent: agent,
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      query:`
    query WPPOSTS($first: Int, $after: String) { 
   netflixCategories(where: {name: "International"}) {
  edges { 
    node {
    name
    slug         
        netflixNaijaPosts(first:$first, after: $after){
         pageInfo {
              hasNextPage
              endCursor
            }
        nodes { 
        id
          slug
          title
          date
          excerpt 
           featuredImage {
              node {
                altText
                sourceUrl 
              }
            }
       author{
    node{
    name
    }
    }
netflixNewsGroup { 
intro 

}  netflixCategories {
            nodes {
              slug
              name
            }
          }
          contentTags{
            nodes{
            name
            slug
            }
            }
        }
      }
    }
            
}
      }
    }
 
  
     ` ,
      variables: { first: first, after: after }, 
    
    })
    
    }).then(response => response)   
    .then(data =>data) 
    .catch(error => console.error('Error:', error));     
  const res_naija = wp_naija?.data.netflixCategories.edges
  return res_naija
}

 