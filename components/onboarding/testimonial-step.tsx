"use client"

import * as React from "react"
import { useOnboardingStore, Testimonial } from "@/stores/onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { WizardNavigation } from "@/components/onboarding/wizard-navigation"

export function TestimonialStep() {
  const { trustCardDraft, savedTrustCard, userMode, updateDraft, nextStep, previousStep } = useOnboardingStore()
  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;

  // Onboarding uses a single testimonial (the first one)
  const defaultTestimonial: Testimonial = { id: "test-1", clientName: "", role: "", quote: "", rating: 5 };
  const test = draft.testimonials && draft.testimonials.length > 0 ? draft.testimonials[0] : defaultTestimonial;

  const handleUpdate = (field: string, value: string | number) => {
    const updatedTestimonial = { ...test, [field]: value };
    const newTestimonials = draft.testimonials && draft.testimonials.length > 0 
      ? [updatedTestimonial, ...draft.testimonials.slice(1)]
      : [updatedTestimonial];
    
    updateDraft({ testimonials: newTestimonials });
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  }

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2 md:col-span-1">
          <Label>Client Name</Label>
          <Input 
            value={test.clientName}
            onChange={(e) => handleUpdate("clientName", e.target.value)}
            placeholder="e.g. John Doe"
          />
        </div>
        <div className="space-y-2 md:col-span-1">
          <Label>Company or Role</Label>
          <Input 
            value={test.role}
            onChange={(e) => handleUpdate("role", e.target.value)}
            placeholder="e.g. Buyer, CEO at Acme Corp"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Rating (1-5)</Label>
          <select 
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            value={test.rating || 5}
            onChange={(e) => handleUpdate("rating", parseInt(e.target.value, 10))}
          >
            <option value={5}>5 Stars (Excellent)</option>
            <option value={4}>4 Stars (Good)</option>
            <option value={3}>3 Stars (Average)</option>
            <option value={2}>2 Stars (Poor)</option>
            <option value={1}>1 Star (Terrible)</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Quote</Label>
          <Textarea 
            value={test.quote}
            onChange={(e) => handleUpdate("quote", e.target.value)}
            className="h-24 resize-none"
            placeholder="What did the client say about working with you?"
          />
        </div>
      </div>

      <WizardNavigation 
        onPrevious={previousStep}
        nextAction={
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button type="button" variant="ghost" onClick={nextStep} className="w-full sm:w-auto text-slate-500">Skip</Button>
            <Button type="submit" size="lg" className="w-full sm:w-auto min-w-[140px] px-8 h-12 text-base rounded-xl font-semibold shadow-sm text-white">Next Step</Button>
          </div>
        }
      />
    </form>
  )
}
