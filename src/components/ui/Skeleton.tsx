/**
 * Skeleton Loader Components
 * Apple-style loading placeholders with shimmer effect
 */

import { HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  shimmer?: boolean
}

/**
 * Base Skeleton component with optional shimmer effect
 */
export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  if (shimmer) {
    return (
      <div
        className={clsx(
          'relative overflow-hidden rounded-md bg-muted/30',
          className
        )}
        {...props}
      >
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['0%', '200%'] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear',
          }}
        />
      </div>
    )
  }

  return <div className={clsx('bg-muted/50 animate-pulse rounded-md', className)} {...props} />
}

/**
 * Text skeleton with natural line width variation
 */
export function TextSkeleton({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  const widths = ['100%', '92%', '85%', '95%', '78%']
  return (
    <div className={clsx('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: widths[i % widths.length] }}
        />
      ))}
    </div>
  )
}

/**
 * Chart Skeleton - for analytics charts
 */
export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx('space-y-4', className)}>
      {/* Chart title */}
      <Skeleton className="h-6 w-48" />

      {/* Chart area */}
      <div className="space-y-2">
        <Skeleton className="h-64 w-full" />
      </div>

      {/* Legend */}
      <div className="flex gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}

/**
 * Card Skeleton - for dashboard cards
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx('border-border space-y-4 rounded-lg border p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Value */}
      <Skeleton className="h-10 w-24" />

      {/* Description */}
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

/**
 * Table Skeleton - for data tables
 */
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {/* Table header */}
      <div className="border-border flex gap-4 border-b pb-3">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-4 w-full" />
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-6 w-full" />
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * List Skeleton - for vertical lists
 */
export function ListSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Dashboard Grid Skeleton - for dashboard layout
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  )
}
