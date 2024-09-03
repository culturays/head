import {agent, fetchWithRetry } from "@/utils/fetchwithretry"
 
export async function newsbyNewOnCategory(req, res){
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
     netflixCategories(where: {name: "New on Netflix Naija"}) {
       edges {
      node {
        name
        slug
        netflixNaija {
          edges {
            node {
              content
              date
              excerpt
              slug
              title
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
              netflixTags { 
                  nodes {
                    name
                    slug
                  } 
              }
                netflixNewsGroup {
      netflixRelated {
        nodes {
          date
          slug
           ... on Latest {
            id
            content
            excerpt
            title
            slug
             contentTypeName
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           }
          ... on NetflixNaija {
            id
            content
            excerpt
            title
            slug
             contentTypeName
            featuredImage {
              node {
                altText
                sourceUrl
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
       } 
       }  
       ` 
      
      })
      
      }).then(response => response)  
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
     const response = wprest.data.netflixCategories.edges
      return response
}

export async function newsbyComingtoCategory(req, res){
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
      netflixCategories(where: {name: "Coming to Netflix Naija"}) {
     edges {
      node {
        name
        slug
        netflixNaija {
          edges {
            node {
              content
              date
              excerpt
              slug
              title
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
              netflixTags { 
                  nodes {
                    name
                    slug
                  } 
              }
                   netflixNewsGroup {
      netflixRelated {
        nodes {
          date
          slug
           ... on Latest {
            id
            content
            excerpt
            title
            slug
             contentTypeName
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           }
          ... on NetflixNaija {
            id
            content
            excerpt
            title
            slug
             contentTypeName
            featuredImage {
              node {
                altText
                sourceUrl
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
       }  }
       ` 
      
      })
      
      }).then(response => response) 
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
       const response = wprest.data.netflixCategories.edges
       return response 
} 
 
export async function byNetflixCategory(slug){
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
    method: 'POST',
    timeout: 5000 ,
    agent: agent,
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
    query:`
    query TREND($id: ID!, $idType: NetflixNaijaIdType) {
    netflixNaija(id: $id, idType: $idType) {
         title
      slug
      content
      excerpt
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
              netflixTags {
                nodes {
                  name
                  slug
                }
              }
        netflixNewsGroup {
            intro
            netflixEmbeds
                netflixRelated {
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
      netflixCategories {
        nodes {
          name
          netflixNaija {
            nodes {
              content
              date
              id
              title
              excerpt  slug
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
              netflixTags {
                nodes {
                  name
                  slug
                }
              }
               netflixNewsGroup {
                netflixRelated {
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
    
    }).then(response => response )  
           .then(data =>data) 
           .catch(error => console.error('Error:', error));
   const response = wprest.data.netflixNaija 
   return response
} 
export async function byFirstLook(slug){
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
    method: 'POST',
    timeout: 5000 ,
    agent: agent,
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
    query:`
    query TREND($id: ID!, $idType: NetflixNaijaIdType) {
    netflixNaija(id: $id, idType: $idType) {
         title
      slug
      content
      excerpt
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
            intro
            netflixEmbeds
                netflixRelated {
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
      netflixCategories {
        nodes {
          name
          allNetflixNaija {
            nodes {
              content
              date
              id
              title
              excerpt 
               slug
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
                netflixRelated {
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
    
    }).then(response =>  response)  
           .then(data =>data) 
           .catch(error => console.error('Error:', error));
           const response = wprest.data.netflixNaija 
           return response
}

export async function byMonthly(slug){
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
    method: 'POST',
    timeout: 5000 ,
    agent: agent,
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
    query:`
    query TREND($id: ID!, $idType: NetflixNaijaIdType) {
    netflixNaija(id: $id, idType: $idType) {
         title
      slug
      content
      excerpt
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
              netflixTags {
                nodes {
                  name
                  slug
                }
              }
        netflixNewsGroup {
            intro
            netflixEmbeds
                netflixRelated {
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
      netflixCategories {
        nodes {
          name
          netflixNaija {
            nodes {
              content
              date
              id
              title
              excerpt  slug
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
              netflixTags {
                nodes {
                  name
                  slug
                }
              }
               netflixNewsGroup {
                netflixRelated {
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
    
    }).then(response => response )  
           .then(data =>data) 
           .catch(error => console.error('Error:', error));
   const response = wprest.data.netflixNaija 
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
            name
            netflixNaija {
             edges{
              node { 
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
        netflixNaija {
          edges {
            node {
              content
              date
              excerpt
              slug
              title
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
                }
              }
              netflixTags { 
                  nodes {
                    name
                    slug
                  } 
              }
            }
          }
        }
        netflixNaija {
          edges {
            node {
              content
              date
              excerpt
              slug
              title
                  netflixNewsGroup { 
                  netflixEmbeds
                  genre
                  director
                  cast
                  filmTitle
                  embedText
                }
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            netflixTags { 
                  nodes {
                    name
                    slug
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
      .then(response =>  response)  
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
     const response = wprest.data.netflixCategories.edges
     return response 
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
  query TREND($id: ID!, $idType: NetflixNaijaIdType) {
  netflixNaija(id: $id, idType: $idType) {
      title
    id
    excerpt
    slug
    netflixTags {
      nodes {
        slug
        name
      }
    }
    featuredImage {
      node {
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
      netflixRelated {
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
            netflixTags {
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
            netflixNaija {
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
        netflixNaija {
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
            netflixTags {
              nodes {
                name
                slug
              }
            }
             netflixNewsGroup {
              netflixRelated {
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
  
  }).then(response => response )  
    .then(data =>data) 
    .catch(error => console.error('Error:', error));
 const response = wprest.data.netflixNaija 
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
 netflixCategories(where: {name: "Full List of New"}) {
    edges {
      node {
        netflixNaija { 
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
        const response = wprest.data.netflixCategories.edges
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
        allNetflixNaija { 
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
       const response = wprest.data.netflixCategories.edges
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
          allNetflixNaija { 
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
      const response = wprest.data.netflixCategories.edges
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
          allNetflixNaija { 
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
      const response = wprest.data.netflixCategories.edges
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
          allNetflixNaija { 
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
      const response = wprest.data.netflixCategories.edges
      return response
  }
 
  export async function netflixCulture() {
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
 netflixCategories(where: {name: "Culture"}) {
    edges { 
      node {
      name
      slug         
          allNetflixNaija { 
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
      const response = wprest.data.netflixCategories.edges
      return response
  }
  export async function netflixStories() {
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
 netflixCategories(where: {name: "Stories"}) {
    edges {
      node {
      name
      slug         
          allNetflixNaija { 
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
      const response = wprest.data.netflixCategories.edges
      return response
  }
  export async function netflixSocials() {
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
 netflixCategories(where: {name: "Socials"}) {
    edges {
      node {
      name
      slug         
          allNetflixNaija { 
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
      const response = wprest.data.netflixCategories.edges
      return response
  }
  export async function netflixDeals() {
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
 netflixCategories(where: {name: "Deals"}) {
    edges {
      node {
      name
      slug         
          allNetflixNaija { 
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
      const response = wprest.data.netflixCategories.edges
      return response
  }
  export async function netflixCollaborations() {
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
 netflixCategories(where: {name: "Collaborations"}) {
    edges {
      node {
      name
      slug         
          allNetflixNaija { 
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
      const response = wprest.data.netflixCategories.edges
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
      netflixRelated {
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
            allNetflixNaija {
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
        allNetflixNaija {
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
              netflixRelated {
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
    const response = wprest.data.netflixNaija 
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
          
          allNetflixNaija(first: 2) {
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
     const response= wprest.data.netflixCategories
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
      allNetflixNaija(first:2) {
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
      const response= wprest.data.netflixCategories 
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
          allNetflixNaija(first:$first, after: $after){
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
    const res_naija = wp_naija.data.netflixCategories.edges
    return res_naija
  }

//  secondSet: tags(last: 100, after: "YXJyYXljb25uZWN0aW9uOjQx"){      
//   nodes {
//     id 
//     slug
//     name
//     posts{
//       nodes{
//           slug
//       title
//       tags{
//         nodes{
//           name
//           slug
//         }
//       }
//       featuredImage{
//         node{ 
//           sourceUrl
//           altText
//         }
//       }
//       }
     


//     }
//   }

// pageInfo {
//   endCursor
//   hasNextPage
// }
// }
// thirdSet: tags(last: 100, after: " "){      
// nodes {
//   id 
//   slug
//   name
//   posts{
//     nodes{
//         slug
//     title
//     tags{
//       nodes{
//         name
//         slug
//       }
//     }
//     featuredImage{
//       node{
//         sourceUrl
//         altText
//       }
//     }
//     }
   


//   }
// }

// pageInfo {
// endCursor
// hasNextPage
// }
// }
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
        allNetflixNaija(first:$first, after: $after){
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
  const res_naija = wp_naija.data.netflixCategories.edges
  return res_naija
}