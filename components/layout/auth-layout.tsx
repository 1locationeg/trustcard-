"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, BarChart3, Star, CheckCircle2 } from "lucide-react"
import { VerificationBadge } from "@/components/ui/verification-badge"
import { Progress } from "@/components/ui/progress"
import { ROUTES } from "@/constants/routes"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      
      {/* Left Branding Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col flex-1 relative bg-slate-900 text-white overflow-hidden p-[clamp(2rem,5vw,3rem)]">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:32px_32px]" />
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[100px] translate-x-1/3 -translate-y-1/3" />
        
        <div className="relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full">
          
          {/* Top Section (Logo + Text) */}
          <div className="flex flex-col shrink-0 space-y-[clamp(1.25rem,3vh,2rem)] mt-[clamp(2rem,8vh,6rem)] mb-[clamp(1rem,2vh,1.5rem)]">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center gap-2 w-fit">
              <div className="flex items-center gap-2 h-[clamp(2rem,3vh,2.5rem)]">
                <svg viewBox="0 0 100 100" className="h-full w-auto text-white">
                  <path d="M50 10 L10 45 L20 45 L20 90 L80 90 L80 45 L90 45 Z" fill="currentColor"/>
                  <circle cx="50" cy="55" r="28" fill="#061229" />
                  <path d="M80 25 L55 50 L48 45 Z" fill="#eab308" />
                  <path d="M20 85 L45 60 L52 65 Z" fill="#ffffff" />
                  <circle cx="50" cy="55" r="7" fill="#ffffff" />
                  <circle cx="50" cy="55" r="3" fill="#0a1d42" />
                </svg>
                <div className="flex font-black text-[clamp(1.25rem,2vw,1.5rem)] tracking-tighter">
                  <span className="text-[#cf1e2c]">R8</span>
                  <span className="text-white">ESTATE</span>
                </div>
              </div>
            </Link>
            
            <div className="space-y-[clamp(0.5rem,1.5vh,1rem)]">
              <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-tight text-white leading-[1.1]">
                Build Your Professional Reputation.
              </h1>
              <p className="text-[clamp(1rem,1.25vw,1.125rem)] text-slate-300 max-w-lg">
                Join R8ESTATE and create a verified professional profile that helps clients trust you before the first conversation.
              </p>
            </div>
          </div>
          
          {/* Dashboard Preview Section */}
          <div className="flex-1 w-full flex flex-col justify-end min-h-0 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full flex flex-col shrink rounded-t-[clamp(1rem,2vh,1.5rem)] border-x border-t border-white/10 bg-slate-800/80 backdrop-blur-md shadow-2xl p-[clamp(1rem,3vh,1.5rem)] overflow-hidden"
              style={{ maxHeight: "100%" }}
            >
              {/* Dashboard Header Mock */}
              <div className="flex items-center justify-between mb-[clamp(1rem,3vh,2rem)] pb-[clamp(1rem,2vh,1.5rem)] border-b border-white/10 shrink-0">
                <div className="flex items-center gap-[clamp(0.5rem,1.5vw,1rem)]">
                  <div className="h-[clamp(2rem,5vh,3rem)] w-[clamp(2rem,5vh,3rem)] rounded-full bg-slate-700 overflow-hidden flex items-center justify-center border-2 border-slate-600 shrink-0">
                    <span className="text-slate-400 font-bold text-[clamp(0.75rem,1.5vh,1rem)]">MO</span>
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-[clamp(0.25rem,0.5vw,0.5rem)] text-white text-[clamp(0.875rem,1.5vh,1rem)]">
                      Mohamed Othman <VerificationBadge />
                    </h3>
                    <p className="text-[clamp(0.75rem,1.2vh,0.875rem)] text-slate-400">Dashboard Overview</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[clamp(1.5rem,3.5vh,2rem)] font-bold text-primary leading-none">98</div>
                  <div className="text-[clamp(0.5rem,1vh,0.625rem)] font-bold text-slate-400 uppercase tracking-widest mt-1">Trust Score</div>
                </div>
              </div>
              
              {/* Dashboard Stats */}
              <div className="grid grid-cols-2 gap-[clamp(0.5rem,2vh,1rem)] mb-[clamp(1rem,3vh,1.5rem)] shrink-0">
                <div className="bg-slate-900/50 rounded-[clamp(0.25rem,1vh,0.5rem)] p-[clamp(0.5rem,2vh,1rem)] border border-white/5 flex flex-col justify-center">
                  <div className="flex items-center gap-[clamp(0.25rem,0.5vw,0.5rem)] text-slate-400 text-[clamp(0.6rem,1.2vh,0.75rem)] font-semibold uppercase tracking-wider mb-[clamp(0.25rem,1vh,0.5rem)]">
                    <BarChart3 className="h-[clamp(0.75rem,1.5vh,1rem)] w-[clamp(0.75rem,1.5vh,1rem)] text-primary" /> Profile Views
                  </div>
                  <div className="text-[clamp(1.125rem,2.5vh,1.5rem)] font-bold text-white flex items-baseline gap-2">
                    1,284 <span className="text-success text-[clamp(0.75rem,1.5vh,0.875rem)] font-medium">+12%</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-[clamp(0.25rem,1vh,0.5rem)] p-[clamp(0.5rem,2vh,1rem)] border border-white/5 flex flex-col justify-center">
                  <div className="flex items-center gap-[clamp(0.25rem,0.5vw,0.5rem)] text-slate-400 text-[clamp(0.6rem,1.2vh,0.75rem)] font-semibold uppercase tracking-wider mb-[clamp(0.25rem,1vh,0.5rem)]">
                    <Star className="h-[clamp(0.75rem,1.5vh,1rem)] w-[clamp(0.75rem,1.5vh,1rem)] text-warning" /> Client Rating
                  </div>
                  <div className="text-[clamp(1.125rem,2.5vh,1.5rem)] font-bold text-white flex items-baseline gap-1">
                    4.9 <span className="text-slate-400 text-[clamp(0.75rem,1.5vh,0.875rem)] font-normal">(124)</span>
                  </div>
                </div>
              </div>
              
              {/* Verification Tasks */}
              <div className="space-y-[clamp(0.5rem,1.5vh,1rem)] shrink-0 overflow-y-auto min-h-[50px] pr-2">
                <div className="flex justify-between text-[clamp(0.75rem,1.5vh,0.875rem)] font-medium">
                  <span className="text-white">Profile Completion</span>
                  <span className="text-success">95%</span>
                </div>
                <Progress value={95} aria-valuetext="95%" className="h-[clamp(0.25rem,0.8vh,0.5rem)] bg-slate-700 [&>div]:bg-success" />
                
                <div className="grid grid-cols-2 gap-[clamp(0.5rem,1.5vh,0.75rem)] mt-[clamp(0.5rem,2vh,1rem)]">
                  <div className="flex items-center gap-2 text-[clamp(0.75rem,1.5vh,0.875rem)] text-slate-300 bg-white/5 p-[clamp(0.35rem,1vh,0.5rem)] rounded-md">
                    <CheckCircle2 className="h-[clamp(0.875rem,1.5vh,1rem)] w-[clamp(0.875rem,1.5vh,1rem)] text-success shrink-0" /> ID Verified
                  </div>
                  <div className="flex items-center gap-2 text-[clamp(0.75rem,1.5vh,0.875rem)] text-slate-300 bg-white/5 p-[clamp(0.35rem,1vh,0.5rem)] rounded-md">
                    <CheckCircle2 className="h-[clamp(0.875rem,1.5vh,1rem)] w-[clamp(0.875rem,1.5vh,1rem)] text-success shrink-0" /> Broker Linked
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
      
      {/* Right Auth Panel */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-32 relative">
        {/* Mobile Logo Fallback */}
        <div className="absolute top-8 left-6 lg:hidden">
          <Link href={ROUTES.HOME} className="flex items-center gap-1">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-slate-900">R8ESTATE</span>
          </Link>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px] mx-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
