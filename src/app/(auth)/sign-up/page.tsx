"use client"


import { AuthForm, TAuthFormData } from "@/components/auth/auth-form";
import { authClient} from "@/lib/auth-client";
import { useRouter } from "next/navigation";





export default function SignUpPage() {
  const router = useRouter()

  const handleSignUp =async (data:TAuthFormData)=>{
    const { data:signUpResponse, error } = await authClient.signUp.email({
    name: data.name as string, // required, The name of the user.
    email: data.email, // required, The email address of the user.
    password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
    role: data.role as string, // "seeker" | "recruiter" | "admin"

    callbackURL: "/", // An optional URL to redirect to after the user signs up.
});


console.log("signup response", signUpResponse, error);
if (error) {
  // returning a string makes the form show it inline (e.g. "user already exists")
  return error.message || "Failed to create account. Please try again.";
}
// success → go to homepage
router.push("/");
router.refresh();
  }



  return <AuthForm mode="signup" onSubmit={handleSignUp} />;
}
