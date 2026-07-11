"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FunnelStep, FunnelInsight } from "@/types/dashboard"
import { Lightbulb } from "lucide-react"

interface ConversionFunnelProps {
  funnelSteps: FunnelStep[]
  funnelInsight?: FunnelInsight
  hasNoAnalytics?: boolean
}

export function ConversionFunnel({ funnelSteps, funnelInsight, hasNoAnalytics = false }: ConversionFunnelProps) {
  const displaySteps = hasNoAnalytics
    ? funnelSteps.map(step => ({ ...step, value: 0, percentage: 0 }))
    : funnelSteps

  const displayInsight = hasNoAnalytics
    ? {
        between: "profile creation and first visitor",
        recommendation: "Once potential clients start visiting your profile, you will see conversion rates and recommendations here."
      }
    : funnelInsight

  if (!displaySteps || displaySteps.length === 0) return null

  return (
    <Card className="h-full flex flex-col shadow-sm border-slate-200">
      <CardHeader className="pb-4 border-b border-slate-100 shrink-0">
        <CardTitle className="text-lg font-bold text-slate-900">Conversion Funnel</CardTitle>
        <p className="text-sm text-slate-500 mt-1 font-medium">Where potential clients drop off.</p>
      </CardHeader>

      <CardContent className="pt-6 flex-1 flex flex-col gap-0">
        {/* Funnel steps */}
        <div className="flex flex-col gap-0">
          {displaySteps.map((step, index) => {
            const nextStep = displaySteps[index + 1]
            const conversionRate =
              nextStep && step.value > 0
                ? Math.round((nextStep.value / step.value) * 100)
                : null

            return (
              <React.Fragment key={index}>
                {/* Step block */}
                <div className="flex flex-col gap-2 py-4">
                  {/* Label + value */}
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-600 tracking-wide">
                      {step.label}
                    </span>
                    <span className="text-2xl font-bold text-slate-900 tabular-nums">
                      {hasNoAnalytics ? "-" : step.value.toLocaleString()}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${step.color} rounded-full transition-all duration-500`}
                      style={{ width: `${hasNoAnalytics ? 0 : Math.max(step.percentage, 2)}%` }}
                    />
                  </div>
                </div>

                {/* Conversion bridge — between this step and the next */}
                {nextStep && (hasNoAnalytics || conversionRate !== null) && (
                  <div className="flex items-center gap-2 pl-1 pb-1">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                      <svg
                        viewBox="0 0 10 10"
                        className="h-3 w-3 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 1 L5 8 M2 5.5 L5 8 L8 5.5" />
                      </svg>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-snug">
                      {hasNoAnalytics ? (
                        <span className="text-slate-400">Available after receiving your first visitors</span>
                      ) : (
                        <>
                          <span className="font-bold text-slate-700">{conversionRate}%</span>{" "}
                          of {step.label} converted to {nextStep.label}
                        </>
                      )}
                    </p>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Drop-off insight — visually separated */}
        {displayInsight && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                {hasNoAnalytics ? "Get Started" : "Biggest Drop-Off"}
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {hasNoAnalytics ? "No traffic drop-off detected yet." : `Between ${displayInsight.between}.`}
              </p>
              <div className="flex items-start gap-2 pt-1">
                <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  {displayInsight.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
