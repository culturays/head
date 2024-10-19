 

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/search-page` 
  : "http://localhost:3000/search-page";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Search",
  description: "",
};
 
const Layout = ({children}) => {
  return ( 

<div>
{children} 
   
</div> )
}

export default Layout
