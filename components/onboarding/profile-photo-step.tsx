"use client"

import * as React from "react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X } from "lucide-react"
import { WizardNavigation } from "@/components/onboarding/wizard-navigation"
import { useTranslations } from "@/hooks/use-translations"

export function ProfilePhotoStep({ isEditorMode }: { isEditorMode?: boolean } = {}) {
  const { trustCardDraft, savedTrustCard, userMode, updateDraft, nextStep, previousStep } = useOnboardingStore()
  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const t = useTranslations("onboarding.wizard")

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      updateDraft({ profilePhoto: imageUrl })
    }
  }

  return (
    <form onSubmit={handleNext} className="space-y-8">
      <div className="flex flex-col items-center justify-center space-y-6 pt-4">
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-slate-700">{t("profilePhotoMsg")}</p>
          <p className="text-xs text-slate-500">{t("supportedFormats")}</p>
        </div>
        
        <div className="relative group">
          <Avatar className="h-40 w-40 border-4 border-slate-100 shadow-lg">
            <AvatarImage src={draft.profilePhoto} className="object-cover" />
            <AvatarFallback className="bg-slate-50">
              <Upload className="h-10 w-10 text-slate-300" />
            </AvatarFallback>
          </Avatar>
          
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              type="button"
              variant="ghost" 
              className="text-white hover:text-white hover:bg-white/20"
              onClick={() => fileInputRef.current?.click()}
            >
              {draft.profilePhoto ? t("replacePhoto") : t("uploadPhoto")}
            </Button>
          </div>
          
          {draft.profilePhoto && (
            <button
              type="button"
              onClick={() => updateDraft({ profilePhoto: "" })}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-slate-100 transition-colors"
            >
              <X className="h-4 w-4 text-slate-600" />
            </button>
          )}
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/jpeg, image/png, image/webp" 
          onChange={handleFileChange}
        />
        
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
            {draft.profilePhoto ? "Change Photo" : "Choose File"}
          </Button>
        </div>
      </div>

      {!isEditorMode && (
        <WizardNavigation 
          onPrevious={previousStep}
          nextLabel={draft.profilePhoto ? "Next" : "Skip for now"}
        />
      )}
    </form>
  )
}

