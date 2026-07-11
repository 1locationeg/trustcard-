"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { useOnboardingStore } from "@/stores/onboarding-store"

export function PreviewInfoCard() {
  const router = useRouter()
  const { previewExpiresAt } = useOnboardingStore()
  
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0 })

  React.useEffect(() => {
    if (!previewExpiresAt) return

    const calculateTimeLeft = () => {
      const difference = new Date(previewExpiresAt).getTime() - new Date().getTime()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)

    return () => clearInterval(timer)
  }, [previewExpiresAt])

  const handleSave = () => {
    router.push(ROUTES.SIGNUP)
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 shadow-sm mb-6 flex flex-col gap-6 text-center relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 mb-4">
          <Info className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-extrabold text-slate-900 text-xl tracking-tight">You&apos;re currently using Preview Mode</h3>
        <p className="text-slate-600 text-sm mt-2.5 leading-relaxed max-w-sm mx-auto">
          This Trust Card is temporary and will expire in 7 days. Create a free account to save it permanently and unlock all future features.
        </p>
      </div>
      
      <div className="relative z-10 flex justify-center gap-4 py-2">
        <div className="flex flex-col items-center justify-center bg-white border border-slate-100 shadow-sm rounded-xl w-24 h-24">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">Days</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white border border-slate-100 shadow-sm rounded-xl w-24 h-24">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">Hours</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white border border-slate-100 shadow-sm rounded-xl w-24 h-24">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">Mins</span>
        </div>
      </div>
      
      <div className="relative z-10">
        <Button 
          className="w-full h-12 text-base font-bold shadow-md rounded-xl"
          onClick={handleSave}
        >
          Save My Trust Card
        </Button>
      </div>
    </div>
  )
}
