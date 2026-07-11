import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { SocialProof } from "@/components/sections/social-proof"
import { Benefits } from "@/components/sections/benefits"
import { HowItWorks } from "@/components/sections/how-it-works"
import { TrustScore } from "@/components/sections/trust-score"
import { PublicProfilePreview } from "@/components/sections/public-profile-preview"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { FAQ } from "@/components/sections/faq"
import { FinalCTA } from "@/components/sections/final-cta"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SocialProof />
        <Benefits />
        <HowItWorks />
        <TrustScore />
        <PublicProfilePreview />
        <WhyChooseUs />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
