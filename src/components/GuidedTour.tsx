import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Euro,
  Rocket,
  Globe,
  Calendar,
  CheckCircle,
} from 'lucide-react'
import { Button } from './ui/Button'

// Smooth easing curves
const smoothEasing = [0.4, 0, 0.2, 1]
const springConfig = { stiffness: 300, damping: 30, mass: 0.8 }
const gentleSpring = { type: 'spring' as const, ...springConfig }
const snappyTransition = { duration: 0.2, ease: [0.4, 0, 0.2, 1] }

type Language = 'en' | 'fr'

interface TourStepContent {
  title: string
  description: string
}

interface TourStep {
  id: string
  page: string
  targetSelector: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
  highlight?: boolean
  scrollToTop?: boolean
  showCTA?: boolean
  content: {
    en: TourStepContent
    fr: TourStepContent
  }
}

// Booking link
const BOOKING_URL = 'https://www.jengu.ai/book/'

// UI translations
const UI_TRANSLATIONS = {
  en: {
    step: 'Step',
    of: 'of',
    back: 'Back',
    next: 'Next',
    getStarted: 'Get Started',
    loading: 'Loading...',
    skipTour: 'Skip tour',
    bookCall: 'Book Free Call',
    noRisk: 'Zero risk - pay only when you profit',
  },
  fr: {
    step: 'Étape',
    of: 'sur',
    back: 'Retour',
    next: 'Suivant',
    getStarted: 'Commencer',
    loading: 'Chargement...',
    skipTour: 'Passer la visite',
    bookCall: 'Réserver un appel gratuit',
    noRisk: 'Zéro risque - payez seulement quand vous gagnez',
  },
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    page: '/data',
    targetSelector: '.tour-welcome',
    position: 'center',
    highlight: false,
    content: {
      en: {
        title: 'Welcome to Jengu!',
        description:
          "Let's take a quick tour of how dynamic pricing can boost your revenue. We only charge when you make more money - zero risk!",
      },
      fr: {
        title: 'Bienvenue chez Jengu !',
        description:
          "Découvrez comment la tarification dynamique peut augmenter vos revenus. Nous ne facturons que lorsque vous gagnez plus d'argent - zéro risque !",
      },
    },
  },
  {
    id: 'data-upload',
    page: '/data',
    targetSelector: '[data-tour="upload-zone"]',
    position: 'right',
    highlight: true,
    content: {
      en: {
        title: 'Upload Your Booking Data',
        description:
          'Start by uploading your booking history CSV. We auto-detect columns and enrich with weather & holiday data.',
      },
      fr: {
        title: 'Téléchargez vos données',
        description:
          "Commencez par télécharger votre historique de réservations CSV. Nous détectons automatiquement les colonnes et enrichissons avec les données météo et vacances.",
      },
    },
  },
  {
    id: 'pms-integration',
    page: '/data',
    targetSelector: '[data-tour="pms-integration"]',
    position: 'left',
    highlight: true,
    content: {
      en: {
        title: 'Or Connect Your PMS',
        description:
          'Even better: Link eSeason, MEWS, or Cloudbeds. We sync your bookings automatically every hour - zero manual work!',
      },
      fr: {
        title: 'Ou connectez votre PMS',
        description:
          'Encore mieux : Reliez eSeason, MEWS ou Cloudbeds. Nous synchronisons vos réservations automatiquement chaque heure - zéro travail manuel !',
      },
    },
  },
  {
    id: 'pricing-engine',
    page: '/pricing/optimizer',
    targetSelector: '[data-tour="pricing-strategy"]',
    position: 'right',
    highlight: true,
    content: {
      en: {
        title: 'One-Click Optimization',
        description:
          'Choose Conservative, Balanced, or Aggressive - our AI calculates optimal prices instantly. You review and approve every change.',
      },
      fr: {
        title: 'Optimisation en un clic',
        description:
          "Choisissez Prudent, Équilibré ou Agressif - notre IA calcule les prix optimaux instantanément. Vous validez chaque modification.",
      },
    },
  },
  {
    id: 'competitor-discover',
    page: '/pricing/competitors',
    targetSelector: '[data-tour="competitor-search"]',
    position: 'bottom',
    highlight: true,
    content: {
      en: {
        title: 'Find Your Competitors',
        description:
          'Enter your location and we find nearby campsites automatically. See their ratings, amenities, and estimated prices.',
      },
      fr: {
        title: 'Trouvez vos concurrents',
        description:
          "Entrez votre emplacement et nous trouvons automatiquement les campings proches. Voyez leurs notes, équipements et prix estimés.",
      },
    },
  },
  {
    id: 'competitor-monitor',
    page: '/pricing/competitors/monitored',
    targetSelector: '[data-tour="competitor-list"]',
    position: 'right',
    highlight: true,
    scrollToTop: true,
    content: {
      en: {
        title: 'Track Competitor Prices',
        description:
          "Monitor competitors daily. When they change prices, you'll know instantly and can adjust your strategy.",
      },
      fr: {
        title: 'Suivez les prix concurrents',
        description:
          "Surveillez les concurrents quotidiennement. Quand ils changent leurs prix, vous le saurez et pourrez ajuster votre stratégie.",
      },
    },
  },
  {
    id: 'dashboard-results',
    page: '/',
    targetSelector: '[data-tour="revenue-hero"]',
    position: 'bottom',
    highlight: true,
    scrollToTop: true,
    showCTA: true,
    content: {
      en: {
        title: 'Ready to Boost Your Revenue?',
        description:
          "Dynamic pricing delivers +30% more revenue. Zero upfront cost - you only pay when you earn more. Book a free 15-min call to see your personalized pricing potential.",
      },
      fr: {
        title: 'Prêt à augmenter vos revenus ?',
        description:
          "La tarification dynamique génère +30% de revenus en plus. Aucun coût initial - vous ne payez que lorsque vous gagnez plus. Réservez un appel gratuit de 15 min pour découvrir votre potentiel.",
      },
    },
  },
]

