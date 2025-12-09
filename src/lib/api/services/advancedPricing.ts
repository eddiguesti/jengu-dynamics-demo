// Demo version - returns mock pricing recommendations
import { simulateDelay, DEMO_BUSINESS } from '../../mockData';

export interface PricingRecommendation {
  date: string;
  currentPrice: number;
  recommendedPrice: number;
  priceChange: number;
  priceChangePercent: number;
  predictedOccupancy: number;
  expectedRevenue: number;
  revenueImpact: number;
  confidence: 'very_high' | 'high' | 'medium' | 'low';
  explanation: string;
  factors: {
    seasonality: number;
    weatherImpact: number;
    holidayImpact: number;
    trendImpact: number;
  };
  reasoning: {
    primary: string;
    contributing: string[];
  };
}

export interface PricingAnalytics {
  priceElasticity: number;
  seasonalPeaks: { month: string; avgOccupancy: number }[];
  peakDays: string[];
  lowDays: string[];
  holidayPremium: number;
  weekendPremium: number;
  temperatureCorrelation: number;
  weatherSensitivity: number;
  optimalTemperatureRange: [number, number];
  demandPatterns: {
    seasonal: Record<string, number>;
    dayOfWeek: Record<string, number>;
  };
  averageRevenue?: number;
}

export interface AdvancedPricingResponse {
  success: boolean;
  property: {
    id: string;
    name: string;
  };
  summary: {
    forecastDays: number;
    currentAveragePrice: number;
    recommendedAveragePrice: number;
    averagePriceChange: number;
    averageRevenueImpact: number;
    highConfidenceCount: number;
    dataQuality: {
      historicalDays: number;
      enrichmentComplete: number;
      holidayDataAvailable: number;
    };
  };
  analytics: PricingAnalytics;
  recommendations: PricingRecommendation[];
  metadata: {
    generatedAt: string;
    strategy: string;
    model: string;
    features: string[];
  };
}

// Generate demo recommendations
function generateDemoRecommendations(days: number = 30): PricingRecommendation[] {
  const recommendations: PricingRecommendation[] = [];
  const today = new Date();

  const basePrice = 95; // Base price for Mediterranean campsite

  for (let i = 1; i <= days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    const month = date.getMonth();
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;

    // Seasonal multiplier (Mediterranean summer peak)
    const seasonalMultiplier =
      month >= 6 && month <= 8 ? 1.8 : month >= 4 && month <= 5 ? 1.3 : month >= 9 && month <= 10 ? 1.2 : 0.7;

    // Weekend premium
    const weekendMultiplier = isWeekend ? 1.15 : 1;

    // Calculate prices
    const currentPrice = Math.round(basePrice * seasonalMultiplier * (0.95 + Math.random() * 0.1));
    const recommendedPrice = Math.round(
      basePrice * seasonalMultiplier * weekendMultiplier * (1 + Math.random() * 0.1)
    );
    const priceChange = recommendedPrice - currentPrice;
    const priceChangePercent = Math.round((priceChange / currentPrice) * 100 * 10) / 10;

    // Predicted occupancy based on season and price
    const baseOccupancy = month >= 6 && month <= 8 ? 85 : month >= 4 && month <= 10 ? 65 : 35;
    const predictedOccupancy = Math.min(
      98,
      Math.max(20, baseOccupancy + (isWeekend ? 10 : 0) + Math.round(Math.random() * 15 - 5))
    );

    // Revenue calculations
    const expectedRevenue = Math.round(recommendedPrice * (predictedOccupancy / 100) * 85); // 85 units
    const currentRevenue = Math.round(currentPrice * (predictedOccupancy / 100) * 85);
    const revenueImpact = Math.round(((expectedRevenue - currentRevenue) / currentRevenue) * 100 * 10) / 10;

    // Confidence based on data availability
    const confidence: PricingRecommendation['confidence'] =
      Math.random() > 0.7 ? 'very_high' : Math.random() > 0.4 ? 'high' : Math.random() > 0.2 ? 'medium' : 'low';

    // Generate explanation
    const explanations = [
      `${isWeekend ? 'Weekend premium' : 'Weekday'} pricing with ${seasonalMultiplier > 1.5 ? 'peak' : seasonalMultiplier > 1 ? 'shoulder' : 'low'} season adjustment`,
      `High demand expected - ${predictedOccupancy}% occupancy forecast`,
      `Weather forecast: sunny conditions typically increase bookings by 12%`,
      `Competitor prices trending ${priceChange > 0 ? 'up' : 'stable'} in the area`,
      `${month >= 6 && month <= 8 ? 'Peak summer' : 'Off-peak'} Mediterranean season pricing`,
    ];

    recommendations.push({
      date: dateStr,
      currentPrice,
      recommendedPrice,
      priceChange,
      priceChangePercent,
      predictedOccupancy,
      expectedRevenue,
      revenueImpact,
      confidence,
      explanation: explanations[Math.floor(Math.random() * explanations.length)],
      factors: {
        seasonality: seasonalMultiplier,
        weatherImpact: 0.05 + Math.random() * 0.1,
        holidayImpact: 0,
        trendImpact: 0.02 + Math.random() * 0.05,
      },
      reasoning: {
        primary: `${seasonalMultiplier > 1.5 ? 'Peak' : seasonalMultiplier > 1 ? 'Shoulder' : 'Low'} season pricing strategy`,
        contributing: [
          isWeekend ? 'Weekend premium applied' : 'Standard weekday rate',
          `${predictedOccupancy}% occupancy forecast`,
          'Historical demand patterns',
        ],
      },
    });
  }

  return recommendations;
}

