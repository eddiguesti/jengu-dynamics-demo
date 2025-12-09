import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Play,
  MapPin,
  AlertCircle,
  Settings as SettingsIcon,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Card, Button, Badge, Progress } from '../ui'
import { EnrichmentProgress } from '../features/EnrichmentProgress'
import { EnrichmentFeature } from './types'
import clsx from 'clsx'
import { useLanguageStore } from '@/stores/useLanguageStore'

const translations = {
  en: {
    locationRequired: 'Business Location Required',
    locationDesc: 'Weather and Holiday enrichment require your business location to be configured. Please set your city, country, latitude, and longitude in Settings to enable these features.',
    locationWarning: 'Without location data, Weather Data and Holidays & Events enrichment will fail',
    goToSettings: 'Go to Settings',
    enrichmentProgress: 'Enrichment Progress',
    featuresCompleted: '{completed} of {total} features completed',
    allComplete: 'All Complete',
    enrichAll: 'Enrich All',
    complete: 'Complete',
    running: 'Running',
    error: 'Error',
    ready: 'Ready',
    run: 'Run',
    enrichmentComplete: 'Enrichment Complete!',
    dataReady: 'Your data is ready for pricing optimization and insights analysis',
    startOptimizing: 'Start Optimizing Prices',
  },
  fr: {
    locationRequired: 'Localisation Requise',
    locationDesc: 'L\'enrichissement météo et jours fériés nécessite la configuration de votre localisation. Veuillez définir votre ville, pays, latitude et longitude dans les Paramètres.',
    locationWarning: 'Sans données de localisation, l\'enrichissement Météo et Jours Fériés échouera',
    goToSettings: 'Aller aux Paramètres',
    enrichmentProgress: 'Progression de l\'Enrichissement',
    featuresCompleted: '{completed} sur {total} fonctionnalités terminées',
    allComplete: 'Tout Terminé',
    enrichAll: 'Tout Enrichir',
    complete: 'Terminé',
    running: 'En cours',
    error: 'Erreur',
    ready: 'Prêt',
    run: 'Lancer',
    enrichmentComplete: 'Enrichissement Terminé !',
    dataReady: 'Vos données sont prêtes pour l\'optimisation tarifaire et l\'analyse',
    startOptimizing: 'Commencer l\'Optimisation',
  },
}

interface EnrichmentStepProps {
  features: EnrichmentFeature[]
  isEnriching: boolean
  hasLocation: boolean
  uploadedFileId?: string
  onStartEnrichment: (featureId?: string) => void
  onEnrichmentComplete: () => void
  onEnrichmentError: (error: string) => void
}

export const EnrichmentStep: React.FC<EnrichmentStepProps> = ({
  features,
  isEnriching,
  hasLocation,
  uploadedFileId,
  onStartEnrichment,
  onEnrichmentComplete,
  onEnrichmentError,
}) => {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]

  const completedCount = features.filter(f => f.status === 'complete').length
  const allComplete = features.every(f => f.status === 'complete')
  const anyRunning = features.some(f => f.status === 'running')

  const getStatusBadge = (status: EnrichmentFeature['status']) => {
    switch (status) {
      case 'complete':
        return <Badge variant="success">{t.complete}</Badge>
      case 'running':
        return <Badge variant="primary">{t.running}</Badge>
      case 'error':
        return <Badge variant="error">{t.error}</Badge>
      default:
        return <Badge variant="default">{t.ready}</Badge>
    }
  }

  return (
    <motion.div
      key="enrichment"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Location Warning */}
      {!hasLocation && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card variant="elevated" className="border-warning/20 bg-warning/5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-lg bg-warning/10 p-3">
                <MapPin className="h-6 w-6 text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-semibold text-text">{t.locationRequired}</h3>
                <p className="mb-3 text-sm text-muted">
                  {t.locationDesc}
                </p>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <span className="text-xs text-muted">
                    {t.locationWarning}
                  </span>
                </div>
              </div>
              <Button
                variant="warning"
                size="sm"
                onClick={() => navigate('/settings')}
                className="flex-shrink-0"
              >
                <SettingsIcon className="mr-2 h-4 w-4" />
                {t.goToSettings}
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Progress Summary */}
      <Card variant="elevated">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">{t.enrichmentProgress}</h2>
            <p className="mt-1 text-sm text-muted">
              {t.featuresCompleted.replace('{completed}', String(completedCount)).replace('{total}', String(features.length))}
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onStartEnrichment()}
            disabled={isEnriching || allComplete}
            loading={isEnriching}
          >
            {allComplete ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                {t.allComplete}
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                {t.enrichAll}
              </>
            )}
          </Button>
        </div>
        <Progress
          value={(completedCount / features.length) * 100}
          size="lg"
          variant={allComplete ? 'success' : 'primary'}
        />
      </Card>

      {/* Real-time Enrichment Progress Tracking */}
      {uploadedFileId && (
        <EnrichmentProgress
          propertyId={uploadedFileId}
          onComplete={onEnrichmentComplete}
          onError={onEnrichmentError}
        />
      )}

      {/* Feature Cards */}
      <div className="grid grid-cols-1 gap-4">
        {features.map(feature => {
          const Icon = feature.icon
          return (
            <Card
              key={feature.id}
              variant="default"
              className={clsx(
                'transition-all duration-300',
                feature.status === 'running' && 'ring-2 ring-primary/50',
                feature.status === 'complete' && 'ring-2 ring-success/30'
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={clsx(
                    'rounded-lg p-3',
                    feature.status === 'complete'
                      ? 'bg-success/10'
                      : feature.status === 'running'
                        ? 'bg-primary/10'
                        : 'bg-elevated'
                  )}
                >
                  <Icon
                    className={clsx(
                      'h-6 w-6',
                      feature.status === 'complete'
                        ? 'text-success'
                        : feature.status === 'running'
                          ? 'text-primary'
                          : 'text-muted'
                    )}
                  />
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text">{feature.name}</h3>
                    {getStatusBadge(feature.status)}
                  </div>
                  <p className="mb-3 text-sm text-muted">{feature.description}</p>

                  {/* Fields */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {feature.fields.map(field => (
                        <span
                          key={field}
                          className="rounded border border-border bg-elevated px-2 py-1 font-mono text-xs text-text"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Progress */}
                  {(feature.status === 'running' || feature.status === 'complete') && (
                    <Progress
                      value={feature.progress}
                      showLabel
                      variant={feature.status === 'complete' ? 'success' : 'primary'}
                    />
                  )}
                </div>

                {/* Action Button */}
                <div>
                  {feature.status === 'complete' ? (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onStartEnrichment(feature.id)}
                      disabled={anyRunning}
                    >
                      {t.run}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Success State */}
      {allComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card variant="elevated" className="border-success/20 bg-success/5">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-success/10 p-3">
                <Sparkles className="h-8 w-8 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-semibold text-text">{t.enrichmentComplete}</h3>
                <p className="text-sm text-muted">
                  {t.dataReady}
                </p>
              </div>
              <Button variant="primary" size="lg" onClick={() => navigate('/pricing-engine')}>
                {t.startOptimizing}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
