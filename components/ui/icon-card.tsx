import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface IconCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function IconCard({ icon: Icon, title, description }: IconCardProps) {
  return (
    <Card className="border-border/50 shadow-sm h-full flex flex-col">
      <CardContent className="pt-6 flex gap-4 flex-1">
        <div className="flex-shrink-0 mt-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="flex flex-col h-full">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm flex-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
