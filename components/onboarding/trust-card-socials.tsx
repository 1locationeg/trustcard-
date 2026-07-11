"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Globe, MessageCircle } from "lucide-react"
import { Linkedin } from "@/components/ui/social-icons"

interface TrustCardSocialsProps {
  linkedIn?: string
  website?: string
  phoneNumber?: string
  isInlineEditing?: boolean
  onUpdate?: (updates: { linkedIn?: string; website?: string; phoneNumber?: string }) => void
}

export function TrustCardSocials({ linkedIn, website, phoneNumber, isInlineEditing, onUpdate }: TrustCardSocialsProps) {
  if (!linkedIn && !website && !phoneNumber && !isInlineEditing) return null

  return (
    <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
      {isInlineEditing ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full shrink-0 bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center">
              <Linkedin className="h-4 w-4" />
            </div>
            <Input 
              value={linkedIn || ""} 
              onChange={(e) => onUpdate?.({ linkedIn: e.target.value })}
              className="h-8 text-sm"
              placeholder="LinkedIn URL"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full shrink-0 bg-slate-100 text-slate-600 flex items-center justify-center">
              <Globe className="h-4 w-4" />
            </div>
            <Input 
              value={website || ""} 
              onChange={(e) => onUpdate?.({ website: e.target.value })}
              className="h-8 text-sm"
              placeholder="Website URL"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full shrink-0 bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <Input 
              value={phoneNumber || ""} 
              onChange={(e) => onUpdate?.({ phoneNumber: e.target.value })}
              className="h-8 text-sm"
              placeholder="Phone Number"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          {linkedIn && (
            <div className="w-8 h-8 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center">
              <Linkedin className="h-4 w-4" />
            </div>
          )}
          {website && (
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
              <Globe className="h-4 w-4" />
            </div>
          )}
          {phoneNumber && (
            <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
