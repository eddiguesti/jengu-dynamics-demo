import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Zap, Target, Sparkles, ArrowUpRight, Save } from 'lucide-react'
import { BusinessMetrics, Strategy, STRATEGIES } from './types'

interface BusinessImpactCardProps {
  show: boolean
  metrics: BusinessMetrics
  forecastHorizon: number
  selectedStrategy: Strategy
  onApply: () => void
}

export const BusinessImpactCard: React.FC<BusinessImpactCardProps> = ({
  show,
  metrics,
  forecastHorizon,
  selectedStrategy,
  onApply,
}) => {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            variant="elevated"
            className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background"
          >
            <Card.Body className="p-8">
              <div className="mb-8 text-center">
                <Badge variant="success" size="lg" className="mb-4">
                  <Zap className="mr-2 h-4 w-4" />
                  Optimization Complete
                </Badge>
                <h2 className="mb-2 text-3xl font-bold text-text">Business Impact Analysis</h2>
                <p className="text-muted">Projected results over next {forecastHorizon} days</p>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Current Strategy */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-500/10">
                    <Target className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="mb-2 text-sm text-muted">Current Strategy</p>
                  <p className="mb-1 text-4xl font-bold text-gray-400">
                    €{(metrics.current_revenue / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs text-muted">revenue</p>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <ArrowUpRight className="h-12 w-12 animate-pulse text-primary" />
                    <Badge variant="success" size="lg" className="px-4 py-2 text-lg">
                      +{metrics.uplift_percentage}%
                    </Badge>
                  </div>
                </motion.div>

                {/* Optimized Strategy */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mb-2 text-sm text-muted">Optimized Strategy</p>
                  <p className="mb-1 text-4xl font-bold text-primary">
                    €{(metrics.optimized_revenue / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs text-muted">revenue</p>
                </motion.div>
              </div>

              {/* Revenue Uplift Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
              >
                <p className="mb-2 text-sm text-muted">Additional Revenue</p>
                <p className="mb-2 text-5xl font-bold text-primary">
                  +€{(metrics.revenue_uplift / 1000).toFixed(1)}K
                </p>
                <p className="text-muted">
                  By optimizing {forecastHorizon} days of pricing with the{' '}
                  {STRATEGIES[selectedStrategy].name.toLowerCase()} strategy
                </p>
              </motion.div>

              {/* Apply Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="mt-8 flex justify-center"
              >
                <Button variant="primary" size="lg" onClick={onApply} className="px-8">
                  <Save className="mr-2 h-5 w-5" />
                  Apply Optimized Prices
                </Button>
              </motion.div>
            </Card.Body>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
