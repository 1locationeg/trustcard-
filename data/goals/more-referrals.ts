import { GoalConfig } from "@/types/dashboard"
import { Heart } from "lucide-react"

export const moreReferralsConfig: GoalConfig = {
  id: "More Referrals",
  title: "More Referrals",
  summaryMessage: "You received 3 new referrals this month.",
  summaryMetrics: {
    views: 320,
    clicks: 40,
    conversations: 15
  },
  contactRateTarget: 8,
  contactRateRatings: [
    { label: "Excellent", minRate: 5,  colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Good",      minRate: 2,  colorClass: "text-blue-700 bg-blue-50 border-blue-200" },
    { label: "Needs Work", minRate: 0, colorClass: "text-amber-700 bg-amber-50 border-amber-200" },
  ],
  insights: [
    {
      id: "ref-1",
      title: "Referral Rate",
      content: "Your referral rate grew by 1.2% this month. You're building a strong client network.",
      isPositive: true
    }
  ],
  funnel: [
    { label: "Past Clients Reached", value: 320, percentage: 100, color: "bg-blue-500" },
    { label: "Profile Shares", value: 40, percentage: 12.5, color: "bg-indigo-500" },
    { label: "New Referrals", value: 15, percentage: 4.6, color: "bg-violet-500" }
  ],
  chartData: {
    "today": [], "last-7-days": [], "last-30-days": [], "last-90-days": []
  },
  recommendations: [
    {
      id: 1,
      title: "Request a review",
      action: "Send Request",
      priority: "High",
      icon: "⭐",
      impact: "High",
      description: "Past clients are more likely to refer you after leaving a positive review."
    }
  ],
  recentActivity: [
    {
      id: 1,
      icon: Heart,
      text: "A past client shared your profile",
      time: "1 day ago",
      color: "text-rose-600",
      bg: "bg-rose-50"
    }
  ]
}
