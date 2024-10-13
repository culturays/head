import { agent, fetchWithRetry } from "@/utils/fetchwithretry";
 

export async function businessBlog(req, res){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent, 
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        businesses  {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
         businessCategories {
            nodes {
              name 
              slug
               businesses  {
        nodes {
          title
          slug
           date
           content
           id
           excerpt
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          
          
          }}
            }
          }
          author {
            node {
              firstName
              lastName
              name
              description
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
       const response = wprest?.data.businesses.nodes
       return response
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
}  



export async function techBlog(req, res){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        technologies {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
          techCategories {
            nodes {
              name
              slug
                technologies {
        nodes {
          title
          slug
           date
           content
           id 
           excerpt
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          } 
          
          }}
            }
          }
          author {
            node {
              firstName
              lastName
              name
              description
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
        const response = wprest?.data.technologies.nodes
        
       return response  
 
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
} 


export async function economyBlog(req, res){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        economies {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
        economyCategories {
            nodes {
              name
              slug
                economies {
        nodes {
          title
          slug
           date
           content
           id 
           excerpt
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        
          
          }}
            }
          }
          author {
            node {
              firstName
              lastName
              name
              description
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
       const response = wprest?.data.economies.nodes
       return response
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
} 
export async function awardsBlog(req, res){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        awards(first:100)  {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
        awardCategories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              firstName
              lastName
              name
              description
            }
          }
        }
      }
       }  
       `  
      })
      
      }).then(response =>response)
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
       const response = wprest?.data.awards.nodes
       return response
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
} 


export async function healthBlog(req, res){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        healths {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
          healthCategories {
            nodes {
              name
              slug
                healths {
        nodes {
          title
          slug
           date
           content
           id
            excerpt
          contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
         
          }
          
          }
            }
          }
          author {
            node {
              firstName
              lastName
              name
              description
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
        const response = wprest?.data.healths.nodes
        
       return response  
 
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
} 
export async function environmentBlog(req, res){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        environments {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
          environmentCategories {
            nodes {
          name
          slug
            environments {
        nodes {
          title
          slug
           date
           content
           id
            excerpt
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          
          }}
            }
          }
          author {
            node {
              firstName
              lastName
              name
              description
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
        const response = wprest?.data.environments.nodes
        
       return response  
 
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
} 
export async function societyBlog(req, res){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        societies {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
          societyCategories {
            nodes {
              name
              slug
               societies {
        nodes {
          title
          slug
           date
           content
           id
            excerpt
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
          
          }}
            }
          }
          author {
            node {
              firstName
              lastName
              name
              description
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
        const response = wprest?.data.societies.nodes        
       return response  
 
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
} 

export async function nollywoodBlog(req, res){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        nollywoods(last:100 ) {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
         nollywoodCategories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              firstName
              lastName
              name
              description
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
       const response = wprest?.data.nollywoods.nodes        
       return response  
 
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
} 
 

export async function trends(notIn){ 
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID] ){
        trends(first:100,where:{notIn:$notIn}) {
        nodes {
         contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
         trendingCategories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              firstName
              lastName
              name
              description
            }
          }
        }
      }
       }  
       `,variables:{notIn:notIn} 
      })
      
      }).then(response => response) 
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
       const response = wprest?.data.trends.nodes 
       return response 
 
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
} 


