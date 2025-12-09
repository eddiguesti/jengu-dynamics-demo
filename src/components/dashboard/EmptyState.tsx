import { useNavigate } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Database, BarChart3, TrendingUp, Activity, Zap } from 'lucide-react'
import { useLanguageStore } from '@/stores/useLanguageStore'

const translations = {
  en: {
    addDataTitle: 'Add Data to See Your Complete Dashboard',
    addDataDesc: 'Upload your historical booking data to unlock powerful insights, analytics, and AI-powered pricing recommendations.',
    uploadDataNow: 'Upload Data Now',
    learnHow: 'Learn How It Works',
    onceUpload: "Once you upload data, you'll see:",
    revenueCharts: 'Revenue Charts',
    occupancyTrends: 'Occupancy Trends',
    priceAnalytics: 'Price Analytics',
    welcomeTitle: 'Welcome to Jengu Dynamic Pricing',
    welcomeDesc: 'Start by uploading your booking data, then enrich it with weather and competitor intelligence. Our ML models will help you optimize pricing for maximum revenue and occupancy.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
  },
  fr: {
    addDataTitle: 'Ajoutez des Données pour Voir Votre Tableau de Bord',
    addDataDesc: 'Importez vos données de réservation historiques pour débloquer des analyses puissantes et des recommandations tarifaires par IA.',
    uploadDataNow: 'Importer Maintenant',
    learnHow: 'Comment ça Marche',
    onceUpload: 'Une fois les données importées, vous verrez :',
    revenueCharts: 'Graphiques de Revenus',
    occupancyTrends: 'Tendances d\'Occupation',
    priceAnalytics: 'Analyse des Prix',
    welcomeTitle: 'Bienvenue sur Jengu Tarification Dynamique',
    welcomeDesc: 'Commencez par importer vos données de réservation, puis enrichissez-les avec les données météo et concurrentielles. Nos modèles IA vous aideront à optimiser vos tarifs.',
    getStarted: 'Commencer',
    learnMore: 'En Savoir Plus',
  },
}

export const EmptyState = () => {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <Card variant="elevated" className="py-20 text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <div className="rounded-full bg-primary/10 p-6">
          <Database className="h-16 w-16 text-primary" />
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-text">
            {t.addDataTitle}
          </h2>
          <p className="mb-6 text-lg text-muted">
            {t.addDataDesc}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button variant="primary" size="lg" onClick={() => navigate('/data')}>
            <Database className="mr-2 h-5 w-5" />
            {t.uploadDataNow}
          </Button>
          <Button variant="ghost" size="lg" onClick={() => navigate('/assistant')}>
            {t.learnHow}
          </Button>
        </div>

        {/* Preview of what they'll get */}
        <div className="mt-8 w-full border-t border-border pt-8">
          <p className="mb-4 text-sm text-muted">{t.onceUpload}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-elevated p-4">
              <BarChart3 className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-xs font-medium text-text">{t.revenueCharts}</p>
            </div>
            <div className="rounded-lg border border-border bg-elevated p-4">
              <TrendingUp className="mx-auto mb-2 h-6 w-6 text-success" />
              <p className="text-xs font-medium text-text">{t.occupancyTrends}</p>
            </div>
            <div className="rounded-lg border border-border bg-elevated p-4">
              <Activity className="mx-auto mb-2 h-6 w-6 text-warning" />
              <p className="text-xs font-medium text-text">{t.priceAnalytics}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export const WelcomeBanner = () => {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <Card
      variant="elevated"
      className="border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-primary/10 p-4">
          <Zap className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-semibold text-text">
            {t.welcomeTitle}
          </h3>
          <p className="mb-4 text-muted">
            {t.welcomeDesc}
          </p>
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => navigate('/data')}>
              {t.getStarted}
            </Button>
            <Button variant="ghost" onClick={() => navigate('/assistant')}>
              {t.learnMore}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
