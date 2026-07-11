"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PublicProfileLayout } from "@/components/profile/public-profile-layout"
import { OwnerPreviewBanner } from "@/components/profile/owner-preview-banner"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { ROUTES } from "@/constants/routes"

export default function ProfileClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isPreview = searchParams.get("preview") === "true"

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line
    setMounted(true)
  }, [])

  const { trustCardDraft, savedTrustCard, userMode } = useOnboardingStore()

  const baseCard = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft

  React.useEffect(() => {
    // If no data exists, redirect to start of onboarding
    if (!baseCard.fullName) {
      router.replace(ROUTES.ONBOARDING_GOAL)
    }
  }, [baseCard.fullName, router])

  if (!mounted || !baseCard.fullName) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {isPreview && <OwnerPreviewBanner />}
      <PublicProfileLayout isOwnerPreview={isPreview} />
    </div>
  )
}
