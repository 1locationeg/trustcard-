"use client"

import * as React from "react"
import { useOnboardingStore, Achievement } from "@/stores/onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WizardNavigation } from "@/components/onboarding/wizard-navigation"

export function AchievementStep() {
  const { trustCardDraft, savedTrustCard, userMode, updateDraft, nextStep, previousStep } = useOnboardingStore()
  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;

  // Onboarding uses a single achievement (the first one)
  const defaultAchievement: Achievement = { id: "ach-1", title: "", description: "" };
  const ach = draft.achievements && draft.achievements.length > 0 ? draft.achievements[0] : defaultAchievement;

  const handleUpdate = (field: string, value: string) => {
    const updatedAchievement = { ...ach, [field]: value };
    const newAchievements = draft.achievements && draft.achievements.length > 0 
      ? [updatedAchievement, ...draft.achievements.slice(1)]
      : [updatedAchievement];
    
    updateDraft({ achievements: newAchievements });
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  }

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2 md:col-span-2">
          <Label>Achievement Title</Label>
          <Input 
            value={ach.title}
            onChange={(e) => handleUpdate("title", e.target.value)}
            placeholder="e.g. Top Producer 2025"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Description</Label>
          <Textarea 
            value={ach.description}
            onChange={(e) => handleUpdate("description", e.target.value)}
            className="h-24 resize-none"
            placeholder="Briefly describe what this achievement is about..."
          />
        </div>
      </div>

      <WizardNavigation 
        onPrevious={previousStep}
        nextLabel="Preview Trust Card"
      />
    </form>
  )
}
