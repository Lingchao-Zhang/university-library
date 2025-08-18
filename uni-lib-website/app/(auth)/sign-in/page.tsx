import AuthForm from "@/components/forms/AuthForm"
import { signInFormSchema } from "@/lib/schema"


const SignIn = () => {
    const signInDefaultValues = {
        email: "",
        password: ""
    }
    return(
        <AuthForm 
            type={"Sign_In"} 
            formSchema={signInFormSchema} 
            defaultValues={signInDefaultValues}
        />
    )
}

export default SignIn