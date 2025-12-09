import React from 'react'
import { Card } from '../ui/Card'
import { Target, CheckCircle } from 'lucide-react'
import { Strategy, STRATEGIES } from './types'

interface StrategySelectorProps {
  selectedStrategy: Strategy
  onSelectStrategy: (strategy: Strategy) => void
}

export const StrategySelector: React.FC<StrategySelectorProps> = ({
  selectedStrategy,
  onSelectStrategy,
}) => {
  return (
    <Card data-tour="pricing-strategy" variant="elevated">
      <Card.Header>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-text">Pricing Strategy</h2>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {(Object.keys(STRATEGIES) as Strategy[]).map(strategy => {
            const config = STRATEGIES[strategy]
            const isSelected = selectedStrategy === strategy

            return (
              <button
                key={strategy}
                onClick={() => onSelectStrategy(strategy)}
                className={`rounded-xl border-2 p-6 text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background hover:border-primary/50'
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text">{config.name}</h3>
                  {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
                </div>
                <p className="mb-4 text-sm text-muted">{config.description}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted">Demand Sensitivity</span>
                    <span className="font-medium text-text">
                      {(config.demandSensitivity * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Price Aggression</span>
                    <span className="font-medium text-text">
                      {(config.priceAggression * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Occupancy Target</span>
                    <span className="font-medium text-text">{config.occupancyTarget}%</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </Card.Body>
    </Card>
  )
}
