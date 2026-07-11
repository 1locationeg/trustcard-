"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TrustCardAvatarProps {
  profilePhoto?: string
  fullName?: string
  isInlineEditing?: boolean
  onUpdate?: (updates: { profilePhoto: string }) => void
}

export function TrustCardAvatar({ profilePhoto, fullName, isInlineEditing, onUpdate }: TrustCardAvatarProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onUpdate) {
      const imageUrl = URL.createObjectURL(file)
      onUpdate({ profilePhoto: imageUrl })
    }
  }

  return (
    <div className="relative group">
      <Avatar className="h-24 w-24 border-4 border-white shadow-sm mb-3 bg-slate-100">
        <AvatarImage src={profilePhoto} className="object-cover" />
        <AvatarFallback className="text-xl font-medium text-slate-500">
          {fullName ? fullName.charAt(0).toUpperCase() : "MO"}
        </AvatarFallback>
      </Avatar>
      
      {isInlineEditing && (
        <>
          <div className="absolute inset-0 mb-3 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              type="button"
              variant="ghost" 
              size="sm"
              className="text-white hover:text-white hover:bg-white/20 h-auto py-1 px-2 text-xs"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload
            </Button>
          </div>
          {profilePhoto && (
            <button
              type="button"
              onClick={() => onUpdate?.({ profilePhoto: "" })}
              className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md hover:bg-slate-100 transition-colors z-10"
            >
              <X className="h-3 w-3 text-slate-600" />
            </button>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  )
}
