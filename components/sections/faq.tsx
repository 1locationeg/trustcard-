"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"

import { HeadphonesIcon, MessageCircleQuestion } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"

const faqs = [
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
  { key: "5" }
]

export function FAQ() {
  const t = useTranslations("faq")
  return (
    <section id="faq" className="py-24 md:py-32 bg-slate-50/50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          
          {/* Left Column */}
          <div className="space-y-8 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                <MessageCircleQuestion className="h-4 w-4 text-primary" />
                <span>{t("badge")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                {t("sectionTitle")}
              </h2>
              <p className="text-lg text-slate-600 max-w-xl">
                {t("sectionSubtitle")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 h-40 w-40 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 text-primary mb-5">
                    <HeadphonesIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t("contactCard.title")}</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    {t("contactCard.subtitle")}
                  </p>
                  <Link 
                    href="#contact" 
                    className={buttonVariants({ variant: "default", className: "w-full shadow-md shadow-primary/20" })}
                  >
                    {t("contactCard.cta")}
                  </Link>
                  <p className="text-xs text-center text-slate-500 mt-4">
                    {t("contactCard.replyTime")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-2 lg:pt-0"
          >
            <Accordion className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-white border border-slate-200 rounded-2xl px-6 py-2 shadow-sm data-[state=open]:border-primary/20 data-[state=open]:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="text-base md:text-lg font-semibold text-slate-900 hover:no-underline py-4 text-start">
                    {t(`items.q${faq.key}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-4 text-start">
                    {t(`items.a${faq.key}`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

