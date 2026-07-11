"use client"

import * as React from "react"
import { notFound } from "next/navigation"
import { usePublicTrustCard } from "@/hooks/use-public-trust-card"
import { Building2, Globe, Phone, Star, Shield } from "lucide-react"
import { Linkedin } from "@/components/ui/social-icons"
import { TrustCardPreview } from "@/components/onboarding/trust-card-preview"
import { useTranslations } from "@/hooks/use-translations"

interface PublicProfileClientProps {
  slug: string
}

export function PublicProfileClient({ slug }: PublicProfileClientProps) {
  const { card, isLoading, isOwner } = usePublicTrustCard(slug)
  const t = useTranslations("profile.publicProfile")

  // Track profile view on load (mock)
  React.useEffect(() => {
    if (!card) return
    console.log("Mock tracking profile view for:", slug)
  }, [card, slug])

  const trackClick = async (eventType: string) => {
    if (!card) return
    console.log("Mock tracking click event:", eventType)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!card) {
    notFound()
  }

  const isVerified = card.verificationStatus === "Verified"
  // Guests see the unverified state. Owners do not.
  const showUnverifiedState = !isOwner && !isVerified

  const demoExperiences = [
    {
      id: "demo1",
      jobTitle: "Senior Property Consultant",
      company: "R8ESTATE Properties",
      startDate: "2018",
      endDate: "Present",
      description: "Leading the luxury residential division, managing a portfolio of high-net-worth clients, and consistently exceeding annual sales targets by 150%. Specializing in off-plan properties and premium waterfront villas."
    },
    {
      id: "demo2",
      jobTitle: "Real Estate Agent",
      company: "Prime Realty LLC",
      startDate: "2014",
      endDate: "2018",
      description: "Successfully closed over 200 transactions. Advised clients on market trends, property valuations, and investment opportunities in emerging neighborhoods."
    }
  ]

  const demoTestimonials = [
    {
      id: "demo1",
      clientName: "Sarah Jenkins",
      role: "Home Buyer",
      rating: 5,
      quote: "Absolutely phenomenal experience! Found our dream home in less than two weeks. The negotiation process was completely stress-free."
    },
    {
      id: "demo2",
      clientName: "Michael Chen",
      role: "Property Investor",
      rating: 5,
      quote: "Extremely knowledgeable about the local market. Provided invaluable insights that helped me secure a fantastic investment property with great ROI."
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 flex flex-col gap-10 items-center">
          
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
            {/* Warning Banner */}
            {showUnverifiedState && (
              <div className="w-full bg-amber-50 border border-amber-200 rounded-xl py-4 px-5 flex items-center gap-3">
                <Shield className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-[15px] font-medium text-amber-900/80 leading-snug">
                  This Trust Card is currently unverified. The information shown is provided by the owner and has not yet been verified by R8ESTATE.
                </p>
              </div>
            )}

            {/* Hero Trust Card */}
            <div className="w-full shrink-0 flex flex-col items-center justify-center">
              <div className="w-full transform sm:scale-95 origin-top transition-transform">
                <TrustCardPreview cardData={card} layout="landscape" showUnverifiedState={showUnverifiedState} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            


            {/* About Section */}
            {(card.shortBio || showUnverifiedState) && (
              <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">{t("about")}</h2>
                <p className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-wrap">
                  {card.shortBio || "I am a dedicated Real Estate Consultant with a deep passion for matching clients with their perfect homes. Over the past decade, I have built a strong reputation for my market knowledge, negotiation skills, and unwavering commitment to client satisfaction. Whether you are buying your first home or expanding your investment portfolio, I provide tailored guidance every step of the way."}
                </p>
              </section>
            )}

            {/* Experience Section */}
            {((card.experiences && card.experiences.length > 0) || showUnverifiedState) && (
              <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">{t("experience")}</h2>
                  {card.experiences && card.experiences.length > 2 && (
                    <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                      View All ({card.experiences.length})
                    </button>
                  )}
                </div>
                
                <div className="space-y-6">
                  {(card.experiences && card.experiences.length > 0 ? card.experiences.slice(0, 2) : demoExperiences).map((exp) => (
                    <div key={exp.id} className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center shrink-0 shadow-sm mt-1">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{exp.jobTitle}</h3>
                        <p className="text-primary font-medium text-[15px] mb-1">{exp.company}</p>
                        <p className="text-slate-400 text-sm font-medium mb-3">
                          {exp.startDate} - {exp.endDate}
                        </p>
                        {exp.description && (
                          <p className="text-slate-600 text-[15px] leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contact Information & Socials Grid */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">{t("contact")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {card.phoneNumber && (
                  <a 
                    href={`tel:${card.phoneNumber.replace(/[^\d+]/g, '')}`} 
                    onClick={() => trackClick("phone_click")}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white text-slate-600 flex items-center justify-center shrink-0 shadow-sm group-hover:text-primary transition-colors">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t("phone")}</p>
                      <p className="text-[15px] font-semibold text-slate-700 truncate">{card.phoneNumber}</p>
                    </div>
                  </a>
                )}
                {card.linkedIn && (
                  <a 
                    href={card.linkedIn} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackClick("linkedin_click")}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors border border-blue-100/50 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white text-[#0A66C2] flex items-center justify-center shrink-0 shadow-sm transition-colors">
                      <Linkedin className="w-4.5 h-4.5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[#0A66C2]/60 uppercase tracking-wider mb-0.5">LinkedIn</p>
                      <p className="text-[15px] font-semibold text-[#0A66C2] truncate">{card.linkedIn.replace(/^https?:\/\/(www\.)?/, '')}</p>
                    </div>
                  </a>
                )}
                {card.website && (
                  <a 
                    href={card.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackClick("website_click")}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white text-slate-600 flex items-center justify-center shrink-0 shadow-sm group-hover:text-primary transition-colors">
                      <Globe className="w-4.5 h-4.5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t("website")}</p>
                      <p className="text-[15px] font-semibold text-slate-700 truncate">{card.website.replace(/^https?:\/\/(www\.)?/, '')}</p>
                    </div>
                  </a>
                )}
              </div>
            </section>

            {/* Client Reviews */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {t("clientReviews")}
                </h2>
                {card.testimonials && card.testimonials.length > 1 && (
                  <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    View All ({card.testimonials.length})
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                {(card.testimonials && card.testimonials.length > 0 ? card.testimonials.slice(0, 2) : demoTestimonials).map((test) => (
                  <div key={test.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative">
                    {test.id.startsWith('demo') && (
                      <div className="absolute top-4 right-4 px-2 py-1 bg-slate-200 text-slate-500 text-[10px] uppercase font-bold rounded-md">Sample</div>
                    )}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < (test.rating || 5) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                      ))}
                    </div>
                    <p className="text-slate-700 italic leading-relaxed mb-6">&quot;{test.quote}&quot;</p>
                    <div>
                      <p className="font-bold text-slate-900">{test.clientName}</p>
                      <p className="text-sm text-slate-500">{test.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
      </div>
    </div>
  )
}
