"use client"

import * as React from "react"
import { useOnboardingStore, Experience } from "@/stores/onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from "lucide-react"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => currentYear - i);

const parseDate = (dateStr: string) => {
  if (!dateStr || dateStr === "Present") return { month: "", year: "" };
  const parts = dateStr.split(" ");
  return { month: parts[0] || "", year: parts[1] || "" };
};

export function ExperienceManager() {
  const { trustCardDraft, savedTrustCard, userMode, updateDraft } = useOnboardingStore()
  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;

  const experiences = draft.experiences || [];

  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const handleAdd = () => {
    const newId = Date.now().toString();
    const newExp: Experience = {
      id: newId,
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    updateDraft({ experiences: [...experiences, newExp] });
    setExpandedId(newId);
  }

  const handleUpdate = (id: string, field: string, value: string) => {
    updateDraft({
      experiences: experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  }

  const handleDelete = (id: string) => {
    updateDraft({
      experiences: experiences.filter(exp => exp.id !== id)
    });
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newExperiences = [...experiences];
      [newExperiences[index - 1], newExperiences[index]] = [newExperiences[index], newExperiences[index - 1]];
      updateDraft({ experiences: newExperiences });
    } else if (direction === 'down' && index < experiences.length - 1) {
      const newExperiences = [...experiences];
      [newExperiences[index + 1], newExperiences[index]] = [newExperiences[index], newExperiences[index + 1]];
      updateDraft({ experiences: newExperiences });
    }
  }

  return (
    <div className="space-y-4">
      {experiences.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 border border-slate-100 border-dashed rounded-xl">
          <p className="text-slate-500 text-sm mb-3">No experience added yet.</p>
          <Button type="button" onClick={handleAdd} variant="outline" size="sm" className="bg-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const start = parseDate(exp.startDate);
            const end = parseDate(exp.endDate);
            const isPresent = exp.endDate === "Present";

            return (
              <div key={exp.id} className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
                {/* Header (Collapsed view) */}
                <div 
                  className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors ${isExpanded ? 'border-b border-slate-100 bg-slate-50' : ''}`}
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="font-semibold text-slate-900 truncate">
                      {exp.jobTitle || "New Experience"}
                    </h4>
                    <p className="text-sm text-slate-500 truncate">
                      {exp.company ? `${exp.company} • ` : ''}
                      {exp.startDate || exp.endDate ? `${exp.startDate} - ${exp.endDate}` : 'Dates not set'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-slate-700"
                      onClick={(e) => { e.stopPropagation(); handleMove(index, 'up') }}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-slate-700"
                      onClick={(e) => { e.stopPropagation(); handleMove(index, 'down') }}
                      disabled={index === experiences.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50 ml-1"
                      onClick={(e) => { e.stopPropagation(); handleDelete(exp.id) }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="w-8 flex justify-center ml-1 text-slate-400">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Form */}
                {isExpanded && (
                  <div className="p-5 space-y-5 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Job Title</Label>
                        <Input 
                          value={exp.jobTitle}
                          onChange={(e) => handleUpdate(exp.id, "jobTitle", e.target.value)}
                          placeholder="e.g. Senior Broker"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Company</Label>
                        <Input 
                          value={exp.company}
                          onChange={(e) => handleUpdate(exp.id, "company", e.target.value)}
                          placeholder="e.g. Elite Realty"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Start Date</Label>
                        <div className="flex gap-3">
                          <select 
                            className="flex h-10 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            value={start.month}
                            onChange={(e) => handleUpdate(exp.id, "startDate", `${e.target.value} ${start.year}`.trim())}
                          >
                            <option value="" disabled>Month</option>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <select 
                            className="flex h-10 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            value={start.year}
                            onChange={(e) => handleUpdate(exp.id, "startDate", `${start.month} ${e.target.value}`.trim())}
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
                            onChange={(e) => handleUpdate(exp.id, "endDate", `${e.target.value} ${end.year}`.trim())}
                            disabled={isPresent}
                          >
                            <option value="" disabled>Month</option>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <select 
                            className="flex h-10 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={end.year}
                            onChange={(e) => handleUpdate(exp.id, "endDate", `${end.month} ${e.target.value}`.trim())}
                            disabled={isPresent}
                          >
                            <option value="" disabled>Year</option>
                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                          <div className="flex items-center gap-2 ml-2">
                            <input 
                              type="checkbox" 
                              id={`present-${exp.id}`}
                              checked={isPresent} 
                              onChange={(e) => handleUpdate(exp.id, "endDate", e.target.checked ? "Present" : "")} 
                              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                            />
                            <Label htmlFor={`present-${exp.id}`} className="text-sm font-normal cursor-pointer m-0">Present</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Description</Label>
                        <Textarea 
                          value={exp.description}
                          onChange={(e) => handleUpdate(exp.id, "description", e.target.value)}
                          className="h-24 resize-none"
                          placeholder="Briefly describe your role and achievements..."
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          
          <Button 
            type="button" 
            onClick={handleAdd} 
            variant="outline" 
            className="w-full border-dashed text-slate-600 bg-slate-50 hover:bg-slate-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Experience
          </Button>
        </div>
      )}
    </div>
  )
}
