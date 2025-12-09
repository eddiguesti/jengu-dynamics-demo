import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { X, Crown, Sparkles, Check } from 'lucide-react'
import { Button } from './Button'
import { create } from 'zustand'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { t } from '@/lib/translations'

// Store to manage premium modal state
interface PremiumModalStore {
  isOpen: boolean
  featureName: string
  openModal: (featureName?: string) => void
  closeModal: () => void
}

export const usePremiumModal = create<PremiumModalStore>((set) => ({
  isOpen: false,
  featureName: '',
  openModal: (featureName = 'This feature') => set({ isOpen: true, featureName }),
  closeModal: () => set({ isOpen: false }),
}))

// Helper function to trigger premium modal from anywhere
export const showPremiumModal = (featureName?: string) => {
  usePremiumModal.getState().openModal(featureName)
}

export const PremiumModal = () => {
  const { isOpen, featureName, closeModal } = usePremiumModal()
  const { language } = useLanguageStore()

  const features = [
    t('premium.features.competitors', language),
    t('premium.features.alerts', language),
    t('premium.features.ai', language),
    t('premium.features.analytics', language),
    t('premium.features.export', language),
    t('premium.features.support', language),
  ]

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="w-full max-w-md pointer-events-auto">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-2xl">
              {/* Decorative gradient */}
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-success/10 blur-3xl" />

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 rounded-lg p-1 text-muted transition-colors hover:bg-elevated hover:text-text"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                  <Crown className="h-10 w-10 text-primary" />
                </div>

                {/* Title */}
                <h2 className="mb-2 text-center text-2xl font-bold text-text">
                  {t('premium.title', language)}
                </h2>
                <p className="mb-6 text-center text-muted">
                  <span className="font-semibold text-primary">{featureName}</span> {t('premium.onlyPaid', language)}
                </p>

                {/* Features list */}
                <div className="mb-6 rounded-xl bg-background/50 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text">
                    <Sparkles className="h-4 w-4 text-primary" />
                    {t('premium.upgradeFor', language)}
                  </div>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted">
                        <Check className="h-4 w-4 flex-shrink-0 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3">
                  <Button
                    variant="primary"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 py-3"
                    onClick={() => {
                      closeModal()
                      // In real app, this would navigate to pricing page
                      window.open('https://www.jengu.ai/book/', '_blank')
                    }}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    {t('premium.upgrade', language)}
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={closeModal}>
                    {t('premium.continueDemo', language)}
                  </Button>
                </div>

                {/* Footer note */}
                <p className="mt-4 text-center text-xs text-muted">
                  {t('premium.footer', language)}
                </p>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
