/**
 * SuccessButton - Button with loading and success states
 *
 * Apple-like button that shows checkmark animation on success.
 */

import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import clsx from 'clsx'
import { spring } from '@/lib/motion'

type ButtonState = 'idle' | 'loading' | 'success' | 'error'

interface SuccessButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  loading?: boolean
  success?: boolean
  error?: boolean
  loadingText?: string
  successText?: string
  errorText?: string
  successDuration?: number
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  onSuccessComplete?: () => void
}

export const SuccessButton = ({
  children,
  loading = false,
  success = false,
  error = false,
  loadingText = 'Saving...',
  successText = 'Saved!',
  errorText = 'Error',
  successDuration = 2000,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  disabled,
  onSuccessComplete,
  ...props
}: SuccessButtonProps) => {
  const [state, setState] = useState<ButtonState>('idle')

  useEffect(() => {
    if (loading) {
      setState('loading')
    } else if (success) {
      setState('success')
      const timer = setTimeout(() => {
        setState('idle')
        onSuccessComplete?.()
      }, successDuration)
      return () => clearTimeout(timer)
    } else if (error) {
      setState('error')
      const timer = setTimeout(() => setState('idle'), successDuration)
      return () => clearTimeout(timer)
    } else {
      setState('idle')
    }
  }, [loading, success, error, successDuration, onSuccessComplete])

  const variants = {
    primary: {
      idle: 'bg-primary text-white hover:bg-primary-hover',
      loading: 'bg-primary/80 text-white',
      success: 'bg-success text-white',
      error: 'bg-error text-white',
    },
    secondary: {
      idle: 'bg-surface border border-border text-text hover:bg-surface-hover',
      loading: 'bg-surface/80 border border-border text-text',
      success: 'bg-success/10 border border-success text-success',
      error: 'bg-error/10 border border-error text-error',
    },
    outline: {
      idle: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      loading: 'border-2 border-primary/50 text-primary/50',
      success: 'border-2 border-success text-success',
      error: 'border-2 border-error text-error',
    },
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm h-8 min-w-[80px]',
    md: 'px-4 py-2 text-sm h-10 min-w-[100px]',
    lg: 'px-5 py-2.5 text-base h-11 min-w-[120px]',
  }

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const content = {
    idle: (
      <motion.span
        key="idle"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        className="flex items-center gap-2"
      >
        {icon && <span className={iconSizes[size]}>{icon}</span>}
        {children}
      </motion.span>
    ),
    loading: (
      <motion.span
        key="loading"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        className="flex items-center gap-2"
      >
        <Loader2 className={clsx(iconSizes[size], 'animate-spin')} />
        {loadingText}
      </motion.span>
    ),
    success: (
      <motion.span
        key="success"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={spring.snappy}
        className="flex items-center gap-2"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.3, times: [0, 0.6, 1] }}
        >
          <Check className={iconSizes[size]} strokeWidth={3} />
        </motion.div>
        {successText}
      </motion.span>
    ),
    error: (
      <motion.span
        key="error"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: [0, -4, 4, -4, 4, 0] }}
        exit={{ opacity: 0 }}
        transition={{ x: { duration: 0.4 } }}
        className="flex items-center gap-2"
      >
        {errorText}
      </motion.span>
    ),
  }

  return (
    <motion.button
      whileTap={state === 'idle' ? { scale: 0.97 } : undefined}
      className={clsx(
        'relative inline-flex items-center justify-center overflow-hidden rounded-xl font-semibold',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant][state],
        sizes[size],
        className
      )}
      disabled={disabled || state === 'loading'}
      {...props}
    >
      <AnimatePresence mode="wait">
        {content[state]}
      </AnimatePresence>
    </motion.button>
  )
}

// Simple async button helper
interface AsyncButtonProps extends Omit<SuccessButtonProps, 'loading' | 'success' | 'error'> {
  onClick: () => Promise<void>
}

export const AsyncButton = ({ onClick, ...props }: AsyncButtonProps) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    setSuccess(false)
    setError(false)

    try {
      await onClick()
      setSuccess(true)
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SuccessButton
      {...props}
      loading={loading}
      success={success}
      error={error}
      onClick={handleClick}
      onSuccessComplete={() => setSuccess(false)}
    />
  )
}

export default SuccessButton
