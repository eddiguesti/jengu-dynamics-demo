/**
 * PageTransition - Smooth route transitions
 *
 * Wrap page content for Apple-like fade transitions between routes.
 */

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainer } from '@/lib/motion'

interface PageTransitionProps {
  children: ReactNode
  className?: string
  variant?: 'fade' | 'fadeUp' | 'stagger'
}

export const PageTransition = ({
  children,
  className,
  variant = 'fadeUp',
}: PageTransitionProps) => {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    fadeUp: fadeUpVariants,
    stagger: staggerContainer,
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Section wrapper for staggered content within pages
interface PageSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export const PageSection = ({ children, className, delay = 0 }: PageSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Header with slide-in title animation
interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}

export const PageHeader = ({ title, description, actions, className }: PageHeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={`mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-2xl font-bold tracking-tight text-text sm:text-3xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-1 text-muted"
          >
            {description}
          </motion.p>
        )}
      </div>
      {actions && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex items-center gap-3"
        >
          {actions}
        </motion.div>
      )}
    </motion.header>
  )
}

export default PageTransition
