import { createContext, useContext  } from "react";
export const PagesContext = createContext()
export function usePagesContext(){
    return useContext(PagesContext)
  }