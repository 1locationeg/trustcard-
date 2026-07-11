import * as React from "react"
import { User, ShieldCheck, Mail, Award, Palette } from "lucide-react"

export type EditorSection = 
  | "Basic Information"
  | "Trust Signals"
  | "Contact"
  | "Credibility"
  | "Customization"

interface NavigationProps {
  activeSection: EditorSection
  onSectionClick: (section: EditorSection) => void
}

const sections: { id: EditorSection; icon: React.ReactNode }[] = [
  { id: "Basic Information", icon: <User className="h-4 w-4" /> },
  { id: "Trust Signals", icon: <ShieldCheck className="h-4 w-4" /> },
  { id: "Contact", icon: <Mail className="h-4 w-4" /> },
  { id: "Credibility", icon: <Award className="h-4 w-4" /> },
  { id: "Customization", icon: <Palette className="h-4 w-4" /> },
]

export function EditorNavigation({ activeSection, onSectionClick }: NavigationProps) {
  return (
    <nav className="flex flex-col space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-start
            ${activeSection === section.id 
              ? "bg-primary/5 text-primary" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
          `}
        >
          <span className={`${activeSection === section.id ? "text-primary" : "text-slate-400"}`}>
            {section.icon}
          </span>
          {section.id}
        </button>
      ))}
    </nav>
  )
}
