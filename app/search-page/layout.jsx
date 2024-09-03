
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
<div className='thoughts-text bg-culturaysBg text-white p-8 text-center flex justify-between'> 
<p>Trending <span></span> <span>&#10141;</span></p>
</div>
{children} 
   
</div>
 )
}

export default Layout
