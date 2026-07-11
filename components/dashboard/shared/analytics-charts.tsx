"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartDatasets, ChartSummary } from "@/types/dashboard"
import { TrendingUp, Star, BarChart3 } from "lucide-react"

interface AnalyticsChartsProps {
  chartData: ChartDatasets
  chartSummary?: ChartSummary
  hasNoAnalytics?: boolean
}

export function AnalyticsCharts({ chartData, chartSummary, hasNoAnalytics = false }: AnalyticsChartsProps) {
  const [filter, setFilter] = React.useState<keyof ChartDatasets>("last-7-days")

  const currentData = chartData[filter] || []
  const hasData = !hasNoAnalytics && currentData.length > 0

  return (
    <Card className="h-full flex flex-col shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-start justify-between pb-4 border-b border-slate-100 shrink-0">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">Performance Over Time</CardTitle>
              <p className="text-sm text-slate-500 mt-1 font-medium">Profile views and interactions.</p>
            </div>
            <div className="w-40">
              <Select value={filter} onValueChange={(val) => val && setFilter(val as keyof ChartDatasets)}>
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Chart summary strip — sourced entirely from config */}
          {!hasNoAnalytics && chartSummary && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">
                  Weekly Growth +{chartSummary.growthPercent}% vs last week
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200">
                <Star className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-xs font-bold text-blue-700">
                  Best Day: {chartSummary.bestDay}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6 flex-1 min-h-[300px]">
        {hasData ? (
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="views" name="Profile Views" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="clicks" name="Contact Clicks" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-slate-300 mx-auto w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-700">
                {hasNoAnalytics ? "No activity yet" : "Not enough data"}
              </h3>
              <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed mx-auto">
                {hasNoAnalytics 
                  ? "Analytics will appear once visitors start interacting with your public profile." 
                  : "Check back later when you have more profile activity."}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

