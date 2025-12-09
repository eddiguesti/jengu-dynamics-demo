import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { spring, staggerDelay } from '@/lib/motion'
import {
  BarChart3,
  DollarSign,
  TrendingUp,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

interface KPICardsProps {
  totalRecords: number
  avgPrice: number
  avgOccupancy: number
}

export const KPICards = ({ totalRecords, avgPrice, avgOccupancy }: KPICardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Records Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.default, delay: staggerDelay(0) }}
        whileHover={{ y: -4 }}
      >
        <Card
          variant="elevated"
          className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-primary/5 transition-colors group-hover:bg-primary/10" />
          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-primary/10 p-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="mb-1 text-sm text-muted">Total Records</p>
            <h3 className="text-3xl font-bold text-text">
              <AnimatedNumber
                value={totalRecords}
                formatOptions={{ useGrouping: true }}
              />
            </h3>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted">
              <span>From uploaded data</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Average Price Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.default, delay: staggerDelay(1) }}
        whileHover={{ y: -4 }}
      >
        <Card
          variant="elevated"
          className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-success/5 transition-colors group-hover:bg-success/10" />
          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-success/10 p-3">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="mb-1 text-sm text-muted">Average Price</p>
            <h3 className="text-3xl font-bold text-text">
              <AnimatedNumber
                value={avgPrice}
                prefix="€"
                formatOptions={{ useGrouping: true }}
              />
            </h3>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted">
              <span>Across all records</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Occupancy Rate Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.default, delay: staggerDelay(2) }}
        whileHover={{ y: -4 }}
      >
        <Card
          variant="elevated"
          className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-warning/5 transition-colors group-hover:bg-warning/10" />
          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-warning/10 p-3">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              {avgOccupancy > 75 ? (
                <Badge variant="success" size="sm">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  High
                </Badge>
              ) : avgOccupancy > 50 ? (
                <Badge variant="default" size="sm">
                  Moderate
                </Badge>
              ) : (
                <Badge variant="default" size="sm">
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                  Low
                </Badge>
              )}
            </div>
            <p className="mb-1 text-sm text-muted">Occupancy Rate</p>
            <h3 className="text-3xl font-bold text-text">
              <AnimatedNumber value={avgOccupancy} suffix="%" />
            </h3>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted">
              <span>Average across dataset</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* ML Predictions Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.default, delay: staggerDelay(3) }}
        whileHover={{ y: -4 }}
      >
        <Card
          variant="elevated"
          className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-primary/5 transition-colors group-hover:bg-primary/10" />
          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="primary" size="sm">
                Ready
              </Badge>
            </div>
            <p className="mb-1 text-sm text-muted">ML Predictions</p>
            <h3 className="text-2xl font-bold text-primary">Available</h3>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted">
              <span>View in Insights</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
