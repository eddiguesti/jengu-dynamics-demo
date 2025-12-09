import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Card } from '../ui'
import { useLanguageStore } from '@/stores/useLanguageStore'

const translations = {
  en: {
    dataRequirements: 'Data Requirements',
    requiredColumns: 'Required Columns',
    dateColumn: 'Date column (booking_date, check_in, etc.)',
    priceColumn: 'Price column (price, rate, amount, etc.)',
    demandIndicator: 'Demand indicator (bookings, occupancy, etc.)',
    bestPractices: 'Best Practices',
    monthsData: 'Include at least 6-12 months of data',
    dateFormats: 'Use consistent date formats',
    removeSensitive: 'Remove sensitive customer information',
  },
  fr: {
    dataRequirements: 'Exigences des Données',
    requiredColumns: 'Colonnes Requises',
    dateColumn: 'Colonne de date (date_reservation, arrivee, etc.)',
    priceColumn: 'Colonne de prix (prix, tarif, montant, etc.)',
    demandIndicator: 'Indicateur de demande (réservations, occupation, etc.)',
    bestPractices: 'Bonnes Pratiques',
    monthsData: 'Incluez au moins 6-12 mois de données',
    dateFormats: 'Utilisez des formats de date cohérents',
    removeSensitive: 'Supprimez les informations clients sensibles',
  },
}

export const DataRequirements: React.FC = () => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <Card variant="default">
      <Card.Header>
        <h3 className="text-lg font-semibold text-text">{t.dataRequirements}</h3>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-text">{t.requiredColumns}</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                <span>{t.dateColumn}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                <span>{t.priceColumn}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                <span>{t.demandIndicator}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-text">{t.bestPractices}</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{t.monthsData}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{t.dateFormats}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{t.removeSensitive}</span>
              </li>
            </ul>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
