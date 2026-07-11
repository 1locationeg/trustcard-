import * as React from "react"
import { cn } from "@/lib/utils"

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function AuthCard({ children, className, ...props }: AuthCardProps) {
  return (
    <div 
      className={cn("bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-8 sm:p-10", className)} 
      {...props}
    >
      {children}
    </div>
  )
}

interface AuthHeaderProps {
  title: string
  subtitle: string
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="flex flex-col space-y-2 text-center mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="text-sm text-slate-500 font-medium">
        {subtitle}
      </p>
    </div>
  )
}
