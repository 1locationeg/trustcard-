"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { ROUTES } from "@/constants/routes"
import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowRight, TrendingUp, Eye, BarChart3 } from "lucide-react"

export function PostPreviewStep() {
  const router = useRouter()
  const { completeOnboarding } = useOnboardingStore()

  const handleCreateAccount = () => {
    router.push(ROUTES.SIGNUP)
  }

  const handlePublishGuest = () => {
    completeOnboarding()
    router.replace(ROUTES.PROFILE + "?preview=true")
  }

  return (
    <div className="flex flex-col text-left space-y-6 animate-in fade-in zoom-in duration-500 pt-4">
      <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-inner">
        <ShieldCheck className="h-7 w-7 text-emerald-600" />
      </div>
      
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Get more clients with a verified profile.
        </h2>
        <p className="text-slate-600 leading-relaxed text-[15px]">
          Create an account to manage your Trust Card, get verified, and unlock premium features.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm shrink-0 border border-slate-100">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">Higher Trust Score</p>
            <p className="text-xs text-slate-500 mt-0.5">Verified profiles receive a boosted Trust Score.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm shrink-0 border border-slate-100">
            <Eye className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">Better Visibility</p>
            <p className="text-xs text-slate-500 mt-0.5">Rank higher in our agent directory.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm shrink-0 border border-slate-100">
            <BarChart3 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">Analytics Dashboard</p>
            <p className="text-xs text-slate-500 mt-0.5">Track how many clients view your profile.</p>
          </div>
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-3">
        <Button onClick={handleCreateAccount} className="w-full font-bold shadow-md h-12 text-base">
          Complete My Profile <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button onClick={handlePublishGuest} variant="ghost" className="w-full font-semibold h-12 text-slate-500 hover:text-slate-800">
          Continue Publishing without account
        </Button>
      </div>
    </div>
  )
}
