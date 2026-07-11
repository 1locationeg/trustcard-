/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { Card } from "@/components/ui/card"
import { BadgeCheck, Star, Award, TrendingUp } from "lucide-react"

export function DashboardTrustCardPreview() {
  const { trustCardDraft, savedTrustCard, userMode } = useOnboardingStore()
  const baseCard = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft
  const draft = baseCard || {}

  // Safe cast for mock fields that might not be in the strict schema yet
  const closedDeals = (draft as unknown as Record<string, unknown>).closedDeals

  return (
    <Card className="w-full bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-row items-center p-3 md:p-4 gap-4 relative transition-all duration-300">
      
      {/* Verification Badge */}
      {draft.verificationStatus === "Verified" && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-sm border border-blue-100">
          <BadgeCheck className="h-3 w-3" />
          Verified
        </div>
      )}

      {/* Avatar */}
      <div className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-full border-2 border-slate-50 bg-slate-100 shadow-sm overflow-hidden flex items-center justify-center">
        {draft.profilePhoto ? (
          <img src={draft.profilePhoto} alt={draft.fullName} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xl font-bold text-slate-300">
            {draft.fullName ? draft.fullName.charAt(0).toUpperCase() : "?"}
          </span>
        )}
      </div>

      {/* Main Info */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <div className="flex flex-col md:flex-row md:items-center md:gap-3">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight truncate">
            {draft.fullName || "Your Name"}
          </h2>
          {(draft.jobTitle || draft.company) && (
            <p className="text-xs md:text-sm font-medium text-slate-500 truncate">
              {draft.jobTitle} {draft.jobTitle && draft.company && <span className="font-normal mx-1">at</span>} <span className="text-primary">{draft.company}</span>
            </p>
          )}
        </div>

        {/* Clean, Premium Signals Bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
          
          {/* Trust Score */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-50 border border-amber-100">
               <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-slate-900">{draft.trustScore || 80}</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold hidden md:inline">Trust</span>
            </div>
          </div>
          
          {/* Specialization */}
          {draft.specialization && (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-50 border border-emerald-100">
                 <Award className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <p className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">{draft.specialization}</p>
            </div>
          )}

          {/* Strength / Closed Deals */}
          {(closedDeals || draft.biggestStrength) && (
             <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-50 border border-blue-100">
                 <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <p className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">{closedDeals ? `${closedDeals}+ Deals` : draft.biggestStrength}</p>
            </div>
          )}
          
        </div>
      </div>
    </Card>
  )
}
