"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { CheckCircle2, ShieldCheck, Target, TrendingUp, Star } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export function FinalCTA() {
  const t = useTranslations("finalCta")
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-6xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden p-8 md:p-12 lg:p-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>{t("badge")}</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                  {t("title")}
                </h2>
                <p className="text-lg text-slate-600 max-w-md">
                  {t("subtitle")}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href={`${ROUTES.ONBOARDING_GOAL}?new=true`}
                  className={buttonVariants({ 
                    size: "lg", 
                    className: "h-14 px-8 text-base font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5" 
                  })}
                >
                  {t("ctaPrimary")}
                </Link>
                <Link 
                  href="/contact" 
                  className={buttonVariants({ 
                    size: "lg", 
                    variant: "outline", 
                    className: "h-14 px-8 text-base font-semibold bg-white hover:bg-slate-50" 
                  })}
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                
                {/* Card 1 */}
                <div className="group bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full rtl:flip">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-5 w-5 rtl:flip" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2 rtl:flip">{t("cards.supportGrowth.title")}</h4>
                  <p className="text-sm text-slate-600 flex-1 rtl:flip">{t("cards.supportGrowth.desc")}</p>
                </div>
                
                {/* Card 2 */}
                <div className="group bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full rtl:flip">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-5 w-5 rtl:flip" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2 rtl:flip">{t("cards.verifiedReviews.title")}</h4>
                  <p className="text-sm text-slate-600 flex-1 rtl:flip">{t("cards.verifiedReviews.desc")}</p>
                </div>

                {/* Card 3 */}
                <div className="group bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full rtl:flip">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-5 w-5 rtl:flip" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2 rtl:flip">{t("cards.standOut.title")}</h4>
                  <p className="text-sm text-slate-600 flex-1 rtl:flip">{t("cards.standOut.desc")}</p>
                </div>

                {/* Card 4 */}
                <div className="group bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full rtl:flip">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="h-5 w-5 rtl:flip" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2 rtl:flip">{t("cards.privacyFirst.title")}</h4>
                  <p className="text-sm text-slate-600 flex-1 rtl:flip">{t("cards.privacyFirst.desc")}</p>
                </div>
                
              </div>
            </div>

          </div>

          {/* Bottom Trust Row */}
          <div className="mt-10 md:mt-12 pt-8 border-t border-slate-100 flex flex-wrap justify-center lg:justify-between gap-4 md:gap-6 rtl:flip">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-success" /> <span className="rtl:flip">{t("features.verifiedProfiles")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-success" /> <span className="rtl:flip">{t("features.independentScoring")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-success" /> <span className="rtl:flip">{t("features.securePrivacy")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-success" /> <span className="rtl:flip">{t("features.shareableUrl")}</span>
            </div>
          </div>

        </motion.div>
      </Container>
    </section>
  )
}

