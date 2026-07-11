"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RotatingTextProps {
  phrases: string[]
  className?: string
  interval?: number
}

export function RotatingText({ phrases, className, interval = 2800 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length)
    }, interval)
    return () => clearInterval(timer)
  }, [phrases.length, interval])

  return (
    <span className={cn("inline-grid overflow-visible", className)}>
      {/* Invisible items to establish max dimensions and prevent layout shift */}
      {phrases.map((phrase, index) => (
        <span
          key={`invisible-${index}`}
          className="invisible col-start-1 row-start-1 pointer-events-none"
          aria-hidden="true"
        >
          {phrase}
        </span>
      ))}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentIndex}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="col-start-1 row-start-1 text-primary"
        >
          {phrases[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
