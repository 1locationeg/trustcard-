"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Upload, X, CheckCircle2, AlertCircle, Loader2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCVImport } from "@/hooks/use-cv-import"
import type { ExtractedCVData } from "@/types/cv-import.types"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { useTranslations } from "@/hooks/use-translations"

interface CvImportModalProps {
  onClose: () => void
  onSuccess: () => void
  initialFile?: File
}

/**
 * CvImportModal — multi-step modal for the AI CV import flow.
 *
 * Steps:
 *   upload     → drag-and-drop / click file picker
 *   processing → animated spinner while AI extracts
 *   review     → editable form pre-filled with extracted fields
 *   error      → friendly error with manual fallback
 */
export function CvImportModal({ onClose, onSuccess, initialFile }: CvImportModalProps) {
  const { step, error, extractedData, uploadAndExtract, reset } = useCVImport()
  const { updateDraft } = useOnboardingStore()
  const t = useTranslations("onboarding")

  const [dragOver, setDragOver] = React.useState(false)
  const [fileError, setFileError] = React.useState<string | null>(null)
  const [reviewData, setReviewData] = React.useState<ExtractedCVData | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Sync extractedData into local reviewData for editing
  React.useEffect(() => {
    if (extractedData) {
      // eslint-disable-next-line
      setReviewData({ ...extractedData })
    }
  }, [extractedData])

  // Automatically start upload if initialFile is provided
  React.useEffect(() => {
    if (initialFile && step === 'upload') {
      uploadAndExtract(initialFile)
    }
  }, [initialFile, step, uploadAndExtract])

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
    uploadAndExtract(file)
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

  const updateReviewField = (field: keyof ExtractedCVData, value: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setReviewData(prev => prev ? { ...prev, [field]: value as any } : prev)
  }


  const handleConfirm = () => {
    if (!reviewData) return
    const draftUpdate = {
      fullName: reviewData.fullName || '',
      jobTitle: reviewData.jobTitle || '',
      company: reviewData.company || '',
      shortBio: reviewData.shortBio || reviewData.strengths?.join(', ') || '',
      yearsOfExperience: reviewData.yearsOfExperience || '',
      linkedIn: reviewData.linkedIn || '',
      website: reviewData.website || '',
      phoneNumber: reviewData.phone || '',
      specialization: reviewData.specialization || '',
      biggestStrength: reviewData.strengths?.join(', ') || '',
      experiences: reviewData.experience ? [{
        id: "exp-1",
        jobTitle: reviewData.experience.jobTitle || '',
        company: reviewData.experience.company || '',
        startDate: reviewData.experience.startDate || '',
        endDate: reviewData.experience.endDate || '',
        description: reviewData.experience.description || ''
      }] : [],
      achievements: reviewData.achievement ? [{
        id: "ach-1",
        title: reviewData.achievement.title || '',
        description: reviewData.achievement.description || ''
      }] : [],
    }
    updateDraft(draftUpdate)
    onSuccess()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
              <FileText className="h-4.5 w-4.5 text-white h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {step === "review" ? t("cvImport.reviewTitle") : t("cvImport.title")}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {step === "upload" && t("cvImport.pdfOnly")}
                {step === "processing" && t("cvImport.aiReading")}
                {step === "review" && t("cvImport.reviewEdit")}
                {step === "error" && t("cvImport.extractionFailed")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* ── UPLOAD STEP ── */}
            {step === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18 }}
                className="p-6 space-y-5"
              >
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
                <div className="flex items-center gap-3">
                  <div className="h-px bg-slate-200 flex-1" />
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t("cvImport.whatWeExtract")}</span>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                {/* Feature list */}
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
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
              </motion.div>
            )}

            {/* ── PROCESSING STEP ── */}
            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col items-center justify-center py-20 gap-5 px-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-white">
                    <Loader2 className="h-3 w-3 text-white animate-spin" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h4 className="text-base font-bold text-slate-900">{t("cvImport.processingTitle")}</h4>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                    {t("cvImport.processingSubtitle")}
                  </p>
                </div>
                <div className="w-full max-w-xs bg-slate-100 rounded-full h-1.5 overflow-hidden mt-2">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: ["10%", "85%"] }}
                    transition={{ duration: 25, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}

            {/* ── REVIEW STEP ── */}
            {step === "review" && reviewData && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="p-6 space-y-5"
              >
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="font-medium">{t("cvImport.extractionComplete")}</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Full Name */}
                  <ReviewField
                    label={t("wizard.fullName")}
                    id="cv-fullName"
                    value={reviewData.fullName || ""}
                    onChange={(v) => updateReviewField("fullName", v)}
                    placeholder={t("wizard.fullName")}
                  />

                  {/* Job Title + Company */}
                  <div className="grid grid-cols-2 gap-4 rtl:flip">
                    <ReviewField
                      label={t("wizard.jobTitle")}
                      id="cv-jobTitle"
                      value={reviewData.jobTitle || ""}
                      onChange={(v) => updateReviewField("jobTitle", v)}
                      placeholder={t("wizard.jobTitle")}
                    />
                    <ReviewField
                      label={t("wizard.company")}
                      id="cv-company"
                      value={reviewData.company || ""}
                      onChange={(v) => updateReviewField("company", v)}
                      placeholder={t("wizard.company")}
                    />
                  </div>

                  {/* Years + Specialization */}
                  <div className="grid grid-cols-2 gap-4 rtl:flip">
                    <ReviewField
                      label={t("wizard.yearsOfExperience")}
                      id="cv-years"
                      value={reviewData.yearsOfExperience || ""}
                      onChange={(v) => updateReviewField("yearsOfExperience", v)}
                      placeholder={t("wizard.yearsOfExperience")}
                    />
                    <ReviewField
                      label={t("wizard.specializationDesc")}
                      id="cv-specialization"
                      value={reviewData.specialization || ""}
                      onChange={(v) => updateReviewField("specialization", v)}
                      placeholder={t("wizard.specializationDesc")}
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-1.5">
                    <Label htmlFor="cv-shortBio" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      {t("wizard.shortBio")}
                    </Label>
                    <Textarea
                      id="cv-shortBio"
                      value={reviewData.shortBio || ""}
                      onChange={(e) => updateReviewField("shortBio", e.target.value)}
                      placeholder={t("wizard.shortBio")}
                      className="h-24 resize-none text-sm"
                    />
                  </div>

                  {/* Strengths */}
                  <ReviewField
                    label={t("wizard.strengthDesc")}
                    id="cv-strengths"
                    value={reviewData.strengths?.join(", ") || ""}
                    onChange={(v) => updateReviewField("strengths", v ? v.split(",").map(s => s.trim()) : [])}
                    placeholder={t("wizard.strengthDesc")}
                  />

                  {/* Contact */}
                  <div className="grid grid-cols-1 gap-4">
                    <ReviewField
                      label={t("wizard.phoneNumber")}
                      id="cv-phone"
                      value={reviewData.phone || ""}
                      onChange={(v) => updateReviewField("phone", v)}
                      placeholder={t("wizard.phoneNumber")}
                    />
                    <ReviewField
                      label={t("wizard.linkedIn")}
                      id="cv-linkedin"
                      value={reviewData.linkedIn || ""}
                      onChange={(v) => updateReviewField("linkedIn", v)}
                      placeholder={t("wizard.linkedIn")}
                    />
                    <ReviewField
                      label={t("wizard.website")}
                      id="cv-website"
                      value={reviewData.website || ""}
                      onChange={(v) => updateReviewField("website", v)}
                      placeholder={t("wizard.website")}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── ERROR STEP ── */}
            {step === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col items-center justify-center py-16 gap-5 px-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900">{t("cvImport.extractionFailed")}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                    {error || t("cvImport.extractionErrorMsg")}
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 shrink-0 flex items-center justify-between gap-3">
          {step === "upload" && (
            <>
                <button
                  onClick={onClose}
                  className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {t("cvImport.cancel")}
                </button>
                <p className="text-xs text-slate-400">{t("cvImport.securityNote")}</p>
            </>
          )}

          {step === "processing" && (
            <p className="text-xs text-slate-400 w-full text-center">Please wait while AI processes your document…</p>
          )}

          {step === "review" && (
            <>
              <button
                onClick={reset}
                className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
              >
                ← Upload another
              </button>
              <Button
                onClick={handleConfirm}
                className="h-10 px-6 gap-2 font-semibold"
              >
                Confirm & Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {step === "error" && (
            <>
              <button
                onClick={reset}
                className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
              >
                Try again
              </button>
              <Button
                onClick={onClose}
                variant="outline"
                className="h-10 px-6 font-semibold"
              >
                Fill manually instead
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ── Reusable review field ──────────────────────────────────────────────────

interface ReviewFieldProps {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function ReviewField({ label, id, value, onChange, placeholder }: ReviewFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-sm"
      />
    </div>
  )
}

