"use client" 
import { useRouter,useSearchParams } from "next/navigation"; 
 
const ConfirmModal = () => { 
  const searchParams = useSearchParams()
  const router = useRouter()   
  const searched= useSearchParams()
  // const {handleConfirmLogout, setCurrentUrl}=usePagesContext()
 
  // useEffect(() => {  
  //   if (process) {  
  //     setCurrentUrl(window.location.href);
  //   }
  // }, []);

  const params = new URLSearchParams(searched);
  const prX = params.get('confirm') 
  if(prX){
    params.delete('confirm') 
  } 
 
  return (
    <div>
 
     {prX==='logout?'? 
     <div className="p-8 bg-gray-800 bg-opacity-40 m-auto z-50 h-full -top-1 fixed w-full left-0 text-center flex items-center justify-center"> 
     <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl place-self-center ">
     <p className="text-2xl p-4 font-bold opacity-70">Do you want to logout?</p>   
    <button onClick={()=> router.back()}className="cursor-pointer hover:bg-opacity-70 m-1 text-xl bg-gray-900 px-3 py-2 w-1/2 text-white">Return</button>  
  <form action={'/auth/signout'} method='post' className="m-1 flex m-auto justify-center">  
 <button type="submit"
    className="cursor-pointer text-xl px-3 text-center py-2 w-1/2 text-red-400 m-1 hover:bg-gray-100 hover:bg-opacity-70">Yes</button > 
 </form>
</div>
  </div>
    :null}  
    </div>
  )
}

export default ConfirmModal