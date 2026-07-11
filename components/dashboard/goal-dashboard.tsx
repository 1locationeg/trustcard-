"use client"

import * as React from "react"
import { GoalConfig } from "@/types/dashboard"
import { GoalSummary } from "./shared/goal-summary"
import { PerformanceInsights } from "./shared/performance-insights"
import { ConversionFunnel } from "./shared/conversion-funnel"
import { AnalyticsCharts } from "./shared/analytics-charts"
import { RecentActivity } from "./shared/recent-activity"
import { SmartRecommendations } from "./shared/smart-recommendations"

import { QuickActions } from "./shared/quick-actions"

interface GoalDashboardProps {
  firstName: string
  config: GoalConfig
  hasNoAnalytics?: boolean
  ownerUserId?: string
}

export default function GoalDashboard({ firstName, config, hasNoAnalytics = false, ownerUserId }: GoalDashboardProps) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* 1. Hero & Executive Summary */}
      <section>
        <GoalSummary 
          firstName={firstName} 
          goalTitle={config.title}
          metrics={config.summaryMetrics}
          message={config.summaryMessage}
          contactRateTarget={config.contactRateTarget}
          contactRateRatings={config.contactRateRatings}
          hasNoAnalytics={hasNoAnalytics}
          ownerUserId={ownerUserId}
        />
      </section>
      
      {/* 2. Observation Insights */}
      <section>
        <PerformanceInsights insights={config.insights} hasNoAnalytics={hasNoAnalytics} />
      </section>

      {/* 3. Core Analytics (Funnel & Chart) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ConversionFunnel funnelSteps={config.funnel} funnelInsight={config.funnelInsight} hasNoAnalytics={hasNoAnalytics} />
        </div>
        <div className="lg:col-span-2">
          <AnalyticsCharts chartData={config.chartData} chartSummary={config.chartSummary} hasNoAnalytics={hasNoAnalytics} />
        </div>
      </section>
      
      {/* 4. Recommendations + Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <SmartRecommendations
            recommendations={config.recommendations}
            goalTitle={config.title}
            goalProgress={config.goalProgress}
            hasNoAnalytics={hasNoAnalytics}
          />
        </div>
        <div className="flex flex-col lg:col-span-1">
          <RecentActivity activities={config.recentActivity} hasNoAnalytics={hasNoAnalytics} />
        </div>
      </section>

      {/* 5. Quick Actions */}
      <section>
        <QuickActions />
      </section>

    </div>
  )
}

