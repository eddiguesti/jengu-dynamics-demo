import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { useDataStore } from '../stores'
import { pageVariants, spring } from '@/lib/motion'
import { getAdvancedPricingRecommendations } from '../lib/api/services/advancedPricing'
import { showPremiumModal } from '../components/ui/PremiumModal'
import {
  Sparkles,
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  RotateCcw,
  Database,
} from 'lucide-react'

// Import extracted components
import {
  PricingData,
  BusinessMetrics,
  PriceRecommendation,
  Strategy,
  STRATEGIES,
  DEFAULT_METRICS,
  StrategySelector,
  MetricsCards,
  BusinessImpactCard,
  OptimizationControls,
  PriceTimelineChart,
  RevenueForecastChart,
  OccupancyForecastChart,
  RecommendationsTable,
} from '../components/pricing-engine'

export const PricingEngine: React.FC = () => {
  const navigate = useNavigate()
  const { uploadedFiles } = useDataStore()
  const hasData = uploadedFiles.length > 0

  // Property selection
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('')

  // Strategy and parameters
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy>('balanced')
  const [demandSensitivity, setDemandSensitivity] = useState(0.6)
  const [priceAggression, setPriceAggression] = useState(0.7)
  const [occupancyTarget, setOccupancyTarget] = useState(75)
  const [forecastHorizon, setForecastHorizon] = useState(14)

  // UI state
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showImpact, setShowImpact] = useState(false)
  const [appliedSuccess, setAppliedSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Data state
  const [pricingData, setPricingData] = useState<PricingData[]>([])

  // Fetch ML pricing recommendations from advanced pricing engine
  const fetchPricingData = async (): Promise<PricingData[]> => {
    if (!selectedPropertyId) {
      return []
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log('🚀 Fetching ML pricing recommendations...')

      const response = await getAdvancedPricingRecommendations({
        propertyId: selectedPropertyId,
        days: forecastHorizon,
        strategy: selectedStrategy,
        targetOccupancy: occupancyTarget,
      })

      console.log('✅ Received ML recommendations:', response.recommendations.length, 'days')

      // Transform ML recommendations to PricingData format
      const data: PricingData[] = response.recommendations.map(rec => {
        const date = new Date(rec.date)
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })

        const currentPrice = rec.currentPrice
        const optimizedPrice = rec.recommendedPrice
        const occupancyOptimized = Math.round(rec.predictedOccupancy)
        const occupancyCurrent = Math.round((rec.currentPrice / optimizedPrice) * occupancyOptimized)

        const demandForecast = Math.min(100, Math.round(occupancyOptimized * 1.1))

        const capacity = 100
        const revenueCurrent = Math.round((currentPrice * occupancyCurrent * capacity) / 100)
        const revenueOptimized = Math.round((optimizedPrice * occupancyOptimized * capacity) / 100)

        return {
          date: rec.date,
          day: dayName,
          current_price: Math.round(currentPrice),
          optimized_price: Math.round(optimizedPrice),
          demand_forecast: demandForecast,
          occupancy_current: occupancyCurrent,
          occupancy_optimized: occupancyOptimized,
          revenue_current: revenueCurrent,
          revenue_optimized: revenueOptimized,
        }
      })

      return data
    } catch (err: any) {
      console.error('❌ ML Pricing API error:', err)
      setError(err.message || 'Failed to fetch ML pricing recommendations')
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Generate detailed recommendations for table
  const generateRecommendations = (): PriceRecommendation[] => {
    return pricingData.map(data => {
      const priceDiff = data.optimized_price - data.current_price
      const revenueImpact = (priceDiff / data.current_price) * 100

      let confidence: 'high' | 'medium' | 'low' = 'medium'
      if (data.demand_forecast > 80 && data.occupancy_optimized > 75) {
        confidence = 'high'
      } else if (data.demand_forecast < 50 || data.occupancy_optimized < 50) {
        confidence = 'low'
      }

      return {
        date: data.date,
        day: data.day,
        current_price: data.current_price,
        recommended_price: data.optimized_price,
        expected_occupancy: data.occupancy_optimized,
        revenue_impact: Math.round(revenueImpact * 10) / 10,
        confidence,
      }
    })
  }

  const recommendations = generateRecommendations()

  // Export recommendations
  const handleExportCSV = () => {
    const csvContent =
      'Date,Day,Current Price,Recommended Price,Expected Occupancy,Revenue Impact,Confidence\n' +
      recommendations
        .map(
          r =>
            `${r.date},${r.day},${r.current_price},${r.recommended_price},${r.expected_occupancy}%,${r.revenue_impact}%,${r.confidence}`
        )
        .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pricing_recommendations_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Auto-fetch pricing when parameters change
  useEffect(() => {
    if (!selectedPropertyId) return

    const timer = setTimeout(() => {
      fetchPricingData().then(data => setPricingData(data))
    }, 500)

    return () => clearTimeout(timer)
  }, [
    selectedPropertyId,
    selectedStrategy,
    demandSensitivity,
    priceAggression,
    occupancyTarget,
    forecastHorizon,
  ])

  // Select first property by default
  useEffect(() => {
    if (uploadedFiles.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(uploadedFiles[0].id)
    }
  }, [uploadedFiles, selectedPropertyId])

  // Calculate business metrics
  const calculateMetrics = (): BusinessMetrics => {
    if (pricingData.length === 0) {
      return DEFAULT_METRICS
    }

    const currentRevenue = pricingData.reduce((sum, d) => sum + d.revenue_current, 0)
    const optimizedRevenue = pricingData.reduce((sum, d) => sum + d.revenue_optimized, 0)
    const revenueUplift = optimizedRevenue - currentRevenue
    const upliftPercentage = (revenueUplift / currentRevenue) * 100

    const avgPriceCurrent =
      pricingData.reduce((sum, d) => sum + d.current_price, 0) / pricingData.length
    const avgPriceOptimized =
      pricingData.reduce((sum, d) => sum + d.optimized_price, 0) / pricingData.length

    const avgOccupancyCurrent =
      pricingData.reduce((sum, d) => sum + d.occupancy_current, 0) / pricingData.length
    const avgOccupancyOptimized =
      pricingData.reduce((sum, d) => sum + d.occupancy_optimized, 0) / pricingData.length

    const totalBookings = pricingData.length * 100

    return {
      current_revenue: Math.round(currentRevenue),
      optimized_revenue: Math.round(optimizedRevenue),
      revenue_uplift: Math.round(revenueUplift),
      uplift_percentage: Math.round(upliftPercentage * 10) / 10,
      avg_price_current: Math.round(avgPriceCurrent),
      avg_price_optimized: Math.round(avgPriceOptimized),
      avg_occupancy_current: Math.round(avgOccupancyCurrent),
      avg_occupancy_optimized: Math.round(avgOccupancyOptimized),
      total_bookings: totalBookings,
    }
  }

  const metrics = calculateMetrics()

  // Apply strategy preset
  const applyStrategy = (strategy: Strategy) => {
    setSelectedStrategy(strategy)
    const config = STRATEGIES[strategy]
    setDemandSensitivity(config.demandSensitivity)
    setPriceAggression(config.priceAggression)
    setOccupancyTarget(config.occupancyTarget)
  }

  // Optimize - fetch real pricing from API
  const handleOptimize = async () => {
    if (!selectedPropertyId) {
      setError('Please select a property first')
      return
    }

    setIsOptimizing(true)
    const data = await fetchPricingData()
    setPricingData(data)
    setIsOptimizing(false)

    if (data.length > 0) {
      setShowImpact(true)
    }
  }

  // Apply pricing
  const handleApply = () => {
    // In demo mode, show premium modal instead of applying
    showPremiumModal('Applying optimized prices to your property')
  }

  // Reset to defaults
  const handleReset = () => {
    applyStrategy('balanced')
    setForecastHorizon(14)
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-text">
            <Sparkles className="h-8 w-8 text-primary" />
            Smart Pricing Engine
          </h1>
          <p className="text-muted">AI-powered demand forecasting and dynamic price optimization</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleOptimize}
            disabled={isOptimizing || !selectedPropertyId || isLoading}
            className="flex items-center gap-2"
          >
            {isOptimizing || isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                {isLoading ? 'Loading...' : 'Optimizing...'}
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4" />
                Run Optimization
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Property Selector */}
      {hasData && (
        <Card variant="default">
          <Card.Body className="flex items-center gap-4">
            <Database className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-text">Select Property</label>
              <select
                value={selectedPropertyId}
                onChange={e => setSelectedPropertyId(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-text focus:border-primary focus:outline-none"
              >
                <option value="">-- Select a property --</option>
                {uploadedFiles.map(file => (
                  <option key={file.id} value={file.id}>
                    {file.name} ({file.rows} records)
                  </option>
                ))}
              </select>
            </div>
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-muted">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Loading pricing data...
              </div>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={spring.snappy}
            className="flex items-center gap-3 rounded-lg border border-error/30 bg-error/10 p-4"
          >
            <AlertTriangle className="h-5 w-5 text-error" />
            <div className="flex-1">
              <p className="font-semibold text-error">Pricing Error</p>
              <p className="mt-1 text-sm text-muted">{error}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setError(null)}>
              Dismiss
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {appliedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={spring.snappy}
            className="flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 p-4"
          >
            <CheckCircle className="h-5 w-5 text-success" />
            <div>
              <p className="font-semibold text-success">Pricing strategy applied successfully!</p>
              <p className="mt-1 text-sm text-muted">
                Your optimized prices are now active for the next {forecastHorizon} days.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Business Impact Visualization */}
      <BusinessImpactCard
        show={showImpact}
        metrics={metrics}
        forecastHorizon={forecastHorizon}
        selectedStrategy={selectedStrategy}
        onApply={handleApply}
      />

      {/* Strategy Selection */}
      <StrategySelector selectedStrategy={selectedStrategy} onSelectStrategy={applyStrategy} />

      {/* Key Metrics */}
      <MetricsCards metrics={metrics} forecastHorizon={forecastHorizon} />

      {/* Fine-tune Parameters */}
      <OptimizationControls
        demandSensitivity={demandSensitivity}
        priceAggression={priceAggression}
        occupancyTarget={occupancyTarget}
        forecastHorizon={forecastHorizon}
        onDemandSensitivityChange={setDemandSensitivity}
        onPriceAggressionChange={setPriceAggression}
        onOccupancyTargetChange={setOccupancyTarget}
        onForecastHorizonChange={setForecastHorizon}
      />

      {/* Pricing Comparison Chart */}
      <PriceTimelineChart data={pricingData} />

      {/* Revenue and Occupancy Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueForecastChart data={pricingData} />
        <OccupancyForecastChart data={pricingData} />
      </div>

      {/* Detailed Pricing Recommendations Table */}
      <RecommendationsTable recommendations={recommendations} onExportCSV={handleExportCSV} />

      {/* Data Status Warning */}
      {!hasData && (
        <Card variant="default" className="border-blue-500/30 bg-blue-500/5">
          <Card.Body className="flex items-start gap-4">
            <Database className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
            <div>
              <h3 className="mb-2 text-lg font-semibold text-text">No Historical Data Available</h3>
              <p className="mb-3 text-muted">
                Upload your historical booking data (CSV) to get AI-powered pricing recommendations
                based on your actual property performance, seasonality, and market conditions.
              </p>
              <Button variant="primary" size="sm" onClick={() => navigate('/data')}>
                <Database className="mr-2 h-4 w-4" />
                Upload Historical Data
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Warning/Info */}
      {metrics.uplift_percentage < 0 && (
        <Card variant="default" className="border-orange-500/30 bg-orange-500/5">
          <Card.Body className="flex items-start gap-4">
            <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-orange-500" />
            <div>
              <h3 className="mb-2 text-lg font-semibold text-text">Optimization Alert</h3>
              <p className="text-muted">
                The current parameters result in lower revenue. Consider adjusting your strategy to
                be more aggressive or review your occupancy targets. The{' '}
                {STRATEGIES.balanced.name.toLowerCase()} strategy typically provides the best
                balance.
              </p>
            </div>
          </Card.Body>
        </Card>
      )}
    </motion.div>
  )
}
