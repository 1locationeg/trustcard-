import * as React from "react"
import { Metadata } from "next"
import { AuthLayout } from "@/components/layout/auth-layout"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Sign In | R8ESTATE",
  description: "Sign in to your R8ESTATE account to manage your professional reputation and digital profile.",
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
        <LoginForm />
      </React.Suspense>
    </AuthLayout>
  )
}
