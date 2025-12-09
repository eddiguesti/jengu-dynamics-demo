import React from 'react'
import { Card } from '../ui/Card'
import { Zap } from 'lucide-react'

interface OptimizationControlsProps {
  demandSensitivity: number
  priceAggression: number
  occupancyTarget: number
  forecastHorizon: number
  onDemandSensitivityChange: (value: number) => void
  onPriceAggressionChange: (value: number) => void
  onOccupancyTargetChange: (value: number) => void
  onForecastHorizonChange: (value: number) => void
}

export const OptimizationControls: React.FC<OptimizationControlsProps> = ({
  demandSensitivity,
  priceAggression,
  occupancyTarget,
  forecastHorizon,
  onDemandSensitivityChange,
  onPriceAggressionChange,
  onOccupancyTargetChange,
  onForecastHorizonChange,
}) => {
  return (
    <Card variant="elevated">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-text">Fine-tune Optimization</h2>
          </div>
          <p className="text-xs text-muted">Adjust parameters for custom strategy</p>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Demand Sensitivity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text">Demand Sensitivity</label>
              <span className="text-sm font-bold text-primary">
                {(demandSensitivity * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={demandSensitivity}
              onChange={e => onDemandSensitivityChange(parseFloat(e.target.value))}
              className="slider-thumb h-2 w-full cursor-pointer appearance-none rounded-lg bg-border"
            />
            <p className="text-xs text-muted">
              How much demand forecast influences pricing decisions
            </p>
          </div>

          {/* Price Aggression */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text">Price Aggression</label>
              <span className="text-sm font-bold text-primary">
                {(priceAggression * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={priceAggression}
              onChange={e => onPriceAggressionChange(parseFloat(e.target.value))}
              className="slider-thumb h-2 w-full cursor-pointer appearance-none rounded-lg bg-border"
            />
            <p className="text-xs text-muted">How aggressively to adjust prices based on demand</p>
          </div>

          {/* Occupancy Target */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text">Occupancy Target</label>
              <span className="text-sm font-bold text-primary">{occupancyTarget}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={occupancyTarget}
              onChange={e => onOccupancyTargetChange(parseInt(e.target.value))}
              className="slider-thumb h-2 w-full cursor-pointer appearance-none rounded-lg bg-border"
            />
            <p className="text-xs text-muted">Target occupancy rate for optimization</p>
          </div>

          {/* Forecast Horizon */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text">Forecast Horizon</label>
            <div className="flex gap-2">
              {[7, 14, 30, 60].map(days => (
                <button
                  key={days}
                  onClick={() => onForecastHorizonChange(days)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    forecastHorizon === days
                      ? 'bg-primary text-background'
                      : 'border border-border bg-background text-text hover:border-primary'
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
            <p className="text-xs text-muted">Number of days to optimize</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
