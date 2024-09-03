import { agent, fetchWithRetry } from "@/utils/fetchwithretry";
 
 export async function category (slug) { 
// const wprest = await fetch('https://content.culturays.com/graphql',{
// method: 'POST',
// headers:{
// 'Content-Type':'application/json'
// },
// body: JSON.stringify({
// query:`
// query POSTCATEGORY($id: ID!, $idType: CategoryIdType) {
// category(id: $id, idType:$idType){
// id
// name
// slug
// posts {
// edges {
// node {
// id
// postId
// slug
// title 
// date
// featuredImage{
// node{
//   sourceUrl
//   altText
// }
// }
// categories {
// nodes {
//   id
//   name
// slug
// }
// }
// }
// }
// }
// }
// }   
// ` ,
// variables:{
// id: slug,
// idType: 'SLUG' 
// }

// })

// })
// if( wprest.status!==200)throw new Error( wprest.status)
// const itemRes = await wprest.json()
// return itemRes
}
export async function newsByLatest(req, res){  
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
      latests {
        nodes {
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              id
              slug
              name
              latests {
                edges {
                  node {
                    id 
                    slug
                    title(format: RAW)
                    date
                    latestCategories {
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
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
          latestCategories {
            nodes {
              name
              slug
               latests {
                    nodes {
                      title
                      slug
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
      const response = wprest.data.latests.nodes  
      return response
}

export async function news_posts(req, res){  
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
      posts {
        nodes {
          title
          slug
           date
           content
           id
           tags {
            nodes {
              id
              slug
              name
              posts {
                edges {
                  node {
                    id
                    postId
                    slug
                    title(format: RAW)
                    date
                    categories {
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
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
          categories {
            nodes {
              name
              slug
               posts {
                    nodes {
                      title
                      slug
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
       const response = wprest.data.posts.nodes 
       
      return response 
     
} 


export async function newsCallbyBlog(req, res){
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
        posts(last:100, where: {categoryName: "Blog"}) {
        nodes {
          title
          slug
           date
           content
           id
           tags {
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
          categories {
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
      
      })
    .then(response => response) 
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
        const response = wprest.data.posts.nodes
        
       return response 
  } catch (error) {
     console.error('Error fetching data:', error);
  
   }
 
}   


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
       const response = wprest.data.businesses.nodes
       return response
  } catch (error) {
     console.error('Error fetching data:', error);
  
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
        tech(last:100 ) {
        nodes {
          title
          slug
           date
           content
           id
           tags {
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
          categories {
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
        const response = wprest.data.tech.nodes
        
       return response  
 
  } catch (error) {
     console.error('Error fetching data:', error);
  
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
        economies  {
        nodes {
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
       const response = wprest.data.economies.nodes
       return response
  } catch (error) {
     console.error('Error fetching data:', error);
  
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
        health(last:100 ) {
        nodes {
          title
          slug
           date
           content
           id
           tags {
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
          categories {
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
        const response = wprest.data.health.nodes
        
       return response  
 
  } catch (error) {
     console.error('Error fetching data:', error);
  
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
        allEnvironment(last:100 ) {
        nodes {
          title
          slug
           date
           content
           id
           tags {
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
          categories {
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
        const response = wprest.data.allEnvironment.nodes
        
       return response  
 
  } catch (error) {
     console.error('Error fetching data:', error);
  
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
        society(last:100 ) {
        nodes {
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
        const response = wprest.data.society.nodes        
       return response  
 
  } catch (error) {
     console.error('Error fetching data:', error);
  
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
      
      }).then(response =>response) 
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
       const response = wprest.data.nollywoods.nodes        
       return response  
 
  } catch (error) {
     console.error('Error fetching data:', error);
  
   }
 
} 
 

export async function trends(req, res){
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
        trends {
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
       `  
      })
      
      }).then(response => response) 
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
       const response = wprest.data.trends.nodes        
       return response
 
  } catch (error) {
     console.error('Error fetching data:', error);
  
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
              }
            }
    tags {
      nodes {
        trends {
          nodes {
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
      const response = wprest.data.trending 
       return response 
 
  } catch (error) {
     console.error('Error fetching data:', error);
  
   }
 
}

export async function otherContentAndPeoplePage(){
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
query:`
query WPOTHERS{
others {
    edges {
      node {
        id
        date  
         excerpt
        title
        slug
        content
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
          otherCategories {
          nodes {
           name
           slug
          }
        }
        contentTags {
          nodes {  
           name
           slug
          }
        }
      }
    }
  }
   } `  
      })
        
        }).then(response =>  response)  
        .then(data =>data) 
        .catch(error => console.error('Error:', error)) 
        const response = wprest.data.others.edges 
      return response 
} 

export async function followUpContent(){
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
query:`
query WPOTHERS{
   contentNodes {
    edges {
      node {
        contentTypeName
        id
        slug
        ... on Health {
          id
         excerpt
          title
          slug
            featuredImage {
            node {
              altText
              sourceUrl
            }
          }
           followUpGroup {
            followUp
          }
          healthCategories {
            nodes {
              name
              slug
            }
          }
          contentTags {
            nodes {
              name
              slug
            }
          }
        }
       
        ... on Award {
          id
          excerpt
          title
          slug
              featuredImage {
            node {
              altText
              sourceUrl
            }
          }
           followUpGroup {
            followUp
          }
        awardCategories {
            nodes {
              name
              slug
            }
          }
          contentTags {
            nodes {
              name
              slug
            }
          }
        }
        ... on Business {
          id
            excerpt
          title
          slug
              featuredImage {
            node {
              altText
              sourceUrl
            }
          }
            followUpGroup {
            followUp
          }
               businessCategories {
            nodes {
              name
              slug
            }
          }
          contentTags {
            nodes {
              name
              slug
            }
          }
        }
        ... on CulturaysVideo {
          id
             excerpt
          title
          slug
              featuredImage {
            node {
              altText
              sourceUrl
            }
          }
             followUpGroup {
            followUp
          }
                culturaysVideoCategories {
            nodes {
              name
              slug
            }
          }
          contentTags {
            nodes {
              name
              slug
            }
          }
        }
        ... on Economy {
          id
            excerpt
          title
          slug
              featuredImage {
            node {
              altText
              sourceUrl
            }
          }
            followUpGroup {
            followUp
          }
             economyCategories {
            nodes {
              name
              slug
            }
          }
          contentTags {
            nodes {
              name
              slug
            }
          }
        }
        ... on Environment {
          id
               excerpt
          title
          slug
              featuredImage {
            node {
              altText
              sourceUrl
            }
          }
             followUpGroup {
            followUp
          }
             environmentCategories {
            nodes {
              name
              slug
            }
          }
          contentTags {
            nodes {
              name
              slug
            }
          }
        }
        ... on Other {
          id 
           excerpt
          title
          slug 
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          followUpGroup {
            followUp
          }
              otherCategories {
            nodes {
              slug
              name
          
            }
          }
        
          contentTags {
            nodes {
              name
              slug
            }
          }
        }
        ... on Society {
          id
          excerpt
          title
          slug
          featuredImage {
            node {
              altText
              sourceUrl
            }
          } 
          followUpGroup {
            followUp
          }
             societyCategories {
            nodes {
              name
              slug
            }
          }
          contentTags {
            nodes {
              name
              slug
            }
          }
        }
        ... on Tech {
          id 
          excerpt
          title
          slug
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          followUpGroup {
            followUp
          }
       techCategories{
            nodes {
              name
              slug
            }
          }
          contentTags {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
   } `  
      })
        
        }).then(response =>  response) 
        .then(data =>data) 
        .catch(error => console.error('Error:', error)) 
        const response = wprest.data.contentNodes.edges 
        return response
}

export async function awardsContent(){
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
          query:`
          query WPAWARDS{
       awards {
  edges {
    node {
      content
      contentTypeName
      date
      excerpt
      id 
       title
      slug
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
    
    awardCategories {
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
   } `  
        
        })
        
        }).then(response => response)   
        .then(data =>data) 
        .catch(error => console.error('Error:', error)) 
        const response = wprest.data.awards.edges
      return response 
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
     ... on Business {
      id
      title
      slug
      excerpt
      content
        newsNewsGroup {
        news_related {
         edges {
                    node {
                      date
                      id 
                      ... on Business {
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
        const response =wprest.data.contentNode
        return response
  } catch (error) {
     console.error('Error fetching data:', error);
  
   }
 
}