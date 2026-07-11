"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { 
  Shield, Check, Star, Users, Phone, Mail, QrCode, 
  ChevronRight, ChevronLeft, Plus, Minus, Search, 
  Sparkles, Share2, Download, AlertCircle, Trash2, 
  Award, Medal, BookOpen, MessageSquare, Video, FileText,
  Lock, Globe, CheckCircle2, User, Landmark, Building
} from "lucide-react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { useAuthStore } from "@/stores/auth-store"
import { ROUTES } from "@/constants/routes"
import { Input } from "@/components/ui/input"

// Predefined beautiful broker headshots for instant visual gratification
const PLACEHOLDER_AVATARS = [
  { id: "avatar1", name: "Ahmed", url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop" },
  { id: "avatar2", name: "Sarah", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop" },
  { id: "avatar3", name: "Michael", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&auto=format&fit=crop" }
]

const COMPANIES = [
  { name: "EMAAR", icon: Building },
  { name: "ORA Developers", icon: Landmark },
  { name: "Mountain View", icon: Building },
  { name: "Coldwell Banker", icon: Building },
  { name: "Independent Professional", icon: User }
]

const MARKETS = ["New Cairo", "North Coast", "Sheikh Zayed", "Dubai", "Riyadh"]

const EXPERTISES = [
  "Off-Plan Specialist",
  "Luxury Specialist",
  "Investment Advisor",
  "Commercial Specialist",
  "Leasing Specialist",
  "Property Management"
]

export function ValueFirstWizard() {
  const router = useRouter()
  const store = useOnboardingStore()
  const { user, login } = useAuthStore()

  // Local state for interactive flow
  const [step, setStep] = React.useState(1)
  const [searchCompany, setSearchCompany] = React.useState("")
  const [selectedMarkets, setSelectedMarkets] = React.useState<string[]>([])
  const [isLoadingIntelligence, setIsLoadingIntelligence] = React.useState(false)
  const [intelligenceLog, setIntelligenceLog] = React.useState("")
  const [showSignupModal, setShowSignupModal] = React.useState(false)
  const [signupForm, setSignupForm] = React.useState({ fullName: "", email: "", password: "" })
  const [signupError, setSignupError] = React.useState("")
  const [signupSuccess, setSignupSuccess] = React.useState(false)

  // Default values mapping to store
  const draft = store.trustCardDraft
  const updateDraft = store.updateDraft

  // Sync markets from state to store draft
  React.useEffect(() => {
    if (selectedMarkets.length > 0) {
      updateDraft({ location: selectedMarkets.join(" • ") })
    }
  }, [selectedMarkets, updateDraft])

  // Intelligence scoring log animation
  React.useEffect(() => {
    if (step === 11) {
      setIsLoadingIntelligence(true)
      const logs = [
        "Analyzing identity verifications...",
        "Evaluating track record volume...",
        "Cross-referencing client proof ledger...",
        "Calculating authority and recognition weight...",
        "Generating Buyer Confidence Score..."
      ]
      let currentIdx = 0
      setIntelligenceLog(logs[0])

      const interval = setInterval(() => {
        currentIdx++
        if (currentIdx < logs.length) {
          setIntelligenceLog(logs[currentIdx])
        } else {
          clearInterval(interval)
          setIsLoadingIntelligence(false)
        }
      }, 900)

      return () => clearInterval(interval)
    }
  }, [step])

  const handleNext = () => {
    if (step < 12) {
      setStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1)
    }
  }

  const handleSelectExpertise = (exp: string) => {
    updateDraft({ specialization: exp })
  }

  const handleSelectCompany = (comp: string) => {
    updateDraft({ company: comp })
  }

  const handleToggleMarket = (market: string) => {
    setSelectedMarkets(prev => 
      prev.includes(market) ? prev.filter(m => m !== market) : [...prev, market]
    )
  }

  const handleSelectAvatar = (url: string) => {
    updateDraft({ profilePhoto: url })
  }

  // Count/Metric toggles for Track Record
  const adjustMetric = (field: "dealsClosed" | "yearsOfExperience" | "clientRating" | "trustedByCount", change: number, isFloat = false) => {
    const val = draft[field] ? parseFloat(draft[field] as string) : 0
    let newVal = val + change
    if (newVal < 0) newVal = 0
    if (isFloat) {
      updateDraft({ [field]: newVal.toFixed(1).toString() })
    } else {
      updateDraft({ [field]: Math.round(newVal).toString() })
    }
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError("")
    if (!signupForm.fullName || !signupForm.email || !signupForm.password) {
      setSignupError("Please fill out all fields.")
      return
    }

    // Perform mock register and claim Page
    setSignupSuccess(true)
    setTimeout(() => {
      login({
        id: "registered-user-id",
        name: signupForm.fullName,
        email: signupForm.email
      })
      store.updateDraft({
        fullName: signupForm.fullName,
        trustScore: 94,
        verificationStatus: "Verified"
      })
      store.savePreviewToPermanent()
      setShowSignupModal(false)
      router.push(ROUTES.DASHBOARD)
      router.refresh()
    }, 1000)
  }

  const handleClaimPage = () => {
    if (user) {
      // User is already logged in, save preview directly
      store.savePreviewToPermanent()
      router.push(ROUTES.DASHBOARD)
    } else {
      // Prompt delayed sign-up commitment
      setSignupForm(prev => ({ ...prev, fullName: draft.fullName }))
      setShowSignupModal(true)
    }
  }

  // Get current step progress percentage
  const progressPercentage = Math.min((step / 12) * 100, 100)

  // Subcomponents for each step screen
  const renderStepContent = () => {
    switch (step) {
      case 1: // Welcome Screen
        return (
          <div className="flex flex-col items-center justify-between h-full py-6 text-center">
            <div className="my-auto space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shadow-lg shadow-amber-500/5 animate-pulse">
                  <Shield className="w-8 h-8 text-amber-500" />
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-500">Welcome to R8ESTATE</span>
                <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Let&apos;s build the page buyers will trust.
                </h1>
                <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                  Transform from an unknown professional into a confident decision in less than 2 minutes.
                </p>
              </div>
              
              <div className="bg-[#0c1627] border border-slate-800 rounded-2xl p-4 text-left space-y-3 mx-auto max-w-[280px]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                  </div>
                  <span className="text-slate-300 text-xs font-medium">2 minutes to complete</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                  </div>
                  <span className="text-slate-300 text-xs font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                  </div>
                  <span className="text-slate-300 text-xs font-medium">Live preview as you build</span>
                </div>
              </div>
            </div>

            <div className="w-full pt-4">
              <button 
                onClick={handleNext}
                className="w-full h-12 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/15 hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Start Building <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 2: // Who Are You?
        return (
          <div className="flex flex-col justify-between h-full py-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider">Step 2 of 12 • Identity</span>
                <h2 className="text-xl font-bold text-white">Who are you?</h2>
                <p className="text-slate-400 text-xs">Let&apos;s start with the basics.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Your full name</label>
                <Input
                  placeholder="e.g. Ahmed Hassan"
                  value={draft.fullName || ""}
                  onChange={(e) => updateDraft({ fullName: e.target.value })}
                  className="bg-slate-900 border-slate-800 text-white rounded-xl h-11 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="w-full pt-4">
              <button
                onClick={handleNext}
                disabled={!draft.fullName}
                className="w-full h-12 bg-amber-500 text-slate-950 font-bold rounded-xl disabled:opacity-50 disabled:pointer-events-none hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 3: // Expertise
        return (
          <div className="flex flex-col justify-between h-full py-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider">Step 3 of 12 • Specialization</span>
                <h2 className="text-xl font-bold text-white">What do people know you for?</h2>
                <p className="text-slate-400 text-xs">Select your primary expertise.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {EXPERTISES.map((exp) => {
                  const isSelected = draft.specialization === exp
                  return (
                    <button
                      key={exp}
                      onClick={() => handleSelectExpertise(exp)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all duration-200 ${
                        isSelected 
                          ? "bg-amber-500/10 border-amber-500 text-amber-500 shadow-md shadow-amber-500/5" 
                          : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {exp}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="w-full pt-4 flex gap-2">
              <button onClick={handlePrev} className="h-12 px-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!draft.specialization}
                className="flex-1 h-12 bg-amber-500 text-slate-950 font-bold rounded-xl disabled:opacity-50 disabled:pointer-events-none hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 4: // Company
        return (
          <div className="flex flex-col justify-between h-full py-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider">Step 4 of 12 • Brand</span>
                <h2 className="text-xl font-bold text-white">Where do you work?</h2>
                <p className="text-slate-400 text-xs">Select your company or brand.</p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" strokeWidth={2.5} />
                <Input
                  placeholder="Search company..."
                  value={searchCompany}
                  onChange={(e) => setSearchCompany(e.target.value)}
                  className="bg-slate-900 border-slate-800 pl-9 text-white rounded-xl h-11 focus:border-amber-500 focus:ring-0"
                />
              </div>

              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {COMPANIES.filter(c => c.name.toLowerCase().includes(searchCompany.toLowerCase())).map((comp) => {
                  const isSelected = draft.company === comp.name
                  const CompIcon = comp.icon
                  return (
                    <button
                      key={comp.name}
                      onClick={() => handleSelectCompany(comp.name)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between text-left text-xs font-semibold transition-all duration-200 ${
                        isSelected 
                          ? "bg-amber-500/10 border-amber-500 text-amber-500 shadow-md" 
                          : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CompIcon className="w-4 h-4 text-slate-500" />
                        <span>{comp.name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-500" />}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="w-full pt-4 flex gap-2">
              <button onClick={handlePrev} className="h-12 px-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!draft.company}
                className="flex-1 h-12 bg-amber-500 text-slate-950 font-bold rounded-xl disabled:opacity-50 disabled:pointer-events-none hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 5: // Markets
        return (
          <div className="flex flex-col justify-between h-full py-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider">Step 5 of 12 • Target Area</span>
                <h2 className="text-xl font-bold text-white">Where do you operate?</h2>
                <p className="text-slate-400 text-xs">Select the markets you serve.</p>
              </div>

              <div className="space-y-2">
                {MARKETS.map((market) => {
                  const isSelected = selectedMarkets.includes(market)
                  return (
                    <button
                      key={market}
                      onClick={() => handleToggleMarket(market)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between text-left text-xs font-semibold transition-all duration-200 ${
                        isSelected 
                          ? "bg-amber-500/10 border-amber-500 text-amber-500 shadow-md" 
                          : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <span>{market}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isSelected ? "bg-amber-500 border-amber-500 text-slate-950" : "border-slate-700"
                      }`}>
                        {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="w-full pt-4 flex gap-2">
              <button onClick={handlePrev} className="h-12 px-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={selectedMarkets.length === 0}
                className="flex-1 h-12 bg-amber-500 text-slate-950 font-bold rounded-xl disabled:opacity-50 disabled:pointer-events-none hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 6: // Photo
        return (
          <div className="flex flex-col justify-between h-full py-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider">Step 6 of 12 • Avatar</span>
                <h2 className="text-xl font-bold text-white">Add your photo</h2>
                <p className="text-slate-400 text-xs">Add a professional photo.</p>
              </div>

              <div className="flex flex-col items-center justify-center py-2 space-y-4">
                <div className="w-20 h-20 rounded-full border-2 border-amber-500 p-0.5 relative">
                  <div className="w-full h-full rounded-full bg-[#0d1627] overflow-hidden flex items-center justify-center">
                    {draft.profilePhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={draft.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-8 h-8 text-slate-500" />
                    )}
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-center">Quick Select Professional Photo</span>
                  <div className="flex justify-center gap-3">
                    {PLACEHOLDER_AVATARS.map((av) => (
                      <button
                        key={av.id}
                        onClick={() => handleSelectAvatar(av.url)}
                        className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                          draft.profilePhoto === av.url ? "border-amber-500 scale-110 shadow-lg" : "border-slate-800 hover:border-slate-650"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full pt-4 flex gap-2">
              <button onClick={handlePrev} className="h-12 px-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!draft.profilePhoto}
                className="flex-1 h-12 bg-amber-500 text-slate-950 font-bold rounded-xl disabled:opacity-50 disabled:pointer-events-none hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 7: // Verification Center
        return (
          <div className="flex flex-col justify-between h-full py-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider">Step 7 of 12 • Confidence</span>
                <h2 className="text-xl font-bold text-white">Verification Center</h2>
                <p className="text-slate-400 text-xs">Get verified. Build instant trust.</p>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {[
                  { label: "Identity Verified", checked: true },
                  { label: "Phone Verified", checked: true },
                  { label: "Email Verified", checked: true },
                  { label: "LinkedIn Connected", checked: true },
                  { label: "Company Verified", checked: true },
                  { label: "Background Checked", checked: true }
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">{item.label}</span>
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white leading-none">Verification Level</p>
                    <p className="text-[10px] text-amber-500/80 font-bold uppercase tracking-wider mt-0.5">GOLD MEMBER</p>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-slate-400">58% Complete</div>
              </div>
            </div>

            <div className="w-full pt-4 flex gap-2">
              <button onClick={handlePrev} className="h-12 px-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 h-12 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 8: // Track Record
        return (
          <div className="flex flex-col justify-between h-full py-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider">Step 8 of 12 • Track Record</span>
                <h2 className="text-xl font-bold text-white">Your Track Record</h2>
                <p className="text-slate-400 text-xs">Let&apos;s showcase your experience.</p>
              </div>

              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {[
                  { label: "Deals Closed", field: "dealsClosed", defaultVal: 142, isFloat: false },
                  { label: "Years Experience", field: "yearsOfExperience", defaultVal: 9, isFloat: false },
                  { label: "Projects Sold", field: "trustedByCount", defaultVal: 37, isFloat: false }
                ].map((item) => {
                  const val = draft[item.field as keyof typeof draft] 
                    ? parseFloat(draft[item.field as keyof typeof draft] as string) 
                    : item.defaultVal

                  // Set defaults on load if empty
                  if (!draft[item.field as keyof typeof draft]) {
                    updateDraft({ [item.field]: item.defaultVal.toString() })
                  }

                  return (
                    <div key={item.label} className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => adjustMetric(item.field as any, -1, item.isFloat)}
                          className="w-7 h-7 rounded-lg bg-[#0c1627] border border-slate-850 text-slate-400 hover:text-white flex items-center justify-center"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-amber-500 w-8 text-center">{val}</span>
                        <button
                          onClick={() => adjustMetric(item.field as any, 1, item.isFloat)}
                          className="w-7 h-7 rounded-lg bg-[#0c1627] border border-slate-850 text-slate-400 hover:text-white flex items-center justify-center"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="text-right text-[10px] text-slate-400 font-semibold uppercase tracking-wider">70% Complete</div>
            </div>

            <div className="w-full pt-4 flex gap-2">
              <button onClick={handlePrev} className="h-12 px-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 h-12 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 9: // Client Proof
        return (
          <div className="flex flex-col justify-between h-full py-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider">Step 9 of 12 • Evidence</span>
                <h2 className="text-xl font-bold text-white">Client Proof</h2>
                <p className="text-slate-400 text-xs">Add reviews, testimonials & cases.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Client Reviews", val: "12 Added", icon: MessageSquare },
                  { label: "Testimonials", val: "3 Added", icon: CheckCircle2 },
                  { label: "Case Studies", val: "2 Added", icon: FileText },
                  { label: "Video Testimonials", val: "1 Added", icon: Video }
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-left">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-4 h-4 text-slate-500" />
                        <span className="text-[10px] bg-slate-850 text-amber-500 font-bold px-1.5 py-0.5 rounded">{item.val}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-300 leading-tight">{item.label}</p>
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {["LinkedIn", "Google", "PDF"].map((src) => (
                  <button key={src} className="py-2 px-1 bg-slate-900 border border-slate-800 text-[10px] font-bold rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                    Import {src}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full pt-4 flex gap-2">
              <button onClick={handlePrev} className="h-12 px-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 h-12 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 10: // Authority & Recognition
        return (
          <div className="flex flex-col justify-between h-full py-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider">Step 10 of 12 • Authority</span>
                <h2 className="text-xl font-bold text-white">Authority & Recognition</h2>
                <p className="text-slate-400 text-xs">Show your professional authority.</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Awards", val: "3 Added", icon: Medal },
                  { label: "Media Mentions", val: "2 Added", icon: Globe },
                  { label: "Certifications", val: "4 Added", icon: Award },
                  { label: "Speaking", val: "6 Added", icon: Users },
                  { label: "Articles", val: "6 Added", icon: BookOpen },
                  { label: "Community", val: "1 Added", icon: Star }
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-center flex flex-col items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-amber-500 mb-1" />
                      <p className="text-[10px] font-bold text-white leading-tight mb-0.5">{item.label}</p>
                      <span className="text-[8px] text-slate-400 font-medium">{item.val}</span>
                    </div>
                  )
                })}
              </div>

              <div className="text-right text-[10px] text-slate-400 font-semibold uppercase tracking-wider">88% Complete</div>
            </div>

            <div className="w-full pt-4 flex gap-2">
              <button onClick={handlePrev} className="h-12 px-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 h-12 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 11: // Intelligence Score Analysis Loading
        return (
          <div className="flex flex-col justify-between h-full py-4 text-center">
            <div className="my-auto space-y-6">
              {isLoadingIntelligence ? (
                <div className="space-y-6 py-8">
                  <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-amber-500 animate-spin" />
                    <Sparkles className="w-8 h-8 text-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white animate-pulse">R8ESTATE Intelligence</h3>
                    <p className="text-xs text-slate-400 h-8 flex items-center justify-center font-medium">
                      {intelligenceLog}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider">Analysis Complete</span>
                  <h2 className="text-xl font-bold text-white">Your intelligence summary is ready.</h2>
                  
                  {/* Gauge score visualization */}
                  <div className="relative w-36 h-36 mx-auto flex flex-col items-center justify-center bg-[#07111f] rounded-full border border-amber-500/10 shadow-inner">
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle cx="72" cy="72" r="60" stroke="#0f1e33" strokeWidth="8" fill="transparent" />
                      <circle cx="72" cy="72" r="60" stroke="#f59e0b" strokeWidth="8" fill="transparent" 
                        strokeDasharray="377" strokeDashoffset="22" strokeLinecap="round" />
                    </svg>
                    <div className="relative z-10 text-center">
                      <span className="text-4xl font-extrabold text-white">94</span>
                      <p className="text-[8px] font-bold uppercase tracking-wider text-amber-500 leading-none mt-0.5">Trust Score</p>
                    </div>
                  </div>

                  <div className="space-y-2 max-w-[280px] mx-auto text-left">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
                      <span className="text-slate-400">Buyer Confidence</span>
                      <span className="font-bold text-emerald-400 uppercase tracking-wide">Excellent</span>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
                      <span className="text-slate-400">Risk Assessment</span>
                      <span className="font-bold text-emerald-400">Low Risk</span>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
                      <span className="text-slate-400">Best Fit Target</span>
                      <span className="font-bold text-amber-500">Luxury / Investors</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full pt-4">
              <button
                onClick={handleNext}
                disabled={isLoadingIntelligence}
                className="w-full h-12 bg-amber-500 text-slate-950 font-bold rounded-xl disabled:opacity-50 disabled:pointer-events-none hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Finalize <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      case 12: // Success / Ready Screen
        return (
          <div className="flex flex-col justify-between h-full py-4 text-center">
            <div className="my-auto space-y-5">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-500" strokeWidth={3} />
                </div>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Your Trust Page is Ready!</h2>
                <p className="text-slate-400 text-xs px-4 leading-relaxed">
                  Your professional decision intelligence page has been generated. Let&apos;s publish it to the world.
                </p>
              </div>

              {/* Mini Preview Graphic */}
              <div className="relative w-full max-w-[280px] mx-auto p-4 bg-[#0a1526] border border-slate-800 rounded-2xl flex flex-col items-center">
                <div className="w-14 h-14 bg-white rounded-lg p-1 shadow-inner flex items-center justify-center mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://r8estate.com/u/${draft.slug || "user"}`)}`} 
                    alt="Mock Profile QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider mb-2">r8estate.com/u/{draft.slug || "user"}</p>
                <div className="flex gap-2 w-full">
                  <button 
                    onClick={handleClaimPage}
                    className="flex-1 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share Link
                  </button>
                  <button 
                    onClick={handleClaimPage}
                    className="flex-1 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 text-slate-400">
                <button onClick={handleClaimPage} className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-semibold">WhatsApp</span>
                </button>
                <button onClick={handleClaimPage} className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-semibold">LinkedIn</span>
                </button>
                <button onClick={handleClaimPage} className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-semibold">Email</span>
                </button>
              </div>
            </div>

            <div className="w-full pt-4">
              <button
                onClick={handleClaimPage}
                className="w-full h-12 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Go to My Trust Page <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between relative overflow-hidden select-none font-sans w-full">
      
      {/* Background glow graphics */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-0 md:p-4">
        
        {/* Desktop Device Mockup Frame / Full screen on mobile */}
        <div className="w-full md:max-w-[390px] h-screen md:h-[780px] bg-[#09101c] md:rounded-[48px] md:border-[10px] md:border-slate-900 md:shadow-2xl md:relative md:overflow-hidden flex flex-col justify-between border-0 md:border border-slate-900/50 relative">
          
          {/* Simulated safe-area PWA Header (status bar) */}
          <div className="px-6 pt-3 pb-2 flex justify-between items-center bg-[#070e1a]/80 backdrop-blur-md shrink-0 z-20 border-b border-slate-900 pt-[calc(12px+env(safe-area-inset-top))]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              <span className="font-black text-xs text-white tracking-wider">R8ESTATE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[9px] font-bold text-amber-500/80 uppercase tracking-widest">LIVE</span>
            </div>
          </div>

          {/* Wizard step content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col z-10 pb-[calc(16px+env(safe-area-inset-bottom))]">
            {renderStepContent()}
          </div>

          {/* Mini Real-Time Trust Card Preview (Steps 2-10) */}
          {step >= 2 && step <= 10 && (
            <div className="px-6 py-3 border-t border-slate-900 bg-[#070e1a]/95 backdrop-blur-md shrink-0 z-20 pb-[calc(12px+env(safe-area-inset-bottom))]">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">TRUST CARD PREVIEW</span>
              
              <div className="p-3 bg-[#0a1526] border border-amber-500/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-amber-500/50 p-0.5 shrink-0 bg-slate-900 overflow-hidden flex items-center justify-center">
                    {draft.profilePhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={draft.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-5 h-5 text-slate-650" />
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white truncate max-w-[130px]">{draft.fullName || "Your Name"}</h4>
                    <p className="text-[9px] text-amber-500 font-medium truncate max-w-[130px]">{draft.specialization || "Your Title"}</p>
                    <p className="text-[8px] text-slate-400 mt-0.5 truncate max-w-[130px]">{draft.company || "Your Brand"}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <div className="flex items-center gap-0.5 text-[9px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded-lg border border-amber-500/20">
                    <Shield className="w-2.5 h-2.5" />
                    <span>94</span>
                  </div>
                  <span className="text-[7px] text-slate-500 font-medium uppercase tracking-wider mt-1">Trust Score</span>
                </div>
              </div>
            </div>
          )}

          {/* Progress cue line */}
          {step > 1 && (
            <div className="w-full h-1 bg-slate-900 shrink-0 z-20">
              <div 
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}
        </div>

      </div>

      {/* Delayed Commitment Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignupModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-[#09101c] border border-slate-800 rounded-3xl p-6 shadow-2xl z-10 text-slate-100"
            >
              <div className="text-center space-y-1 mb-4">
                <h3 className="text-xl font-bold flex items-center justify-center gap-2 text-white">
                  <Shield className="w-5 h-5 text-amber-500" />
                  Claim your Trust Page
                </h3>
                <p className="text-slate-450 text-xs leading-relaxed">
                  Create a free account to save your 94% Trust Score and claim your professional link.
                </p>
              </div>

              {signupError && (
                <div className="p-3 bg-red-500/15 border border-red-500/20 rounded-xl text-red-500 text-xs flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{signupError}</span>
                </div>
              )}

              {signupSuccess && (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Success! Generating your public Trust URL...</span>
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="space-y-4 pt-2">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <Input
                    placeholder="Ahmed Hassan"
                    value={signupForm.fullName}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
                    className="bg-slate-900 border-slate-800 text-white rounded-xl h-10 text-sm focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <Input
                    type="email"
                    placeholder="you@domain.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-slate-900 border-slate-800 text-white rounded-xl h-10 text-sm focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-slate-900 border-slate-800 text-white rounded-xl h-10 text-sm focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={signupSuccess}
                  className="w-full h-11 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  Claim & Publish Page <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
