"use client"

import * as React from "react"
import { ExternalLink } from "lucide-react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { useRouter } from "next/navigation"

import { EditorForms } from "./trust-card-editor/editor-forms"

interface TrustCardEditorViewProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export default function TrustCardEditorView({ onSectionChange }: TrustCardEditorViewProps) {
  const { savedTrustCard, trustCardDraft, userMode } = useOnboardingStore()
  const router = useRouter()
  
  const baseCard = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft
  const slug = baseCard.slug || baseCard.id || "preview"
  
  const handleViewAsClient = () => {
    router.push(`/u/${slug}`)
  }

  // Intersection Observer for scroll spy
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that is most visible
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to get the most prominent one
          const mostVisible = visibleEntries.reduce((prev, current) => 
            (prev.intersectionRatio > current.intersectionRatio) ? prev : current
          )
          
          if (mostVisible.target.id && onSectionChange) {
            onSectionChange(mostVisible.target.id)
          }
        }
      },
      {
        root: document.getElementById("editor-scroll-container"),
        rootMargin: "-20% 0px -60% 0px", // Adjust margins to trigger earlier
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    const sections = document.querySelectorAll("section[data-editor-section]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [onSectionChange])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Trust Card</h2>
          <p className="text-sm text-slate-500 mt-1">Manage your professional profile and trust signals.</p>
        </div>
        <button
          onClick={handleViewAsClient}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <ExternalLink className="h-4 w-4" />
          View as Client
        </button>
      </div>

      {/* Editor & Preview Split */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0 gap-6">
        
        {/* Scrollable Container */}
        <div 
          id="editor-scroll-container"
          className="flex-1 overflow-y-auto relative custom-scrollbar pr-2"
        >
          
          {/* Editor Area */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-12 pb-16">
              <EditorForms />
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}
