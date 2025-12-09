import React from 'react'
import { Database, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import clsx from 'clsx'
import { Step } from './types'

interface StepIndicatorProps {
  currentStep: Step
  onStepChange: (step: Step) => void
  hasSuccessfulUpload: boolean
  allEnrichmentComplete: boolean
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onStepChange,
  hasSuccessfulUpload,
  allEnrichmentComplete,
}) => {
  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        onClick={() => onStepChange('upload')}
        className={clsx(
          'flex items-center gap-2 rounded-lg px-4 py-2 transition-all',
          currentStep === 'upload'
            ? 'border-2 border-primary bg-primary/10 text-primary'
            : 'bg-elevated text-muted hover:bg-card'
        )}
      >
        <Database className="h-4 w-4" />
        <span className="font-medium">1. Upload</span>
        {hasSuccessfulUpload && <CheckCircle2 className="h-4 w-4 text-success" />}
      </button>

      <ArrowRight className="h-5 w-5 text-muted" />

      <button
        onClick={() => hasSuccessfulUpload && onStepChange('enrichment')}
        disabled={!hasSuccessfulUpload}
        className={clsx(
          'flex items-center gap-2 rounded-lg px-4 py-2 transition-all',
          currentStep === 'enrichment'
            ? 'border-2 border-primary bg-primary/10 text-primary'
            : hasSuccessfulUpload
              ? 'bg-elevated text-muted hover:bg-card'
              : 'cursor-not-allowed bg-elevated text-muted/50'
        )}
      >
        <Sparkles className="h-4 w-4" />
        <span className="font-medium">2. Enrich</span>
        {allEnrichmentComplete && <CheckCircle2 className="h-4 w-4 text-success" />}
      </button>
    </div>
  )
}
