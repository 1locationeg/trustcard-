"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Copy, Link as LinkIcon, Send as TelegramIcon } from "lucide-react"
import { Facebook, Twitter, Linkedin, Whatsapp } from "@/components/ui/social-icons"
import { useTranslations } from "@/hooks/use-translations"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  onShare?: () => void
}

export function ShareModal({ isOpen, onClose, url, onShare }: ShareModalProps) {
  const t = useTranslations("profile")

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    if (onShare) onShare()
    alert(t("ownerBanner.copySuccess"))
  }

  const shareLinks = {
    whatsapp: () => {
      if (onShare) onShare()
      window.open(`https://wa.me/?text=${encodeURIComponent('Check out my Trust Card: ' + url)}`)
    },
    linkedin: () => {
      if (onShare) onShare()
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
    },
    facebook: () => {
      if (onShare) onShare()
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    },
    twitter: () => {
      if (onShare) onShare()
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Check out my Trust Card!')}`)
    },
    telegram: () => {
      if (onShare) onShare()
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Check out my Trust Card!')}`)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-[440px] pt-12 pb-8 px-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Link Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
              <LinkIcon className="h-5 w-5 text-white" />
            </div>

            {/* Header */}
            <h3 className="text-xl font-bold text-slate-900 pr-8">{t("share.title")}</h3>
            <p className="text-sm text-slate-500 mt-1">{t("share.subtitle")}</p>

            {/* Link Input Section */}
            <div className="relative flex items-center w-full mt-8 mb-8 group">
              <input 
                type="text" 
                readOnly 
                value={url} 
                className="w-full bg-slate-50 border border-slate-200 text-slate-600 text-[15px] font-medium rounded-2xl py-4 pl-5 pr-14 outline-none transition-colors group-hover:border-slate-300"
              />
              <button 
                onClick={handleCopyLink}
                className="absolute right-2 p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary rounded-xl shadow-sm transition-all active:scale-95"
                title="Copy link"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-8 rtl:flip">
              <div className="h-px bg-slate-100 flex-1" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {t("share.shareVia")}
              </span>
              <div className="h-px bg-slate-100 flex-1" />
            </div>

            {/* Social Sharing Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {/* WhatsApp */}
              <button 
                onClick={shareLinks.whatsapp}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all text-slate-700 font-semibold text-[13.5px] text-start active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-600 shrink-0">
                  <Whatsapp className="h-4.5 w-4.5" />
                </div>
                <span className="truncate">{t("share.whatsapp")}</span>
              </button>

              {/* LinkedIn */}
              <button 
                onClick={shareLinks.linkedin}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all text-slate-700 font-semibold text-[13.5px] text-start active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 shrink-0">
                  <Linkedin className="h-4.5 w-4.5" />
                </div>
                <span className="truncate">{t("share.linkedin")}</span>
              </button>

              {/* X (Twitter) */}
              <button 
                onClick={shareLinks.twitter}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all text-slate-700 font-semibold text-[13.5px] text-start active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 shrink-0">
                  <Twitter className="h-4.5 w-4.5" />
                </div>
                <span className="truncate">X (Twitter)</span>
              </button>

              {/* Facebook */}
              <button 
                onClick={shareLinks.facebook}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all text-slate-700 font-semibold text-[13.5px] text-start active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-500 shrink-0">
                  <Facebook className="h-4.5 w-4.5" />
                </div>
                <span className="truncate">{t("share.facebook")}</span>
              </button>

              {/* Telegram */}
              <button 
                onClick={shareLinks.telegram}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all text-slate-700 font-semibold text-[13.5px] text-start active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-500 shrink-0">
                  <TelegramIcon className="h-4.5 w-4.5 -ml-0.5 mt-0.5" />
                </div>
                <span className="truncate">Telegram</span>
              </button>
            </div>

            {/* Footer text */}
            <p className="text-[13px] text-slate-400 font-medium">
              Anyone with this link can view your professional Trust Card.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

