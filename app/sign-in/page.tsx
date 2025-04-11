import type { Metadata } from "next"
import SignInForm from "@/components/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In - Tweezy",
  description: "Sign in to your Tweezy account to manage your AI Twitter agents.",
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full">
      <SignInForm />
    </div>
  )
}
