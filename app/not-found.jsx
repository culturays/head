import Link from 'next/link'  
 
export default function FourOhFour() {  
  return (
  <> 
    <div className="h-max"> 
      <div className="grid h-screen px-4 bg-black bg-opacity-80 place-content-center border border-b-4 border-b-green-600">
        <div className="text-center bg-white font-black text-3xl md:text-7xl p-8 w-max">
        <h1>404 - Page Not Found</h1>    
        </div>
      </div>
      <div className="bg-green-600 text-center bg-opacity-30">    
        
          <Link href='/'><button
            type="button"
            className="inline-block px-5 py-3 m-6 text-sm text-gray-700 bg-white rounded hover:bg-gray-300 font-bold focus:outline-none focus:ring"
          > 
            Go Back 
          </button></Link> 
         
          </div>
      </div>
  </>)
}