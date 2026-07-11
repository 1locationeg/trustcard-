import { GoalConfig } from "@/types/dashboard"
import { Award } from "lucide-react"

export const moreAuthorityConfig: GoalConfig = {
  id: "More Authority",
  title: "More Authority",
  summaryMessage: "Your profile authority score is in the top 10% of agents.",
  summaryMetrics: {
    views: 450,
    clicks: 12,
    conversations: 5
  },
  contactRateTarget: 20,
  contactRateRatings: [
    { label: "Excellent", minRate: 10, colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Good",      minRate: 5,  colorClass: "text-blue-700 bg-blue-50 border-blue-200" },
    { label: "Needs Work", minRate: 0, colorClass: "text-amber-700 bg-amber-50 border-amber-200" },
  ],
  insights: [
    {
      id: "auth-1",
      title: "Profile Completion",
      content: "Your profile is 85% complete. Finishing it will significantly boost your authority score.",
      isPositive: true
    }
  ],
  funnel: [
    { label: "Profile Views", value: 450, percentage: 100, color: "bg-blue-500" },
    { label: "Verification Clicks", value: 45, percentage: 10, color: "bg-indigo-500" },
    { label: "Trust Card Shares", value: 12, percentage: 2.6, color: "bg-violet-500" }
  ],
  chartData: {
    "today": [], "last-7-days": [], "last-30-days": [], "last-90-days": []
  },
  recommendations: [
    {
      id: 1,
      title: "Upload certifications",
      action: "Edit Profile",
      priority: "High",
      icon: "📜",
      impact: "High",
      description: "Agents with visible certifications build trust faster."
    }
  ],
  recentActivity: [
    {
      id: 1,
      icon: Award,
      text: "Someone viewed your certifications",
      time: "2 hours ago",
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ]
}
