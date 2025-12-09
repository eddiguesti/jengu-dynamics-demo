/**
 * Tooltip - Animated tooltip component
 *
 * Apple-style tooltip with smooth entrance animation.
 */

import { useState, ReactNode, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
}

export const Tooltip = ({
  content,
  children,
  position = 'top',
  delay = 300,
  className,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowPositions = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-surface border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-surface border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-surface border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-surface border-y-transparent border-l-transparent',
  }

  const enterVariants = {
    top: { opacity: 0, y: 4, scale: 0.95 },
    bottom: { opacity: 0, y: -4, scale: 0.95 },
    left: { opacity: 0, x: 4, scale: 0.95 },
    right: { opacity: 0, x: -4, scale: 0.95 },
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={enterVariants[position]}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
            className={clsx(
              'absolute z-50 whitespace-nowrap',
              positions[position],
              className
            )}
          >
            <div className="rounded-lg bg-surface px-3 py-2 text-sm text-text shadow-lg border border-border/50">
              {content}
            </div>
            {/* Arrow */}
            <div
              className={clsx(
                'absolute border-4',
                arrowPositions[position]
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Info tooltip for help icons
interface InfoTooltipProps {
  content: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export const InfoTooltip = ({ content, position = 'top' }: InfoTooltipProps) => {
  return (
    <Tooltip content={content} position={position}>
      <span className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-muted/30 text-xs text-muted hover:bg-muted/50 hover:text-text transition-colors">
        ?
      </span>
    </Tooltip>
  )
}

export default Tooltip