export async function trending(slug){  
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
query TREND($id: ID!, $idType: TrendingIdType) {
trending(id: $id, idType: $idType) {
id
    title
    slug
    date
    content
    excerpt   
       featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
                caption
              }
            }
             trendinggroup {
      intro
      relatedTrends(first: 20 ) {
        nodes {
          ... on Trending {
            id
            title
            slug
            date
            excerpt
            featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
                caption
              }
            }
          }
        }
      }
    }
    contentTags {
      nodes {
        trends(first: 20) {
          nodes {
          id
            slug
            title
            content 
            excerpt
            date
          trendinggroup {
      intro
      relatedTrends(first: 20) {
        nodes {
          ... on Trending {
            id
            title
            slug
            date
            excerpt
                featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
                caption
              }
            }
          }
        }
      }
    }
            featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
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
      const response = wprest?.data.trending 
       return response 
 
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
}

export async function similarTrending(notIn){
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
 query TREND( $notIn: [ID]) {
   trendingCategories {
       nodes {
       id
       name
       slug
         trends(first: 20,where:{notIn:$notIn}) {
           nodes {
           id
             slug
             title
             content 
             excerpt
             date
              featuredImage {
               node {
                 altText
                 sourceUrl
                 slug
                 title
                 caption
               }
             }
               contentTags {
       nodes {
       id
       name
       slug
       
       
       }}
           trendinggroup {
       intro
       relatedTrends(first: 20) {
         nodes {
           ... on Trending {
             id
             title
             slug
             date
             excerpt
                 featuredImage {
               node {
                 altText
                 sourceUrl
                 slug
                 title
                 caption
               }
             }
           }
         }
       }
     } }
         }
       }
     } 
 
 }
 ` ,
 variables:{ 
 notIn:notIn
 }
 
 })
 
 }).then(response =>  response) 
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
       const response = wprest?.data.trendingCategories.nodes 
        return response 
  
   } catch (error) {
    if(error)throw new Error('Error fetching data')
   
    }
    
 } 
 
 
 export async function news_details_all(uri){ 
 
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
query NODE($id: ID!, $idType: ContentNodeIdTypeEnum!) {
contentNode(id: $id, idType: $idType) {
   id
    uri
    contentTypeName
     ... on Business {
      id
      title
      slug
      excerpt
      content
        newsGroup {
        related {
         edges {
                    node {
                      date
                      id 
                      ... on Business {
                        id
                        content
                        title
                        slug
                        businessCategories{  
                        nodes{
                        name
                        slug
                        }
                      
                        }
                           featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
                      }
                    }
                  }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
        }
      }
    }
       ... on Award {
      id
      title
      slug
      excerpt
      content
        newsGroup {
        related {
         edges {
                    node {
                      date
                      id 
                      ... on Award {
                        id
                        content
                        title
                        slug
                        awardCategories{  
                        nodes{
                        name
                        slug
                        }
                      
                        }
                           featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
                      }
                    }
                  }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
        }
      }
    }

  ... on Nollywood {
      id
      title
      slug
      excerpt
      content
        newsGroup {
        related {
         edges {
                    node {
                      date
                      id 
                      ... on Nollywood {
                        id
                        content
                        title
                        slug
                        nollywoodCategories{  
                        nodes{
                        name
                        slug
                        }
                      
                        }
                           featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
                      }
                    }
                  }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
        }
      }
    }

       ... on Article {
      id
      title
      slug
      excerpt
      content
        newsGroup {
        related {
         edges {
                    node {
                      date
                      id 
                      ... on Article {
                        id
                        content
                        title
                        slug
                      articlesCategories{  
                        nodes{
                        name
                        slug
                        }
                      
                        }
                           featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
                      }
                    }
                  }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
        }
      }
    }
     ... on Economy {
      id
      title
      slug
      excerpt
      content
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
        }
      }
         newsGroup {
        related {
         edges {
                    node {
                      date
                      id 
                      ... on Economy {
                        id
                        content
                        title
                        slug
                         economyCategories{  
                        nodes{
                        name
                        slug
                        }
                      
                        }
                           featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
                      }
                    }
                  }
        }
      }
    }
    ... on Environment {
      id
      title
      slug
      excerpt
      content
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
        }
      }
         newsGroup {
        related {
         edges {
                    node {
                      date
                      id 
                      ... on Environment {
                        id
                        content
                        title
                        slug
                           environmentCategories{  
                        nodes{
                        name
                        slug
                        }
                      
                        }
                           featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }}
                    }
                  }
        }
      }
    }
     ... on Society {
      id
      title
      slug
      excerpt
      content
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
        }
      }
         newsGroup {
        related {
         edges {
                    node {
                      date
                      id 
                      ... on Society {
                        id
                        content
                        title
                        slug
                          societyCategories{  
                        nodes{
                        name
                        slug
                        }
                      
                        }
                           featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
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
      slug
      excerpt
      content
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
        }
      }
         newsGroup {
        related {
         edges {
                    node {
                      date
                      id 
                      ... on Health {
                        id
                        content
                        title
                        slug
                        healthCategories{  
                        nodes{
                        name
                        slug
                        }
                      
                        }
                           featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
                      }
                    }
                  }
        }
      }
    } 
    ... on Tech {
      id
      title
      slug
      excerpt
      content
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
        }
      }
         newsGroup {
        related {
         edges {
                    node {
                      date
                      id 
                      ... on Tech {
                        id
                        content
                        title
                        slug
                           featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }  }  }
     }
        }
      }
    }
  }
}   
` ,
variables:{
id: uri,
idType: 'URI' 
}

})

}).then(response =>  response)    
       .then(data =>data) 
       .catch(error => console.error('Error:', error)); 
      const response = wprest?.data.contentNode
      return response
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
  
}
export async function news__Articles(){
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
query PASSAGENEWS{ 
   articlesCategories(first:15){
    nodes{
    name
    slug
articles(first:10){
nodes{ 
id
title
 slug
 date 
 excerpt
  author {
 node {
  firstName
  lastName
 name
 slug
  description
  }
 }
  featuredImage { 
   node {
   sourceUrl
     altText
    }
 } 
   contentTags{
    nodes{  id
    name 
    slug
    }
    }
  articlesCategories{
    nodes{
    name 
    slug
    }
    } 
 newsGroup {  
 related {  
nodes {
... on Article {
id
content  
title
 slug
 date
 content 
 excerpt
  author {
 node {
  firstName
  lastName
 name
 slug
  description
  }
 }
  featuredImage { 
   node {
   sourceUrl
     altText
    }
 } 
   contentTags{
    nodes{  id
    name
    slug
    }
    }
 articlesCategories{
    nodes{
    name
    slug
    }
    }
 
 }  } }
 
}

}
}

  }
}}
 
 `  
      })
        
        }).then(response => response)   
        .then(data =>data) 
        .catch(error => console.error('Error:', error)) 
        const response = wprest?.data.articlesCategories.nodes
      return response

} catch (error) {
  if(error)throw new Error('Error fetching data')

 }

  
}

 export async function viddetails(slug){
 
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
query NODE($id: ID!, $idType: VideoIdType!) {
video(id: $id, idType: $idType) {
   id
    slug
    title
    excerpt
    content
    author{
   node{
   name
   slug
   } 
    }
    featuredImage{
    node{
    caption
    sourceUrl
    altText
    }
    }
      contentTags {
              nodes {
                slug
                name
              }
            }
            videoCategories {
              nodes {
                slug
                name
              }
            }
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
      related {
        nodes {
          date
          ... on Video {
            id
            title
            slug
            featuredImage{
    node{
    caption
    sourceUrl
    altText
    }
    }
  contentTags {
              nodes {
                slug
                name
              }
            }
            videoCategories {
              nodes {
                slug
                name
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
     const response = wprest?.data.video
       return response
  } catch (error) {
    if(error)throw new Error('Error fetching data')
    // console.error('Error fetching data:', error);
  
   }
  
}

export const vids = async()=>{  
  try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
    method: 'POST',
    headers:{ 
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      query: `
       query WPVIDEOS {
      videos { 
    nodes {
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
      content 
      date
      excerpt
      slug
      title
        contentTags{
         nodes{
         slug
         name
         }
         
         } 
         videoCategories{
         nodes{
         slug
         name
         }
         
         }   
      featuredImage{
      node{
      sourceUrl
      altText
      }
      
      }
    }
  }
    }
    `
    })
 
    }) 
    .then(response =>  response)   
    .then(data =>data) 
    .catch(error => console.error('Error:', error));
    const response = wprest?.data.videos.nodes 
    return response 
    
  } catch (error) {
    if(error)throw new Error('Error fetching data')
    //console.error('Error fetching data:', error);
 
  }
  }
  export const contentFeed = async()=>{  
    try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query: `query CONTENTFEED{
          contentNodes(first:100) {
      nodes {
        date
        contentTypeName
        ... on Tech {
           id
          title
          slug
          author {
          node {
          name
            slug
          }
        }
              featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }   ... on Video {
           id
          title
          slug
          author {
          node {
          name
            slug
          }
        }
              featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }   ... on Post {
           id
          title
          slug
          author {
          node {
          name
            slug
          }
        }
              featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }   ... on Nollywood {
           id
          title
          slug   
          author {
          node {
            name
            slug
          }
        }
              featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }    ... on Article {
           id
          title
          slug  
           author {
          node {
         name
            slug
          }
        }
              featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }    ... on Society {
          id
          title
          slug   
          author {
          node {
         name
            slug
          }
        } 
          featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }  ... on Health {
          id
          title
          slug 
           author {
          node {
          name
            slug
          }
        }
              featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }  ... on Economy {
          id
          title
          slug 
           author {
          node {
          name
            slug
          }
        } 
          featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }  ... on Trending {
          id
          title
          slug 
           author {
          node {
          name
            slug
          }
        } 
          featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }  ... on Environment {
          id
          title
          slug 
           author {
          node {
           name
            slug
          }
        }
              featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }  ... on Business {
          id
          title
          slug 
           author {
          node {
            name
            slug
          }
        }
              featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        }  
      }
    }
        
        }`})
      
      }).then(response => response)   
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.contentNodes.nodes 
      return response
    } catch (error) {
      if(error)throw new Error('Error fetching data')
   //console.error('Error fetching data:', error);
   
    }
    }

 