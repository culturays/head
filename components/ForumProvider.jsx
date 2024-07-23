'use client'
import { SessionProvider } from "next-auth/react"

const ForumProvider = ({children})=> {
  //for authentiction only for clientside. 
    return (
      <SessionProvider>
        {children}        
      </SessionProvider>
    )
  }
  
  export default ForumProvider