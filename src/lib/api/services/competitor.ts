/**
 * Competitor Pricing API Service - DEMO VERSION
 * Returns mock competitor data - no backend calls
 */

import { simulateDelay, DEMO_DATA } from '../../mockData'

// ===== TYPE DEFINITIONS =====

export interface CompetitorPrice {
  competitor_name: string
  price: number
  currency: string
  date: string
  url: string
  room_type?: string
  availability?: boolean
}

export interface CompetitorAnalysis {
  avg_price: number
  min_price: number
  max_price: number
  your_position: 'lower' | 'competitive' | 'higher'
  price_gap: number
  competitors: CompetitorPrice[]
}

export interface ScraperConfig {
  location: string
  checkIn: string
  checkOut: string
  guests: number
  propertyType: 'hotel' | 'vacation_rental' | 'resort'
}

// ===== MOCK DATA =====

function getMockCompetitorPrices(): CompetitorPrice[] {
  const today = new Date().toISOString().split('T')[0]

  // Use demo competitor data from mockData
  return DEMO_DATA.competitors.map(comp => ({
    competitor_name: comp.name,
    price: Math.round(85 + Math.random() * 60), // €85-145 range
    currency: 'EUR',
    date: today,
    url: '#',
    room_type: 'Standard Pitch',
    availability: true,
  }))
}

// ===== MOCK API FUNCTIONS =====

/**
 * Get competitor prices - DEMO: Returns mock data
 */
export async function scrapeCompetitorPrices(_config: ScraperConfig): Promise<CompetitorPrice[]> {
  await simulateDelay(600)
  return getMockCompetitorPrices()
}

/**
 * Analyze competitor prices and calculate positioning
 */
export function analyzeCompetitorPrices(
  competitors: CompetitorPrice[],
  yourPrice: number
): CompetitorAnalysis {
  if (competitors.length === 0) {
    return {
      avg_price: yourPrice,
      min_price: yourPrice,
      max_price: yourPrice,
      your_position: 'competitive',
      price_gap: 0,
      competitors: [],
    }
  }

  const prices = competitors.map(c => c.price)
  const avg_price = prices.reduce((a, b) => a + b, 0) / prices.length
  const min_price = Math.min(...prices)
  const max_price = Math.max(...prices)

  // Determine price position
  let your_position: 'lower' | 'competitive' | 'higher'
  const priceGapPercent = ((yourPrice - avg_price) / avg_price) * 100

  if (priceGapPercent < -10) {
    your_position = 'lower'
  } else if (priceGapPercent > 10) {
    your_position = 'higher'
  } else {
    your_position = 'competitive'
  }

  return {
    avg_price: Math.round(avg_price * 100) / 100,
    min_price: Math.round(min_price * 100) / 100,
    max_price: Math.round(max_price * 100) / 100,
    your_position,
    price_gap: Math.round((yourPrice - avg_price) * 100) / 100,
    competitors,
  }
}

/**
 * Get historical competitor price data - DEMO: Returns mock data
 */
export async function getHistoricalCompetitorPrices(
  _location: string,
  _propertyType: string,
  daysBack: number = 30
): Promise<Map<string, number>> {
  await simulateDelay(400)

  const historicalData = new Map<string, number>()
  const today = new Date()
  const basePrice = 95 // Base price in EUR

  for (let i = 0; i < daysBack; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    // Add realistic variation
    const variation = Math.random() * 0.3 - 0.15 // ±15%
    const price = basePrice * (1 + variation)

    historicalData.set(dateStr, Math.round(price * 100) / 100)
  }

  return historicalData
}

/**
 * Calculate price recommendation based on competitor analysis
 */
export function getPriceRecommendation(
  analysis: CompetitorAnalysis,
  currentPrice: number
): {
  recommended_price: number
  reasoning: string
  change_percent: number
} {
  const { avg_price, your_position, price_gap } = analysis

  let recommended_price = currentPrice
  let reasoning = ''

  switch (your_position) {
    case 'lower':
      recommended_price = avg_price * 0.95
      reasoning = `Your price is €${Math.abs(price_gap).toFixed(0)} below market average. Consider increasing prices while staying competitive.`
      break

    case 'higher':
      recommended_price = avg_price * 1.05
      reasoning = `Your price is €${Math.abs(price_gap).toFixed(0)} above market average. Monitor occupancy for opportunities.`
      break

    case 'competitive':
      recommended_price = currentPrice
      reasoning = `Your pricing is competitive with the market. Maintain current strategy.`
      break
  }

  const change_percent = ((recommended_price - currentPrice) / currentPrice) * 100

  return {
    recommended_price: Math.round(recommended_price * 100) / 100,
    reasoning,
    change_percent: Math.round(change_percent * 10) / 10,
  }
}

/**
 * Test connection - DEMO: Always returns true
 */
export async function testScraperConnection(): Promise<boolean> {
  await simulateDelay(200)
  return true
}
