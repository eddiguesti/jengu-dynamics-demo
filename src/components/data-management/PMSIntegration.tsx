import { motion } from 'framer-motion'
import { Link2, CheckCircle2, Zap, RefreshCw, Shield, ArrowRight } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { showPremiumModal } from '../ui/PremiumModal'
import { useLanguageStore } from '@/stores/useLanguageStore'

const translations = {
  en: {
    connectPMS: 'Connect Your PMS',
    automaticSync: 'Automatic sync - no uploads needed',
    recommended: 'Recommended',
    realtimeSync: 'Real-time sync',
    autoUpdates: 'Auto-updates',
    secureConnection: 'Secure connection',
    popular: 'Popular',
    viewAllIntegrations: 'View all 20+ integrations',
    whyConnect: 'Why connect?',
    whyConnectDesc: 'Your booking data syncs automatically every hour. No manual exports, no missed updates, always accurate pricing recommendations.',
    eseasonDesc: 'Leading PMS for French campsites',
    mewsDesc: 'Modern hospitality cloud',
    cloudbedsDesc: 'All-in-one hotel management',
    hipcampDesc: 'Outdoor stays marketplace',
  },
  fr: {
    connectPMS: 'Connectez Votre PMS',
    automaticSync: 'Synchronisation automatique - pas d\'import nécessaire',
    recommended: 'Recommandé',
    realtimeSync: 'Sync temps réel',
    autoUpdates: 'Mises à jour auto',
    secureConnection: 'Connexion sécurisée',
    popular: 'Populaire',
    viewAllIntegrations: 'Voir les 20+ intégrations',
    whyConnect: 'Pourquoi connecter ?',
    whyConnectDesc: 'Vos données de réservation se synchronisent automatiquement chaque heure. Pas d\'export manuel, pas de mises à jour manquées, toujours des recommandations tarifaires précises.',
    eseasonDesc: 'PMS leader pour les campings français',
    mewsDesc: 'Cloud hôtelier moderne',
    cloudbedsDesc: 'Gestion hôtelière tout-en-un',
    hipcampDesc: 'Marketplace séjours plein air',
  },
}

interface PMSProvider {
  id: string
  name: string
  logo: string
  descKey: 'eseasonDesc' | 'mewsDesc' | 'cloudbedsDesc' | 'hipcampDesc'
  popular?: boolean
}

const PMS_PROVIDERS: PMSProvider[] = [
  {
    id: 'eseason',
    name: 'eSeason / Inaxel',
    logo: '🏕️',
    descKey: 'eseasonDesc',
    popular: true,
  },
  {
    id: 'mews',
    name: 'MEWS',
    logo: '🏨',
    descKey: 'mewsDesc',
  },
  {
    id: 'cloudbeds',
    name: 'Cloudbeds',
    logo: '☁️',
    descKey: 'cloudbedsDesc',
  },
  {
    id: 'hipcamp',
    name: 'HipCamp',
    logo: '⛺',
    descKey: 'hipcampDesc',
  },
]

export const PMSIntegration = () => {
  const { language } = useLanguageStore()
  const t = translations[language]

  const FEATURES = [
    { icon: Zap, text: t.realtimeSync },
    { icon: RefreshCw, text: t.autoUpdates },
    { icon: Shield, text: t.secureConnection },
  ]

  const handleConnect = (provider: PMSProvider) => {
    showPremiumModal(`${provider.name} Integration`)
  }

  return (
    <Card data-tour="pms-integration" variant="elevated" className="relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-success/10 blur-3xl" />

      <div className="relative p-6">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <Link2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text">{t.connectPMS}</h3>
              <p className="text-sm text-muted">{t.automaticSync}</p>
            </div>
          </div>
          <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            {t.recommended}
          </span>
        </div>

        {/* Features */}
        <div className="mb-6 flex gap-4">
          {FEATURES.map((feature) => (
            <div key={feature.text} className="flex items-center gap-2 text-sm text-muted">
              <feature.icon className="h-4 w-4 text-success" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* PMS Providers Grid */}
        <div className="grid grid-cols-2 gap-3">
          {PMS_PROVIDERS.map((provider) => (
            <motion.button
              key={provider.id}
              onClick={() => handleConnect(provider)}
              className="group relative flex items-center gap-3 rounded-xl border border-border bg-elevated p-3 text-left transition-all hover:border-success/50 hover:bg-success/5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {provider.popular && (
                <span className="absolute -right-1 -top-1 rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-background">
                  {t.popular}
                </span>
              )}
              <span className="text-2xl">{provider.logo}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{provider.name}</p>
                <p className="text-xs text-muted truncate">{t[provider.descKey]}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>

        {/* All Integrations Link */}
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => showPremiumModal('All PMS Integrations')}
            className="text-muted hover:text-text"
          >
            {t.viewAllIntegrations}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        {/* Benefits */}
        <div className="mt-4 rounded-lg border border-success/20 bg-success/5 p-3">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
            <p className="text-xs text-muted">
              <span className="font-medium text-success">{t.whyConnect}</span> {t.whyConnectDesc}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
