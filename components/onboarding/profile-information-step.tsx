"use client"

import * as React from "react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WizardNavigation } from "@/components/onboarding/wizard-navigation"
import { useTranslations } from "@/hooks/use-translations"

export function ProfileInformationStep({ isEditorMode, section = "all" }: { isEditorMode?: boolean, section?: "all" | "basic" | "contact" } = {}) {
  const t = useTranslations("onboarding.wizard")
  const { trustCardDraft, savedTrustCard, userMode, updateDraft, nextStep, previousStep } = useOnboardingStore()
  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  if (!isEditorMode && !draft.fullName) {
    // Just an empty state handler if needed, but we always render the form.
  }

  return (
    <form onSubmit={handleNext} className="space-y-6">
      {(section === "all" || section === "basic") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t("fullName")}</Label>
          <Input 
            id="fullName" 
            value={draft.fullName}
            onChange={(e) => updateDraft({ fullName: e.target.value })}
            placeholder="e.g. Mohamed Othman"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">{t("jobTitle")}</Label>
          <Input 
            id="jobTitle" 
            value={draft.jobTitle}
            onChange={(e) => updateDraft({ jobTitle: e.target.value })}
            placeholder="e.g. Senior Consultant"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">{t("company")}</Label>
          <Input 
            id="company" 
            value={draft.company}
            onChange={(e) => updateDraft({ company: e.target.value })}
            placeholder="e.g. Elite Realty"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">{t("yearsOfExperience")}</Label>
          <Input 
            id="yearsOfExperience" 
            type="number"
            min="0"
            value={draft.yearsOfExperience}
            onChange={(e) => updateDraft({ yearsOfExperience: e.target.value })}
            placeholder="e.g. 5"
          />
        </div>
        <div className="space-y-2 col-span-full">
          <Label htmlFor="shortBio">{t("shortBio")}</Label>
          <Textarea 
            id="shortBio" 
            value={draft.shortBio}
            onChange={(e) => updateDraft({ shortBio: e.target.value })}
            className="h-24 resize-none"
            placeholder="Briefly describe your expertise and approach..."
          />
        </div>
      </div>
      )}

      {(section === "all" || section === "contact") && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="linkedIn">{t("linkedIn")}</Label>
          <Input 
            id="linkedIn" 
            type="url"
            value={draft.linkedIn}
            onChange={(e) => updateDraft({ linkedIn: e.target.value })}
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">{t("website")}</Label>
          <Input 
            id="website" 
            type="url"
            value={draft.website}
            onChange={(e) => updateDraft({ website: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">{t("phoneNumber")}</Label>
          <Input 
            id="phoneNumber" 
            type="tel"
            value={draft.phoneNumber}
            onChange={(e) => updateDraft({ phoneNumber: e.target.value })}
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>
      )}

      {!isEditorMode && (
        <WizardNavigation 
          onPrevious={previousStep}
          nextLabel="Next"
        />
      )}
    </form>
  )
}

