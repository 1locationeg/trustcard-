import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  stat: string
  label: string
}

export function StatCard({ stat, label }: StatCardProps) {
  return (
    <Card className="bg-primary text-primary-foreground border-none text-center shadow-sm">
      <CardContent className="pt-6 pb-6">
        <div className="text-4xl font-bold mb-2">{stat}</div>
        <div className="text-sm font-medium text-primary-foreground/80">{label}</div>
      </CardContent>
    </Card>
  )
}
