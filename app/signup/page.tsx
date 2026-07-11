import * as React from "react"
import { Metadata } from "next"
import { AuthLayout } from "@/components/layout/auth-layout"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Create Account | R8ESTATE",
  description: "Join R8ESTATE to build your verified professional reputation and earn client trust.",
}

export default function SignupPage() {
  return (
    <AuthLayout>
      <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
        <SignupForm />
      </React.Suspense>
    </AuthLayout>
  )
}

