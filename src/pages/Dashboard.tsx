import { useMemo, useState, useEffect } from 'react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUploadedFiles, useFileData } from '../hooks/queries/useFileData'
import { useQueryClient } from '@tanstack/react-query'
import type { DayData } from '../components/pricing/PriceDemandCalendar'
import { getAdvancedPricingRecommendations } from '../lib/api/services/advancedPricing'
import type { PricingRecommendation } from '../lib/api/services/advancedPricing'
import apiClient from '../lib/api/client'
import { useLanguageStore } from '../stores/useLanguageStore'
import { t } from '../lib/translations'

// Import extracted components
import {
  EMPTY_PROCESSED_DATA,
  MetricsBar,
  calculateMetrics,
  QuickActionCards,
  KPICards,
  RevenueChart,
  OccupancyChart,
  PriceTrendChart,
  EmptyState,
  WelcomeBanner,
  QuickActionsFooter,
  CalendarSection,
  RevenueComparisonHero,
  RevenueComparisonChart,
} from '../components/dashboard'

export const Dashboard = () => {
  const queryClient = useQueryClient()
  const { language } = useLanguageStore()

  // Fetch files list and data using React Query
  const { data: uploadedFiles = [] } = useUploadedFiles()

  // Filter out deleted/empty files and find first valid file with data
  const validFiles = uploadedFiles.filter(
    f => f.status !== 'deleted' && (f.actualRows || f.rows || 0) > 0
  )

  const firstFileId = validFiles[0]?.id || ''
  const { data: fileData = [], isLoading, error } = useFileData(firstFileId, 10000)

  // ML Pricing Recommendations state
  const [mlRecommendations, setMlRecommendations] = useState<Record<string, PricingRecommendation>>(
    {}
  )
  const [, setMlLoading] = useState(false)

  // Competitor pricing state (median prices by date)
  const [competitorData, setCompetitorData] = useState<Record<string, number>>({})

  // Fetch ML recommendations when we have a valid file
  useEffect(() => {
    if (!firstFileId || fileData.length === 0) return

    setMlLoading(true)
    getAdvancedPricingRecommendations({
      propertyId: firstFileId,
      days: 30,
      strategy: 'balanced',
    })
      .then(response => {
        const lookup = response.recommendations.reduce(
          (acc, rec) => {
            acc[rec.date] = rec
            return acc
          },
          {} as Record<string, PricingRecommendation>
        )
        setMlRecommendations(lookup)
      })
      .catch(error => {
        console.error('Failed to load ML recommendations:', error)
      })
      .finally(() => {
        setMlLoading(false)
      })
  }, [firstFileId, fileData.length])

  // Fetch competitor median prices
  useEffect(() => {
    if (!firstFileId || fileData.length === 0) return

    const dates = fileData.map((row: any) => row.date).filter(Boolean)
    if (dates.length === 0) return

    const startDate = new Date(Math.min(...dates.map((d: string) => new Date(d).getTime())))
    const endDate = new Date(Math.max(...dates.map((d: string) => new Date(d).getTime())))

    apiClient
      .get(`/competitor-data/${firstFileId}/range`, {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      })
      .then(response => {
        if (response.data.success && response.data.data) {
          const lookup: Record<string, number> = {}
          response.data.data.forEach((item: any) => {
            lookup[item.date] = item.priceP50
          })
          setCompetitorData(lookup)
        }
      })
      .catch(() => {
        // No competitor data available - silently ignore
      })
  }, [firstFileId, fileData.length])

  if (error) {
    console.warn('Failed to load file data:', error)
  }

  const hasData = fileData.length > 0

  // Process real data from Supabase for charts and statistics
  const processedData = useMemo(() => {
    if (!fileData || fileData.length === 0) {
      return EMPTY_PROCESSED_DATA
    }

    const totalRecords = fileData.length

    // Calculate average price
    const prices = fileData
      .map((row: any) => parseFloat(row.price || row.rate || 0))
      .filter(p => p > 0)
    const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0

    // Calculate average occupancy
    const occupancies = fileData
      .map((row: any) => {
        const occ = parseFloat(row.occupancy || row.occupancy_rate || 0)
        if (occ > 1 && occ <= 100) return occ
        if (occ > 0 && occ <= 1) return occ * 100
        return 0
      })
      .filter(o => o > 0)
    const avgOccupancy =
      occupancies.length > 0 ? occupancies.reduce((a, b) => a + b, 0) / occupancies.length : 0

    // Revenue by month (last 6 months)
    const revenueByMonth: Record<string, { revenue: number; count: number }> = {}
    fileData.forEach((row: any) => {
      const date = new Date(row.date || row.check_in || row.booking_date)
      if (isNaN(date.getTime())) return

      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      const price = parseFloat(row.price || row.rate || 0)

      if (!revenueByMonth[monthKey]) {
        revenueByMonth[monthKey] = { revenue: 0, count: 0 }
      }

      revenueByMonth[monthKey].revenue += price
      revenueByMonth[monthKey].count++
    })

    const revenueData = Object.entries(revenueByMonth)
      .map(([month, data]) => ({
        month,
        revenue: Math.round(data.revenue),
        avgRevenue: Math.round(data.revenue / data.count),
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6)

    // Occupancy by day of week
    const dayGroups: Record<string, number[]> = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    }

    fileData.forEach((row: any) => {
      const date = new Date(row.date || row.check_in || row.booking_date)
      if (isNaN(date.getTime())) return

      const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
      let occupancy = parseFloat(row.occupancy || row.occupancy_rate || 0)

      if (occupancy > 0 && occupancy <= 1) {
        occupancy = occupancy * 100
      }

      if (occupancy > 0 && dayOfWeek in dayGroups) {
        dayGroups[dayOfWeek].push(occupancy)
      }
    })

    const occupancyByDay = Object.entries(dayGroups).map(([day, occs]) => ({
      day,
      occupancy: occs.length > 0 ? Math.round(occs.reduce((a, b) => a + b, 0) / occs.length) : 0,
    }))

    // Price time series (last 30 days)
    const last30Days = fileData
      .map((row: any) => ({
        date: new Date(row.date || row.check_in || row.booking_date),
        price: parseFloat(row.price || row.rate || 0),
      }))
      .filter(d => !isNaN(d.date.getTime()) && d.price > 0)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(-30)

    const priceTimeSeries = last30Days.map(d => ({
      date: d.date.getDate().toString(),
      price: Math.round(d.price),
    }))

    // Calendar data - transform fileData to calendar format
    const calendarData: DayData[] = []
    const dataByDate: Record<string, any[]> = {}

    fileData.forEach((row: any) => {
      const date = new Date(row.date || row.check_in || row.booking_date)
      if (isNaN(date.getTime())) return

      const dateStr = date.toISOString().split('T')[0]
      if (!dataByDate[dateStr]) {
        dataByDate[dateStr] = []
      }
      dataByDate[dateStr].push(row)
    })

    Object.entries(dataByDate).forEach(([dateStr, rows]) => {
      const avgPriceForDate =
        rows.reduce((sum, r) => sum + parseFloat(r.price || r.rate || 0), 0) / rows.length

      const avgOccupancyForDate =
        rows.reduce((sum, r) => {
          let occ = parseFloat(r.occupancy || r.occupancy_rate || 0)
          if (occ > 1 && occ <= 100) occ = occ / 100
          return sum + occ
        }, 0) / rows.length

      const date = new Date(dateStr)
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const isPast = date < new Date()
      const demand = Math.min(1, avgOccupancyForDate * 1.2)

      const firstRow = rows[0]
      const temperature = firstRow.temperature ? parseFloat(firstRow.temperature) : undefined
      const precipitation = firstRow.precipitation ? parseFloat(firstRow.precipitation) : undefined
      const weatherCondition = firstRow.weather_condition || firstRow.weatherCondition

      const mlRec = mlRecommendations[dateStr]

      calendarData.push({
        date: dateStr,
        price: Math.round(avgPriceForDate),
        demand,
        occupancy: avgOccupancyForDate,
        isWeekend,
        isPast,
        isHoliday: false,
        temperature,
        precipitation,
        weatherCondition,
        competitorPrice: competitorData[dateStr],
        recommendedPrice: mlRec?.recommendedPrice,
        predictedOccupancy: mlRec?.predictedOccupancy,
        revenueImpact: mlRec?.revenueImpact,
        confidence: mlRec?.confidence,
        explanation: mlRec?.explanation,
      })
    })

    // Generate future date entries for ML predictions (next 30 days)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 1; i <= 30; i++) {
      const futureDate = new Date(today)
      futureDate.setDate(today.getDate() + i)
      const dateStr = futureDate.toISOString().split('T')[0]

      if (calendarData.some(d => d.date === dateStr)) continue

      const mlRec = mlRecommendations[dateStr]

      if (mlRec) {
        const dayOfWeek = futureDate.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        calendarData.push({
          date: dateStr,
          price: mlRec.recommendedPrice,
          demand: mlRec.predictedOccupancy / 100,
          occupancy: mlRec.predictedOccupancy / 100,
          isWeekend,
          isPast: false,
          isHoliday: false,
          recommendedPrice: mlRec.recommendedPrice,
          predictedOccupancy: mlRec.predictedOccupancy,
          revenueImpact: mlRec.revenueImpact,
          confidence: mlRec.confidence,
          explanation: mlRec.explanation,
        })
      }
    }

    const metrics = calculateMetrics(fileData)

    return {
      totalRecords,
      avgPrice: Math.round(avgPrice),
      avgOccupancy: Math.round(avgOccupancy),
      revenueData,
      occupancyByDay,
      priceTimeSeries,
      calendarData,
      metrics,
    }
  }, [fileData, mlRecommendations, competitorData])

  const handleRefresh = () => {
    queryClient.invalidateQueries()
    setMlRecommendations({})
    setCompetitorData({})
    window.location.reload()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold text-text">
            {t('dashboard.title', language)}
            {isLoading && (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            )}
          </h1>
          <p className="mt-2 text-muted">
            {hasData
              ? t('dashboard.subtitle', language)
              : language === 'fr' ? 'Commencez par télécharger vos données' : 'Get started by uploading your data'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            {t('common.refresh', language)}
          </Button>
          {hasData && (
            <Badge variant="success" className="px-4 py-2 text-base">
              <Activity className="mr-2 h-4 w-4" />
              {processedData.totalRecords.toLocaleString()} {language === 'fr' ? 'Enregistrements' : 'Records'}
            </Badge>
          )}
        </div>
      </div>

      {/* Revenue Comparison Hero - Showcasing Dynamic Pricing Value (always visible - uses demo data) */}
      <div data-tour="revenue-hero">
        <RevenueComparisonHero />
      </div>

      {/* Revenue Comparison Chart */}
      {hasData && <RevenueComparisonChart />}

      {/* KPI Metrics Bar */}
      {hasData && processedData.metrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <MetricsBar data={processedData.metrics} currency="€" isLoading={isLoading} />
        </motion.div>
      )}

      {/* Price & Demand Calendar */}
      {hasData && <CalendarSection calendarData={processedData.calendarData} />}

      {/* Quick Action Cards */}
      {hasData && <QuickActionCards />}

      {/* Empty State */}
      {!hasData && !isLoading && <EmptyState />}

      {/* KPI Cards */}
      {hasData && (
        <div data-tour="kpi-cards">
          <KPICards
            totalRecords={processedData.totalRecords}
            avgPrice={processedData.avgPrice}
            avgOccupancy={processedData.avgOccupancy}
          />
        </div>
      )}

      {/* Charts Section */}
      {hasData && processedData.revenueData.length > 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RevenueChart data={processedData.revenueData} />
          <OccupancyChart data={processedData.occupancyByDay} />
        </div>
      )}

      {/* Price Trend */}
      {hasData && processedData.priceTimeSeries.length > 0 && (
        <PriceTrendChart data={processedData.priceTimeSeries} avgPrice={processedData.avgPrice} />
      )}

      {/* Quick Actions Footer */}
      <QuickActionsFooter />

      {/* Welcome Banner for new users */}
      {!hasData && <WelcomeBanner />}
    </motion.div>
  )
}
