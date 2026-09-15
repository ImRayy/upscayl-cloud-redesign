"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface HeaderTextProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
}

export default function HeaderText({
  title,
  description,
  children,
  className,
}: HeaderTextProps) {
  return (
    <div className={cn("sm:max-w-2/3 space-y-2", className)}>
      {children}
      <h2 className="sm:text-4xl text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
