"use client"

import * as React from "react"
import { useOnboardingStore, TrustCardDraft } from "@/stores/onboarding-store"

export function usePublicTrustCard(requestedSlug: string): {
  card: TrustCardDraft | null
  isLoading: boolean
  isOwner: boolean
} {
  const { trustCardDraft, savedTrustCard, userMode } = useOnboardingStore()
  const [card, setCard] = React.useState<TrustCardDraft | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isOwner, setIsOwner] = React.useState(false)

  React.useEffect(() => {
    let active = true

    async function loadCard() {
      setIsLoading(true)
      
      // Local check from the store based on mock context
      const currentCard = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft
      
      // If the user has data in their current browser session, show it
      if (currentCard && currentCard.fullName) {
        if (active) {
          setCard(currentCard)
          setIsOwner(true)
          setIsLoading(false)
        }
        return
      }

      // Fallback to a mock card if opened in a new incognito window or sent to a client
      const mockCard: TrustCardDraft = {
        fullName: "Sarah Jenkins",
        jobTitle: "Luxury Real Estate Agent",
        company: "Premier Estates",
        specialization: "Waterfront Properties",
        biggestStrength: "Negotiation Strategy",
        yearsOfExperience: "8",
        shortBio: "I specialize in luxury waterfront properties in the Dubai marina area. With over 8 years of experience, I've helped hundreds of clients find their dream homes.",
        trustScore: 98,
        verificationStatus: "Pending", // Set to pending to demonstrate guest unverified state
        phoneNumber: "+971 50 123 4567",
        linkedIn: "https://linkedin.com/in/sarahjenkins",
        website: "https://sarahjenkins.ae",
        experiences: [{
          id: "1",
          jobTitle: "Senior Property Consultant",
          company: "Premier Estates",
          startDate: "Jan 2018",
          endDate: "Present",
          description: "Leading the luxury waterfront division, consistently ranking in the top 1% of agents nationwide."
        }],
        testimonials: [],
        achievements: [],
        verifications: [{
          id: "1",
          type: "Award",
          title: "$50M+ Sales Volume in 2025",
          description: "Closed over $50 million in luxury waterfront property sales in a single year, setting a new agency record.",
          status: "Verified"
        }],
        profilePhoto: "",
      }

      if (active) {
        setCard(mockCard)
        setIsOwner(false)
        setIsLoading(false)
      }
    }

    loadCard()

    return () => {
      active = false
    }
  }, [requestedSlug, userMode, trustCardDraft, savedTrustCard])

  return { card, isLoading, isOwner }
}
