"use client"

import type * as React from "react"

type MasonryGridProps = {
  children: React.ReactNode
  className?: string
}

/**
 * MasonryGrid renders a Pinterest-like layout using CSS columns.
 * Pass AdCard items as children. Each child must have className "break-inside-avoid".
 */
export function MasonryGrid({ children, className = "" }: MasonryGridProps) {
  return (
    <div
      className={[
        // responsive column counts
        "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5",
        "gap-4",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}
