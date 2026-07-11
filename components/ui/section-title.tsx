import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  alignment?: "left" | "center"
}

export const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ className, title, subtitle, alignment = "center", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-4",
          alignment === "center" ? "text-center items-center" : "text-left items-start",
          className
        )}
        {...props}
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {subtitle && (
          <p className="max-w-[700px] text-lg text-muted-foreground">{subtitle}</p>
        )}
      </div>
    )
  }
)
SectionTitle.displayName = "SectionTitle"
