"use server"

// import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { signIn } from "@/auth"
import { db } from "@/database/drizzle"
import { usersTable } from "@/database/schema"
import { signAuthCredentialsType } from "@/types"
import { genSalt, hash} from "bcryptjs"
import { eq } from "drizzle-orm"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { headers } from "next/headers"
import { ratelimit } from "../ratelimit"
import { redirect } from "next/navigation"

export const signInWithCredentials = async (params: Pick<signAuthCredentialsType, "email" | "password">) => {
     // get the current user ip and apply rate limit
    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
    const { success }= await ratelimit.limit(ip)
    if(!success){
        redirect("/high-frequency-visit")
    }
    
    try{
        const signInResult = await signIn("credentials", params)
        if(!signInResult){
            console.log("Sign in Error!")
            return {success: false, error: "Sign in Error!"}
        }
    }catch(error){
        if (isRedirectError(error)) {
            throw error;
        }
        console.log(error, "Sign in Error!")
        return {success: false, error: "Sign in Error!"}
    }

    return {success: true}
}

export const signUp = async (params: signAuthCredentialsType) => {
    const {email, fullName, universityId, password, universityCard} = params
    // check whether the user exists or not

    // get the current user ip and apply rate limit
    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
    const { success }= await ratelimit.limit(ip)
    if(!success){
        redirect("/high-frequency-visit")
    }
    const existingUser = await db
                         .select()
                         .from(usersTable)
                         .where(eq(usersTable.email, email))
                         .limit(1)
                         
    // if user exists -> signUp error
    if(existingUser.length > 0){
        throw new Error("The user has already existed!")
    }
    
    // if user not exist -> create the user and automatically sign in
    // hash user's password for security
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    try{
        await db
            .insert(usersTable)
            .values({
            email,
            fullName,
            universityId,
            password: hashPassword,
            universityCard
            })
    } catch(error){
        console.log(error, "Sign up Error!")
        return {success: false, error: "Sign up Error!"}
    }

    await signInWithCredentials({email, password})
    return {success: true}
}