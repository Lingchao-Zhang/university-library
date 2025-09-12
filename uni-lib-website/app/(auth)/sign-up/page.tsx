import AuthForm from "@/components/forms/AuthForm"
import { signUp } from "@/lib/actions/auth"
import { signUpFormSchema } from "@/lib/schema"

const SignUp = () => {
    const signUpDefaultValues = {
        fullName: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: ""
    }
    return(
        <AuthForm 
            type={"Sign_Up"} 
            formSchema={signUpFormSchema} 
            defaultValues={signUpDefaultValues}
            onSubmit={signUp}
        />
    )
}

export default SignUp