import { agent, fetchWithRetry } from "@/utils/fetchwithretry";
export async function newsByLatest(req, res){
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
          query WPPOSTS { 
         categories(where: {exclude: "YXJyYXljb25uZWN0aW9uOjUwMQ==", hideEmpty: true})  { 
            nodes {            
             posts(first: 1) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
                
              nodes{
               id
                title
                  slug
                  tags {
                    nodes {
                      name
                      slug
                    }
                  }
                   categories {
                    nodes {
                      name
                      slug
                    }
                  }
                excerpt
                  date
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
                      altText
                      sourceUrl
                    }
                  }
             postNewsGroup {
          newsPassage {
            nodes {
              ... on Post {
            id
            title
            slug
             date
             content 
              excerpt
                
                }
            }
          }
        }
         }
            }}}
        } 
         ` 
        
        })
        
        
        })  
        .then(response => response)    
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data 
        return response
  }catch(error){
    console.log(error)

  }
   
  }
  export async function newsViews(req, res){
    try{
     const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:12 , where: {categoryName: "Opinions"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
                edges{
               cursor
              node{
               id
                title
                  slug
                  tags {
                    nodes {
                    id
                      name
                      slug
                    }
                  }
                   categories {
                    nodes {
                      name
                      slug
                    }
                  }
                excerpt
                  date
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
                      altText
                      sourceUrl
                    }
                  }
             postNewsGroup {
          newsPassage {
            nodes {
              ... on Post {
            id
            title
            slug
             date
             content 
              excerpt
                
                }
            }
          }
        }
         }
           }  } 
        } 
         ` 
        
        })
        
        }).then(response => response)   
        .then(data =>data) 
        .catch(error => console.error('Error:', error)); 
        const response = wprest?.data?.posts?.edges
        return response
    }catch(error){ 
      if(error)throw new Error('Error fetching data')
    }
  
  }
   export async function postCategories (string){
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS($notIn:[ID]) { 
         categories(first:5, where: {orderby: TERM_ID, exclude: "YXJyYXljb25uZWN0aW9uOjUwMQ==", hideEmpty: true}) {          
         edges {
          cursor      
          node {
        name
        slug
         posts(first:6,where: {notIn: $notIn}) {
        pageInfo{
        endCursor
      startCursor
      hasNextPage
           }
         edges{
         cursor
            node {
              author {
                node {
                  name
                  slug
                }
              }
                 categories {
                nodes {
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
             
             
            }
          } 
      }
        }}
  }
    }   ` ,variables:{notIn:string}
        
        })
        
        }).then(response => response)     
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data
        return response
    }catch(error){
      return error
      if(error)throw new Error('Error fetching data')
    }
 
  } 

  export async function categoriesUnusedPosts (notIn ){
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID])  { 
       categories(first:5, where: {orderby: TERM_ID, exclude: "YXJyYXljb25uZWN0aW9uOjUwMQ==", hideEmpty: true} ) {
       edges {
        cursor 
        node {
      name
      slug
       posts(where: {notIn: $notIn}) {       
       edges{
          node {
            author {
              node {
                name
                slug
              }
            }
               categories {
              nodes {
                name
                slug
              }
            }
                tags {
              nodes {  id
                name
                slug
              }
            }
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
           
           
          }
       } } 
    }
  }
}
  }   ` ,variables:{notIn:notIn}
      
      })
      
      }).then(response => response)    
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
     const response = wprest?.data
     return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
  
  }
  export async function postNextCategories (string ){
    try{
 const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body: JSON.stringify({
             query:`
             query WPPOSTS( $exclude:[ID])  { 
            categories(first:4,where:{exclude: $exclude}) {
            edges {
             cursor 
             node {
           name
           slug
            posts  { 
            edges{
               node {
                 author {
                   node {
                     name
                     slug
                   }
                 }
                    categories {
                   nodes {
                     name
                     slug
                   }
                 }
                     tags {
                   nodes {  id
                     name
                     slug
                   }
                 }
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
                
                
               }
            } } 
         }
       }
     }
       }   ` ,variables:{exclude:string }
           
           })
           
           }).then(response =>  response)   
           .then(data =>data) 
           .catch(error => console.error('Error:', error));
           const response = wprest?.data
           return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
     } 
