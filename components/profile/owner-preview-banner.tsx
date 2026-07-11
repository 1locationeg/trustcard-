"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Edit, Share2, X, CheckCircle2, Download, Image as ImageIcon, FileText, ChevronDown } from "lucide-react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { ShareModal } from "./share-modal"
import { useTranslations } from "@/hooks/use-translations"
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function OwnerPreviewBanner() {
  const t = useTranslations("profile")
  const { isInlineEditing, tempDraft, setInlineEditing, setTempDraft, updateDraft, trustCardDraft, savedTrustCard, userMode } = useOnboardingStore()
  const [toastMessage, setToastMessage] = React.useState("")
  const [isShareOpen, setIsShareOpen] = React.useState(false)

  const handleEdit = () => {
    const draftToEdit = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;
    setTempDraft({ ...draftToEdit })
    setInlineEditing(true)
  }

  const handleSave = async () => {
    if (tempDraft) {
      updateDraft(tempDraft)
      showToast(t("ownerBanner.updateSuccess"))
    }
    setInlineEditing(false)
    setTempDraft(null)
  }

  const handleCancel = () => {
    setInlineEditing(false)
    setTempDraft(null)
  }

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(""), 3000)
  }

  const getUrl = () => {
    const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;
    const slug = draft?.slug || "preview";
    return `${window.location.origin}/u/${slug}`;
  }

  const handleShare = async () => {
    setIsShareOpen(true)
  }

  const handleDownloadPNG = async () => {
    const cardElement = document.getElementById("trust-card-preview")
    if (!cardElement) {
      showToast("Could not find Trust Card to export.")
      return
    }
    try {
      const dataUrl = await toPng(cardElement, { quality: 1, pixelRatio: 2 })
      const link = document.createElement('a')
      const name = trustCardDraft?.fullName?.replace(/\s+/g, '-') || 'trust-card'
      link.download = `${name}-preview.png`
      link.href = dataUrl
      link.click()
      showToast("Downloaded as PNG")
    } catch (err) {
      console.error(err)
      showToast("Failed to download PNG")
    }
  }

  const handleDownloadPDF = async () => {
    const cardElement = document.getElementById("trust-card-preview")
    if (!cardElement) {
      showToast("Could not find Trust Card to export.")
      return
    }
    try {
      const dataUrl = await toPng(cardElement, { quality: 1, pixelRatio: 2 })
      const width = cardElement.offsetWidth
      const height = cardElement.offsetHeight
      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "px",
        format: [width, height]
      })
      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height)
      const name = trustCardDraft?.fullName?.replace(/\s+/g, '-') || 'trust-card'
      pdf.save(`${name}-preview.pdf`)
      showToast("Downloaded as PDF")
    } catch (err) {
      console.error(err)
      showToast("Failed to download PDF")
    }
  }

  return (
    <>
      <div className="w-full bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-40 rtl:flip">
        <div className="flex items-start sm:items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-[15px]">{t("ownerBanner.title")}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {userMode === "preview" ? t("ownerBanner.guestSubtitle") : t("ownerBanner.subtitle")}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2.5 sm:ml-auto">
          {!isInlineEditing ? (
            <>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-9 bg-white/10 hover:bg-white/20 text-white border-0"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
                {t("ownerBanner.editTrustCard")}
              </Button>
              
              <Button 
                size="sm" 
                variant="default"
                className="h-9"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
                {t("ownerBanner.shareLink")}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger render={
                  <Button 
                    size="sm" 
                    variant="default"
                    className="h-9 bg-slate-800 hover:bg-slate-700"
                  >
                    <Download className="h-4 w-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
                    Download
                    <ChevronDown className="h-3 w-3 ml-1.5 opacity-70" />
                  </Button>
                } />
                <DropdownMenuContent align="end" className="w-56 bg-white border-slate-200 shadow-lg rounded-xl">
                  <DropdownMenuItem onClick={handleDownloadPNG} className="cursor-pointer gap-2 py-2.5 px-3">
                    <ImageIcon className="h-4 w-4 text-slate-500" />
                    <span className="font-medium text-slate-700">Download as Image (.PNG)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadPDF} className="cursor-pointer gap-2 py-2.5 px-3">
                    <FileText className="h-4 w-4 text-slate-500" />
                    <span className="font-medium text-slate-700">Download as PDF</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button 
                size="sm"
                variant="ghost" 
                className="h-9 text-slate-300 hover:text-white hover:bg-white/10"
                onClick={handleCancel}
              >
                <X className="h-4 w-4 mr-1.5" />
                {t("ownerBanner.cancel")}
              </Button>
              <Button 
                size="sm"
                className="h-9 bg-white text-slate-900 hover:bg-slate-100"
                onClick={handleSave}
              >
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                {t("ownerBanner.saveChanges")}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border border-slate-700">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        url={getUrl()} 
      />
    </>
  )
}
