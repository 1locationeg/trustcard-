import * as React from "react"

export interface SummaryMetrics {
  views: number;
  clicks: number;
  conversations: number;
}

export interface InsightCard {
  id: string;
  title: string;
  content: string;
  isPositive?: boolean;
}

export interface FunnelStep {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

export interface FunnelInsight {
  between: string;
  recommendation: string;
}

export interface ChartData {
  name: string;
  views: number;
  clicks: number;
}

export interface ChartDatasets {
  today: ChartData[];
  "last-7-days": ChartData[];
  "last-30-days": ChartData[];
  "last-90-days": ChartData[];
}

export interface ChartSummary {
  growthPercent: number;
  bestDay: string;
}

export interface ContactRateRating {
  label: string;
  minRate: number;
  colorClass: string;
}

export interface GoalProgress {
  metricLabel: string;
  currentRate: number;
  targetRate: number;
}

export interface Recommendation {
  id: number;
  title: string;
  action: string;
  priority: "High" | "Medium" | "Low";
  icon: string;
  impact: "High" | "Medium" | "Low";
  description: string;
}

export interface RecentActivityItem {
  id: number;
  icon: React.ElementType;
  text: string;
  time: string;
  color: string;
  bg: string;
}

export interface GoalConfig {
  id: string;
  title: string;
  summaryMessage: string;
  summaryMetrics: SummaryMetrics;
  contactRateTarget: number;
  contactRateRatings: ContactRateRating[];
  insights: InsightCard[];
  funnel: FunnelStep[];
  funnelInsight?: FunnelInsight;
  chartData: ChartDatasets;
  chartSummary?: ChartSummary;
  goalProgress?: GoalProgress;
  recommendations: Recommendation[];
  recentActivity: RecentActivityItem[];
}

