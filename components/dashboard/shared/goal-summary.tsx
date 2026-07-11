"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, Eye, MousePointerClick, MessageSquare, Percent, Share2, Edit3, ExternalLink, Copy } from "lucide-react"
import { SummaryMetrics, ContactRateRating } from "@/types/dashboard"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { useTranslations } from "@/hooks/use-translations"
import { ShareModal } from "../../profile/share-modal"

interface GoalSummaryProps {
  firstName: string
  goalTitle: string
  metrics: SummaryMetrics
  message: string
  contactRateTarget: number
  contactRateRatings: ContactRateRating[]
  hasNoAnalytics?: boolean
  ownerUserId?: string
}

function getContactRateRating(rate: number, ratings: ContactRateRating[]): ContactRateRating {
  return ratings.find((r) => rate >= r.minRate) ?? ratings[ratings.length - 1]
}

export function GoalSummary({ 
  firstName, 
  goalTitle, 
  metrics, 
  message, 
  contactRateTarget, 
  contactRateRatings, 
  hasNoAnalytics = false,
  ownerUserId
}: GoalSummaryProps) {
  const router = useRouter()
  const { trustCardDraft } = useOnboardingStore()
  const t = useTranslations("dashboard")
  const [isShareOpen, setIsShareOpen] = React.useState(false)

  const contactRate = hasNoAnalytics
    ? 0
    : metrics.views > 0
    ? Math.round((metrics.clicks / metrics.views) * 100)
    : 0

  const rating = hasNoAnalytics
    ? { label: "No data", colorClass: "bg-slate-50 text-slate-600 border-slate-200" }
    : getContactRateRating(contactRate, contactRateRatings)

  const getProfileUrl = () => {
    const { savedTrustCard, trustCardDraft, userMode } = useOnboardingStore.getState()
    const card = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft
    const slug = card?.slug || "user"
    return typeof window !== "undefined" ? `${window.location.origin}/u/${slug}` : `/u/${slug}`
  }

  const trackShare = async () => {
    if (!ownerUserId) return
    console.log("Mock tracking share event")
  }

  const handleCopyLink = () => {
    const url = getProfileUrl()
    navigator.clipboard.writeText(url)
    trackShare()
    alert("Public link copied to clipboard!")
  }

  const handleShare = async () => {
    const url = getProfileUrl()
    trackShare()
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${trustCardDraft?.fullName || "Agent"}'s Trust Card`,
          text: "Check out my verified professional Trust Card profile!",
          url,
        })
        return
      } catch (err) {
        console.warn("Native share failed, opening modal:", err)
      }
    }
    setIsShareOpen(true)
  }

  const items = [
    { 
      label: t("profileViews"), 
      value: hasNoAnalytics ? "-" : metrics.views, 
      icon: Eye, 
      color: "text-blue-500",
      footnote: hasNoAnalytics ? t("noViewsYet") : null
    },
    { 
      label: t("contactClicks"), 
      value: hasNoAnalytics ? "-" : metrics.clicks, 
      icon: MousePointerClick, 
      color: "text-indigo-500",
      footnote: hasNoAnalytics ? t("noContactInteractionsYet") : null
    },
    { 
      label: t("conversations"), 
      value: hasNoAnalytics ? "-" : metrics.conversations, 
      icon: MessageSquare, 
      color: "text-violet-500",
      footnote: hasNoAnalytics ? t("noLeadsGeneratedYet") : null
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Clock className="h-3.5 w-3.5" />
        Last updated today at 09:41 AM
      </div>
      
      <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {t("goodMorning")} {firstName} 👋
            </h1>
          </div>
          
          <div className="inline-flex items-center gap-1.5 mb-6 text-primary font-semibold">
            🎯 {t("currentGoal")} {goalTitle}
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{t("executiveSummary")}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {items.map((metric, idx) => (
                <Card key={idx} className="shadow-sm border-slate-200 h-full flex flex-col justify-between">
                  <CardContent className="flex flex-col h-full justify-between gap-3 pt-0 pb-4">
                    <div className="flex items-center gap-2">
                      <metric.icon className={`h-4 w-4 shrink-0 ${metric.color}`} />
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider truncate">{metric.label}</span>
                    </div>
                    <div className="space-y-1.5 mt-auto">
                      <strong className="text-2xl font-bold text-slate-900 leading-none block">{metric.value}</strong>
                      {metric.footnote && (
                        <p className="text-[11px] text-slate-400 font-medium leading-tight">{metric.footnote}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Contact Rate tile with contextual rating */}
              <Card className="shadow-sm border-slate-200 h-full flex flex-col justify-between">
                <CardContent className="flex flex-col h-full justify-between gap-2 pt-0 pb-4">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider truncate">{t("conversionRate")}</span>
                  </div>
                  <div className="flex flex-col gap-1.5 mt-auto">
                    <span className={`self-start text-[10px] font-bold px-1.5 py-0.5 rounded-md border leading-none ${rating.colorClass}`}>
                      {rating.label}
                    </span>
                    <strong className="text-2xl font-bold text-slate-900 leading-none">{hasNoAnalytics ? "-" : `${contactRate}%`}</strong>
                    {hasNoAnalytics ? (
                      <p className="text-[11px] text-slate-400 font-medium leading-tight">{t("availableAfterVisitors")}</p>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">{t("target")} {contactRateTarget}%</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center gap-3 text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl border border-green-100">
              <TrendingUp className="h-5 w-5 shrink-0" />
              <p>{hasNoAnalytics ? t("trustCardReadyMessage") : message}</p>
            </div>

            {hasNoAnalytics && (
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleShare}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg px-6 py-3 shadow-md gap-2 transition-all cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                  {t("sharePublicProfile")}
                </button>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => router.push(`${ROUTES.PROFILE}?preview=true`)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg px-4 py-2.5 gap-1.5 text-sm transition-all cursor-pointer"
                  >
                    <Edit3 className="h-4 w-4 text-slate-500" />
                    {t("editTrustCard")}
                  </button>
                  <button
                    onClick={() => router.push(ROUTES.PROFILE)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg px-4 py-2.5 gap-1.5 text-sm transition-all cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4 text-slate-500" />
                    {t("viewPublicProfile")}
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg px-4 py-2.5 gap-1.5 text-sm transition-all cursor-pointer"
                  >
                    <Copy className="h-4 w-4 text-slate-500" />
                    {t("copyPublicLink")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        url={getProfileUrl()} 
        onShare={trackShare}
      />
    </div>
  )
}


