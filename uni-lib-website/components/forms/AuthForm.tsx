"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues,useForm} from "react-hook-form"
import { ZodObject} from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FIELD_NAMES, FIELD_PLACEHOLDERS, FIELD_TYPES } from "@/constants"
import Link from "next/link"
import ImageUploader from "../shared/ImageUploader"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"

interface authFormProps<T extends FieldValues> {
    type: "Sign_In" | "Sign_Up";
    formSchema: ZodObject; 
    defaultValues: T; 
    onSubmit: (data: any) => Promise<{success: boolean; error?: string}>
}
const AuthForm = <T extends FieldValues>({
    type, 
    formSchema, 
    defaultValues, 
    onSubmit
    }: authFormProps<T>) => {
    const isSignUp = type === "Sign_Up" 
    const router = useRouter()
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as DefaultValues<T>
  })
    const handleOnSubmit = async (data: any) => {
        //signIn or signUp
        const formData = isSignUp ? 
        {
            "email":data.get("email") as string, 
            "fullName":data.get("fullName") as string, 
            "universityId":data.get("universityId") as number, 
            "password":data.get("password") as string, 
            "universityCard":imageUrl as string
        }
        :
        {
            "email":data.get("email") as string, 
            "password":data.get("password") as string
        }
        const result = await onSubmit(formData)
        if(result.success){
            // use Toast to provide clear notice for user
            toast(`${isSignUp ? "Sign Up successfully" : "Sign In successfully"}`, 
                {
                    description: `${isSignUp ? "You've sign up successfully!" : "You've sign in successfully!"}`
                }
            )
            router.push("/")
        } else{
            toast("An error has occured", 
                {
                    description: "An error has occured!"
                }
            )
        }


    }
    return(
        <div>
            <h1 className="text-28-semibold-white">
                {
                    isSignUp ? 
                    "Create Your Library Account"
                    :
                    "Welcome Back to the BookWise"
                }
            </h1>
            <span className="text-18-regular-light-100 mt-5">
                {
                    isSignUp ? 
                    "Please complete all fields and upload a valid university ID to gain access to the library"
                    :
                    "Access the vast collection of resources, and stay updated"
                }
            </span>
            <Form {...form}>
                <form action={handleOnSubmit} className="mt-8 space-y-8">  
                    {
                        Object.keys(defaultValues).map((fieldName: string) => 
                            <FormField
                            key={fieldName}
                            control={form.control}
                            name={fieldName}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-16-regular-light-100">{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                                <FormControl>
                                    {
                                        field.name === "universityCard" ?
                                        <ImageUploader imageUrlOnChange={e => setImageUrl(e as string)} />
                                        :
                                        //@ts-ignore
                                        <Input 
                                        className="text-16-semibold-white"
                                        placeholder={FIELD_PLACEHOLDERS[field.name as keyof typeof FIELD_PLACEHOLDERS]}
                                        type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} 
                                        {...field}
                                        />
                                    }
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        )
                    }
                    <Button type="submit" className="w-full">{isSignUp ? "Sign Up" : "Login"}</Button>
                    <div className="text-center">
                        <span className="text-16-medium-light-100">
                        {
                            isSignUp ? 
                            "Have an account already? "
                            :
                            "Don't have an account? "
                        }
                        </span>
                        <Link href={isSignUp ? "./sign-in" : "./sign-up"} className="text-16-semibold-light-200">
                        {
                            isSignUp ? "Login" : "Register here"
                        }
                        </Link>                       
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AuthForm