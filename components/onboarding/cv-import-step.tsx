"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, CheckCircle2, AlertCircle } from "lucide-react"

import { useOnboardingStore } from "@/stores/onboarding-store"
import { useTranslations } from "@/hooks/use-translations"
import { WizardNavigation } from "@/components/onboarding/wizard-navigation"
import { CvImportModal } from "./cv-import-modal"

export function CvImportStep() {
  const { nextStep, previousStep } = useOnboardingStore()
  const t = useTranslations("onboarding")

  const [dragOver, setDragOver] = React.useState(false)
  const [fileError, setFileError] = React.useState<string | null>(null)
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const validateAndUpload = (file: File) => {
    setFileError(null)
    if (file.type !== 'application/pdf') {
      setFileError("Only PDF files are supported.")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError("File size must be under 10 MB.")
      return
    }
    setSelectedFile(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) validateAndUpload(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) validateAndUpload(file)
  }

  const handleModalSuccess = () => {
    setSelectedFile(null)
    nextStep()
  }

  const handleModalClose = () => {
    setSelectedFile(null)
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.18 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-xl font-bold text-slate-900">{t("cvImport.title")}</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                {t("cvImport.pdfOnly")}
              </p>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer
                transition-all duration-200 select-none
                ${dragOver
                  ? "border-primary bg-primary/5"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${dragOver ? "bg-primary/10" : "bg-slate-100"}`}>
                  <Upload className={`h-5 w-5 transition-colors ${dragOver ? "text-primary" : "text-slate-400"}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {dragOver ? t("cvImport.orDropHere") : t("cvImport.dragDrop")}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {t("wizard.or").toLowerCase()} <span className="text-primary font-semibold underline underline-offset-2">{t("cvImport.browseFiles")}</span>
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">{t("cvImport.maxSize")}</p>
              </div>
            </div>

            {/* File validation error */}
            {fileError && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{fileError}</span>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t("cvImport.whatWeExtract")}</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            {/* Feature list */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pb-6">
              {[
                "Full Name", "Job Title", "Company",
                "Professional Bio", "Contact Details", "LinkedIn & Website",
                "Specialization", "Experience", "Strengths", "Achievements",
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            
            <WizardNavigation 
              onPrevious={previousStep}
              onNext={nextStep}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {selectedFile && (
        <CvImportModal 
          initialFile={selectedFile} 
          onClose={handleModalClose}
          onSuccess={handleModalSuccess} 
        />
      )}
    </div>
  )
}