export async function newsPosts(notIn){
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
          query WPPOSTS($notIn:[ID] ) {                 
          posts(first:5, where: {notIn:$notIn}){
       pageInfo{
        endCursor
      startCursor
      hasNextPage
           }
          edges{
          cursor     
           node{
          title
           slug
             date
             content
             id
             tags {
              nodes { 
               id
                id
                slug
                name
                posts {
                  edges {
                    node {
                      id 
                      slug
                      title 
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
                slug
                description
              }
            }
        }
        }}  
}  ` ,variables:{notIn:notIn} 
        
        })
        
        }).then(response => response) 
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data 
        return response
  }catch(error){
    if(error)throw new Error('Error fetching data')
  }
 
  }   
   
  export async function nextNewsPosts(notIn){
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID]) { 
       categories(first:20) {          
       edges {
        cursor      
        node {
      name
      slug
       posts( where: {notIn: $notIn}) { 
          nodes {
            author {
              node {
                name
                slug
              }
            }
               categories {
              nodes {
                name
                slug
              }
            }
                tags {
              nodes {  id
                name
                slug
              }
            }
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
           
           
          }
        } 
    }
  }
}
  } ` ,
   variables:{notIn:notIn}
      
      })
      
      }).then(response =>  response)    
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data
      return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
  
  }
  export async function postsOutline (){
    try{
 const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query OUTLINEPOST{
      outlines(last: 1) {
    nodes {
      content
      featuredImage{
      node{
      sourceUrl
      altText
      }
      }
    }
        } } ` 
        
        })
        
        }).then(response => response)     
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data?.outlines?.nodes 
        return response
    }catch(error){ 
      if(error)throw new Error('Error fetching data')
    }

  }
 
  export async function postLastAndScrolledCategories (string ){
    try{
 const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body: JSON.stringify({
             query:`
             query WPPOSTS( $exclude:[ID])  { 
            categories(last:1,where:{exclude: $exclude}) {
            edges {
            cursor
             node {
           name
           slug
            posts(first:2) {
           pageInfo {
            startCursor
            endCursor
            hasNextPage
          } 

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
                  slug
                  title 
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
       }
     }
       } ` ,variables:{exclude:string }
           
           })
           
           }).then(response => response)    
           .then(data =>data) 
           .catch(error => console.error('Error:', error));
           const response = wprest?.data.categories.edges 
           return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
   
     }

  export const fetchNewPosts = async (first, after, exclude, notIn) => {  
    try{
const wp_naija = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($first: Int, $after: String, $exclude:[ID], $notIn:[ID]) {
          categories(last:1,where:{exclude: $exclude}) {
          nodes{                
         posts(first:$first, after:$after, where: {notIn: $notIn}) {
          pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
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
                    slug
                    title 
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
      }  }  }
         }
       ` ,
        variables: { first:first,after:after, exclude:exclude , notIn:notIn}, 
      
      })
      
      }).then(response => response)   
      .then(data =>data) 
      .catch(error => console.error('Error:', error));     
      const res_naija = wp_naija?.data
      return res_naija
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
    
  }

  export async function newsDetailData(slug){ 
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
  query NODE($id: ID!, $idType: PostIdType!) {
  post(id: $id, idType: $idType) {
       author {
      node {
        name
        slug
      }
    }
    content
    date
    excerpt
     postNewsGroup {  
  relatedPosts {  
  nodes {
  ... on Post {
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
     tags{
      nodes{  id
      name
      slug
      }
      }
   categories{
      nodes{
      name
      slug
      }
      }
   
   }  } }
   
  }
    featuredImage {
      node {
        altText
        sourceUrl
        caption
      }
    }
    id
    slug    
    title
  tags {
      nodes {  id
        name
        slug
      }  
    }
  categories {
      nodes {
        name
        slug
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
         const response = wprest?.data.post
         return response
    } catch (error) {
      if(error)throw new Error('Error fetching data')
    
     }
  }
   
  export async function sideBarNews(){
//     const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
//         method: 'POST',
//         timeout: 5000 ,
//         agent: agent,
//         headers:{
//         'Content-Type':'application/json'
//         },
//         body: JSON.stringify({
//   query:`
//   query WPCONTENTNODES{
//      contentNodes {
//       edges {
//         node {
//           contentTypeName
//           id
//           slug
//           ... on NewsArticle {
//             id
//            excerpt
//             title
//             slug
//               featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             }
//              followUpGroup {
//               followUp
//             }
//              newsArticlesCategories {
//               nodes {
//                 name
//                 slug
//               }
//             }
//             contentTags {
//               nodes {  id
//                 name
//                 slug
//               }
//             }
//           }
//           ... on Health {
//             id
//            excerpt
//             title
//             slug
//               featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             }
//              followUpGroup {
//               followUp
//             }
//             healthCategories {
//               nodes {
//                 name
//                 slug
//               }
//             }
//             contentTags {
//               nodes {  id
//                 name
//                 slug
//               }
//             }
//           }
         
//           ... on Award {
//             id
//             excerpt
//             title
//             slug
//                 featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             }
//              followUpGroup {
//               followUp
//             }
//           awardCategories {
//               nodes {
//                 name
//                 slug
//               }
//             }
//             contentTags {
//               nodes {  id
//                 name
//                 slug
//               }
//             }
//           }
//           ... on Business {
//             id
//               excerpt
//             title
//             slug
//                 featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             }
//               followUpGroup {
//               followUp
//             }
//                  businessCategories {
//               nodes {
//                 name
//                 slug
//               }
//             }
//             contentTags {
//               nodes {  id
//                 name
//                 slug
//               }
//             }
//           }
//           ... on CulturaysVideo {
//             id
//                excerpt
//             title
//             slug
//                 featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             }
//                followUpGroup {
//               followUp
//             }
//              culturaysVideoCategories {
//               nodes {
//                 name
//                 slug
//               }
//             }
//             contentTags {
//               nodes {  id
//                 name
//                 slug
//               }
//             }
//           }
//           ... on Economy {
//             id
//               excerpt
//             title
//             slug
//                 featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             }
//               followUpGroup {
//               followUp
//             }
//                economyCategories {
//               nodes {
//                 name
//                 slug
//               }
//             }
//             contentTags {
//               nodes {  id
//                 name
//                 slug
//               }
//             }
//           }
//           ... on Environment {
//             id
//                  excerpt
//             title
//             slug
//                 featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             }
//                followUpGroup {
//               followUp
//             }
//                environmentCategories {
//               nodes {
//                 name
//                 slug
//               }
//             }
//             contentTags {
//               nodes {  id
//                 name
//                 slug
//               }
//             }
//           }
           
//           ... on Society {
//             id
//             excerpt
//             title
//             slug
//             featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             } 
//             followUpGroup {
//               followUp
//             }
//                societyCategories {
//               nodes {
//                 name
//                 slug
//               }
//             }
//             contentTags {
//               nodes {  id
//                 name
//                 slug
//               }
//             }
//           }
//           ... on Tech {
//             id 
//             excerpt
//             title
//             slug
//             featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             }
//             followUpGroup {
//               followUp
//             }
//          techCategories{
//               nodes {
//                 name
//                 slug
//               }
//             }
//             contentTags {
//               nodes {  id
//                 name
//                 slug
//               }
//             }
//           }
//         }
//       }
// }
//      } `  
//         })
          
//           }).then(response =>  response) 
//           .then(data =>data) 
//           .catch(error => console.error('Error:', error)) 
//           const response = wprest.data.contentNodes.edges 
//           return response
  }
 
  export async function sidePanelNewsItems(notIn){
    try{
const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID]) {                  
           posts(first:5, where: {categoryName: "Opinions", notIn:$notIn}) {
              pageInfo {
            startCursor
            endCursor
            hasNextPage
          } 
              edges{ 
              cursor
            node{
             id
              title
                slug
                tags {
                  nodes {
                   id
                    name
                    slug
                  }
                }
                 categories {
                  nodes {
                    name
                    slug
                  }
                }
              excerpt
                date
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
                    altText
                    sourceUrl
                  }
                }
           postNewsGroup {
        newsPassage {
          nodes {
            ... on Post {
          id
          title
          slug
           date
           content 
            excerpt
              
              }
          }
        }
      }
       }
         } } 
      } 
       `,variables:{notIn:notIn} 
      
      })
      
      }).then(response => response)    
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
       const response = wprest?.data.posts.edges
       return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
    
  }


  export async function sideBarNewsItems(notIn){
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID]) {                  
           posts(first:10, where: {categoryName: "Opinions", notIn:$notIn}) {
              pageInfo {
            startCursor
            endCursor
            hasNextPage
          } 
              edges{ 
              cursor
            node{
             id
              title
                slug
                tags {
                  nodes {  id
                    name
                    slug
                  }
                }
                 categories {
                  nodes {
                    name
                    slug
                  }
                }
              excerpt
                date
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
                    altText
                    sourceUrl
                  }
                }
           postNewsGroup {
        newsPassage {
          nodes {
            ... on Post {
          id
          title
          slug
           date
           content 
            excerpt
              
              }
          }
        }
      }
       }
         } } 
      } 
       `,variables:{notIn:notIn} 
      
      })
      
      }).then(response => response)     
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.posts.edges
      return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
  
  }


  export async function altPageNewsItems(notIn){
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {                  
           posts(where: {categoryName: "Opinions" }) {
              pageInfo {
            startCursor
            endCursor
            hasNextPage
          } 
              edges{ 
              cursor
            node{
             id
              title
                slug
                tags {
                  nodes {
                   id
                    name
                    slug
                  }
                }
                 categories {
                  nodes {
                    name
                    slug
                  }
                }
              excerpt
                date
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
                    altText
                    sourceUrl
                  }
                }
           postNewsGroup {
        newsPassage {
          nodes {
            ... on Post {
          id
          title
          slug
           date
           content 
            excerpt
              
              }
          }
        }
      }
       }
         } } 
      } 
       ` 
      
      })
      
      }).then(response => response)      
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response =wprest?.data.posts.edges
      return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
  
  }
