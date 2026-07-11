import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerificationBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  verified?: boolean
  label?: string
}

export function VerificationBadge({ verified = true, label = "Verified Professional", className, ...props }: VerificationBadgeProps) {
  if (!verified) return null

  return (
    <Badge 
      variant="secondary" 
      className={cn("bg-success/15 text-success hover:bg-success/20 border-success/30 pl-1.5 pr-2.5 py-0.5 shadow-sm", className)}
      {...props}
    >
      <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 fill-success text-success-foreground" />
      {label}
    </Badge>
  )
}
