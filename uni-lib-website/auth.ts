import NextAuth, { User } from "next-auth"
import { db } from "./database/drizzle"
import { usersTable } from "./database/schema"
import { eq } from "drizzle-orm"
import { compare } from "bcryptjs"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email"}, 
            password: { label: "Password", type: "password"}
        },
        async authorize(credentials) {
            // check if email/password empty
            if(!credentials?.email || !credentials?.password){
                console.log("the field of email or password is empty!")
                return null
            }

            // check whether user exists or not
            const users = await db
                          .select()
                          .from(usersTable)
                          .where(eq(usersTable.email, credentials?.email.toString()))
                          .limit(1)
            if(users.length === 0){
              console.log("the user is not exist!")
              return null
            }
            // if the user exists, check whether the password is correct or not
            // compare(password entered by user, hashed password stored in database)
            const isPasswordCorrect = await compare(credentials?.password.toString(), users[0].password)
            
            if(!isPasswordCorrect){
                console.log("the password is incorrect!")
                return null
            }

            return {
                id: users[0].id.toString(),
                email: users[0].email,
                name: users[0].fullName
            } as User
        }
    })
  ],
  // the pages redirected to after each func(sign in, sign out) executed
  pages: {
    signIn: "./",
    signOut: "/sign-in",
  },
  callbacks: {  
    async jwt({ token, user }){
        if(user){
          token.id = user.id
          token.name = user.name
        }
        
        return token
    },
    async session({ session, token }){
        if(session.user){
            session.user.id = token.id as string,
            session.user.name = token.name as string
        }

        return session
      }
  }
}
)