"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema, type SignupFormData } from "@/schemas/auth.schema"
import { ROUTES } from "@/constants/routes"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { useAuthStore } from "@/stores/auth-store"

import { AuthCard, AuthHeader } from "./auth-card"
import { PasswordInput } from "./password-input"
import { GoogleButton } from "./google-button"
import { LoadingButton } from "./loading-button"
import { PasswordStrengthIndicator } from "./password-strength-indicator"
import { useTranslations } from "@/hooks/use-translations"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const { savePreviewToPermanent } = useOnboardingStore()
  const [error, setError] = React.useState<string | null>(null)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const login = useAuthStore(state => state.login)
  const t = useTranslations("auth")

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      acceptTerms: undefined,
    },
  })

  // eslint-disable-next-line
  const password = form.watch("password") || ""

  async function onSubmit(data: SignupFormData) {
    setError(null)

    try {
      // Mock signup authentication
      setIsSuccess(true)
      login({
        id: "mock-user-id",
        name: data.fullName,
        email: data.email
      })
      savePreviewToPermanent()
      
      router.push(callbackUrl || ROUTES.DASHBOARD)
      router.refresh()
    } catch {
      setError("An unexpected error occurred.")
    }
  }

  return (
    <AuthCard>
      <AuthHeader 
        title={t("signupTitle")} 
        subtitle={t("signupSubtitle")} 
      />

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSuccess && (
        <Alert className="mb-6 bg-success/15 text-success border-success/20">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <AlertDescription>{t("signupSuccess")}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fullName")}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    autoComplete="name" 
                    disabled={form.formState.isSubmitting || isSuccess}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="you@example.com" 
                    type="email" 
                    autoComplete="email" 
                    disabled={form.formState.isSubmitting || isSuccess}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <PasswordInput 
                    placeholder="••••••••" 
                    autoComplete="new-password"
                    disabled={form.formState.isSubmitting || isSuccess}
                    {...field} 
                  />
                </FormControl>
                
                <PasswordStrengthIndicator password={password} />

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                <FormControl>
                  <div className="mt-[2px]">
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      disabled={form.formState.isSubmitting || isSuccess}
                    />
                  </div>
                </FormControl>
                <div className="leading-tight flex-1">
                  <FormLabel className="text-[13px] font-normal cursor-pointer text-slate-600 leading-relaxed block">
                    {t("agreeTo")}
                    <Link href="#" className="font-medium text-slate-900 hover:text-primary hover:underline underline-offset-2 transition-colors">
                      {t("terms")}
                    </Link>
                    {t("and")}
                    <Link href="#" className="font-medium text-slate-900 hover:text-primary hover:underline underline-offset-2 transition-colors">
                      {t("privacy")}
                    </Link>.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <div className="pt-2">
            {form.formState.errors.acceptTerms && (
              <p className="text-[0.8rem] font-medium text-destructive mt-[-10px] mb-2">
                {form.formState.errors.acceptTerms.message}
              </p>
            )}
          </div>

          <LoadingButton 
            type="submit" 
            className="w-full h-11 text-base font-semibold"
            isLoading={form.formState.isSubmitting}
            disabled={isSuccess}
          >
            {form.formState.isSubmitting ? t("creatingAccount") : t("createAccount")}
          </LoadingButton>
        </form>
      </Form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500 font-medium">{t("orContinueWith")}</span>
        </div>
      </div>

      <GoogleButton disabled={form.formState.isSubmitting || isSuccess}>
        {t("continueWithGoogle")}
      </GoogleButton>

      <p className="text-center text-sm text-slate-500 mt-8">
        {t("haveAccount")}{" "}
        <Link 
          href={ROUTES.LOGIN} 
          className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm rtl:flip"
        >
          {t("signIn")}
        </Link>
      </p>
    </AuthCard>
  )
}

function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
