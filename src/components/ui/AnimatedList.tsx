/**
 * AnimatedList - Staggered list animations
 *
 * Apple-like staggered entrance for lists, tables, and grids.
 */

import { ReactNode, Children } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { staggerItem, spring } from '@/lib/motion'

interface AnimatedListProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  variant?: 'default' | 'fast' | 'slow'
}

export const AnimatedList = ({
  children,
  className,
  staggerDelay = 0.05,
  variant = 'default',
}: AnimatedListProps) => {
  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: variant === 'fast' ? 0.03 : variant === 'slow' ? 0.08 : staggerDelay,
        delayChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual list item wrapper
interface AnimatedListItemProps {
  children: ReactNode
  className?: string
  index?: number
}

export const AnimatedListItem = ({ children, className }: AnimatedListItemProps) => {
  return (
    <motion.div
      variants={staggerItem}
      className={className}
      layout
    >
      {children}
    </motion.div>
  )
}

// Grid variant for card layouts
interface AnimatedGridProps {
  children: ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4
}

export const AnimatedGrid = ({ children, className, columns = 3 }: AnimatedGridProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <AnimatedList className={`grid gap-6 ${gridCols[columns]} ${className}`}>
      {Children.map(children, (child, index) => (
        <AnimatedListItem key={index} index={index}>
          {child}
        </AnimatedListItem>
      ))}
    </AnimatedList>
  )
}

// Table row animation wrapper
interface AnimatedTableRowProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const AnimatedTableRow = ({ children, className, onClick }: AnimatedTableRowProps) => {
  return (
    <motion.tr
      variants={staggerItem}
      whileHover={{
        backgroundColor: 'rgba(var(--color-primary-rgb), 0.05)',
        transition: { duration: 0.15 }
      }}
      className={`cursor-pointer transition-colors ${className}`}
      onClick={onClick}
      layout
    >
      {children}
    </motion.tr>
  )
}

// Presence wrapper for items that can be added/removed
interface AnimatedPresenceListProps {
  children: ReactNode
  className?: string
}

export const AnimatedPresenceList = ({ children, className }: AnimatedPresenceListProps) => {
  return (
    <div className={className}>
      <AnimatePresence mode="popLayout">
        {children}
      </AnimatePresence>
    </div>
  )
}

// Removable item with exit animation
interface RemovableItemProps {
  children: ReactNode
  id: string | number
  className?: string
  onRemove?: () => void
}

export const RemovableItem = ({ children, id, className }: RemovableItemProps) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={spring.default}
      className={className}
      layout
    >
      {children}
    </motion.div>
  )
}

export default AnimatedList
