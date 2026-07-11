"use client"

import * as React from "react"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

import { ROUTES } from "@/constants/routes"
import Link from "next/link"
import { RotatingText } from "@/components/ui/rotating-text"
import { TrustCardPreview } from "@/components/onboarding/trust-card-preview"
import { useTranslations } from "@/hooks/use-translations"

export function Hero() {
  const t = useTranslations("hero")
  
  const heroDemoData = {
    fullName: "Mohamed Othman",
    jobTitle: "Senior Property Consultant",
    company: "R8ESTATE",
    trustScore: "98%",
    dealsClosed: "142+",
    yearsOfExperience: "10+",
    clientRating: "4.9",
    profilePhoto: "/mohamed-othman.png",
    verificationStatus: "Verified",
    verifications: ["Identity", "License", "Transactions"],
    biggestStrength: "Luxury Real Estate",
    testimonials: new Array(124).fill({}),
  }

  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-20 pb-0 lg:pb-12">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-slate-900/[0.015] bg-[size:32px_32px]" />
      
      {/* Centered radial gradient for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3">
        <div className="h-[500px] w-[700px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      </div>
      
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          
          {/* Copy Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 lg:w-[40%] xl:w-[42%]"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs sm:text-sm font-semibold shadow-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>{t("badge")}</span>
            </div>
            
            <h1 className="flex flex-col items-center lg:items-start justify-center lg:justify-start font-extrabold tracking-tight text-foreground text-center lg:text-left">
              <span className="text-[clamp(1.75rem,2.5vw+1rem,3rem)] leading-tight mb-0 sm:mb-1 whitespace-nowrap">
                {t("headlineLine1")}
              </span>
              <RotatingText 
                className="text-[clamp(2.5rem,4.5vw+1.25rem,4.5rem)] leading-[1.1] pb-0"
                phrases={t.raw("rotatingPhrases")} 
              />
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px]">
              {t("subheadline")}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-1 w-full sm:w-auto">
              <Link href={`${ROUTES.ONBOARDING_GOAL}?new=true`} className={buttonVariants({ size: "lg", className: "w-full sm:w-auto h-14 px-8 text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5" })}>
                {t("ctaPrimary")}
              </Link>
              <Link href="#features" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto h-14 px-8 text-base bg-background/50 backdrop-blur-sm hover:bg-muted" })}>
                {t("ctaSecondary")}
              </Link>
            </div>
          </motion.div>
          
          {/* Trust Card Preview (Right Side) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-[58%] xl:w-[55%] mt-8 lg:mt-0 flex items-center justify-center lg:justify-end"
          >
            <div className="w-full max-w-[550px] lg:scale-100 origin-center lg:origin-right">
              <TrustCardPreview cardData={heroDemoData} layout="landscape" />
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}

