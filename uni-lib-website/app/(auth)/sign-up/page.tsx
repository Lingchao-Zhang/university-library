import AuthForm from "@/components/forms/AuthForm"
import { signUpFormSchema } from "@/lib/schema"

const SignUp = () => {
    const signUpDefaultValues = {
        fullname: "",
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
        />
    )
}

export default SignUp