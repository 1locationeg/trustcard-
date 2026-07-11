"use client"
import * as React from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { useTranslations } from "@/hooks/use-translations"

import { ROUTES } from "@/constants/routes"
export function Navbar() {
  const t = useTranslations("nav")

  const [isVisible, setIsVisible] = React.useState(true)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Always show at the very top
      if (currentScrollY <= 0) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      const diff = currentScrollY - lastScrollY.current

      // Hide when scrolling down more than 10px
      if (diff > 10) {
        setIsVisible(false)
        lastScrollY.current = currentScrollY
      } 
      // Show when scrolling up more than 10px
      else if (diff < -10) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-32 flex items-center">
            {/* !logoError ? (
              <Image 
                src="/logo.png" 
                alt="R8ESTATE Logo" 
                fill 
                className="object-contain object-left" 
                priority
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
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("features")}</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("howItWorks")}</Link>
          <Link href="#trust-score" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("trustScore")}</Link>
          <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">{t("faq")}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href={ROUTES.LOGIN} className="text-sm font-medium text-muted-foreground hover:text-foreground hidden md:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-2 py-1">{t("signIn")}</Link>
          <Link href={`${ROUTES.ONBOARDING_GOAL}?new=true`} className={buttonVariants({ variant: "default" })}>
            {t("createTrustCard")}
          </Link>
        </div>
      </Container>
    </header>
  )
}

