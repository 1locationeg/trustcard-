"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/routes"

export default function GoalSelectionPage() {
  const router = useRouter()

  React.useEffect(() => {
    router.replace(ROUTES.ONBOARDING_WIZARD)
  }, [router])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  )
}

