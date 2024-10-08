import { agent, fetchWithRetry } from "@/utils/fetchwithretry";

export async function usersList(req, res){
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPUSERS {
        users {
     edges{
     node{
     id
     slug
     name
     username
     }
     }
        }
         }  
         ` 
        
        })
        
        }).then(response => response)   
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest.data.users.edges
        return response
}

export async function userItem(slug){
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
    query:`
    query WPUSER($id: ID!, $idType: UserNodeIdTypeEnum!){
     user(id: $id, idType: $idType) {
    slug
    email
    name
    username
     avatar {
      url
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
        
        .then(response =>  response) 
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
         const response = wprest.data.user
        return response
}