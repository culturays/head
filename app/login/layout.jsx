 

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/login`
  : "http://localhost:3000/login";

export const metadata = {
  metadataBase: new URL(defaultUrl),
 title: "Login", 
  description: "",
}; 

const Layout = ({children}) => {

  return (  
 <div> 
      {children} 
    </div>
 
    )
}

export default Layout
