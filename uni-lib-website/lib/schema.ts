"use client"

import { z } from "zod"

const signInFormSchema = z.object({
    // form field
    email: z.email(),
    password: z.string().min(8, {message: "password must be at least 8 characters"}),
})

const signUpFormSchema = z.object({
    // form field
    fullname: z.string().min(3, {message: "user full name must be at least 3 characters"}),
    email: z.email(),
    universityId: z.coerce.number().min(1, {message: "university id must be at least 1 character"}),
    password: z.string().min(8, {message: "password must be at least 8 characters"}),
    universityCard: z.string().nonempty()
})

export {signInFormSchema, signUpFormSchema}