export const replaceHTMLTags=(string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "") 
    const newString = string.replace(regex, "");
    return newString
     }