export async function getAdvancedPricingRecommendations(params: {
  propertyId: string;
  days?: number;
  strategy?: 'conservative' | 'balanced' | 'aggressive';
  minPrice?: number;
  maxPrice?: number;
  targetOccupancy?: number;
}): Promise<AdvancedPricingResponse> {
  await simulateDelay(800);

  const recommendations = generateDemoRecommendations(params.days || 30);
  const avgCurrentPrice = recommendations.reduce((sum, r) => sum + r.currentPrice, 0) / recommendations.length;
  const avgRecommendedPrice =
    recommendations.reduce((sum, r) => sum + r.recommendedPrice, 0) / recommendations.length;

  return {
    success: true,
    property: {
      id: params.propertyId,
      name: DEMO_BUSINESS.name,
    },
    summary: {
      forecastDays: params.days || 30,
      currentAveragePrice: Math.round(avgCurrentPrice),
      recommendedAveragePrice: Math.round(avgRecommendedPrice),
      averagePriceChange: Math.round(avgRecommendedPrice - avgCurrentPrice),
      averageRevenueImpact: Math.round(
        ((avgRecommendedPrice - avgCurrentPrice) / avgCurrentPrice) * 100 * 10
      ) / 10,
      highConfidenceCount: recommendations.filter((r) => r.confidence === 'high' || r.confidence === 'very_high')
        .length,
      dataQuality: {
        historicalDays: 365,
        enrichmentComplete: 98,
        holidayDataAvailable: 100,
      },
    },
    analytics: {
      priceElasticity: -1.2,
      seasonalPeaks: [
        { month: 'July', avgOccupancy: 92 },
        { month: 'August', avgOccupancy: 94 },
        { month: 'June', avgOccupancy: 78 },
      ],
      peakDays: ['Saturday', 'Friday', 'Sunday'],
      lowDays: ['Tuesday', 'Wednesday'],
      holidayPremium: 25,
      weekendPremium: 15,
      temperatureCorrelation: 0.72,
      weatherSensitivity: 0.65,
      optimalTemperatureRange: [24, 30],
      demandPatterns: {
        seasonal: {
          Jan: 35,
          Feb: 38,
          Mar: 45,
          Apr: 58,
          May: 68,
          Jun: 78,
          Jul: 92,
          Aug: 94,
          Sep: 72,
          Oct: 55,
          Nov: 40,
          Dec: 32,
        },
        dayOfWeek: {
          Mon: 62,
          Tue: 58,
          Wed: 60,
          Thu: 65,
          Fri: 82,
          Sat: 90,
          Sun: 78,
        },
      },
      averageRevenue: 8500,
    },
    recommendations,
    metadata: {
      generatedAt: new Date().toISOString(),
      strategy: params.strategy || 'balanced',
      model: 'demo-ml-v1',
      features: ['seasonality', 'weather', 'day_of_week', 'competitor_prices', 'historical_demand'],
    },
  };
}

export async function getAdvancedPricingAnalytics(_propertyId: string) {
  await simulateDelay(600);

  return {
    success: true,
    property: { id: _propertyId, name: DEMO_BUSINESS.name },
    analytics: {
      priceElasticity: -1.2,
      seasonalPeaks: [
        { month: 'July', avgOccupancy: 92 },
        { month: 'August', avgOccupancy: 94 },
      ],
      peakDays: ['Saturday', 'Friday'],
      lowDays: ['Tuesday', 'Wednesday'],
      holidayPremium: 25,
      weekendPremium: 15,
      temperatureCorrelation: 0.72,
      weatherSensitivity: 0.65,
      optimalTemperatureRange: [24, 30] as [number, number],
      demandPatterns: {
        seasonal: { Jul: 92, Aug: 94, Jun: 78, Sep: 72 },
        dayOfWeek: { Sat: 90, Fri: 82, Sun: 78, Mon: 62 },
      },
    },
    dataQuality: {
      totalDays: 365,
      enrichedDays: 358,
      enrichmentRate: 98,
    },
  };
}
