"use client";

import { useFormStatus } from "react-dom"; 

export function SubmitButton({ children, pendingText, ...props } ) {
  const { pending, action } = useFormStatus();
const isPending = pending && action === props.formAction;
 
  return (
    <>
    <button {...props} type="submit" aria-disabled={pending} className="text-white cursor-pointer p-3 w-1/2 text-lg bg-gray-700 p-2 text-white block border-none p-3 hover:text-pink-900">
      {isPending ? pendingText : children}
    </button>
  
     </>
  );
}
