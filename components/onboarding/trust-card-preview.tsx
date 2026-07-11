/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { Shield, Check, Star, Users, Handshake, Clock, Lock, MessageSquare, Award, BarChart3, Medal, CheckCircle2, Target } from "lucide-react"

interface TrustCardPreviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cardData?: any
  layout?: "default" | "landscape"
  showUnverifiedState?: boolean
}

export function TrustCardPreview({ cardData, showUnverifiedState }: TrustCardPreviewProps = {}) {
  const { trustCardDraft, savedTrustCard, isInlineEditing, tempDraft, userMode, selectedGoal } = useOnboardingStore()
  
  const baseCard = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft
  const draft = cardData || (isInlineEditing && tempDraft ? tempDraft : baseCard)

  const isPreviewMode = userMode === "preview"

  const fullName = draft.fullName || "Your Name"
  const jobTitle = draft.specialization || draft.jobTitle || "Your Professional Title"
  const company = draft.company || "Your Company"
  
  // Computed Values
  const computedYearsOfExperience = React.useMemo(() => {
    if (draft.experiences && draft.experiences.length > 0) {
      const startYears = draft.experiences.map((e: { startDate: string }) => {
        const yearMatch = e.startDate.match(/\d{4}/);
        return yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
      });
      const minYear = Math.min(...startYears);
      const currentYear = new Date().getFullYear();
      const years = currentYear - minYear;
      return years > 0 ? `${years}+` : "1";
    }
    return null;
  }, [draft.experiences]);

  // Metrics with logic: Manual value -> Computed value -> Preview Fallback -> Empty
  const trustScore = draft.trustScore || (isPreviewMode ? "94%" : "--")
  const dealsClosed = draft.dealsClosed || (isPreviewMode ? "142+" : "--")
  const clientRating = draft.clientRating || (isPreviewMode ? "4.9" : "--")
  const yearsExp = draft.yearsOfExperience || computedYearsOfExperience || (isPreviewMode ? "10+" : "--")
  const responseTime = draft.responseTime || (isPreviewMode ? "2h" : "--")
  const reviewCount = draft.testimonials?.length ? draft.testimonials.length : (isPreviewMode ? "24" : "--")
  const hasVerifications = draft.verifications && draft.verifications.length > 0;
  const isVerified = draft.verificationStatus === "Verified" || hasVerifications || isPreviewMode

  return (
    <div id="trust-card-preview" className="w-full relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#09101c] text-white border border-amber-500/30 shadow-md">
      
      {/* Background gradients/glows */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute -top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[60px] pointer-events-none" />
      
      <div className="relative z-10 px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-col gap-3 sm:gap-4">
        
        {/* TOP ROW */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start w-full sm:w-auto">
              <Shield className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white mb-0.5">
                TRUST CARD
              </h1>
              <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-slate-300 uppercase">
                Real Estate Professional
              </p>
            </div>
            <div className="flex justify-center sm:justify-start pt-0.5">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-amber-500/50 bg-amber-500/10">
                <Shield className="w-2.5 h-2.5 text-amber-500" />
                <span className="text-[8px] sm:text-[9px] font-bold tracking-wider text-amber-500 uppercase">
                  Verified. Trusted. Recommended.
                </span>
              </div>
            </div>
            
            {showUnverifiedState && (
              <div className="flex justify-center sm:justify-start pt-1">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-slate-200 bg-white">
                  <Shield className="w-2.5 h-2.5 text-slate-500" />
                  <span className="text-[8px] sm:text-[9px] font-medium tracking-wider text-slate-500 uppercase">
                    Unverified
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* QR Code */}
          <div className="hidden sm:flex flex-col items-center p-1.5 rounded-xl border border-slate-700/50 bg-[#0c1627] backdrop-blur-sm self-start">
            <div className="w-12 h-12 bg-white rounded-lg p-1 mb-1 flex items-center justify-center shadow-inner">
               <img 
                 src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(typeof window !== "undefined" ? `${window.location.origin}/u/${draft.slug || "user"}` : `/u/${draft.slug || "user"}`)}`} 
                 alt="Profile QR Code"
                 className="w-full h-full object-contain"
               />
            </div>
            <p className="text-[7px] sm:text-[8px] text-amber-500 font-medium text-center leading-tight">Scan to view my<br/>verified profile</p>
          </div>
        </div>

        {/* SECOND ROW (Profile Info - Left half) */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 md:w-1/2">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-[2px] border-amber-500 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden shadow-inner">
                {draft.profilePhoto ? (
                  <img src={draft.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                )}
              </div>
            </div>
            {isVerified && (
              <div className="absolute bottom-1 right-1 md:bottom-1 md:right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#09101c] flex items-center justify-center border-2 border-amber-500">
                <Shield className="w-2.5 h-2.5 md:w-3 md:h-3 text-amber-500" fill="currentColor" />
                <Check className="w-1.5 h-1.5 md:w-2 md:h-2 text-[#09101c] absolute" strokeWidth={4} />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white mb-0.5 whitespace-nowrap">
              {fullName}
            </h2>
            <p className="text-amber-500 font-medium text-xs sm:text-sm md:text-base mb-1.5 whitespace-nowrap">
              {jobTitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-slate-700 bg-slate-800/80 flex items-center justify-center text-[10px] text-slate-400 font-serif font-bold shadow-sm">
                  {company.charAt(0)}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] sm:text-xs font-medium text-slate-200">{company}</span>
                  {draft.company && (
                    <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-amber-500 mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Company Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showUnverifiedState && (
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Verification Status: <span className="text-slate-300">Unverified</span></span>
              </div>
            )}

            {/* Dynamic Tags / Badges */}
            <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-1">
              {draft.biggestStrength && (
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-indigo-500/40 text-[8px] sm:text-[9px] font-medium text-indigo-400 bg-indigo-500/10 whitespace-nowrap">
                  <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0" /> {draft.biggestStrength}
                </div>
              )}
              {selectedGoal && !draft.specialization && !draft.biggestStrength && (
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-blue-500/40 text-[8px] sm:text-[9px] font-medium text-blue-400 bg-blue-500/10">
                  <Target className="w-2 h-2 sm:w-2.5 sm:h-2.5" /> {selectedGoal} Focus
                </div>
              )}
              {isVerified && (
                <>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-amber-500/40 text-[8px] sm:text-[9px] font-medium text-amber-500 bg-amber-500/5 whitespace-nowrap">
                    <Shield className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0" /> Verified Professional
                  </div>
                  {draft.verifications && draft.verifications.length > 0 && (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-amber-500/40 text-[8px] sm:text-[9px] font-medium text-amber-500 bg-amber-500/5 whitespace-nowrap">
                      <Award className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0" /> Elite Member
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* THIRD ROW (Full-width Metrics) */}
        <div className="w-full relative rounded-xl border border-amber-500/20 bg-slate-900/30 p-1 sm:p-0 sm:bg-transparent sm:border-y sm:border-x-0 sm:border-slate-800 sm:rounded-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent opacity-50 hidden sm:block pointer-events-none" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-2 gap-x-2 py-1.5 sm:py-2 relative z-10 divide-x-0 sm:divide-x divide-slate-800/50">
            <div className="flex flex-col items-center text-center space-y-0.5">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-base sm:text-lg font-bold text-white leading-tight">{trustScore}</span>
              <span className="text-[7px] sm:text-[8px] text-slate-400 uppercase tracking-wider">Trust Score</span>
              {draft.trustScore && <span className="text-[7px] sm:text-[8px] text-amber-500 font-medium">Excellent</span>}
            </div>
            <div className="flex flex-col items-center text-center space-y-0.5">
              <Handshake className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-base sm:text-lg font-bold text-white leading-tight">{dealsClosed}</span>
              <span className="text-[7px] sm:text-[8px] text-slate-400 uppercase tracking-wider">Deals Closed</span>
              {draft.dealsClosed && <span className="text-[7px] sm:text-[8px] text-slate-500 font-medium">This Year</span>}
            </div>
            <div className="flex flex-col items-center text-center space-y-0.5 col-span-2 sm:col-span-1">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-base sm:text-lg font-bold text-white leading-tight">{clientRating}</span>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[1,2,3,4,5].map(i => <Star key={i} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${draft.clientRating ? "fill-current" : "fill-transparent"}`} />)}
              </div>
              <span className="text-[7px] sm:text-[8px] text-slate-400 uppercase tracking-wider">Client Rating</span>
              <span className="text-[7px] sm:text-[8px] text-slate-500 font-medium">({reviewCount} Reviews)</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-0.5">
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-base sm:text-lg font-bold text-white leading-tight">{yearsExp}</span>
              <span className="text-[7px] sm:text-[8px] text-slate-400 uppercase tracking-wider">Years Experience</span>
              {draft.yearsOfExperience && <span className="text-[7px] sm:text-[8px] text-slate-500 font-medium">Local Expertise</span>}
            </div>
            <div className="flex flex-col items-center text-center space-y-0.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-base sm:text-lg font-bold text-white leading-tight">{responseTime}</span>
              <span className="text-[7px] sm:text-[8px] text-slate-400 uppercase tracking-wider">Avg. Response</span>
            </div>
          </div>
        </div>

        {/* FOURTH ROW (Why Clients Choose Me) */}
        <div className="w-full space-y-2 sm:space-y-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative bg-[#09101c] px-2 text-[8px] sm:text-[9px] font-bold text-amber-500 uppercase tracking-[0.15em]">
              Why Clients Choose Me
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
            <div className="flex items-center justify-center gap-1.5">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
              <span className="text-[8px] sm:text-[9px] text-slate-300 font-medium leading-tight text-center sm:text-left">Verified<br/>Identity</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
              <span className="text-[8px] sm:text-[9px] text-slate-300 font-medium leading-tight text-center sm:text-left">Real Client<br/>Reviews</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <BarChart3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
              <span className="text-[8px] sm:text-[9px] text-slate-300 font-medium leading-tight text-center sm:text-left">Proven<br/>Results</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
              <span className="text-[8px] sm:text-[9px] text-slate-300 font-medium leading-tight text-center sm:text-left">Data<br/>Protected</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1">
              <Medal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
              <span className="text-[8px] sm:text-[9px] text-slate-300 font-medium leading-tight text-center sm:text-left">Trusted<br/>Professional</span>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-2 border-t border-slate-800 gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {/* Dummy avatar images for "Trusted by" */}
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-700 border border-[#09101c] z-40 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="client" /></div>
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-600 border border-[#09101c] z-30 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="client" /></div>
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-500 border border-[#09101c] z-20 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="client" /></div>
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-400 border border-[#09101c] z-10 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" alt="client" /></div>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] text-slate-200 leading-tight">Trusted by {draft.trustedByCount || (isPreviewMode ? "100+" : "--")} clients</span>
              <span className="text-[8px] sm:text-[9px] text-slate-400 leading-tight">Real reviews. Real results.</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-5 bg-slate-800 mx-4" />

          {draft.showR8Badge !== false ? (
            <div className="flex items-center gap-1.5">
              <div className="flex flex-col sm:text-right text-center">
                <span className="text-[9px] sm:text-[10px] text-slate-200 leading-tight">Verified by <strong className="text-white">R8ESTATE™</strong></span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 leading-tight">Real Estate Trust System</span>
              </div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
            </div>
          ) : (
            <div className="w-[120px]" /> /* Spacer to keep alignment if hidden */
          )}
        </div>

      </div>
    </div>
  )
}
