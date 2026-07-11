import * as React from "react"
import { cn } from "@/lib/utils"

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full max-w-[1280px] px-4 md:px-8", className)}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"
