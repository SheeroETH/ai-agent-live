import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Verify Email - Tweezy",
  description: "Verify your email address to complete your Tweezy account setup.",
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full bg-black">
      <div className="container max-w-md mx-auto flex flex-col items-center justify-center px-4">
        <div className="w-full space-y-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-400 hover:text-[#1DA1F2] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="h-20 w-20 rounded-full bg-[#1DA1F2]/20 mx-auto flex items-center justify-center">
            <Mail className="h-10 w-10 text-[#1DA1F2]" />
          </div>

          <h1 className="text-3xl font-bold">Check your email</h1>

          <p className="text-gray-400">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify
            your account.
          </p>

          <div className="pt-6">
            <p className="text-sm text-gray-500 mb-4">
              Didn't receive an email? Check your spam folder or request a new verification link.
            </p>

            <Button className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white border-none">
              Resend verification email
            </Button>
          </div>

          <div className="pt-8 border-t border-gray-800 mt-8">
            <p className="text-gray-400">
              Already verified?{" "}
              <Link href="/sign-in" className="text-[#1DA1F2] hover:text-[#1DA1F2]/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
