import type { Language } from '@/stores/useLanguageStore'

// Type-safe translations
type TranslationKey = keyof typeof translations.en

export const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.analytics': 'Analytics',
    'nav.analyticsOverview': 'Overview',
    'nav.analyticsAdvanced': 'Advanced View',
    'nav.pricing': 'Pricing',
    'nav.priceOptimizer': 'Price Optimizer',
    'nav.competitorIntel': 'Competitor Intel',
    'nav.dataSources': 'Data Sources',
    'nav.manageData': 'Manage Data',
    'nav.tools': 'Tools',
    'nav.aiAssistant': 'AI Assistant',
    'nav.settings': 'Settings',
    'nav.signOut': 'Sign Out',
    'nav.showTour': 'Show Product Tour',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Overview & quick actions',
    'dashboard.welcome': 'Welcome back',
    'dashboard.noData': 'No data yet',
    'dashboard.noDataDesc': 'Upload your booking data to see insights',
    'dashboard.uploadData': 'Upload Data',

    // Revenue Section
    'revenue.title': 'Revenue Overview',
    'revenue.projected': 'Projected Revenue',
    'revenue.vsLastYear': 'vs Last Year',
    'revenue.increase': 'Revenue Increase',
    'revenue.withDynamic': 'With Dynamic Pricing',
    'revenue.withStatic': 'With Static Pricing',
    'revenue.extraRevenue': 'Extra Revenue',
    'revenue.thisYear': 'This Year',
    'revenue.lastYear': 'Last Year',

    // Calendar
    'calendar.title': 'Price & Demand Calendar',
    'calendar.subtitle': 'Interactive calendar showing pricing and demand patterns from your data',
    'calendar.fullView': 'Full View',
    'calendar.highDemand': 'High Demand',
    'calendar.lowDemand': 'Low Demand',
    'calendar.opportunity': 'Opportunity',

    // Pricing Engine
    'pricing.title': 'Price Optimizer',
    'pricing.subtitle': 'AI-powered pricing recommendations',
    'pricing.strategy': 'Pricing Strategy',
    'pricing.conservative': 'Conservative',
    'pricing.conservativeDesc': 'Small price changes, lower risk',
    'pricing.balanced': 'Balanced',
    'pricing.balancedDesc': 'Optimal balance of risk and reward',
    'pricing.aggressive': 'Aggressive',
    'pricing.aggressiveDesc': 'Maximum revenue, higher risk',
    'pricing.recommendations': 'Price Recommendations',
    'pricing.apply': 'Apply Prices',
    'pricing.applyAll': 'Apply All',
    'pricing.generate': 'Generate Recommendations',
    'pricing.currentPrice': 'Current Price',
    'pricing.recommendedPrice': 'Recommended',
    'pricing.change': 'Change',
    'pricing.confidence': 'Confidence',

    // Competitors
    'competitors.title': 'Competitor Intelligence',
    'competitors.subtitle': 'Monitor nearby competitors',
    'competitors.monitored': 'Monitored Competitors',
    'competitors.discover': 'Discover Competitors',
    'competitors.avgPrice': 'Avg. Competitor Price',
    'competitors.lastUpdated': 'Last Updated',
    'competitors.totalMonitored': 'Total Monitored',
    'competitors.startMonitoring': 'Start Monitoring',
    'competitors.viewSite': 'View Site',
    'competitors.remove': 'Remove',
    'competitors.noCompetitors': 'No Monitored Competitors',
    'competitors.noCompetitorsDesc':
      'Start monitoring competitors from the discovery page to see their pricing history',

    // Data Management
    'data.title': 'Data Management',
    'data.subtitle': 'Upload and enrich your historical booking data',
    'data.upload': 'Upload',
    'data.enrichment': 'Enrichment',
    'data.dropFiles': 'Drop your files here, or click to browse',
    'data.supportedFormats': 'Supported formats: CSV, Excel (.xlsx, .xls)',
    'data.selectFiles': 'Select Files',
    'data.continue': 'Continue',
    'data.requirements': 'Data Requirements',
    'data.enrichAll': 'Enrich All',

    // Premium Modal
    'premium.title': 'Premium Feature',
    'premium.onlyPaid': 'is only available for paid customers.',
    'premium.upgradeFor': 'Upgrade to Premium for:',
    'premium.upgrade': 'Upgrade to Premium',
    'premium.continueDemo': 'Continue Exploring Demo',
    'premium.footer': 'This is a demo. Sign up now to unlock all features!',
    'premium.features.competitors': 'Unlimited competitor monitoring',
    'premium.features.alerts': 'Real-time price alerts',
    'premium.features.ai': 'AI-powered pricing recommendations',
    'premium.features.analytics': 'Advanced analytics & reports',
    'premium.features.export': 'Export data to CSV/Excel',
    'premium.features.support': 'Priority customer support',

    // Floating Assistant
    'assistant.title': 'Jengu AI Assistant',
    'assistant.subtitle': 'Always here to help',
    'assistant.greeting': 'Hi! How can I help?',
    'assistant.suggestion': 'Click a suggestion below or ask me anything',
    'assistant.placeholder': 'Ask me anything...',
    'assistant.openFull': 'Open full AI Assistant (Premium)',
    'assistant.quickHelp': 'Quick help:',
    'assistant.howUpload': 'How do I upload data?',
    'assistant.howEnrich': 'How to enrich my data?',
    'assistant.viewInsights': 'View insights?',
    'assistant.trainModel': 'Train a model?',
    'assistant.getPricing': 'Get pricing recommendations?',
    'assistant.updateSettings': 'Update settings?',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.refresh': 'Refresh',
    'common.perNight': '/ night',
    'common.reviews': 'reviews',
  },

  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.analytics': 'Analyses',
    'nav.analyticsOverview': 'Vue d\'ensemble',
    'nav.analyticsAdvanced': 'Vue avancée',
    'nav.pricing': 'Tarification',
    'nav.priceOptimizer': 'Optimiseur de prix',
    'nav.competitorIntel': 'Veille concurrentielle',
    'nav.dataSources': 'Sources de données',
    'nav.manageData': 'Gérer les données',
    'nav.tools': 'Outils',
    'nav.aiAssistant': 'Assistant IA',
    'nav.settings': 'Paramètres',
    'nav.signOut': 'Déconnexion',
    'nav.showTour': 'Voir la visite guidée',

    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.subtitle': 'Vue d\'ensemble et actions rapides',
    'dashboard.welcome': 'Bienvenue',
    'dashboard.noData': 'Pas encore de données',
    'dashboard.noDataDesc': 'Téléchargez vos données de réservation pour voir les insights',
    'dashboard.uploadData': 'Télécharger les données',

    // Revenue Section
    'revenue.title': 'Aperçu des revenus',
    'revenue.projected': 'Revenus projetés',
    'revenue.vsLastYear': 'vs l\'année dernière',
    'revenue.increase': 'Augmentation des revenus',
    'revenue.withDynamic': 'Avec tarification dynamique',
    'revenue.withStatic': 'Avec tarification fixe',
    'revenue.extraRevenue': 'Revenus supplémentaires',
    'revenue.thisYear': 'Cette année',
    'revenue.lastYear': 'L\'année dernière',

    // Calendar
    'calendar.title': 'Calendrier Prix & Demande',
    'calendar.subtitle':
      'Calendrier interactif montrant les tendances de prix et de demande de vos données',
    'calendar.fullView': 'Vue complète',
    'calendar.highDemand': 'Forte demande',
    'calendar.lowDemand': 'Faible demande',
    'calendar.opportunity': 'Opportunité',

    // Pricing Engine
    'pricing.title': 'Optimiseur de prix',
    'pricing.subtitle': 'Recommandations de prix par IA',
    'pricing.strategy': 'Stratégie de tarification',
    'pricing.conservative': 'Prudent',
    'pricing.conservativeDesc': 'Petits ajustements, risque faible',
    'pricing.balanced': 'Équilibré',
    'pricing.balancedDesc': 'Équilibre optimal risque/rendement',
    'pricing.aggressive': 'Agressif',
    'pricing.aggressiveDesc': 'Revenus maximaux, risque élevé',
    'pricing.recommendations': 'Recommandations de prix',
    'pricing.apply': 'Appliquer les prix',
    'pricing.applyAll': 'Tout appliquer',
    'pricing.generate': 'Générer les recommandations',
    'pricing.currentPrice': 'Prix actuel',
    'pricing.recommendedPrice': 'Recommandé',
    'pricing.change': 'Variation',
    'pricing.confidence': 'Confiance',

    // Competitors
    'competitors.title': 'Veille concurrentielle',
    'competitors.subtitle': 'Surveillez les concurrents proches',
    'competitors.monitored': 'Concurrents surveillés',
    'competitors.discover': 'Découvrir des concurrents',
    'competitors.avgPrice': 'Prix moyen concurrence',
    'competitors.lastUpdated': 'Dernière mise à jour',
    'competitors.totalMonitored': 'Total surveillés',
    'competitors.startMonitoring': 'Commencer le suivi',
    'competitors.viewSite': 'Voir le site',
    'competitors.remove': 'Supprimer',
    'competitors.noCompetitors': 'Aucun concurrent surveillé',
    'competitors.noCompetitorsDesc':
      'Commencez à surveiller des concurrents depuis la page de découverte pour voir leur historique de prix',

    // Data Management
    'data.title': 'Gestion des données',
    'data.subtitle': 'Téléchargez et enrichissez vos données historiques de réservation',
    'data.upload': 'Télécharger',
    'data.enrichment': 'Enrichissement',
    'data.dropFiles': 'Déposez vos fichiers ici, ou cliquez pour parcourir',
    'data.supportedFormats': 'Formats supportés : CSV, Excel (.xlsx, .xls)',
    'data.selectFiles': 'Sélectionner des fichiers',
    'data.continue': 'Continuer',
    'data.requirements': 'Exigences de données',
    'data.enrichAll': 'Tout enrichir',

    // Premium Modal
    'premium.title': 'Fonctionnalité Premium',
    'premium.onlyPaid': 'est réservée aux clients payants.',
    'premium.upgradeFor': 'Passez à Premium pour :',
    'premium.upgrade': 'Passer à Premium',
    'premium.continueDemo': 'Continuer l\'exploration de la démo',
    'premium.footer': 'Ceci est une démo. Inscrivez-vous maintenant pour débloquer toutes les fonctionnalités !',
    'premium.features.competitors': 'Surveillance illimitée des concurrents',
    'premium.features.alerts': 'Alertes de prix en temps réel',
    'premium.features.ai': 'Recommandations de prix par IA',
    'premium.features.analytics': 'Analyses et rapports avancés',
    'premium.features.export': 'Export des données en CSV/Excel',
    'premium.features.support': 'Support client prioritaire',

    // Floating Assistant
    'assistant.title': 'Assistant IA Jengu',
    'assistant.subtitle': 'Toujours là pour vous aider',
    'assistant.greeting': 'Bonjour ! Comment puis-je vous aider ?',
    'assistant.suggestion': 'Cliquez sur une suggestion ci-dessous ou posez-moi une question',
    'assistant.placeholder': 'Posez-moi une question...',
    'assistant.openFull': 'Ouvrir l\'assistant IA complet (Premium)',
    'assistant.quickHelp': 'Aide rapide :',
    'assistant.howUpload': 'Comment télécharger des données ?',
    'assistant.howEnrich': 'Comment enrichir mes données ?',
    'assistant.viewInsights': 'Voir les insights ?',
    'assistant.trainModel': 'Entraîner un modèle ?',
    'assistant.getPricing': 'Obtenir des recommandations de prix ?',
    'assistant.updateSettings': 'Modifier les paramètres ?',

    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Enregistrer',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.refresh': 'Actualiser',
    'common.perNight': '/ nuit',
    'common.reviews': 'avis',
  },
} as const

// Helper function to get translation
export const getTranslation = (key: TranslationKey, language: Language): string => {
  return translations[language][key] || translations.en[key] || key
}

// Hook helper - use with useLanguageStore
export const t = (key: TranslationKey, language: Language): string => {
  return getTranslation(key, language)
}

export type { TranslationKey }
