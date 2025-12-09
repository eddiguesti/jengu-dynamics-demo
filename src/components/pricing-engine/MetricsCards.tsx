import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { DollarSign, TrendingUp, Users, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { BusinessMetrics } from './types'

interface MetricsCardsProps {
  metrics: BusinessMetrics
  forecastHorizon: number
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, forecastHorizon }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="elevated" className="relative overflow-hidden">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-primary/5" />
          <div className="relative p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              {metrics.uplift_percentage > 0 ? (
                <Badge variant="success" size="sm">
                  +{metrics.uplift_percentage}%
                </Badge>
              ) : (
                <Badge variant="error" size="sm">
                  {metrics.uplift_percentage}%
                </Badge>
              )}
            </div>
            <p className="mb-1 text-sm text-muted">Revenue Uplift</p>
            <h3 className="text-3xl font-bold text-text">
              €{(metrics.revenue_uplift / 1000).toFixed(1)}K
            </h3>
            <div className="mt-3 flex items-center gap-1 text-xs">
              {metrics.revenue_uplift >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-success" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-error" />
              )}
              <span className={metrics.revenue_uplift >= 0 ? 'text-success' : 'text-error'}>
                vs current strategy
              </span>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="elevated" className="relative overflow-hidden">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-blue-500/5" />
          <div className="relative p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-blue-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <p className="mb-1 text-sm text-muted">Avg Price (Optimized)</p>
            <h3 className="text-3xl font-bold text-text">€{metrics.avg_price_optimized}</h3>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted">
              <span>Current: €{metrics.avg_price_current}</span>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card variant="elevated" className="relative overflow-hidden">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-purple-500/5" />
          <div className="relative p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-purple-500/10 p-3">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <p className="mb-1 text-sm text-muted">Avg Occupancy</p>
            <h3 className="text-3xl font-bold text-text">{metrics.avg_occupancy_optimized}%</h3>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted">
              <span>Current: {metrics.avg_occupancy_current}%</span>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card variant="elevated" className="relative overflow-hidden">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-orange-500/5" />
          <div className="relative p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-orange-500/10 p-3">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <p className="mb-1 text-sm text-muted">Forecast Period</p>
            <h3 className="text-3xl font-bold text-text">{forecastHorizon}</h3>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted">
              <span>days ahead</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
