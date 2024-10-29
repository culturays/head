import { agent, fetchWithRetry } from "@/utils/fetchwithretry";
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
        awards(first:100) {
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
      contentTags{
                  nodes {
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
              ... on Business {
                id
                content
                title
                slug
                 contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                businessCategories {
                  nodes {
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
          avatar{
          url
          }
        }
      }
    }
    ... on Award {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
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
              ... on Award {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                awardCategories {
                  nodes {
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
            avatar{
          url
          }
        }
      }
    }
    ... on Nollywood {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
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
              ... on Nollywood {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                nollywoodCategories {
                  nodes {
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
            avatar{
          url
          }
        }
      }
    }

    ... on Article {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
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
              ... on Article {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                articlesCategories {
                  nodes {
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
            avatar{
          url
          }
        }
      }
    }
    ... on Economy {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
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
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
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
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                economyCategories {
                  nodes {
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
         contentTags{
                  nodes {
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
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
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
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                environmentCategories {
                  nodes {
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
    ... on Society {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
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
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
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
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                societyCategories {
                  nodes {
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
         contentTags{
                  nodes {
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
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
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
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                healthCategories {
                  nodes {
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
    ... on Technology {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                     techCategories {
                  nodes {
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
      date
      author {
        node {
          name
          slug
          avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Technology {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                      techCategories {
                  nodes {
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


  }
}   
` ,
variables:{
id: uri,
idType: 'URI' 
}

})

}).then(response => response)    
       .then(data =>data) 
       .catch(error => console.error('Error:', error)); 
      const response = wprest?.data.contentNode
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
}).then(response =>  response)
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
        ... on Technology {
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
      
      }).then(response =>  response)   
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.contentNodes.nodes 
      return response
    } catch (error) {
      if(error)throw new Error('Error fetching data')
   //console.error('Error fetching data:', error);
   
    }
  
  }

 