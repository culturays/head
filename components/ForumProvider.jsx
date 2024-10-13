'use client'
import { SessionProvider } from "next-auth/react"

const ForumProvider = ({children})=> {
    return (
      <SessionProvider>
        {children}        
      </SessionProvider>
    )
  }
  
  export default ForumProvider