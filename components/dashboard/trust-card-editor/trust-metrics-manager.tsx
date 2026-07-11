"use client"

import * as React from "react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { Input } from "@/components/ui/input"
import { Shield, Target, Clock, Star, Users, Briefcase } from "lucide-react"

export function TrustMetricsManager() {
  const { trustCardDraft, savedTrustCard, updateDraft, userMode } = useOnboardingStore()
  const baseCard = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Trust Score */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-500" />
            Trust Score (%)
          </label>
          <Input 
            type="number"
            placeholder="e.g. 94" 
            value={baseCard.trustScore || ""}
            onChange={(e) => updateDraft({ trustScore: parseInt(e.target.value) || 0 })}
          />
          <p className="text-xs text-slate-500">Your overall trust rating.</p>
        </div>

        {/* Deals Closed */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Deals Closed
          </label>
          <Input 
            type="text"
            placeholder="e.g. 142+" 
            value={baseCard.dealsClosed || ""}
            onChange={(e) => updateDraft({ dealsClosed: e.target.value })}
          />
          <p className="text-xs text-slate-500">Number of successful transactions.</p>
        </div>

        {/* Client Rating */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Client Rating
          </label>
          <Input 
            type="text"
            placeholder="e.g. 4.9" 
            value={baseCard.clientRating || ""}
            onChange={(e) => updateDraft({ clientRating: e.target.value })}
          />
          <p className="text-xs text-slate-500">Average score out of 5.0.</p>
        </div>

        {/* Average Response Time */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            Avg. Response Time
          </label>
          <Input 
            type="text"
            placeholder="e.g. 2h" 
            value={baseCard.responseTime || ""}
            onChange={(e) => updateDraft({ responseTime: e.target.value })}
          />
          <p className="text-xs text-slate-500">How quickly you typically respond.</p>
        </div>

        {/* Trusted by X Clients */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            Trusted By Clients
          </label>
          <Input 
            type="text"
            placeholder="e.g. 100+" 
            value={baseCard.trustedByCount || ""}
            onChange={(e) => updateDraft({ trustedByCount: e.target.value })}
          />
          <p className="text-xs text-slate-500">Number shown in the footer.</p>
        </div>

      </div>

      {/* R8 Badge Toggle */}
      <div className="mt-6">
        <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-200 rounded-lg bg-white shadow-sm hover:bg-slate-50 transition-colors">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
            checked={baseCard.showR8Badge !== false}
            onChange={(e) => updateDraft({ showR8Badge: e.target.checked })}
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900">Show R8ESTATE™ Verified Badge</span>
            <span className="text-xs text-slate-500">Display the official platform verification in the Trust Card footer.</span>
          </div>
        </label>
      </div>

      {/* Derived Metrics Info Box */}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-slate-500" />
          Automatically Computed Metrics
        </h4>
        <p className="text-xs text-slate-600 mb-4">
          Some metrics are automatically computed based on the data you provide in other sections:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-100 p-3 rounded-md shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Years of Experience</span>
              <Users className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <span className="text-xs text-slate-500">Derived from your <strong className="text-slate-700">Experience</strong> entries.</span>
          </div>
          <div className="bg-white border border-slate-100 p-3 rounded-md shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Review Count</span>
              <Star className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <span className="text-xs text-slate-500">Derived from your <strong className="text-slate-700">Testimonials</strong> entries.</span>
          </div>
          <div className="bg-white border border-slate-100 p-3 rounded-md shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Verification Badges</span>
              <Shield className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <span className="text-xs text-slate-500">Derived from your <strong className="text-slate-700">Verification</strong> entries.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
