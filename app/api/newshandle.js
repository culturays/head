
export async function tag (slug) { 
    const wprest = await fetch('https://content.culturays.com/graphql',{
      method: 'POST',
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
      
      })
     const itemRes = await wprest.json()
    return itemRes
 }

 export async function category (slug) { 
const wprest = await fetch('https://content.culturays.com/graphql',{
method: 'POST',
headers:{
'Content-Type':'application/json'
},
body: JSON.stringify({
query:`
query POSTCATEGORY($id: ID!, $idType: CategoryIdType) {
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

})
const itemRes = await wprest.json()
return itemRes
}
export async function newsByLatest(req, res){ 
  await new Promise((resolve)=> {
    setTimeout(()=>{
  resolve(true)
    },5000)
   })
  const wprest = await fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
      posts( where: {categoryName: "Latest"}) {
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
      
      })
     const resp= await wprest.json()
      return resp
}