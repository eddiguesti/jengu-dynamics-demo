/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Analytics Service - DEMO VERSION
 * Returns mock analytics data - no backend calls
 */

import { simulateDelay } from '../mockData'

// ===== TYPE DEFINITIONS =====

export interface WeatherImpactAnalysis {
  correlations: {
    temperaturePrice: number
    temperatureOccupancy: number
    priceOccupancy: number
  }
  weatherStats: Array<{
    weather: string
    avgPrice: number
    avgOccupancy: number
    avgTemperature: number | null
    sampleSize: number
  }>
  confidence: 'low' | 'medium' | 'high'
  sampleSize: number
}

export interface DemandForecast {
  forecast: Array<{
    date: string
    day: string
    predictedOccupancy: number
    confidence: 'low' | 'medium' | 'high'
  }>
  accuracy: {
    r2: number
    mape: number
  } | null
  method: string
  trainingSize?: number
}

export interface CompetitorAnalysis {
  yourAveragePrice: number
  competitorAveragePrice: number
  priceDifference: number
  pricePercentage: number
  yourOccupancy: number | null
  recommendation: {
    action: 'increase' | 'decrease' | 'maintain'
    amount: number
    reason: string
  } | null
  sampleSize: {
    yours: number
    competitors: number
  }
}

export interface FeatureImportance {
  feature: string
  priceCorrelation: number
  occupancyCorrelation: number
  importance: number
}

export interface MarketSentiment {
  overallScore: number
  category: string
  categoryLabel: string
  components: {
    weather: { score: number; weight: string }
    occupancy: { score: number; weight: string }
    competitor: { score: number; weight: string }
    demand: { score: number; weight: string }
    seasonal: { score: number; weight: string }
  }
}

export interface ClaudeInsights {
  summary: string
  insights: string[]
  generatedAt: string
  error?: string
}

export interface AnalyticsSummary {
  weatherImpact: WeatherImpactAnalysis
  demandForecast: DemandForecast
  featureImportance: FeatureImportance[]
  dataQuality: {
    totalRecords: number
    dateRange: {
      start: string | null
      end: string | null
    }
    completeness: {
      price: number
      occupancy: number
      weather: number
      temperature: number
    }
  }
}

// ===== MOCK DATA GENERATORS =====

function generateMockWeatherImpact(): WeatherImpactAnalysis {
  return {
    correlations: {
      temperaturePrice: 0.68,
      temperatureOccupancy: 0.72,
      priceOccupancy: -0.45,
    },
    weatherStats: [
      { weather: 'Sunny', avgPrice: 125, avgOccupancy: 85, avgTemperature: 28, sampleSize: 120 },
      { weather: 'Partly Cloudy', avgPrice: 98, avgOccupancy: 72, avgTemperature: 22, sampleSize: 85 },
      { weather: 'Rainy', avgPrice: 78, avgOccupancy: 45, avgTemperature: 18, sampleSize: 45 },
    ],
    confidence: 'high',
    sampleSize: 250,
  }
}

