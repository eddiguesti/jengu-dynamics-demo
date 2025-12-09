/**
 * AnimatedNumber - Count-up animation for KPIs
 *
 * Apple-style smooth number transitions for dashboards and stats.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'
import { easing } from '@/lib/motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  formatOptions?: Intl.NumberFormatOptions
}

export const AnimatedNumber = ({
  value,
  duration = 1,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  formatOptions,
}: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Spring animation for smooth number transitions
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  })

  // Transform spring value to formatted string
  const display = useTransform(spring, (latest) => {
    const formatted = formatOptions
      ? new Intl.NumberFormat('en-US', formatOptions).format(latest)
      : latest.toFixed(decimals)
    return `${prefix}${formatted}${suffix}`
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    }
  }, [isInView, value, spring, hasAnimated])

  // Update when value changes after initial animation
  useEffect(() => {
    if (hasAnimated) {
      spring.set(value)
    }
  }, [value, spring, hasAnimated])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}

// Compact version for inline stats
interface CompactStatProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  trend?: number
  className?: string
}

export const AnimatedStat = ({
  value,
  label,
  prefix = '',
  suffix = '',
  trend,
  className,
}: CompactStatProps) => {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: easing.easeOut }}
      >
        <p className="text-sm text-muted">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-text">
            <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
          </span>
          {trend !== undefined && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.2 }}
              className={`text-xs font-medium ${
                trend >= 0 ? 'text-success' : 'text-error'
              }`}
            >
              {trend >= 0 ? '+' : ''}{trend}%
            </motion.span>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default AnimatedNumber
