"use client"
import * as React from "react"
import Link from "next/link"

import { Container } from "@/components/ui/container"
import { useTranslations } from "@/hooks/use-translations"

export function Footer() {
  const t = useTranslations("footer")


  return (
    <footer className="border-t border-border bg-card py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
              <div className="relative h-8 w-32 flex items-center">
                {/* !logoError ? (
                  <Image 
                    src="/logo.png" 
                    alt="R8ESTATE Logo" 
                    fill 
                    className="object-contain object-left" 
                    onError={() => setLogoError(true)}
                  />
                ) : */ (
                  <div className="flex items-center h-full w-full">
                    <svg viewBox="0 0 100 100" className="h-8 w-auto text-[#0a1d42]">
                      <path d="M50 10 L10 45 L20 45 L20 90 L80 90 L80 45 L90 45 Z" fill="currentColor"/>
                      <circle cx="50" cy="55" r="28" fill="#061229" />
                      <path d="M80 25 L55 50 L48 45 Z" fill="#eab308" />
                      <path d="M20 85 L45 60 L52 65 Z" fill="#ffffff" />
                      <circle cx="50" cy="55" r="7" fill="#ffffff" />
                      <circle cx="50" cy="55" r="3" fill="#0a1d42" />
                    </svg>
                    <div className="flex font-black text-2xl tracking-tighter ml-1">
                      <span className="text-[#cf1e2c]">R8</span>
                      <span className="text-[#0a1d42]">ESTATE</span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {t("tagline")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("product")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("features")}</Link></li>
              <li><Link href="#trust-score" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("trustScore")}</Link></li>
              <li><Link href="#how-it-works" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("howItWorks")}</Link></li>
              <li><Link href="#pricing" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("pricing")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#about" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("about")}</Link></li>
              <li><Link href="#contact" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("contact")}</Link></li>
              <li><Link href="#blog" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("blog")}</Link></li>
              <li><Link href="#careers" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("careers")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#privacy" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("privacy")}</Link></li>
              <li><Link href="#terms" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("terms")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Twitter</Link>
            <Link href="#" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">LinkedIn</Link>
            <Link href="#" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Instagram</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

