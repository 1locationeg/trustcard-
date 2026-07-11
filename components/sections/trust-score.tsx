"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/use-translations"

const criteria = [
  { key: "identity", weight: 30, completed: true },
  { key: "brokerage", weight: 25, completed: true },
  { key: "photo", weight: 10, completed: true },
  { key: "experience", weight: 15, completed: true },
  { key: "reviews", weight: 20, completed: false }
]

export function TrustScore() {
  const t = useTranslations("trustScore")
  return (
    <section id="trust-score" className="py-20 md:py-28 bg-background">
      <Container>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle 
              title={t("sectionTitle")}
              subtitle={t("sectionSubtitle")}
              alignment="left"
            />
            
            <div className="mt-10 space-y-8">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">1</div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">{t("items.verifiedIdentity.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("items.verifiedIdentity.description")}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">2</div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">{t("items.activeLicensing.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("items.activeLicensing.description")}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">3</div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">{t("items.clientReviews.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("items.clientReviews.description")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <Card className="border-border/50 shadow-xl overflow-hidden relative p-0">
              {/* Header Gradient */}
              <div className="h-32 bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                <div className="text-center text-primary-foreground z-10">
                  <div className="text-5xl font-bold">80</div>
                  <div className="text-sm font-medium uppercase tracking-wider opacity-90">{t("score")}</div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between text-sm font-medium rtl:flip">
                    <span>{t("profileStrength")}</span>
                    <span className="text-primary">80/100</span>
                  </div>
                  <Progress value={80} className="h-2.5 rtl:flip" />
                </div>
                
                <h5 className="font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wider">{t("scoreBreakdown")}</h5>
                
                <div className="space-y-4">
                  {criteria.map((item, i) => (
                    <div key={i} className="flex items-center justify-between rtl:flip">
                      <div className="flex items-center gap-3 text-sm">
                        {item.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-border" />
                        )}
                        <span className={item.completed ? "text-foreground" : "text-muted-foreground"}>
                          {t(`criteria.${item.key}`)}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {item.completed ? `+${item.weight}` : `+0`}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm">
                  <span className="font-medium">{t("learnMore")}</span>
                  <a href="#" className="flex items-center text-primary hover:underline font-medium">
                    {t("methodology")} <ChevronRight className="h-4 w-4 ml-1 rtl:flip" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

