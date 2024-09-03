
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/festivals` 
  : "http://localhost:3000/festivals";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Festival",  
}; 

const FestivalPage = async() => { 
  return (
    <div>
     
    </div>
  )
}

export default FestivalPage
