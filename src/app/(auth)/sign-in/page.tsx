"use client"

import { AuthForm, TAuthFormData } from "@/components/auth/auth-form";
import { signIn } from "@/lib/auth-client";



export default function SignInPage() {

  const handleSingIn = async(data:TAuthFormData)=>{
const { data: SingInResponse, error } = await signIn.email({
    email: data.email, // required, The email address of the user.
    password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
    rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
    callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
});
    console.log('sing in response',SingInResponse,error);
  }
  return <AuthForm mode="signin"  onSubmit={handleSingIn}/>;
}
