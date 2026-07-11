"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/use-translations"

const steps = [
  { num: "1", key: "1" },
  { num: "2", key: "2" },
  { num: "3", key: "3" }
]

export function HowItWorks() {
  const t = useTranslations("howItWorks")
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-muted/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionTitle 
            title={t("sectionTitle")}
            subtitle={t("sectionSubtitle")}
          />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-border hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-6 shadow-md border-4 border-background ring-2 ring-primary/20">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold mb-2">{t(`steps.${step.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`steps.${step.key}.description`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

