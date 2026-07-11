"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, ChevronRight, Zap, Target } from "lucide-react"
import type { Recommendation, GoalProgress } from "@/types/dashboard"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { useOnboardingStore } from "@/stores/onboarding-store"

interface GoalStatusProps {
  goalTitle: string
  progress: GoalProgress
  hasNoAnalytics?: boolean
}

function GoalStatusBlock({ goalTitle, progress, hasNoAnalytics = false }: GoalStatusProps) {
  const { metricLabel, currentRate, targetRate } = progress
  const displayRate = hasNoAnalytics ? 0 : currentRate
  const pct = hasNoAnalytics ? 0 : (targetRate > 0 ? Math.min(Math.round((displayRate / targetRate) * 100), 100) : 0)

  let statusLine: string
  if (hasNoAnalytics) {
    statusLine = `You've just created your Trust Card! Complete the actions below to start drawing traffic.`
  } else if (currentRate >= targetRate) {
    statusLine = `You've reached your target — great work! 🎉`
  } else if (pct >= 80) {
    statusLine = `You're very close to reaching your goal.`
  } else if (pct >= 50) {
    statusLine = `You're making good progress toward your goal.`
  } else {
    statusLine = `You have a clear opportunity to grow — the actions below will help.`
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-indigo-50/70 border border-indigo-100 px-5 py-4">
      <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
        <Target className="h-4 w-4 shrink-0" />
        Goal Status
      </div>

      <p className="text-sm text-slate-700 leading-relaxed">
        {statusLine}
      </p>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>{metricLabel}</span>
          <span className="font-bold text-slate-700">
            {displayRate}%{" "}
            <span className="font-normal text-slate-400">/ {targetRate}% target</span>
          </span>
        </div>
        <div className="h-2 w-full bg-indigo-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Complete the recommendations below to improve visitor conversion and generate{" "}
        {goalTitle.toLowerCase()}.
      </p>
    </div>
  )
}

const impactColors: Record<string, string> = {
  High:   "bg-red-50 text-red-700 border-red-200/60",
  Medium: "bg-amber-50 text-amber-700 border-amber-200/60",
  Low:    "bg-green-50 text-green-700 border-green-200/60",
}

interface SmartRecommendationsProps {
  recommendations: Recommendation[]
  goalTitle?: string
  goalProgress?: GoalProgress
  hasNoAnalytics?: boolean
}

export function SmartRecommendations({ recommendations, goalTitle, goalProgress, hasNoAnalytics = false }: SmartRecommendationsProps) {
  const router = useRouter()
  const { trustCardDraft } = useOnboardingStore()

  const onboardingRecs: Recommendation[] = [
    {
      id: 101,
      title: "Complete your profile",
      description: "Finish all fields on your profile to achieve 100% completion and build stronger initial trust.",
      impact: "High",
      icon: "📝",
      action: "Edit Profile",
      priority: "High"
    },
    {
      id: 102,
      title: "Share your Trust Card",
      description: "Distribute your public profile URL via email or social media to get your first views.",
      impact: "High",
      icon: "🔗",
      action: "Share Link",
      priority: "High"
    },
    {
      id: 103,
      title: "Add your professional achievement",
      description: "Detailing an award or notable milestone makes your card stand out.",
      impact: "Medium",
      icon: "🏆",
      action: "Add Achievement",
      priority: "Medium"
    },
    {
      id: 104,
      title: "Upload a better profile photo",
      description: "A high-quality, professional headshot increases contact conversions.",
      impact: "Medium",
      icon: "📷",
      action: "Change Photo",
      priority: "Medium"
    }
  ]

  const displayRecommendations = hasNoAnalytics ? onboardingRecs : recommendations

  if (!displayRecommendations || displayRecommendations.length === 0) return null

  const getProfileUrl = () => {
    const slug = trustCardDraft?.slug || "user"
    return typeof window !== "undefined" ? `${window.location.origin}/u/${slug}` : `/u/${slug}`
  }

  const handleActionClick = (action: string) => {
    if (action === "Share Link") {
      const url = getProfileUrl()
      navigator.clipboard.writeText(url)
      alert("Public profile link copied to clipboard!")
    } else {
      router.push(`${ROUTES.PROFILE}?preview=true`)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-50/50 via-white to-white border-indigo-100 overflow-hidden relative shadow-sm h-full">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Sparkles className="h-32 w-32 text-indigo-600" />
      </div>
      <CardHeader className="relative z-10 pb-4 border-b border-indigo-50/50 shrink-0">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          Smart Recommendations
        </CardTitle>
        <p className="text-sm text-slate-500 mt-1 font-medium">Your action plan for reaching your goal.</p>
      </CardHeader>
      <CardContent className="relative z-10 pt-4 space-y-4">

        {/* Goal Status block — shown when goalProgress is available */}
        {goalProgress && goalTitle && (
          <GoalStatusBlock goalTitle={goalTitle} progress={goalProgress} hasNoAnalytics={hasNoAnalytics} />
        )}

        {/* Recommendation cards */}
        {displayRecommendations.map((rec) => {
          const impactClass = impactColors[rec.impact] ?? "bg-slate-50 text-slate-600 border-slate-200"
          return (
            <div
              key={rec.id}
              className="group relative rounded-xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-xl" title={`${rec.priority} Priority`}>{rec.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-900 transition-colors mb-1">
                      {rec.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-100">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${impactClass}`}>
                  <Zap className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold whitespace-nowrap">
                    Potential Impact: {rec.impact}
                  </span>
                </div>
                <button 
                  onClick={() => handleActionClick(rec.action)}
                  className="shrink-0 flex items-center bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors border border-indigo-100 cursor-pointer"
                >
                  <span className="text-sm font-bold text-indigo-700 mr-1">
                    {rec.action}
                  </span>
                  <ChevronRight className="h-4 w-4 text-indigo-700" />
                </button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
