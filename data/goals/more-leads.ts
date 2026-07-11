import { GoalConfig } from "@/types/dashboard"
import { Eye, PhoneCall, MessageCircle, Share2, Globe } from "lucide-react"

export const moreLeadsConfig: GoalConfig = {
  id: "More Leads",
  title: "More Leads",
  summaryMessage: "Your Contact Rate increased by 8% compared to last week.",
  summaryMetrics: {
    views: 124,
    clicks: 31,
    conversations: 12
  },

  // Contact Rate context — thresholds define rating labels and colors
  contactRateTarget: 30,
  contactRateRatings: [
    { label: "Excellent", minRate: 25, colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Good",      minRate: 15, colorClass: "text-blue-700 bg-blue-50 border-blue-200" },
    { label: "Needs Work", minRate: 0, colorClass: "text-amber-700 bg-amber-50 border-amber-200" },
  ],

  // Observation-style insight cards — two high-value observations only
  insights: [
    {
      id: "insight-1",
      title: "Biggest Opportunity",
      content: "61% of visitors leave before starting a conversation. Improve your profile headline and make WhatsApp easier to find to increase visitor conversion.",
      isPositive: false
    },
    {
      id: "insight-2",
      title: "Visitor Behavior",
      content: "82% of your visitors prefer contacting you through WhatsApp. Make sure your WhatsApp contact is visible and up to date.",
      isPositive: true
    },
  ],

  funnel: [
    { label: "Profile Views",   value: 124, percentage: 100,  color: "bg-blue-500" },
    { label: "Contact Clicks",  value: 31,  percentage: 25,   color: "bg-indigo-500" },
    { label: "Conversations",   value: 12,  percentage: 9.6,  color: "bg-violet-500" }
  ],

  // Explains the biggest funnel drop-off in plain language
  funnelInsight: {
    between: "Contact Clicks and Conversations",
    recommendation: "Improve your profile headline or add WhatsApp to encourage visitors to start conversations."
  },

  chartData: {
    "today": [
      { name: '08:00', views: 12, clicks: 2 },
      { name: '10:00', views: 25, clicks: 5 },
      { name: '12:00', views: 45, clicks: 8 },
      { name: '14:00', views: 30, clicks: 12 },
      { name: '16:00', views: 12, clicks: 4 },
    ],
    "last-7-days": [
      { name: 'Mon', views: 120, clicks: 12 },
      { name: 'Tue', views: 145, clicks: 18 },
      { name: 'Wed', views: 180, clicks: 24 },
      { name: 'Thu', views: 210, clicks: 35 },
      { name: 'Fri', views: 250, clicks: 42 },
      { name: 'Sat', views: 190, clicks: 15 },
      { name: 'Sun', views: 153, clicks: 10 },
    ],
    "last-30-days": [
      { name: 'Week 1', views: 800,  clicks: 120 },
      { name: 'Week 2', views: 950,  clicks: 145 },
      { name: 'Week 3', views: 1100, clicks: 180 },
      { name: 'Week 4', views: 1248, clicks: 156 },
    ],
    "last-90-days": [
      { name: 'Jan', views: 3200, clicks: 450 },
      { name: 'Feb', views: 4100, clicks: 520 },
      { name: 'Mar', views: 5000, clicks: 680 },
    ]
  },

  // Summary shown above the chart
  chartSummary: {
    growthPercent: 18,
    bestDay: "Thursday"
  },

  // Goal Progress card data
  goalProgress: {
    metricLabel: "Contact Rate",
    currentRate: 25,
    targetRate: 30
  },

  recommendations: [
    {
      id: 1,
      title: "Add WhatsApp Contact",
      action: "Edit Profile",
      priority: "High",
      icon: "🔥",
      impact: "High",
      description: "Visitors are much more likely to start a conversation through WhatsApp."
    },
    {
      id: 2,
      title: "Improve Your Profile Headline",
      action: "Edit Profile",
      priority: "Medium",
      icon: "🟡",
      impact: "Medium",
      description: "A clearer value proposition increases visitor engagement."
    },
    {
      id: 3,
      title: "Complete Your Profile",
      action: "Verify Now",
      priority: "Medium",
      icon: "🟢",
      impact: "Medium",
      description: "Profiles with complete information build more trust and encourage visitors to contact you."
    }
  ],

  recentActivity: [
    {
      id: 1,
      icon: MessageCircle,
      text: "Someone opened WhatsApp from your profile",
      time: "10 mins ago",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      id: 2,
      icon: PhoneCall,
      text: "Someone clicked your phone number",
      time: "2 hours ago",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: 3,
      icon: Share2,
      text: "Your Trust Card was shared via link",
      time: "4 hours ago",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      id: 4,
      icon: Eye,
      text: "Someone viewed your profile",
      time: "5 hours ago",
      color: "text-slate-600",
      bg: "bg-slate-100"
    },
    {
      id: 5,
      icon: Globe,
      text: "Someone visited your website",
      time: "1 day ago",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ]
}

