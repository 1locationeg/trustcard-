import { InsightCard, Recommendation } from '@/types/dashboard'

/**
 * Generates business insights dynamically from analytics metrics and user profile status.
 */
export function generateDynamicInsights(
  metrics: { views: number; clicks: number; contactRate: number; phone: number; whatsapp: number; email: number; website: number; linkedin: number; share: number; qr: number },
  profile: { profileCompletion: number; verificationStatus: string },
  growthPercent: number
): InsightCard[] {
  const insights: InsightCard[] = []

  // 1. If Profile Views == 0
  if (metrics.views === 0) {
    insights.push({
      id: "insight-views-0",
      title: "Visitor Traffic",
      content: "Your profile hasn't received any views yet. Share your Trust Card link on social media or email signatures to get started.",
      isPositive: false
    })
  }

  // 2. If Contact Rate < 10%
  if (metrics.views > 0 && metrics.contactRate < 10) {
    insights.push({
      id: "insight-rate-low",
      title: "Conversion Opportunity",
      content: "Your contact conversion rate is under 10%. Consider refining your specialization headline or adding a clear profile photo to build trust.",
      isPositive: false
    })
  }

  // 3. If WhatsApp Clicks == 0
  if (metrics.views > 0 && metrics.whatsapp === 0) {
    insights.push({
      id: "insight-whatsapp-0",
      title: "Contact Preference",
      content: "No WhatsApp click events recorded. Make sure your WhatsApp connection details are visible and active, as most clients prefer chat.",
      isPositive: undefined
    })
  }

  // 4. If Profile Completion < 80%
  if (profile.profileCompletion < 80) {
    insights.push({
      id: "insight-completion",
      title: "Profile Strength",
      content: `Your profile completion is at ${profile.profileCompletion}%. Complete all fields (experience, achievement) to increase visitor confidence and conversions.`,
      isPositive: false
    })
  }

  // 5. If Website Clicks are highest
  const clickMetrics = [
    { type: 'Phone', value: metrics.phone },
    { type: 'WhatsApp', value: metrics.whatsapp },
    { type: 'Email', value: metrics.email },
    { type: 'Website', value: metrics.website },
    { type: 'LinkedIn', value: metrics.linkedin }
  ]
  const highestClick = clickMetrics.reduce((prev, current) => (prev.value > current.value) ? prev : current)
  if (highestClick.value > 0 && highestClick.type === 'Website') {
    insights.push({
      id: "insight-website-high",
      title: "Conversion Channel",
      content: "Your website is currently your strongest conversion channel. Ensure your website link highlights your active listings or booking calendar.",
      isPositive: true
    })
  }

  // 6. If QR traffic is highest
  if (metrics.qr > 0 && metrics.qr >= metrics.share && metrics.qr >= metrics.views * 0.3) {
    insights.push({
      id: "insight-qr-high",
      title: "Traffic Source",
      content: "QR code scans are driving a significant portion of your traffic. Share your physical QR code on business cards and signs.",
      isPositive: true
    })
  }

  // 7. If traffic increased this week
  if (growthPercent > 0) {
    insights.push({
      id: "insight-growth",
      title: "Growth Summary",
      content: `Your profile views increased by ${growthPercent}% this week. Continue sharing your profile to maintain this positive trajectory.`,
      isPositive: true
    })
  }

  // 8. If visitors are viewing but not contacting
  if (metrics.views > 5 && metrics.clicks === 0) {
    insights.push({
      id: "insight-view-no-contact",
      title: "Conversion Drop-off",
      content: "Visitors are viewing your Trust Card but not reaching out. Try writing a more compelling short bio or adding client achievements.",
      isPositive: false
    })
  }

  // Keep at least two insights for spacing layout
  if (insights.length < 2) {
    insights.push({
      id: "insight-default-1",
      title: "Identity Verification",
      content: profile.verificationStatus === "Verified" 
        ? "Your identity verification is active, which boosts profile visitor trust by up to 40%."
        : "Your identity verification is pending. Verify your license to earn the verified profile badge.",
      isPositive: profile.verificationStatus === "Verified"
    })
  }
  if (insights.length < 2) {
    insights.push({
      id: "insight-default-2",
      title: "Proactive Sharing",
      content: "Add your Trust Card QR code to listing brochures and yard signs for immediate client validation.",
      isPositive: true
    })
  }

  return insights.slice(0, 3)
}

/**
 * Generates dynamic actionable recommendations based on live metrics and profile data.
 */
export function generateDynamicRecommendations(
  metrics: { views: number; clicks: number; contactRate: number; phone: number; whatsapp: number; email: number; website: number; linkedin: number; share: number; qr: number },
  profile: { profileCompletion: number; verificationStatus: string }
): Recommendation[] {
  const recs: Recommendation[] = []

  // 1. Views == 0 -> Share Profile
  if (metrics.views === 0) {
    recs.push({
      id: 1,
      title: "Share Your Trust Card Link",
      action: "Share Profile",
      priority: "High",
      icon: "🔗",
      impact: "High",
      description: "Start driving traffic to your Trust Card by copying your public profile link and sharing it."
    })
  }

  // 2. Profile Completion < 80% -> Complete Profile
  if (profile.profileCompletion < 80) {
    recs.push({
      id: 2,
      title: "Complete All Profile Fields",
      action: "Edit Profile",
      priority: "High",
      icon: "📝",
      impact: "High",
      description: `Your profile is only ${profile.profileCompletion}% complete. Add your short bio, experience, or achievement details.`
    })
  }

  // 3. Contact Rate < 10% -> Improve headline
  if (metrics.views > 0 && metrics.contactRate < 10) {
    recs.push({
      id: 3,
      title: "Refine Your Specialization Headline",
      action: "Edit Profile",
      priority: "Medium",
      icon: "⚡",
      impact: "Medium",
      description: "A clear specialization headline helps target the right audience and improves contact rates."
    })
  }

  // 4. WhatsApp Clicks == 0 -> Add WhatsApp/Verify
  if (metrics.views > 0 && metrics.whatsapp === 0) {
    recs.push({
      id: 4,
      title: "Verify WhatsApp Contact Details",
      action: "Edit Profile",
      priority: "Medium",
      icon: "💬",
      impact: "High",
      description: "No WhatsApp clicks recorded. Make sure your WhatsApp connection is properly configured."
    })
  }

  // 5. QR traffic highest -> Recommend continuing QR sharing
  if (metrics.qr > 0 && metrics.qr >= metrics.share) {
    recs.push({
      id: 5,
      title: "Promote QR Code on Print Media",
      action: "Share Profile",
      priority: "Low",
      icon: "📱",
      impact: "Medium",
      description: "Your QR code is driving traffic. Add it to physical signage, listing folders, and mailers."
    })
  }

  // 6. Identity pending -> Recommend completing verification
  if (profile.verificationStatus !== "Verified") {
    recs.push({
      id: 6,
      title: "Complete Identity Verification",
      action: "Verify Now",
      priority: "Medium",
      icon: "🛡️",
      impact: "High",
      description: "Verify your real estate license to display the verified reputation badge."
    })
  }

  // Fallbacks
  if (recs.length < 3) {
    recs.push({
      id: 7,
      title: "Update Professional Achievements",
      action: "Edit Profile",
      priority: "Low",
      icon: "🏆",
      impact: "Medium",
      description: "Highlighting recent sales or awards builds instant trust and conversion numbers."
    })
  }

  return recs.slice(0, 3)
}