function generateMockDemandForecast(daysAhead: number = 14): DemandForecast {
  const forecast = []
  const today = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  for (let i = 1; i <= daysAhead; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6

    forecast.push({
      date: date.toISOString().split('T')[0],
      day: days[dayOfWeek],
      predictedOccupancy: Math.round(isWeekend ? 75 + Math.random() * 20 : 55 + Math.random() * 25),
      confidence: (Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low') as 'low' | 'medium' | 'high',
    })
  }

  return {
    forecast,
    accuracy: { r2: 0.82, mape: 8.5 },
    method: 'gradient_boosting',
    trainingSize: 365,
  }
}

function generateMockFeatureImportance(): FeatureImportance[] {
  return [
    { feature: 'day_of_week', priceCorrelation: 0.45, occupancyCorrelation: 0.62, importance: 0.28 },
    { feature: 'temperature', priceCorrelation: 0.68, occupancyCorrelation: 0.72, importance: 0.24 },
    { feature: 'is_holiday', priceCorrelation: 0.55, occupancyCorrelation: 0.48, importance: 0.18 },
    { feature: 'season', priceCorrelation: 0.72, occupancyCorrelation: 0.65, importance: 0.16 },
    { feature: 'weather', priceCorrelation: 0.42, occupancyCorrelation: 0.38, importance: 0.14 },
  ]
}

function generateMockMarketSentiment(): MarketSentiment {
  return {
    overallScore: 72,
    category: 'bullish',
    categoryLabel: 'Favorable Market',
    components: {
      weather: { score: 85, weight: '20%' },
      occupancy: { score: 68, weight: '25%' },
      competitor: { score: 72, weight: '20%' },
      demand: { score: 75, weight: '20%' },
      seasonal: { score: 65, weight: '15%' },
    },
  }
}

function generateMockAIInsights(): ClaudeInsights {
  return {
    summary: 'Market conditions are favorable for the upcoming period. Weather forecasts indicate sunny conditions which historically correlate with 15-20% higher booking rates.',
    insights: [
      'Weekend pricing can be increased by 10-12% based on current demand patterns',
      'Competitor prices have risen 8% in the last week - opportunity to follow',
      'Early booking incentives for shoulder season could improve April occupancy by 15%',
      'Glamping units are outperforming - consider promoting these more heavily',
    ],
    generatedAt: new Date().toISOString(),
  }
}

// ===== MOCK API FUNCTIONS =====

export async function getAnalyticsSummary(_data: any[]): Promise<AnalyticsSummary> {
  await simulateDelay(600)
  return {
    weatherImpact: generateMockWeatherImpact(),
    demandForecast: generateMockDemandForecast(),
    featureImportance: generateMockFeatureImportance(),
    dataQuality: {
      totalRecords: 2190,
      dateRange: { start: '2024-01-01', end: '2024-12-31' },
      completeness: { price: 100, occupancy: 98, weather: 95, temperature: 95 },
    },
  }
}

export async function analyzeWeatherImpact(_data: any[]): Promise<WeatherImpactAnalysis> {
  await simulateDelay(500)
  return generateMockWeatherImpact()
}

export async function forecastDemand(_data: any[], daysAhead: number = 14): Promise<DemandForecast> {
  await simulateDelay(500)
  return generateMockDemandForecast(daysAhead)
}

export async function analyzeCompetitorPricing(
  _yourData: any[],
  _competitorData: any[]
): Promise<CompetitorAnalysis> {
  await simulateDelay(500)
  return {
    yourAveragePrice: 95,
    competitorAveragePrice: 89,
    priceDifference: 6,
    pricePercentage: 106.7,
    yourOccupancy: 72,
    recommendation: {
      action: 'maintain',
      amount: 0,
      reason: 'Your pricing is competitive with the market. Current premium justified by amenities.',
    },
    sampleSize: { yours: 365, competitors: 1200 },
  }
}

export async function calculateFeatureImportance(_data: any[]): Promise<FeatureImportance[]> {
  await simulateDelay(400)
  return generateMockFeatureImportance()
}

export async function analyzeMarketSentiment(_params: {
  weatherData?: any
  occupancyData?: any
  competitorData?: any
  yourPricing?: any
  historicalTrends?: any
}): Promise<MarketSentiment> {
  await simulateDelay(500)
  return generateMockMarketSentiment()
}

export async function generateAIInsights(_analyticsData: {
  marketSentiment?: MarketSentiment
  weatherAnalysis?: WeatherImpactAnalysis
  competitorAnalysis?: CompetitorAnalysis
  demandForecast?: DemandForecast
  featureImportance?: FeatureImportance[]
}): Promise<ClaudeInsights> {
  await simulateDelay(800)
  return generateMockAIInsights()
}

export async function getPricingRecommendations(
  _sentimentAnalysis: MarketSentiment,
  currentPrice: number
): Promise<any[]> {
  await simulateDelay(500)
  return [
    { type: 'weekend', suggestedPrice: currentPrice * 1.15, reason: 'Weekend premium opportunity' },
    { type: 'weekday', suggestedPrice: currentPrice * 0.95, reason: 'Competitive weekday pricing' },
  ]
}

export function parseSampleCSV(csvContent: string): any[] {
  const lines = csvContent.trim().split('\n')
  const headers = lines[0].split(',')

  return lines.slice(1).map(line => {
    const values = line.split(',')
    const row: any = {}
    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim()
    })
    return row
  })
}

export async function enrichWithWeather(
  data: any[],
  _latitude: number,
  _longitude: number
): Promise<any[]> {
  await simulateDelay(300)
  // Return data as-is in demo mode (already enriched in mock data)
  return data
}
