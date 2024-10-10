"use server"
import { agent, fetchWithRetry } from "@/utils/fetchwithretry"; 

export async function newchars(req, res){ 
  
  try {
    const wprest =await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent,
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query: `
          query WPChars {
            chars(last: 100) {
                nodes {
                  content
                  excerpt
                  title
                   id
                  slug
                  date
                  
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
          chars {
              nodes {
                date
                excerpt
                id
                title
                slug
              }
            }
          }
        }
        charactertitles{  
          series
          movie
          shorts
          portrayedby
          genre
          filmname
          filmDirector
          actorsUpcomingMovie
          releaseDate
          country
          characterWiki
          charBios
          actorsBios
          actorWiki
          filmAbout
          characterOtherName
          prequel
          sequel
          filmProducer
          filmMedia
          filmFamily
          filmFamilyAbout
          
          charRel {
            edges {
              node {
                ... on Char {
                  id
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
              id
              slug
              title
              excerpt
              content
              charactertitles {
                shorts
                series
                portrayedby
                movie
                genre
                actorsUpcomingMovie
                filmname
                filmDirector
                characterWiki
                actorWiki
              }
                }
              }
            }
          }
          filmImg1 {
            node{
              altText
           sourceUrl
           }
          }
          filmImg2 {
            node{
               altText
            sourceUrl
            }
           
          }

          actorImgs {
            node{
              altText
           sourceUrl 
            }
           
        }
        actorImgs2 {
          node{
             altText
           sourceUrl   
          }
          
        }
          
        } }}

         }  
         ` 
        
        })
        
        }).then(response => response)  
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
       const response = wprest?.data.chars.nodes
       return response 
      } catch (error) {
        console.error('Error fetching posts:', error); 
      }
} 

export async function relatedChars(req, res){ 
  
  try {
    const wprest =await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent,
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query: `
          query WPChars {
            chars(last:5) {
                nodes {
                  content
                  excerpt
                  title
                   id
                  slug
                  date
                  
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
          chars {
              nodes {
                date
                excerpt
                id
                title
                slug
              }
            }
          }
        }
        charactertitles{  
          series
          movie
          shorts
          portrayedby
          genre
          filmname
          filmDirector
          actorsUpcomingMovie
          releaseDate
          country
          characterWiki
          charBios
          actorsBios
          actorWiki
          filmAbout
          characterOtherName
          prequel
          sequel
          filmProducer
          filmMedia
          filmFamily
          filmFamilyAbout
         
          charRel {
            edges {
              node {
                ... on Char {
                  id
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
              id
              slug
              title
              excerpt
              content
              charactertitles {
                shorts
                series
                portrayedby
                movie
                genre
                actorsUpcomingMovie
                filmname
                filmDirector
                characterWiki
                actorWiki
              }
                }
              }
            }
          }
          filmImg1 {
            node{
              altText
           sourceUrl
           }
          }
          filmImg2 {
            node{
               altText
            sourceUrl
            }
           
          }

          actorImgs {
            node{
              altText
           sourceUrl 
            }
           
        }
        actorImgs2 {
          node{
             altText
           sourceUrl   
          }
          
        }
          
        } }}

         }  
         ` 
        
        })
        
        }).then(response => response)  
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
       const response = wprest?.data.chars.nodes
        return response 
      } catch (error) {
        console.error('Error fetching posts:', error); 
      }
} 

export async function newcharCall(slug){
 
      const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent,
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query: `
          query WPChar($id: ID!, $idType: CharIdType){
            char(id: $id, idType:$idType) {
              id
              date               
             featuredImage {
                        node {
                          sourceUrl
                          altText
                          caption
                       
                      }
                 }
                  charactertitles { 
                    actorImgs {
                      node{
                         altText
                      sourceUrl
                       caption
                      }
                     
                    }
                    actorImgs2 {
                      node{
                        altText
                     sourceUrl
                      caption
                     }
                    }
                    actorWiki
                    actorsBios
                    charBios
                    filmImg1{
                    node{
                      altText
                      sourceUrl
                      caption
                    }
                    }
                    releaseDate
                    characterWiki
                    country
                    filmDirector
                    filmname
                    genre
                    filmFamily
                    filmFamilyAbout 
                    portrayedby
                    series
                    characterOtherName
                  }
                  title
                  slug
                  contentTags {
                    nodes {
                      slug
                      name
                      chars {
                        nodes {
                          title
                          slug
                        }
                      }
                    }
                  }
                  charCategories {
                    nodes {
                      name
                      slug
                      chars {
                        nodes {
                          date
                          excerpt
                          title
                          slug
                        }
                      }
                    }
                  }
                  excerpt 
                  content 
                }
              } 
         ` 
         ,
     variables:{
       id: slug,
       idType: 'SLUG'
     }
        })
        
        })
    
    .then(response => response)  
    .then(data =>data) 
    .catch(error => console.error('Error:', error)); 
    const response = wprest?.data.char 
    return response 
} 
  
