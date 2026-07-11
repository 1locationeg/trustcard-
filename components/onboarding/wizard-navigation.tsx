import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/use-translations"

interface WizardNavigationProps {
  onNext?: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  nextDisabled?: boolean;
  nextAction?: React.ReactNode;
  isSubmit?: boolean;
  hideNext?: boolean;
}

export function WizardNavigation({
  onNext,
  onPrevious,
  nextLabel = "Next Step",
  previousLabel = "Previous",
  nextDisabled = false,
  nextAction,
  isSubmit = true,
  hideNext = false,
}: WizardNavigationProps) {
  const t = useTranslations("onboarding.wizard")

  return (
    <div className="pt-8 mt-auto flex flex-col-reverse sm:flex-row gap-4 justify-between items-center w-full border-t border-slate-100">
      <div className="w-full sm:w-auto flex justify-start">
        {onPrevious && (
          <Button 
            type="button" 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto min-w-[120px] h-12 text-base rounded-xl font-semibold shadow-sm" 
            onClick={onPrevious}
          >
            {previousLabel === "Previous" ? t("previous") : previousLabel}
          </Button>
        )}
      </div>

      <div className="w-full sm:w-auto flex justify-end">
        {!hideNext && (
          nextAction ? (
            nextAction
          ) : (
            <Button 
              type={isSubmit ? "submit" : "button"}
              size="lg" 
              className="w-full sm:w-auto min-w-[140px] px-8 h-12 text-base rounded-xl font-semibold shadow-sm" 
              disabled={nextDisabled}
              onClick={onNext}
            >
              {nextLabel === "Next Step" ? t("next") : nextLabel}
            </Button>
          )
        )}
      </div>
    </div>
  )
}

