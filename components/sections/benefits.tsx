"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { FeatureCard } from "@/components/ui/feature-card"
import { motion } from "framer-motion"
import { Shield, Target, UserCheck, Share2, Star, Lock } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

const features = [
  {
    icon: Shield,
    key: "buildTrust"
  },
  {
    icon: UserCheck,
    key: "verifiedCredentials"
  },
  {
    icon: Star,
    key: "authenticReviews"
  },
  {
    icon: Target,
    key: "standOut"
  },
  {
    icon: Share2,
    key: "easySharing"
  },
  {
    icon: Lock,
    key: "dataPrivacy"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export function Benefits() {
  const t = useTranslations("benefits")
  return (
    <section id="features" className="py-20 md:py-28 bg-background">
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
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <FeatureCard 
                icon={feature.icon}
                title={t(`items.${feature.key}.title`)}
                description={t(`items.${feature.key}.description`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

