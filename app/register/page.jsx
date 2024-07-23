import RegisterForm from "./form"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


const Register = async () => {
  const session = await getServerSession()
  if(session){
    redirect("/forum")
  }
  return (
 <RegisterForm/>
  )
}

export default Register
