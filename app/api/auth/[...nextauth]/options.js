import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'

export const options = {
    session:{
        strategy:'jwt'
    },
 
    providers:[
        GoogleProvider({
            profile(profile){
                let userRole = 'User'
                if(profile.email === "ngene.christina@gmail.com"){
                    userRole ='admin'
                }
                const profileData ={
                    ...profile,
                    id: profile.sub,
                    role:userRole

                }

                return profileData
            },
            clientId:process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret:process.env.GOOGLE_AUTH_CLIENT_SECRET
        }),
        CredentialsProvider( {
            name:"Credentials",
             credentials:{ 
                email:{
                    label:"email",
                    type:"email",
                    placeholder:"email"

                },
                password:{
                    label:"password",
                    type:"password",
                    placeholder:"password"

                }
            },

 
            async authorize(credentials){ 

                try{

            //         const { data:existingUser, error } = await supabase
            //         .from('profile')
            //         .select()
            //         .eq('email', credentials.email, "password",credentials.password )
            //         .single() 

            //       if(existingUser){
            //     const matchPass = await compare(
            //         credentials.password, existingUser.password
            //     )
            //    // const { data, error } = await supabase.auth.linkIdentity({ provider: 'google' })

            //     if(matchPass){
            //       return {
            //         email:existingUser.email 
            //       }
            //     }
            //       }
                  
                }catch(error){
                   console.log(error)
                }
                return null
            }
        })
    ],
    callbacks:{
        async jwt ({token, user}){
            if(user) token.role = user.role
            return token
        },

        async session({session, token}){
            if(session?.user) session.user.role = token.role
            return session

        }
    }
}