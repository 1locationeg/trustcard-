"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { IconCard } from "@/components/ui/icon-card"
import { motion } from "framer-motion"
import { ShieldCheck, Share, Sparkles } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

const reasons = [
  { icon: Sparkles, key: "professionalTrustCard" },
  { icon: ShieldCheck, key: "buildCredibility" },
  { icon: Share, key: "shareAnywhere" }
]

export function WhyChooseUs() {
  const t = useTranslations("whyChooseUs")
  return (
    <section className="py-20 md:py-28 bg-muted/30">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <IconCard 
                icon={reason.icon}
                title={t(`items.${reason.key}.title`)}
                description={t(`items.${reason.key}.description`)}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

