import { motion } from 'framer-motion'
import { Monitor, Calendar, CheckCircle, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'

type Language = 'en' | 'fr'

const translations = {
  en: {
    title: 'Desktop Required',
    subtitle: 'Jengu is designed for desktop devices',
    description:
      'Our pricing intelligence dashboard delivers the best experience on larger screens. Please visit us on your computer to explore all features.',
    bookCall: 'Book a Free Call',
    visitSite: 'Visit jengu.ai',
    noRisk: 'Zero risk - pay only when you profit',
  },
  fr: {
    title: 'Version Bureau Requise',
    subtitle: 'Jengu est conçu pour les appareils de bureau',
    description:
      "Notre tableau de bord d'intelligence tarifaire offre la meilleure expérience sur grand écran. Visitez-nous sur votre ordinateur pour découvrir toutes les fonctionnalités.",
    bookCall: 'Réserver un Appel Gratuit',
    visitSite: 'Visiter jengu.ai',
    noRisk: 'Zéro risque - payez seulement quand vous gagnez',
  },
}

// Detect browser language
const detectLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('fr')) return 'fr'
  return 'en'
}

export const MobileBlocker = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [language, setLanguage] = useState<Language>(detectLanguage)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'fr' : 'en'))
  }

  if (!isMobile) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Language toggle */}
      <div className="absolute right-4 top-4">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/20"
        >
          <Globe className="h-4 w-4" />
          {language === 'en' ? 'FR' : 'EN'}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-indigo-500/30 blur-2xl" />
            <img
              src="/logo.webp"
              alt="Jengu"
              className="relative h-20 w-20 rounded-3xl shadow-2xl"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Jengu</h1>
          <p className="text-sm text-indigo-300">Pricing Intelligence</p>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur"
        >
          <Monitor className="h-10 w-10 text-indigo-400" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="mb-2 text-2xl font-bold text-white">{t.title}</h2>
          <p className="mb-4 text-lg text-indigo-200">{t.subtitle}</p>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">{t.description}</p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex w-full max-w-xs flex-col gap-3"
        >
          <a
            href="https://www.jengu.ai/book/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40"
          >
            <Calendar className="h-5 w-5" />
            {t.bookCall}
          </a>

          <a
            href="https://www.jengu.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
          >
            {t.visitSite}
          </a>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center gap-2 text-sm text-emerald-400"
        >
          <CheckCircle className="h-4 w-4" />
          {t.noRisk}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="pb-8 text-center">
        <p className="text-xs text-slate-500">demo.jengu.ai</p>
      </div>
    </motion.div>
  )
}

export default MobileBlocker
