// Types for Pricing Engine

export interface PricingData {
  date: string
  day: string
  current_price: number
  optimized_price: number
  demand_forecast: number
  occupancy_current: number
  occupancy_optimized: number
  revenue_current: number
  revenue_optimized: number
}

export interface BusinessMetrics {
  current_revenue: number
  optimized_revenue: number
  revenue_uplift: number
  uplift_percentage: number
  avg_price_current: number
  avg_price_optimized: number
  avg_occupancy_current: number
  avg_occupancy_optimized: number
  total_bookings: number
}

export interface PriceRecommendation {
  date: string
  day: string
  current_price: number
  recommended_price: number
  expected_occupancy: number
  revenue_impact: number
  confidence: 'high' | 'medium' | 'low'
}

export type Strategy = 'conservative' | 'balanced' | 'aggressive'

export interface StrategyConfig {
  name: string
  description: string
  demandSensitivity: number
  priceAggression: number
  occupancyTarget: number
  color: string
}

export const STRATEGIES: Record<Strategy, StrategyConfig> = {
  conservative: {
    name: 'Conservative',
    description: 'Maintain stable prices, prioritize occupancy',
    demandSensitivity: 0.3,
    priceAggression: 0.4,
    occupancyTarget: 85,
    color: '#10B981',
  },
  balanced: {
    name: 'Balanced',
    description: 'Optimize for revenue, balanced risk',
    demandSensitivity: 0.6,
    priceAggression: 0.7,
    occupancyTarget: 75,
    color: '#EBFF57',
  },
  aggressive: {
    name: 'Aggressive',
    description: 'Maximize revenue, dynamic pricing',
    demandSensitivity: 0.9,
    priceAggression: 1.0,
    occupancyTarget: 65,
    color: '#F59E0B',
  },
}

export const DEFAULT_METRICS: BusinessMetrics = {
  current_revenue: 0,
  optimized_revenue: 0,
  revenue_uplift: 0,
  uplift_percentage: 0,
  avg_price_current: 0,
  avg_price_optimized: 0,
  avg_occupancy_current: 0,
  avg_occupancy_optimized: 0,
  total_bookings: 0,
}
