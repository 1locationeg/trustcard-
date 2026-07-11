"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/use-translations"

const metrics = [
  { id: 1, key: "1" },
  { id: 2, key: "2" },
  { id: 3, key: "3" },
]

export function SocialProof() {
  const t = useTranslations("socialProof")
  return (
    <section className="border-y border-border/50 bg-muted/20 py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              <p className="text-sm font-semibold text-foreground uppercase tracking-widest whitespace-nowrap rtl:flip">
                {t(`items.${metric.key}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

