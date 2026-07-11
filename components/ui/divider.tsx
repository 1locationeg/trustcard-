import * as React from "react"
import { cn } from "@/lib/utils"

export const Divider = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn("border-t border-border w-full", className)}
        {...props}
      />
    )
  }
)
Divider.displayName = "Divider"
