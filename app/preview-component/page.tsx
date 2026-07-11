"use client"

import * as React from "react"
import { ProfileInformationStep } from "@/components/onboarding/profile-information-step"

export default function PreviewComponentPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <h2 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Component Preview: ProfileInformationStep
        </h2>
        <ProfileInformationStep isEditorMode={true} section="all" />
      </div>
    </div>
  )
}
