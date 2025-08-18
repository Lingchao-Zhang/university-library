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

interface authFormProps<T extends FieldValues> {
    type: "Sign_In" | "Sign_Up";
    formSchema: ZodObject; 
    defaultValues: T; 
    // onSubmit: (data: T) => Promise<{success: boolean; error?: string}>;
}
const AuthForm = <T extends FieldValues>({
    type, 
    formSchema, 
    defaultValues, 
    // onSubmit
    }: authFormProps<T>) => {
    const isSignUp = type === "Sign_Up" 
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as DefaultValues<T>
  })
    const handleOnSubmit = async () => {
    
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
                <form onSubmit={handleOnSubmit} className="mt-8 space-y-8">  
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
                                        <ImageUploader fileOnChange={field.onChange}/>
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