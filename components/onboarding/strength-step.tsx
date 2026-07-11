"use client"

import * as React from "react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { SelectionStep } from "./selection-step"
import { useTranslations } from "@/hooks/use-translations"

const strengths = [
  "Client Trust", "Negotiation", "Closing Deals", 
  "Market Expertise", "Fast Response", "Investment Advice"
]

export function StrengthStep({ isEditorMode }: { isEditorMode?: boolean } = {}) {
  const { trustCardDraft, savedTrustCard, userMode, updateDraft, nextStep, previousStep } = useOnboardingStore()
  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;
  const t = useTranslations("onboarding.wizard")

  return (
    <SelectionStep
      description={t("strengthDesc")}
      options={strengths.map(s => ({ value: s, label: t(`strengths.${s}`) }))}
      value={draft.biggestStrength || ""}
      onChange={(val) => updateDraft({ biggestStrength: val })}
      onNext={nextStep}
      onPrevious={previousStep}
      searchPlaceholder={t("searchStrength")}
      customInputLabel={t("customStrength")}
      customInputPlaceholder={t("strengthExample")}
      isEditorMode={isEditorMode}
    />
  )
}

