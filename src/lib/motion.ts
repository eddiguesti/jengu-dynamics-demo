/**
 * Motion Utilities - Apple-like Microinteractions
 *
 * Consistent animation presets for the entire app.
 * Based on Apple's Human Interface Guidelines for fluid, natural motion.
 */

import { Variants, Transition } from 'framer-motion'

// ============================================
// TIMING CURVES (Apple-style easing)
// ============================================

export const easing = {
  // Apple's default ease - smooth and natural
  apple: [0.25, 0.1, 0.25, 1.0],
  // For elements entering - starts fast, slows down
  easeOut: [0.0, 0.0, 0.2, 1.0],
  // For elements leaving - starts slow, speeds up
  easeIn: [0.4, 0.0, 1.0, 1.0],
  // For elements moving - smooth throughout
  easeInOut: [0.4, 0.0, 0.2, 1.0],
  // Bouncy spring feel
  bounce: [0.68, -0.55, 0.265, 1.55],
  // Snappy for quick interactions
  snappy: [0.2, 0.0, 0.0, 1.0],
} as const

// ============================================
// SPRING PRESETS
// ============================================

export const spring = {
  // Gentle, soft feel - good for large elements
  gentle: { type: 'spring', stiffness: 120, damping: 14 } as Transition,
  // Default balanced spring
  default: { type: 'spring', stiffness: 200, damping: 20 } as Transition,
  // Snappy for small UI elements
  snappy: { type: 'spring', stiffness: 400, damping: 30 } as Transition,
  // Bouncy for playful interactions
  bouncy: { type: 'spring', stiffness: 300, damping: 10 } as Transition,
  // Stiff for immediate feedback
  stiff: { type: 'spring', stiffness: 500, damping: 35 } as Transition,
} as const

// ============================================
// DURATION PRESETS
// ============================================

export const duration = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  slower: 0.6,
} as const

// ============================================
// PAGE TRANSITION VARIANTS
// ============================================

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: duration.fast,
      ease: easing.easeIn,
    },
  },
}

// ============================================
// FADE VARIANTS
// ============================================

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
}

export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
}

export const fadeScaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
}

// ============================================
// STAGGER CHILDREN (for lists)
// ============================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: spring.default
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: duration.fast }
  },
}

// Fast stagger for quick lists
export const staggerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
}

// ============================================
// SLIDE VARIANTS (for panels, drawers)
// ============================================

export const slideFromRight: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: spring.default
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: duration.normal, ease: easing.easeIn }
  },
}

export const slideFromLeft: Variants = {
  initial: { x: '-100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: spring.default
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: duration.normal, ease: easing.easeIn }
  },
}

export const slideFromBottom: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: spring.default
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: duration.normal, ease: easing.easeIn }
  },
}

// ============================================
// SCALE/POP VARIANTS (for modals, tooltips)
// ============================================

export const popVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: spring.snappy
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
}

export const dropdownVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: -4 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.fast, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -4,
    transition: { duration: duration.instant, ease: easing.easeIn }
  },
}

// ============================================
// BUTTON/INTERACTIVE VARIANTS
// ============================================

export const buttonTap = {
  scale: 0.97,
  transition: { duration: duration.instant }
}

export const buttonHover = {
  scale: 1.02,
  transition: spring.snappy
}

// For icon buttons
export const iconButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: spring.snappy },
  tap: { scale: 0.9, transition: { duration: duration.instant } },
}

// ============================================
// SUCCESS/ERROR STATE ANIMATIONS
// ============================================

export const successPulse: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: {
      duration: 0.4,
      times: [0, 0.6, 1],
      ease: easing.easeOut
    }
  },
}

export const checkmarkDraw: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.3, ease: easing.easeOut },
      opacity: { duration: 0.1 }
    }
  },
}

export const errorShake: Variants = {
  initial: { x: 0 },
  animate: {
    x: [0, -8, 8, -8, 8, 0],
    transition: { duration: 0.4 }
  },
}

// ============================================
// NUMBER COUNT-UP (for KPIs)
// ============================================

export const countUpTransition: Transition = {
  duration: 1,
  ease: easing.easeOut,
}

// ============================================
// SKELETON/LOADING VARIANTS
// ============================================

export const shimmer: Variants = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear'
    }
  },
}

export const pulse: Variants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: easing.easeInOut
    }
  },
}

// ============================================
// TAB/SEGMENT INDICATOR
// ============================================

export const tabIndicator: Variants = {
  initial: {},
  animate: {
    transition: spring.snappy
  },
}

// ============================================
// ACCORDION/COLLAPSE
// ============================================

export const collapseVariants: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: duration.normal, ease: easing.easeOut },
      opacity: { duration: duration.fast, delay: 0.1 }
    }
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: duration.fast, ease: easing.easeIn },
      opacity: { duration: duration.instant }
    }
  },
}

// ============================================
// TOOLTIP
// ============================================

export const tooltipVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 4 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.fast, ease: easing.snappy }
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.instant }
  },
}

// ============================================
// CHART ENTRANCE
// ============================================

export const chartLineVariants: Variants = {
  initial: { pathLength: 0 },
  animate: {
    pathLength: 1,
    transition: { duration: 1.2, ease: easing.easeOut }
  },
}

export const chartBarVariants: Variants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: duration.slow, ease: easing.easeOut }
  },
}

// ============================================
// REFRESH/SYNC ANIMATION
// ============================================

export const spinVariants: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'linear'
    }
  },
}

// ============================================
// NOTIFICATION DOT
// ============================================

export const notificationPing: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.5, 1],
    opacity: [1, 0.5, 1],
    transition: {
      repeat: Infinity,
      duration: 2
    }
  },
}

// ============================================
// HELPER: Create stagger delay
// ============================================

export function staggerDelay(index: number, baseDelay = 0.05): number {
  return index * baseDelay
}

// ============================================
// HELPER: Viewport animation props
// ============================================

export const viewportOnce = {
  once: true,
  margin: '-50px',
}

export const viewportAlways = {
  once: false,
  margin: '-50px',
}
