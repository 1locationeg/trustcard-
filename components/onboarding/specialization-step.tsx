"use client"

import * as React from "react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { SelectionStep } from "./selection-step"
import { useTranslations } from "@/hooks/use-translations"

const specializations = [
  "Luxury Property", "Investment Advisor", "Commercial Real Estate", 
  "Off-Plan Sales", "North Coast Specialist", "New Cairo Specialist"
]

export function SpecializationStep({ isEditorMode }: { isEditorMode?: boolean } = {}) {
  const { trustCardDraft, savedTrustCard, userMode, updateDraft, nextStep } = useOnboardingStore()
  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;
  const t = useTranslations("onboarding.wizard")

  return (
    <SelectionStep
      description={t("specializationDesc")}
      options={specializations.map(s => ({ value: s, label: t(`specializations.${s}`) }))}
      value={draft.specialization || ""}
      onChange={(val) => updateDraft({ specialization: val })}
      onNext={nextStep}
      searchPlaceholder={t("searchSpecialization")}
      customInputLabel={t("customSpecialization")}
      customInputPlaceholder={t("specializationExample")}
      isEditorMode={isEditorMode}
    />
  )
}