const STORAGE_KEY = 'jengu-guided-tour-seen'
const LANGUAGE_KEY = 'jengu-tour-language'

// Detect browser language
const detectLanguage = (): Language => {
  const stored = localStorage.getItem(LANGUAGE_KEY)
  if (stored === 'en' || stored === 'fr') return stored

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('fr')) return 'fr'
  return 'en'
}

export const GuidedTour = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)
  const [language, setLanguage] = useState<Language>(detectLanguage)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const navigate = useNavigate()
  const location = useLocation()

  // Spring-animated spotlight position for ultra-smooth transitions
  const spotlightX = useSpring(0, springConfig)
  const spotlightY = useSpring(0, springConfig)
  const spotlightW = useSpring(100, springConfig)
  const spotlightH = useSpring(100, springConfig)

  // Update spring values when targetRect changes
  useEffect(() => {
    if (targetRect) {
      spotlightX.set(targetRect.left - 8)
      spotlightY.set(targetRect.top - 8)
      spotlightW.set(targetRect.width + 16)
      spotlightH.set(targetRect.height + 16)
    }
  }, [targetRect, spotlightX, spotlightY, spotlightW, spotlightH])

  const step = TOUR_STEPS[currentStep]
  const content = step.content[language]
  const ui = UI_TRANSLATIONS[language]
  const isLastStep = currentStep === TOUR_STEPS.length - 1
  const isFirstStep = currentStep === 0

  // Toggle language
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en'
    setLanguage(newLang)
    localStorage.setItem(LANGUAGE_KEY, newLang)
  }

  // Check if tour should show on mount - navigate to /data first, then open tour
  useEffect(() => {
    const hasSeen = localStorage.getItem(STORAGE_KEY)
    if (hasSeen) return

    // Navigate to /data page first for the tour
    const initialPath = window.location.pathname
    if (initialPath !== '/data') {
      navigate('/data')
      // Wait for navigation to complete, then open tour - fast!
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      // Already on /data, open tour immediately
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 200)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  // Find and measure target element with retries
  const findTargetWithRetry = useCallback(
    (selector: string, shouldHighlight: boolean, scrollToTop = false, maxAttempts = 15) => {
      let attempts = 0

      const tryFind = () => {
        const target = document.querySelector(selector)
        if (target) {
          // Scroll to top of page first if requested (instant for speed)
          if (scrollToTop) {
            window.scrollTo({ top: 0, behavior: 'instant' })
          }

          // Measure immediately - spring animations handle smoothness
          const rect = target.getBoundingClientRect()
          setTargetRect(rect)

          if (shouldHighlight && !scrollToTop) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // Re-measure after scroll animation
            setTimeout(() => {
              const newRect = target.getBoundingClientRect()
              setTargetRect(newRect)
            }, 300)
          }
          setIsNavigating(false)
          return
        }

        attempts++
        if (attempts < maxAttempts) {
          setTimeout(tryFind, 150)
        } else {
          // Element not found after all attempts - still show step
          setTargetRect(null)
          setIsNavigating(false)
        }
      }

      tryFind()
    },
    []
  )

  // Handle step changes - initiate navigation if needed
  useEffect(() => {
    if (!isOpen) return

    const currentStep$ = TOUR_STEPS[currentStep]
    if (!currentStep$) return

    const targetPath = currentStep$.page
    const currentPath = location.pathname

    // Check if we're on the correct page
    if (currentPath === targetPath) {
      // Already on correct page - spring animations handle smooth transitions
      // Scroll to top first if requested (instant for no delay)
      if (currentStep$.scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }

      const target = document.querySelector(currentStep$.targetSelector)
      if (target) {
        // Measure immediately - springs handle smooth animation
        const rect = target.getBoundingClientRect()
        setTargetRect(rect)

        if (currentStep$.highlight && !currentStep$.scrollToTop) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' })
          // Re-measure after scroll
          setTimeout(() => {
            const newRect = target.getBoundingClientRect()
            setTargetRect(newRect)
          }, 300)
        }
      } else {
        // Element not found immediately - try with retries
        findTargetWithRetry(currentStep$.targetSelector, currentStep$.highlight ?? false, currentStep$.scrollToTop ?? false)
      }
    } else {
      // Need to navigate - only show loading for actual page navigation
      setIsNavigating(true)
      setTargetRect(null)
      setPendingNavigation(targetPath)
      navigate(targetPath)
    }
  }, [currentStep, isOpen]) // Deliberately minimal dependencies

  // Handle location changes - complete pending navigation
  useEffect(() => {
    if (!pendingNavigation) return
    if (!isOpen) return

    const currentPath = location.pathname

    // Check if we've arrived at the target
    if (currentPath === pendingNavigation) {
      setPendingNavigation(null)
      const currentStep$ = TOUR_STEPS[currentStep]
      if (currentStep$) {
        // Scroll to top immediately if requested
        if (currentStep$.scrollToTop) {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
        // Page loaded - find the element with minimal delay
        setTimeout(() => {
          findTargetWithRetry(currentStep$.targetSelector, currentStep$.highlight ?? false, currentStep$.scrollToTop ?? false)
        }, 100) // Minimal delay for page render
      }
    }
  }, [location.pathname, pendingNavigation, currentStep, isOpen, findTargetWithRetry])

  // Re-find target on window resize
  useEffect(() => {
    if (!isOpen) return

    const currentStep$ = TOUR_STEPS[currentStep]
    if (!currentStep$) return

    const handleResize = () => {
      const target = document.querySelector(currentStep$.targetSelector)
      if (target) {
        const rect = target.getBoundingClientRect()
        setTargetRect(rect)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen, currentStep])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  const handleNext = () => {
    if (isLastStep) {
      handleClose()
    } else {
      setDirection('forward')
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirstStep) {
      setDirection('backward')
      setCurrentStep(prev => prev - 1)
    }
  }

  // Slide variants based on direction - subtle and snappy
  const slideVariants = {
    enter: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? 15 : -15,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? -15 : 15,
      opacity: 0,
      scale: 0.98,
    }),
  }

  // Calculate tooltip position - align to target edge, not centered
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect || step.position === 'center') {
      return {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }

    const gap = 16 // Gap between target and tooltip
    const margin = 16 // Minimum margin from viewport edge
    const tooltipWidth = 360
    const tooltipHeight = 240 // Actual approximate height
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    // For left/right: align tooltip TOP with target TOP (with slight offset for visual balance)
    const alignedTop = Math.max(margin, Math.min(targetRect.top - 8, viewportHeight - tooltipHeight - margin))

    // For top/bottom: center horizontally on target, clamped to viewport
    const centeredLeft = Math.max(margin, Math.min(
      targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
      viewportWidth - tooltipWidth - margin
    ))

    // Check available space
    const spaceBelow = viewportHeight - targetRect.bottom - gap
    const spaceAbove = targetRect.top - gap
    const spaceRight = viewportWidth - targetRect.right - gap
    const spaceLeft = targetRect.left - gap

    let position = step.position

    // Auto-flip if not enough space
    if (position === 'bottom' && spaceBelow < tooltipHeight && spaceAbove > spaceBelow) {
      position = 'top'
    } else if (position === 'top' && spaceAbove < tooltipHeight && spaceBelow > spaceAbove) {
      position = 'bottom'
    } else if (position === 'right' && spaceRight < tooltipWidth && spaceLeft > spaceRight) {
      position = 'left'
    } else if (position === 'left' && spaceLeft < tooltipWidth && spaceRight > spaceLeft) {
      position = 'right'
    }

    switch (position) {
      case 'bottom':
        return {
          position: 'fixed',
          left: centeredLeft,
          top: targetRect.bottom + gap,
        }
      case 'top':
        return {
          position: 'fixed',
          left: centeredLeft,
          top: Math.max(margin, targetRect.top - tooltipHeight - gap),
        }
      case 'left':
        return {
          position: 'fixed',
          left: Math.max(margin, targetRect.left - tooltipWidth - gap),
          top: alignedTop,
        }
      case 'right':
        return {
          position: 'fixed',
          left: targetRect.right + gap,
          top: alignedTop,
        }
      default:
        return {
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }
    }
  }

  if (!isOpen) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay with spotlight cutout - ultra smooth with springs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEasing }}
            className="fixed inset-0 z-[300]"
            onClick={handleClose}
          >
            {step.highlight && targetRect && !isNavigating ? (
              <motion.svg
                className="absolute inset-0 h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: smoothEasing }}
              >
                <defs>
                  <mask id="spotlight-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    {/* Use spring-animated motion values for silky smooth spotlight movement */}
                    <motion.rect
                      style={{
                        x: spotlightX,
                        y: spotlightY,
                        width: spotlightW,
                        height: spotlightH,
                      }}
                      rx="16"
                      fill="black"
                    />
                  </mask>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="rgba(0, 0, 0, 0.8)"
                  mask="url(#spotlight-mask)"
                />
              </motion.svg>
            ) : (
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: smoothEasing }}
              />
            )}
          </motion.div>


          {/* Highlight border around target - spring-animated for smoothness */}
          <AnimatePresence>
            {step.highlight && targetRect && !isNavigating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={gentleSpring}
                className="pointer-events-none fixed z-[301]"
                style={{
                  left: targetRect.left - 8,
                  top: targetRect.top - 8,
                  width: targetRect.width + 16,
                  height: targetRect.height + 16,
                }}
              >
                {/* Animated pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-primary"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />
                {/* Glowing background */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />
                {/* Subtle outer glow */}
                <motion.div
                  className="absolute -inset-2 rounded-2xl bg-primary/5 blur-md"
                  animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tooltip card with directional slide animations - always visible */}
          <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`tooltip-${currentStep}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={snappyTransition}
                className="pointer-events-auto z-[302] w-[360px]"
                style={getTooltipStyle()}
                onClick={e => e.stopPropagation()}
              >
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-2xl">
              {/* Progress bar with smooth spring animation */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-elevated">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-success"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
              </div>

              {/* Language toggle & Close button */}
              <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-elevated hover:text-text"
                  title={language === 'en' ? 'Switch to French' : 'Passer en anglais'}
                >
                  <Globe className="h-3 w-3" />
                  {language.toUpperCase()}
                </button>
                <button
                  onClick={handleClose}
                  className="rounded-lg p-1 text-muted transition-colors hover:bg-elevated hover:text-text"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <motion.div
                className="p-5 pt-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
                }}
              >
                {/* Icon for center positioned steps */}
                {step.position === 'center' && (
                  <motion.div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: { opacity: 1, scale: 1, transition: gentleSpring },
                    }}
                  >
                    {isFirstStep ? (
                      <Sparkles className="h-7 w-7 text-primary" />
                    ) : (
                      <Rocket className="h-7 w-7 text-primary" />
                    )}
                  </motion.div>
                )}

                {/* Step counter */}
                <motion.div
                  className="mb-2 flex items-center gap-2"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  <span className="text-xs font-medium text-primary">
                    {ui.step} {currentStep + 1} {ui.of} {TOUR_STEPS.length}
                  </span>
                </motion.div>

                {/* Title with smooth fade */}
                <motion.h3
                  className="mb-2 text-lg font-bold text-text"
                  variants={{
                    hidden: { opacity: 0, y: 5 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {content.title}
                </motion.h3>

                {/* Description with smooth fade */}
                <motion.p
                  className="mb-4 text-sm leading-relaxed text-muted"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  {content.description}
                </motion.p>

                {/* Navigation with smooth appearance */}
                <motion.div
                  className="flex items-center justify-between"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  {!isLastStep && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePrev}
                      disabled={isFirstStep}
                      className={isFirstStep ? 'invisible' : ''}
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      {ui.back}
                    </Button>
                  )}

                  {isLastStep ? (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-success px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                      >
                        <Calendar className="h-4 w-4" />
                        {ui.bookCall}
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="primary" size="sm" onClick={handleNext}>
                        {ui.next}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>

                {/* No-risk message on last step, skip link on others */}
                {isLastStep ? (
                  <motion.div
                    className="mt-3 space-y-2"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { delay: 0.2 } },
                    }}
                  >
                    <div className="flex items-center justify-center gap-2 text-center text-xs text-success">
                      <CheckCircle className="h-3.5 w-3.5" />
                      {ui.noRisk}
                    </div>
                    <button
                      onClick={handleClose}
                      className="w-full text-center text-xs text-muted transition-colors hover:text-text"
                    >
                      {language === 'en' ? 'Maybe later' : 'Peut-être plus tard'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={handleClose}
                    className="mt-3 w-full text-center text-xs text-muted transition-colors hover:text-text"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { delay: 0.3 } },
                    }}
                  >
                    {ui.skipTour}
                  </motion.button>
                )}
              </motion.div>
            </div>
              </motion.div>
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

// Hook to reset tour
export const useResetGuidedTour = () => {
  return () => {
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }
}

// Hook to manually trigger tour
export const useStartGuidedTour = () => {
  return () => {
    localStorage.removeItem(STORAGE_KEY)
    window.location.href = '/'
  }
}

// Hook to change language
export const useSetTourLanguage = () => {
  return (lang: Language) => {
    localStorage.setItem(LANGUAGE_KEY, lang)
  }
}
