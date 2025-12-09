import { useNavigate } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { BarChart3, Activity, TrendingUp } from 'lucide-react'
import { useLanguageStore } from '@/stores/useLanguageStore'

const translations = {
  en: {
    quickActions: 'Quick Actions',
    manageIntelligence: 'Manage your pricing intelligence',
    uploadData: 'Upload Data',
    uploadDataDesc: 'Import your historical booking data',
    goToData: 'Go to Data',
    enrichDataset: 'Enrich Dataset',
    enrichDatasetDesc: 'Add weather, holidays, and features',
    goToEnrichment: 'Go to Enrichment',
    viewInsights: 'View Insights',
    viewInsightsDesc: 'Explore pricing patterns and trends',
    goToInsights: 'Go to Insights',
  },
  fr: {
    quickActions: 'Actions Rapides',
    manageIntelligence: 'Gérez votre intelligence tarifaire',
    uploadData: 'Importer des Données',
    uploadDataDesc: 'Importez vos données de réservation historiques',
    goToData: 'Aller aux Données',
    enrichDataset: 'Enrichir le Jeu de Données',
    enrichDatasetDesc: 'Ajoutez météo, jours fériés et fonctionnalités',
    goToEnrichment: 'Aller à l\'Enrichissement',
    viewInsights: 'Voir les Analyses',
    viewInsightsDesc: 'Explorez les tendances et les prix',
    goToInsights: 'Aller aux Analyses',
  },
}

export const QuickActionsFooter = () => {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]

  const actions = [
    {
      title: t.uploadData,
      description: t.uploadDataDesc,
      buttonText: t.goToData,
      buttonVariant: 'secondary' as const,
      icon: BarChart3,
      iconBg: 'bg-primary/10',
      iconHoverBg: 'group-hover:bg-primary/20',
      iconColor: 'text-primary',
      path: '/data',
    },
    {
      title: t.enrichDataset,
      description: t.enrichDatasetDesc,
      buttonText: t.goToEnrichment,
      buttonVariant: 'secondary' as const,
      icon: Activity,
      iconBg: 'bg-success/10',
      iconHoverBg: 'group-hover:bg-success/20',
      iconColor: 'text-success',
      path: '/enrichment',
    },
    {
      title: t.viewInsights,
      description: t.viewInsightsDesc,
      buttonText: t.goToInsights,
      buttonVariant: 'primary' as const,
      icon: TrendingUp,
      iconBg: 'bg-warning/10',
      iconHoverBg: 'group-hover:bg-warning/20',
      iconColor: 'text-warning',
      path: '/insights',
    },
  ]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-text">{t.quickActions}</h2>
        <p className="text-sm text-muted">{t.manageIntelligence}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {actions.map(action => {
          const Icon = action.icon
          return (
            <Card
              key={action.path}
              variant="default"
              className="group cursor-pointer transition-all hover:border-primary hover:shadow-lg"
              onClick={() => navigate(action.path)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-xl p-3 transition-colors ${action.iconBg} ${action.iconHoverBg}`}
                >
                  <Icon className={`h-6 w-6 ${action.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-semibold text-text">{action.title}</h3>
                  <p className="mb-4 text-sm text-muted">{action.description}</p>
                  <Button variant={action.buttonVariant} size="sm">
                    {action.buttonText} →
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
