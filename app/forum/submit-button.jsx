"use client";
 
import { useFormStatus } from "react-dom"; 

export function SubmitButton({ children, pendingText, ...props } ) {
 const { pending, action } = useFormStatus();
 const isPending = pending && action === props.formAction;   
  return (
     <button {...props} type="submit" aria-disabled={pending} className="text-white block border-none p-3 hover:text-gray-300 text-lg " >
      {isPending ? pendingText :children }
    </button>  
 
  
  );
}
