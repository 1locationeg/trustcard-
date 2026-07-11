
export function useDashboardAnalytics() {
  return {
    analyticsConfig: {
      metrics: { views: 120, clicks: 45, contactRate: 37.5, phone: 10, whatsapp: 25, email: 5, website: 3, linkedin: 2, share: 15, qr: 30 },
      insights: [
        {
          id: "insight-growth",
          title: "Growth Summary",
          content: "Your profile views increased by 20% this week. Continue sharing your profile to maintain this positive trajectory.",
          isPositive: true
        },
        {
          id: "insight-qr-high",
          title: "Traffic Source",
          content: "QR code scans are driving a significant portion of your traffic. Share your physical QR code on business cards and signs.",
          isPositive: true
        }
      ],
      recommendations: [
        {
          id: 1,
          title: "Promote QR Code on Print Media",
          action: "Share Profile",
          priority: "Medium",
          icon: "📱",
          impact: "Medium",
          description: "Your QR code is driving traffic. Add it to physical signage, listing folders, and mailers."
        }
      ]
    },
    isLoading: false,
    hasNoAnalytics: false,
    userId: "mock-user-id"
  }
}
