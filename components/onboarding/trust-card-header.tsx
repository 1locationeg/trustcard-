"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"


interface TrustCardHeaderProps {
  fullName?: string
  jobTitle?: string
  company?: string
  isInlineEditing?: boolean
  onUpdate?: (updates: { fullName?: string; jobTitle?: string; company?: string }) => void
}

export function TrustCardHeader({ fullName, jobTitle, company, isInlineEditing, onUpdate }: TrustCardHeaderProps) {
  return (
    <div className="text-center w-full flex flex-col items-center gap-2">
      {isInlineEditing ? (
        <>
          <Input 
            value={fullName || ""} 
            onChange={(e) => onUpdate?.({ fullName: e.target.value })}
            className="text-center font-bold text-lg h-8 px-2 w-full max-w-[250px]"
            placeholder="Your Name"
          />
          <div className="flex items-center gap-2 w-full max-w-[250px]">
            <Input 
              value={jobTitle || ""} 
              onChange={(e) => onUpdate?.({ jobTitle: e.target.value })}
              className="text-center text-sm h-7 px-2"
              placeholder="Job Title"
            />
            <span className="text-slate-400 text-sm">at</span>
            <Input 
              value={company || ""} 
              onChange={(e) => onUpdate?.({ company: e.target.value })}
              className="text-center text-sm h-7 px-2"
              placeholder="Company"
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-slate-900 leading-tight flex items-center justify-center gap-1.5 min-h-[28px]">
            {fullName || ""}
          </h2>
          <p className="text-sm font-medium text-slate-600 mt-0.5 min-h-[20px]">
            {jobTitle || ""} 
            {company && <span className="text-slate-400 font-normal"> at {company}</span>}
          </p>
        </>
      )}
    </div>
  )
}
