import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import {
  TrendingUp,
  Zap,
  Target,
  Calendar,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts'
import { DEMO_ANNUAL_REVENUE } from '../../lib/mockData'
import { useLanguageStore } from '../../stores/useLanguageStore'

const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

// Translations for this component
const translations = {
  en: {
    badgeText: 'Dynamic Pricing Impact',
    title: 'Revenue Performance Overview',
    subtitle: "See how Jengu's AI-powered dynamic pricing transforms your revenue",
    avgGain: 'Average Revenue Gain',
    results2024: '2024 Results',
    completed: 'Completed',
    totalRevenue: 'Total Revenue (Jengu)',
    withoutDynamic: 'Without dynamic pricing',
    additionalGained: 'Additional revenue gained',
    improvement: 'improvement',
    occupancy: 'Occupancy',
    avgPrice: 'Avg Price',
    bookings: 'Bookings',
    forecast2025: '2025 Forecast',
    onTrack: 'On Track',
    projectedRevenue: 'Projected Revenue',
    staticWouldYield: 'Static pricing would yield',
    projectedAdditional: 'Projected additional revenue',
    projected: 'projected',
    targetOcc: 'Target Occ.',
    targetPrice: 'Target Price',
    yoyGrowth: 'YoY Growth',
    peakSeason: 'Peak Season Gain',
    lowSeason: 'Low Season Recovery',
    priceOpt: 'Price Optimization',
    vsCompetitors: 'vs Competitors',
    chartTitle: '2024 Revenue: Jengu vs Static Pricing',
    chartSubtitle: 'Monthly comparison showing dynamic pricing advantage',
    totalGain: 'Total Gain',
    jenguDynamic: 'Jengu Dynamic',
    staticPricing: 'Static Pricing',
    additionalGain: 'Additional Gain',
  },
  fr: {
    badgeText: 'Impact Tarification Dynamique',
    title: 'Aperçu des Performances de Revenus',
    subtitle: "Découvrez comment la tarification dynamique IA de Jengu transforme vos revenus",
    avgGain: 'Gain Moyen de Revenus',
    results2024: 'Résultats 2024',
    completed: 'Terminé',
    totalRevenue: 'Revenu Total (Jengu)',
    withoutDynamic: 'Sans tarification dynamique',
    additionalGained: 'Revenus supplémentaires générés',
    improvement: "d'amélioration",
    occupancy: 'Occupation',
    avgPrice: 'Prix Moyen',
    bookings: 'Réservations',
    forecast2025: 'Prévisions 2025',
    onTrack: 'En Bonne Voie',
    projectedRevenue: 'Revenus Projetés',
    staticWouldYield: 'La tarification fixe donnerait',
    projectedAdditional: 'Revenus supplémentaires projetés',
    projected: 'projeté',
    targetOcc: 'Obj. Occ.',
    targetPrice: 'Obj. Prix',
    yoyGrowth: 'Croissance A/A',
    peakSeason: 'Gain Haute Saison',
    lowSeason: 'Récupération Basse Saison',
    priceOpt: 'Optimisation Prix',
    vsCompetitors: 'vs Concurrents',
    chartTitle: 'Revenus 2024 : Jengu vs Tarification Fixe',
    chartSubtitle: 'Comparaison mensuelle montrant l\'avantage de la tarification dynamique',
    totalGain: 'Gain Total',
    jenguDynamic: 'Jengu Dynamique',
    staticPricing: 'Tarification Fixe',
    additionalGain: 'Gain Supplémentaire',
  },
}

export const RevenueComparisonHero = () => {
  const { year2024, year2025, summary } = DEMO_ANNUAL_REVENUE
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {/* Main Revenue Hero Card */}
      <Card data-tour="revenue-card" className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-card via-card to-primary/5">
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-success/10 blur-3xl" />

        <Card.Body className="relative p-8">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <Badge variant="primary" className="mb-3 px-3 py-1.5">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {t.badgeText}
              </Badge>
              <h2 className="text-3xl font-bold text-text">
                {t.title}
              </h2>
              <p className="mt-2 text-muted">
                {t.subtitle}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted">{t.avgGain}</div>
              <div className="mt-1 text-4xl font-bold text-success">
                +{summary.averageGain}
              </div>
            </div>
          </div>

          {/* Year Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 2024 Actual */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, ...spring }}
            >
              <Card variant="elevated" className="border border-border/50">
                <Card.Body className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-text">{t.results2024}</span>
                    </div>
                    <Badge variant="success" size="sm">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      {t.completed}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted">{t.totalRevenue}</div>
                      <div className="text-3xl font-bold text-success">
                        €<AnimatedNumber value={year2024.totalRevenue} formatOptions={{ useGrouping: true }} />
                      </div>
                    </div>

                    <div className="rounded-lg bg-background/50 p-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted">{t.withoutDynamic}</span>
                        <span className="text-text">€{year2024.staticPricingRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-success">{t.additionalGained}</span>
                        <span className="font-bold text-success">+€{year2024.dynamicPricingGain.toLocaleString()}</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/20">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-success to-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${year2024.dynamicPricingPercent}%` }}
                          transition={{ delay: 0.5, duration: 1 }}
                        />
                      </div>
                      <div className="mt-1 text-right text-xs font-semibold text-success">
                        +{year2024.dynamicPricingPercent}% {t.improvement}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-lg bg-background/30 p-2">
                        <div className="text-lg font-bold text-text">{year2024.avgOccupancy}%</div>
                        <div className="text-xs text-muted">{t.occupancy}</div>
                      </div>
                      <div className="rounded-lg bg-background/30 p-2">
                        <div className="text-lg font-bold text-text">€{year2024.avgPrice}</div>
                        <div className="text-xs text-muted">{t.avgPrice}</div>
                      </div>
                      <div className="rounded-lg bg-background/30 p-2">
                        <div className="text-lg font-bold text-text">{year2024.bookingsCount.toLocaleString()}</div>
                        <div className="text-xs text-muted">{t.bookings}</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            {/* 2025 Projection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, ...spring }}
            >
              <Card variant="elevated" className="border border-primary/30">
                <Card.Body className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-text">{t.forecast2025}</span>
                    </div>
                    <Badge variant="primary" size="sm">
                      <Zap className="mr-1 h-3 w-3" />
                      {t.onTrack}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted">{t.projectedRevenue}</div>
                      <div className="text-3xl font-bold text-primary">
                        €<AnimatedNumber value={year2025.projectedRevenue} formatOptions={{ useGrouping: true }} />
                      </div>
                    </div>

                    <div className="rounded-lg bg-primary/5 p-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted">{t.staticWouldYield}</span>
                        <span className="text-text">€{year2025.staticPricingProjection.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-primary">{t.projectedAdditional}</span>
                        <span className="font-bold text-primary">+€{year2025.dynamicPricingGain.toLocaleString()}</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/20">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-success"
                          initial={{ width: 0 }}
                          animate={{ width: `${year2025.dynamicPricingPercent}%` }}
                          transition={{ delay: 0.6, duration: 1 }}
                        />
                      </div>
                      <div className="mt-1 text-right text-xs font-semibold text-primary">
                        +{year2025.dynamicPricingPercent}% {t.projected}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <div className="flex items-center justify-center gap-1 text-lg font-bold text-text">
                          {year2025.targetOccupancy}%
                          <ArrowUpRight className="h-3 w-3 text-success" />
                        </div>
                        <div className="text-xs text-muted">{t.targetOcc}</div>
                      </div>
                      <div className="rounded-lg bg-primary/10 p-2">
                        <div className="flex items-center justify-center gap-1 text-lg font-bold text-text">
                          €{year2025.targetAvgPrice}
                          <ArrowUpRight className="h-3 w-3 text-success" />
                        </div>
                        <div className="text-xs text-muted">{t.targetPrice}</div>
                      </div>
                      <div className="rounded-lg bg-primary/10 p-2">
                        <div className="text-lg font-bold text-success">+{year2025.yearOverYearGrowth}%</div>
                        <div className="text-xs text-muted">{t.yoyGrowth}</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-gradient-to-r from-success/10 via-primary/10 to-success/10 p-4 md:grid-cols-4"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-success">+{summary.peakSeasonOptimization}</div>
              <div className="text-xs text-muted">{t.peakSeason}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">+{summary.lowSeasonRecovery}</div>
              <div className="text-xs text-muted">{t.lowSeason}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">+{summary.avgPriceOptimization}</div>
              <div className="text-xs text-muted">{t.priceOpt}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{summary.competitorComparison}</div>
              <div className="text-xs text-muted">{t.vsCompetitors}</div>
            </div>
          </motion.div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export const RevenueComparisonChart = () => {
  const { year2024 } = DEMO_ANNUAL_REVENUE
  const { language } = useLanguageStore()
  const t = translations[language]

  const chartData = year2024.monthlyBreakdown.map((m) => ({
    ...m,
    gain: m.revenue - m.staticRevenue,
  }))

  return (
    <Card data-tour="revenue-chart" variant="default" className="mb-8">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-text">
              <TrendingUp className="h-5 w-5 text-success" />
              {t.chartTitle}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {t.chartSubtitle}
            </p>
          </div>
          <Badge variant="success" className="px-3 py-1.5">
            +€{year2024.dynamicPricingGain.toLocaleString()} {t.totalGain}
          </Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="dynamicGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="staticGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6B7280" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6B7280" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '12px',
                color: '#FAFAFA',
              }}
              formatter={(value: number, name: string) => [
                `€${value.toLocaleString()}`,
                name === 'revenue' ? t.jenguDynamic : name === 'staticRevenue' ? t.staticPricing : t.additionalGain,
              ]}
            />
            <Legend />
            <ReferenceLine y={0} stroke="#666" />
            <Area
              type="monotone"
              dataKey="staticRevenue"
              name={t.staticPricing}
              stackId="1"
              stroke="#6B7280"
              strokeWidth={2}
              fill="url(#staticGradient)"
              strokeDasharray="5 5"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name={t.jenguDynamic}
              stackId="2"
              stroke="#10B981"
              strokeWidth={3}
              fill="url(#dynamicGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  )
}
