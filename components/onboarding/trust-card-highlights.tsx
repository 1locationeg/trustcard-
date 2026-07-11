"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

interface TrustCardHighlightsProps {
  specialization?: string
  biggestStrength?: string
  isInlineEditing?: boolean
  onUpdate?: (updates: { specialization?: string; biggestStrength?: string }) => void
}

export function TrustCardHighlights({ specialization, biggestStrength, isInlineEditing, onUpdate }: TrustCardHighlightsProps) {
  if (!specialization && !biggestStrength && !isInlineEditing) return null

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-5">
      {isInlineEditing ? (
        <>
          <div className="flex items-center gap-1 bg-primary/10 rounded-full px-2">
            <span className="text-xs font-medium text-primary">Specialist:</span>
            <Input 
              value={specialization || ""} 
              onChange={(e) => onUpdate?.({ specialization: e.target.value })}
              className="h-6 w-24 border-0 bg-transparent text-xs text-primary focus-visible:ring-0 px-1 py-0 shadow-none"
              placeholder="e.g. Waterfront"
            />
          </div>
          <div className="flex items-center gap-1 bg-amber-100 rounded-full px-2">
            <span className="text-xs font-medium text-amber-800">Strength:</span>
            <Input 
              value={biggestStrength || ""} 
              onChange={(e) => onUpdate?.({ biggestStrength: e.target.value })}
              className="h-6 w-24 border-0 bg-transparent text-xs text-amber-800 focus-visible:ring-0 px-1 py-0 shadow-none"
              placeholder="e.g. Negotiation"
            />
          </div>
        </>
      ) : (
        <>
          {specialization && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Specialist: {specialization}
            </span>
          )}
          {biggestStrength && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              Strength: {biggestStrength}
            </span>
          )}
        </>
      )}
    </div>
  )
}
