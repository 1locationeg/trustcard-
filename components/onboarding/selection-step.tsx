"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"
import { WizardNavigation } from "@/components/onboarding/wizard-navigation"

interface SelectionStepProps {
  description: string;
  options: { value: string, label: string }[];
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  searchPlaceholder?: string;
  customInputLabel?: string;
  customInputPlaceholder?: string;
  isEditorMode?: boolean;
}

export function SelectionStep({
  description,
  options,
  value,
  onChange,
  onNext,
  onPrevious,
  searchPlaceholder = "Search or type...",
  customInputLabel = "Custom Option",
  customInputPlaceholder = "e.g. Other",
  isEditorMode = false,
}: SelectionStepProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isOther, setIsOther] = React.useState(false)

  React.useEffect(() => {
    if (value && !options.some(opt => opt.value === value)) {
      // eslint-disable-next-line
      setIsOther(true)
    }
  }, [value, options])

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleSelect = (opt: string) => {
    if (opt === "Other") {
      setIsOther(true)
      if (options.some(o => o.value === value) || !value) {
        onChange(searchTerm)
      }
    } else {
      setIsOther(false)
      onChange(opt)
      setSearchTerm("")
      setTimeout(() => onNext(), 300)
    }
  }

  const filteredOptions = options.filter(s => 
    s.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <form onSubmit={handleNext} className="space-y-8 max-w-xl mx-auto w-full">
      <div className="space-y-2 mb-8">
        <p className="text-slate-500 text-[15px]">{description}</p>
      </div>

      <div className="space-y-6">
        <div>
          <Input 
            type="search"
            placeholder={searchPlaceholder} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 bg-slate-50/50 border-slate-200 text-base"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {filteredOptions.map((opt) => {
            const isSelected = value === opt.value && !isOther;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`flex items-center gap-2 px-5 h-11 rounded-full text-[15px] font-medium transition-all duration-200 ${
                  isSelected 
                    ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20 ring-offset-1" 
                    : "bg-white border border-slate-200 text-slate-600 hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {isSelected && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                {opt.label}
              </button>
            )
          })}
          
          <button
            type="button"
            onClick={() => handleSelect("Other")}
            className={`flex items-center gap-2 px-5 h-11 rounded-full text-[15px] font-medium transition-all duration-200 ${
              isOther 
                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20 ring-offset-1" 
                : "bg-white border border-slate-200 text-slate-600 hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            {isOther && <CheckCircle2 className="h-4 w-4 shrink-0" />}
            + Other
          </button>
        </div>
        
        {isOther && (
          <div className="mt-4 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
            <Label htmlFor="customInput" className="text-sm font-semibold text-slate-700">{customInputLabel}</Label>
            <Input 
              id="customInput" 
              placeholder={customInputPlaceholder} 
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-2 h-12 text-base"
              required
            />
          </div>
        )}
      </div>

      {isEditorMode ? null : (
        <WizardNavigation 
          onPrevious={onPrevious}
          nextDisabled={!value}
        />
      )}
    </form>
  )
}
