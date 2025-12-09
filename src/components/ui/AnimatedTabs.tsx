/**
 * AnimatedTabs - Tabs with sliding indicator
 *
 * Apple-style tabs with smooth sliding indicator animation.
 */

import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { spring } from '@/lib/motion'

interface Tab {
  id: string
  label: string
  icon?: ReactNode
  badge?: string | number
}

interface AnimatedTabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const AnimatedTabs = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  size = 'md',
  className,
}: AnimatedTabsProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeTabEl = tabRefs.current.get(activeTab)
    if (activeTabEl) {
      const { offsetLeft, offsetWidth } = activeTabEl
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth })
    }
  }, [activeTab])

  const sizes = {
    sm: 'text-sm h-8 px-3',
    md: 'text-sm h-10 px-4',
    lg: 'text-base h-12 px-5',
  }

  const containerStyles = {
    default: 'bg-surface-hover/50 rounded-xl p-1',
    pills: 'gap-2',
    underline: 'border-b border-border gap-1',
  }

  const tabStyles = {
    default: 'rounded-lg',
    pills: 'rounded-full border border-transparent',
    underline: 'rounded-none border-b-2 border-transparent -mb-[1px]',
  }

  const activeStyles = {
    default: '',
    pills: 'border-primary/30 bg-primary/10',
    underline: 'border-primary',
  }

  return (
    <div className={clsx('relative flex', containerStyles[variant], className)}>
      {/* Sliding indicator (for default variant) */}
      {variant === 'default' && (
        <motion.div
          className="absolute top-1 bottom-1 rounded-lg bg-surface shadow-sm"
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={spring.snappy}
        />
      )}

      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <motion.button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el)
            }}
            onClick={() => onChange(tab.id)}
            whileTap={{ scale: 0.97 }}
            className={clsx(
              'relative z-10 flex items-center justify-center gap-2 font-medium transition-colors',
              sizes[size],
              tabStyles[variant],
              isActive
                ? clsx('text-text', activeStyles[variant])
                : 'text-muted hover:text-text'
            )}
          >
            {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={clsx(
                  'ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold',
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-muted/50 text-muted'
                )}
              >
                {tab.badge}
              </motion.span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

// Tab content wrapper with fade animation
interface TabContentProps {
  children: ReactNode
  tabId: string
  activeTab: string
  className?: string
}

export const TabContent = ({ children, tabId, activeTab, className }: TabContentProps) => {
  return (
    <AnimatePresence mode="wait">
      {tabId === activeTab && (
        <motion.div
          key={tabId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Segmented control variant (iOS-style)
interface SegmentedControlProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export const SegmentedControl = ({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const optionRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  useEffect(() => {
    const activeEl = optionRefs.current.get(value)
    if (activeEl) {
      const { offsetLeft, offsetWidth } = activeEl
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth })
    }
  }, [value])

  return (
    <div
      className={clsx(
        'relative inline-flex rounded-xl bg-surface-hover/70 p-1',
        className
      )}
    >
      <motion.div
        className="absolute top-1 bottom-1 rounded-lg bg-surface shadow-sm"
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={spring.snappy}
      />
      {options.map((option) => (
        <button
          key={option.value}
          ref={(el) => {
            if (el) optionRefs.current.set(option.value, el)
          }}
          onClick={() => onChange(option.value)}
          className={clsx(
            'relative z-10 px-4 py-1.5 text-sm font-medium transition-colors',
            option.value === value ? 'text-text' : 'text-muted hover:text-text'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default AnimatedTabs
