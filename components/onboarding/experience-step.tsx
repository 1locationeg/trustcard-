"use client"

import * as React from "react"
import { useOnboardingStore, Experience } from "@/stores/onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WizardNavigation } from "@/components/onboarding/wizard-navigation"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => currentYear - i);

const parseDate = (dateStr: string) => {
  if (!dateStr || dateStr === "Present") return { month: "", year: "" };
  if (dateStr.includes("/")) {
    const [m, y] = dateStr.split("/");
    const monthNum = parseInt(m, 10);
    return { month: MONTHS[monthNum - 1] || "", year: y || "" };
  }
  const parts = dateStr.split(" ");
  return { month: parts[0] || "", year: parts[1] || "" };
};

export function ExperienceStep() {
  const { trustCardDraft, savedTrustCard, userMode, updateDraft, nextStep, previousStep } = useOnboardingStore()
  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;

  // Onboarding uses a single experience (the first one)
  const defaultExp: Experience = { id: "exp-1", jobTitle: "", company: "", startDate: "", endDate: "", description: "" };
  const exp = draft.experiences && draft.experiences.length > 0 ? draft.experiences[0] : defaultExp;

  const start = parseDate(exp.startDate);
  const end = parseDate(exp.endDate);
  const isPresent = exp.endDate === "Present";

  const handleUpdate = (field: string, value: string) => {
    const updatedExp = { ...exp, [field]: value };
    const newExperiences = draft.experiences && draft.experiences.length > 0
      ? [updatedExp, ...draft.experiences.slice(1)]
      : [updatedExp];

    updateDraft({ experiences: newExperiences });
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  }

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2 md:col-span-2">
          <Label>Job Title</Label>
          <Input
            value={exp.jobTitle}
            onChange={(e) => handleUpdate("jobTitle", e.target.value)}
            placeholder="e.g. Senior Broker"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Company</Label>
          <Input
            value={exp.company}
            onChange={(e) => handleUpdate("company", e.target.value)}
            placeholder="e.g. Elite Realty"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Start Date</Label>
          <div className="flex gap-3">
            <select
              className="flex h-10 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={start.month}
              onChange={(e) => handleUpdate("startDate", `${e.target.value} ${start.year}`.trim())}
            >
              <option value="" disabled>Month</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              className="flex h-10 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={start.year}
              onChange={(e) => handleUpdate("startDate", `${start.month} ${e.target.value}`.trim())}
            >
              <option value="" disabled>Year</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>End Date</Label>
          <div className="flex flex-wrap items-center gap-3">
            <select
              className="flex h-10 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={end.month}
              onChange={(e) => handleUpdate("endDate", `${e.target.value} ${end.year}`.trim())}
              disabled={isPresent}
            >
              <option value="" disabled>Month</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              className="flex h-10 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={end.year}
              onChange={(e) => handleUpdate("endDate", `${end.month} ${e.target.value}`.trim())}
              disabled={isPresent}
            >
              <option value="" disabled>Year</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <div className="flex items-center gap-2 ml-2">
              <input
                type="checkbox"
                id="present"
                checked={isPresent}
                onChange={(e) => handleUpdate("endDate", e.target.checked ? "Present" : "")}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
              />
              <Label htmlFor="present" className="text-sm font-normal cursor-pointer m-0">Present</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Description</Label>
          <Textarea
            value={exp.description}
            onChange={(e) => handleUpdate("description", e.target.value)}
            className="h-24 resize-none"
            placeholder="Briefly describe your role and achievements..."
          />
        </div>
      </div>

      <WizardNavigation
        onPrevious={previousStep}
        nextLabel="Next Step"
      />
    </form>
  )
}
