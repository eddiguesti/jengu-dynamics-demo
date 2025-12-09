import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Zap, Database, BarChart3, Activity, ArrowUpRight } from 'lucide-react'
import { staggerContainer, staggerItem, spring } from '@/lib/motion'
import { useLanguageStore } from '@/stores/useLanguageStore'

const translations = {
  en: {
    quickAction: 'Quick Action',
    getPriceQuote: 'Get Price Quote',
    aiPoweredPricing: 'AI-powered pricing recommendation',
    openOptimizer: 'Open Optimizer',
    uploadData: 'Upload Data',
    addNewCSV: 'Add new CSV files to analyze',
    manageFiles: 'Manage Files',
    viewAnalytics: 'View Analytics',
    deepDive: 'Deep dive into trends & insights',
    exploreCharts: 'Explore Charts',
    askAI: 'Ask AI',
    instantAnswers: 'Get instant answers & advice',
    openAssistant: 'Open Assistant',
  },
  fr: {
    quickAction: 'Action Rapide',
    getPriceQuote: 'Obtenir un Prix',
    aiPoweredPricing: 'Recommandation tarifaire par IA',
    openOptimizer: 'Ouvrir l\'Optimiseur',
    uploadData: 'Importer des Données',
    addNewCSV: 'Ajouter de nouveaux fichiers CSV',
    manageFiles: 'Gérer les Fichiers',
    viewAnalytics: 'Voir les Analyses',
    deepDive: 'Explorez les tendances en détail',
    exploreCharts: 'Explorer les Graphiques',
    askAI: 'Demander à l\'IA',
    instantAnswers: 'Obtenez des réponses instantanées',
    openAssistant: 'Ouvrir l\'Assistant',
  },
}

export const QuickActionCards = () => {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]

  const actions = [
    {
      title: t.getPriceQuote,
      subtitle: t.aiPoweredPricing,
      label: t.openOptimizer,
      icon: Zap,
      color: '#EBFF57',
      path: '/pricing/optimizer',
    },
    {
      title: t.uploadData,
      subtitle: t.addNewCSV,
      label: t.manageFiles,
      icon: Database,
      color: 'rgb(59, 130, 246)', // blue-500
      path: '/data-sources',
    },
    {
      title: t.viewAnalytics,
      subtitle: t.deepDive,
      label: t.exploreCharts,
      icon: BarChart3,
      color: 'rgb(168, 85, 247)', // purple-500
      path: '/analytics',
    },
    {
      title: t.askAI,
      subtitle: t.instantAnswers,
      label: t.openAssistant,
      icon: Activity,
      color: 'rgb(34, 197, 94)', // green-500
      path: '/tools/assistant',
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {actions.map(action => {
        const Icon = action.icon
        return (
          <motion.div
            key={action.path}
            variants={staggerItem}
            whileHover={{ scale: 1.02, y: -4, transition: spring.snappy }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              variant="elevated"
              className="group cursor-pointer p-6 transition-all hover:shadow-xl"
              style={{ borderLeftWidth: '4px', borderLeftColor: action.color }}
              onClick={() => navigate(action.path)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400">{t.quickAction}</p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-100">{action.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{action.subtitle}</p>
                </div>
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: `${action.color}10` }}
                >
                  <Icon className="h-6 w-6" style={{ color: action.color }} />
                </div>
              </div>
              <div
                className="mt-4 flex items-center text-sm font-medium"
                style={{ color: action.color }}
              >
                {action.label}
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
