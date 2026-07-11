"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { ROUTES } from "@/constants/routes"
import { Button } from "@/components/ui/button"
import { TrustCardPreview } from "@/components/onboarding/trust-card-preview"
import { QrCode, Copy, Share2, CheckCircle2, ShieldCheck, TrendingUp, Eye } from "lucide-react"

export default function PublishPage() {
  const router = useRouter()
  const { trustCardDraft, completeOnboarding } = useOnboardingStore()
  const [publishState, setPublishState] = React.useState<"idle" | "publishing" | "success">("idle")

  const getProfileUrl = () => {
    const slug = trustCardDraft.slug || "user"
    return typeof window !== "undefined" ? `${window.location.origin}/u/${slug}` : `/u/${slug}`
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getProfileUrl())
    alert("Public link copied to clipboard!")
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${trustCardDraft.fullName}'s Trust Card`,
        url: getProfileUrl()
      }).catch(() => {})
    } else {
      handleCopyLink()
    }
  }

  const handleCompleteProfile = () => {
    router.push(`${ROUTES.SIGNUP}?callbackUrl=${encodeURIComponent(ROUTES.DASHBOARD)}`)
  }

  const handleContinuePublishing = () => {
    setPublishState("publishing")
    completeOnboarding()
    
    setTimeout(() => {
      setPublishState("success")
      setTimeout(() => {
        router.push(`${ROUTES.PROFILE}?preview=true`)
      }, 1000)
    }, 1500)
  }

  if (!trustCardDraft.fullName) {
    // If accessed directly without data
    if (typeof window !== "undefined") {
      router.replace(ROUTES.ONBOARDING_GOAL)
    }
    return null
  }

  return (
    <div className="w-full flex flex-col items-center">


      <div className="w-full max-w-5xl mx-auto py-8 px-4 flex flex-col lg:flex-row gap-12 items-start justify-center min-h-[calc(100vh-140px)]">
      {/* Left side: Preview & Actions */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Trust Card</h2>
        <div className="w-full max-w-md pointer-events-none">
          <TrustCardPreview />
        </div>
        
        <div className="w-full max-w-md mt-6 bg-white p-4 rounded-xl border border-slate-100 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-3 opacity-50">
              <div className="bg-slate-100 p-2 rounded-lg">
                <QrCode className="h-6 w-6 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-400">Share via QR</p>
                <p className="text-xs text-slate-400">Scan to view profile</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                title="Copy Link"
                className="text-slate-500 hover:text-slate-900"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Open Profile" className="text-slate-500 hover:text-slate-900" onClick={() => window.open(getProfileUrl(), '_blank')}><Eye className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" title="Share" className="text-slate-500 hover:text-slate-900" onClick={handleShare}><Share2 className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center font-medium">
            Your Trust Card is ready! Copy the link or share it directly.
          </div>
        </div>
      </div>

      {/* Right side: Upgrade Upsell */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-start">
            <div className="w-fit inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-xs font-medium mb-3 text-green-900">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-700" />
              Your Trust Card is now live
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold mb-6 text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              Unlock Full Potential
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
              Get more clients with a verified profile.
            </h1>
            
            <p className="text-slate-300 mb-8 text-lg">
              Create an account to manage your Trust Card, get verified, and access premium features.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
                <div>
                  <p className="font-semibold text-white">Higher Trust Score</p>
                  <p className="text-sm text-slate-400">Boost your credibility with verified badges.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="h-6 w-6 text-blue-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Better Visibility</p>
                  <p className="text-sm text-slate-400">Appear higher in client searches.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-purple-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Analytics Dashboard</p>
                  <p className="text-sm text-slate-400">Track profile views and lead conversions.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 w-full">
              <Button 
                size="lg" 
                className="w-full h-14 text-base font-bold bg-white text-slate-900 hover:bg-slate-100" 
                onClick={handleCompleteProfile}
              >
                Complete My Profile
              </Button>

              <Button 
                variant={publishState === "success" ? "default" : "ghost"} 
                size="lg" 
                className={`w-full h-12 hover:text-white hover:bg-white/10 transition-all ${
                  publishState === "success" 
                    ? "bg-success/20 text-success hover:bg-success/30 hover:text-success border border-success/30" 
                    : publishState === "publishing"
                    ? "text-blue-300 animate-pulse"
                    : "text-slate-400"
                }`}
                onClick={handleContinuePublishing}
                disabled={publishState !== "idle"}
              >
                {publishState === "idle" && "Publish Trust Card"}
                {publishState === "publishing" && "Publishing..."}
                {publishState === "success" && "✓ Done."}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      </div>
    </div>
  )
}
