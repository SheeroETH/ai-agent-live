import type { Metadata } from "next"
import SignUpForm from "@/components/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up - Tweezy",
  description: "Create your Tweezy account to manage your AI Twitter agents.",
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full">
      <SignUpForm />
    </div>
  )
}
