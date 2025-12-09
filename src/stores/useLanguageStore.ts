import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'en' | 'fr'

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

// Detect browser language
const detectLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('fr')) return 'fr'
  return 'en'
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: detectLanguage(),
      setLanguage: (lang: Language) => set({ language: lang }),
      toggleLanguage: () => set({ language: get().language === 'en' ? 'fr' : 'en' }),
    }),
    {
      name: 'jengu-language',
    }
  )
)

// Hook for easy translation access
export const useTranslation = () => {
  const { language, setLanguage, toggleLanguage } = useLanguageStore()

  const t = (key: string, translations: Record<Language, string>): string => {
    return translations[language] || translations.en || key
  }

  return { language, setLanguage, toggleLanguage, t }
}
