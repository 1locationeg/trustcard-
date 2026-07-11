"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentActivityItem } from "@/types/dashboard"

interface RecentActivityProps {
  activities: RecentActivityItem[]
  hasNoAnalytics?: boolean
}

export function RecentActivity({ activities, hasNoAnalytics = false }: RecentActivityProps) {
  if (hasNoAnalytics) {
    return (
      <Card className="h-full shadow-sm border-slate-200">
        <CardHeader className="pb-4 border-b border-slate-100 shrink-0">
          <CardTitle className="text-lg font-bold text-slate-900">Recent Activity</CardTitle>
          <p className="text-sm text-slate-500 mt-1 font-medium">Real-time interactions on your profile.</p>
        </CardHeader>
        <CardContent className="pt-6 flex flex-col justify-center items-center py-12">
          <div className="text-center space-y-2">
            <h3 className="text-sm font-semibold text-slate-700">No activity yet</h3>
            <p className="text-xs text-slate-500 max-w-[220px] leading-relaxed mx-auto">
              When people start interacting with your Trust Card, you&apos;ll see it here.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!activities || activities.length === 0) return null

  return (
    <Card className="h-full shadow-sm border-slate-200">
      <CardHeader className="pb-4 border-b border-slate-100 shrink-0">
        <CardTitle className="text-lg font-bold text-slate-900">Recent Activity</CardTitle>
        <p className="text-sm text-slate-500 mt-1 font-medium">Real-time interactions on your profile.</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex gap-4 relative">
                {index < activities.length - 1 && (
                  <div className="absolute left-[19px] top-[38px] bottom-[-24px] w-0.5 bg-slate-100" />
                )}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white ${activity.bg}`}>
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium text-slate-900">{activity.text}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
