// Mock Data for Demo - "Camp Azur Étoiles" - Fictional Campsite in Bandol, France
// This is entirely fictional data for demonstration purposes

export const DEMO_BUSINESS = {
  id: 'demo-business-001',
  name: 'Camp Azur Étoiles',
  location: 'Bandol, Provence-Alpes-Côte d\'Azur, France',
  latitude: 43.1367,
  longitude: 5.7533,
  timezone: 'Europe/Paris',
  currency: 'EUR',
  description: 'A charming Mediterranean campsite nestled in the hills above Bandol, offering stunning sea views and easy access to beautiful beaches.',
  accommodationTypes: [
    'Tent Pitch',
    'Caravan Pitch',
    'Mobile Home Classic',
    'Mobile Home Premium',
    'Glamping Pod',
    'Safari Tent',
  ],
  amenities: [
    'Swimming Pool',
    'Beach Access (800m)',
    'WiFi',
    'Restaurant',
    'Kids Club',
    'Bike Rental',
    'Petanque Court',
  ],
  totalUnits: 85,
  seasonDates: {
    lowSeason: { start: '2024-11-01', end: '2025-03-31' },
    shoulderSeason: { start: '2024-04-01', end: '2024-06-14' },
    highSeason: { start: '2024-06-15', end: '2024-08-31' },
    shoulderSeasonFall: { start: '2024-09-01', end: '2024-10-31' },
  },
};

// Generate dates for the past year
function generateDates(days: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

// Get season for a date
function getSeason(dateStr: string): 'low' | 'shoulder' | 'high' {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month >= 7 && month <= 8) return 'high';
  if (month === 6 && day >= 15) return 'high';
  if ((month >= 4 && month <= 6) || (month >= 9 && month <= 10)) return 'shoulder';
  return 'low';
}

// Base prices by accommodation type and season
const BASE_PRICES: Record<string, Record<string, number>> = {
  'Tent Pitch': { low: 18, shoulder: 28, high: 45 },
  'Caravan Pitch': { low: 22, shoulder: 35, high: 55 },
  'Mobile Home Classic': { low: 55, shoulder: 85, high: 145 },
  'Mobile Home Premium': { low: 75, shoulder: 115, high: 195 },
  'Glamping Pod': { low: 85, shoulder: 125, high: 185 },
  'Safari Tent': { low: 95, shoulder: 145, high: 225 },
};

// Generate realistic pricing data with variations
function generatePricingData() {
  const dates = generateDates(365);
  const data: any[] = [];

  dates.forEach((date, index) => {
    const season = getSeason(date);
    const dayOfWeek = new Date(date).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;

    // Weather simulation (Mediterranean climate)
    const month = new Date(date).getMonth();
    const baseTemp = [10, 11, 14, 17, 21, 25, 28, 28, 24, 19, 14, 11][month];
    const temperature = baseTemp + (Math.random() * 6 - 3);
    const isRainy = Math.random() < [0.3, 0.25, 0.2, 0.15, 0.1, 0.05, 0.02, 0.03, 0.1, 0.2, 0.25, 0.3][month];

    Object.entries(BASE_PRICES).forEach(([accommodationType, prices]) => {
      const basePrice = prices[season];

      // Price variations
      let price = basePrice;

      // Weekend premium
      if (isWeekend && season !== 'low') {
        price *= 1.15;
      }

      // Weather impact
      if (isRainy) {
        price *= 0.92;
      }

      // Random daily variation
      price *= 0.95 + Math.random() * 0.1;

      // Special events (local festivals, holidays)
      const dateObj = new Date(date);
      const monthDay = `${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
      if (['7-14', '8-15', '5-1', '5-8'].includes(monthDay)) {
        price *= 1.25; // French holidays
      }

      // Occupancy based on season and price
      let baseOccupancy = { low: 35, shoulder: 65, high: 92 }[season];
      if (isWeekend) baseOccupancy += 10;
      if (isRainy) baseOccupancy -= 15;
      const occupancy = Math.min(100, Math.max(10, baseOccupancy + (Math.random() * 20 - 10)));

      // Revenue
      const unitsOfType = Math.floor(DEMO_BUSINESS.totalUnits / 6);
      const occupiedUnits = Math.round((occupancy / 100) * unitsOfType);
      const revenue = occupiedUnits * price;

      data.push({
        id: `${date}-${accommodationType.replace(/\s+/g, '-').toLowerCase()}`,
        date,
        accommodationType,
        basePrice: prices[season],
        price: Math.round(price * 100) / 100,
        occupancy: Math.round(occupancy),
        revenue: Math.round(revenue * 100) / 100,
        temperature: Math.round(temperature * 10) / 10,
        weather: isRainy ? 'Rainy' : temperature > 25 ? 'Sunny' : 'Partly Cloudy',
        season,
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek],
        isWeekend,
        bookingsCount: occupiedUnits,
        cancellations: Math.floor(Math.random() * 3),
      });
    });
  });

  return data;
}

// Generate competitor data
function generateCompetitorData() {
  const competitors = [
    {
      id: 'comp-1',
      name: 'Camping du Soleil Levant',
      location: 'Sanary-sur-Mer',
      distance: '8 km',
      rating: 4.2,
      totalUnits: 120,
    },
    {
      id: 'comp-2',
      name: 'Domaine des Oliviers',
      location: 'La Cadière-d\'Azur',
      distance: '12 km',
      rating: 4.5,
      totalUnits: 95,
    },
    {
      id: 'comp-3',
      name: 'Les Terrasses de Provence',
      location: 'Le Castellet',
      distance: '15 km',
      rating: 4.0,
      totalUnits: 75,
    },
    {
      id: 'comp-4',
      name: 'Camping Mer et Vignes',
      location: 'Bandol',
      distance: '3 km',
      rating: 3.8,
      totalUnits: 60,
    },
  ];

  return competitors.map((comp) => ({
    ...comp,
    prices: {
      'Tent Pitch': { low: 15 + Math.random() * 8, shoulder: 25 + Math.random() * 10, high: 40 + Math.random() * 15 },
      'Mobile Home': { low: 50 + Math.random() * 20, shoulder: 80 + Math.random() * 25, high: 130 + Math.random() * 40 },
      'Glamping': { low: 70 + Math.random() * 30, shoulder: 110 + Math.random() * 35, high: 160 + Math.random() * 50 },
    },
    occupancyAvg: 55 + Math.random() * 30,
    revenueIndex: 0.8 + Math.random() * 0.4,
  }));
}

// KPI Summary
function generateKPISummary(pricingData: any[]) {
  const last30Days = pricingData.slice(-180); // Last 30 days * 6 accommodation types
  const previous30Days = pricingData.slice(-360, -180);

  const totalRevenue = last30Days.reduce((sum, d) => sum + d.revenue, 0);
  const previousRevenue = previous30Days.reduce((sum, d) => sum + d.revenue, 0);
  const revenueChange = ((totalRevenue - previousRevenue) / previousRevenue) * 100;

  const avgOccupancy = last30Days.reduce((sum, d) => sum + d.occupancy, 0) / last30Days.length;
  const previousOccupancy = previous30Days.reduce((sum, d) => sum + d.occupancy, 0) / previous30Days.length;
  const occupancyChange = avgOccupancy - previousOccupancy;

  const avgPrice = last30Days.reduce((sum, d) => sum + d.price, 0) / last30Days.length;
  const previousPrice = previous30Days.reduce((sum, d) => sum + d.price, 0) / previous30Days.length;
  const priceChange = ((avgPrice - previousPrice) / previousPrice) * 100;

  const totalBookings = last30Days.reduce((sum, d) => sum + d.bookingsCount, 0);
  const previousBookings = previous30Days.reduce((sum, d) => sum + d.bookingsCount, 0);
  const bookingsChange = ((totalBookings - previousBookings) / previousBookings) * 100;

  return {
    totalRevenue: Math.round(totalRevenue),
    revenueChange: Math.round(revenueChange * 10) / 10,
    avgOccupancy: Math.round(avgOccupancy),
    occupancyChange: Math.round(occupancyChange * 10) / 10,
    avgPrice: Math.round(avgPrice * 100) / 100,
    priceChange: Math.round(priceChange * 10) / 10,
    totalBookings,
    bookingsChange: Math.round(bookingsChange * 10) / 10,
    totalRecords: pricingData.length,
  };
}

// Price recommendations
function generatePriceRecommendations() {
  const today = new Date();
  const recommendations: any[] = [];

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const season = getSeason(dateStr);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;

    Object.entries(BASE_PRICES).forEach(([accommodationType, prices]) => {
      const currentPrice = prices[season];
      let recommendedPrice = currentPrice;

      // Dynamic adjustments
      if (isWeekend) recommendedPrice *= 1.12;
      if (season === 'high') recommendedPrice *= 1.05;

      // Demand forecast simulation
      const demandScore = 0.5 + Math.random() * 0.5;
      if (demandScore > 0.8) recommendedPrice *= 1.1;
      if (demandScore < 0.4) recommendedPrice *= 0.9;

      const priceChange = ((recommendedPrice - currentPrice) / currentPrice) * 100;

      recommendations.push({
        date: dateStr,
        accommodationType,
        currentPrice: Math.round(currentPrice * 100) / 100,
        recommendedPrice: Math.round(recommendedPrice * 100) / 100,
        priceChange: Math.round(priceChange * 10) / 10,
        demandScore: Math.round(demandScore * 100),
        confidence: Math.round(70 + Math.random() * 25),
        reason: demandScore > 0.8
          ? 'High demand expected'
          : demandScore < 0.4
            ? 'Low demand - consider promotion'
            : isWeekend
              ? 'Weekend premium'
              : 'Standard pricing',
      });
    });
  }

  return recommendations;
}

// Analytics insights
function generateInsights() {
  return [
    {
      id: 'insight-1',
      type: 'opportunity',
      title: 'Weekend Pricing Opportunity',
      description: 'Your weekend prices for Glamping Pods are 8% below competitor average. Consider increasing by €15-20 to match market rates.',
      impact: '+€2,400/month potential',
      priority: 'high',
      category: 'pricing',
    },
    {
      id: 'insight-2',
      type: 'alert',
      title: 'Low Shoulder Season Occupancy',
      description: 'April bookings are tracking 15% below last year. Consider early-bird promotions or package deals to boost occupancy.',
      impact: 'Risk: -€8,500 revenue',
      priority: 'medium',
      category: 'occupancy',
    },
    {
      id: 'insight-3',
      type: 'success',
      title: 'Safari Tent Performance',
      description: 'Safari Tents are outperforming all other accommodation types with 94% occupancy in peak season. Strong ROI on this investment.',
      impact: '+23% YoY revenue',
      priority: 'info',
      category: 'performance',
    },
    {
      id: 'insight-4',
      type: 'recommendation',
      title: 'Weather-Based Dynamic Pricing',
      description: 'Enable automatic price adjustments based on weather forecasts. Sunny weekends in shoulder season could command premium prices.',
      impact: '+€1,800/month estimate',
      priority: 'medium',
      category: 'automation',
    },
    {
      id: 'insight-5',
      type: 'trend',
      title: 'Competitor Price Increase',
      description: '"Domaine des Oliviers" raised Mobile Home prices by 12% for July-August. Market may support similar increase.',
      impact: 'Market signal',
      priority: 'low',
      category: 'competitive',
    },
  ];
}

// Chart data generators
function generateRevenueChartData(pricingData: any[]) {
  const monthlyData: Record<string, number> = {};

  pricingData.forEach((d) => {
    const month = d.date.substring(0, 7);
    monthlyData[month] = (monthlyData[month] || 0) + d.revenue;
  });

  return Object.entries(monthlyData)
    .slice(-12)
    .map(([month, revenue]) => ({
      month,
      revenue: Math.round(revenue),
      label: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    }));
}

function generateOccupancyChartData(pricingData: any[]) {
  const weeklyData: Record<string, { total: number; count: number }> = {};

  pricingData.forEach((d) => {
    const week = getWeekNumber(new Date(d.date));
    if (!weeklyData[week]) {
      weeklyData[week] = { total: 0, count: 0 };
    }
    weeklyData[week].total += d.occupancy;
    weeklyData[week].count += 1;
  });

  return Object.entries(weeklyData)
    .slice(-52)
    .map(([week, data]) => ({
      week,
      occupancy: Math.round(data.total / data.count),
    }));
}

function getWeekNumber(date: Date): string {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneWeek = 604800000;
  const weekNum = Math.ceil(diff / oneWeek);
  return `${date.getFullYear()}-W${weekNum.toString().padStart(2, '0')}`;
}

function generateAccommodationBreakdown(pricingData: any[]) {
  const last30Days = pricingData.slice(-180);
  const breakdown: Record<string, { revenue: number; bookings: number; avgPrice: number; count: number }> = {};

  last30Days.forEach((d) => {
    if (!breakdown[d.accommodationType]) {
      breakdown[d.accommodationType] = { revenue: 0, bookings: 0, avgPrice: 0, count: 0 };
    }
    breakdown[d.accommodationType].revenue += d.revenue;
    breakdown[d.accommodationType].bookings += d.bookingsCount;
    breakdown[d.accommodationType].avgPrice += d.price;
    breakdown[d.accommodationType].count += 1;
  });

  return Object.entries(breakdown).map(([type, data]) => ({
    accommodationType: type,
    revenue: Math.round(data.revenue),
    bookings: data.bookings,
    avgPrice: Math.round((data.avgPrice / data.count) * 100) / 100,
    share: 0, // Will be calculated
  })).map((item, _, arr) => {
    const total = arr.reduce((sum, i) => sum + i.revenue, 0);
    return { ...item, share: Math.round((item.revenue / total) * 100) };
  });
}

// Files/Properties mock
function generateFiles() {
  return [
    {
      id: 'file-1',
      name: 'pricing_data_2024.csv',
      originalName: 'pricing_data_2024.csv',
      uploadDate: '2024-01-15T10:30:00Z',
      uploaded_at: '2024-01-15T10:30:00Z',
      recordCount: 2190,
      rows: 2190,
      actualRows: 2190,
      columns: 12,
      size: 328500,
      status: 'complete',
      enrichment_status: 'completed',
      enrichmentStatus: 'complete',
      accommodationTypes: ['Tent Pitch', 'Caravan Pitch', 'Mobile Home Classic', 'Mobile Home Premium', 'Glamping Pod', 'Safari Tent'],
      preview: [],
    },
    {
      id: 'file-2',
      name: 'summer_bookings_2024.csv',
      originalName: 'summer_bookings_2024.csv',
      uploadDate: '2024-06-01T14:22:00Z',
      uploaded_at: '2024-06-01T14:22:00Z',
      recordCount: 552,
      rows: 552,
      actualRows: 552,
      columns: 12,
      size: 82800,
      status: 'complete',
      enrichment_status: 'completed',
      enrichmentStatus: 'complete',
      accommodationTypes: ['Mobile Home Premium', 'Glamping Pod', 'Safari Tent'],
      preview: [],
    },
    {
      id: 'file-3',
      name: 'competitor_analysis_q2.csv',
      originalName: 'competitor_analysis_q2.csv',
      uploadDate: '2024-07-20T09:15:00Z',
      uploaded_at: '2024-07-20T09:15:00Z',
      recordCount: 124,
      rows: 124,
      actualRows: 124,
      columns: 8,
      size: 18600,
      status: 'complete',
      enrichment_status: 'completed',
      enrichmentStatus: 'complete',
      accommodationTypes: ['Tent Pitch', 'Mobile Home Classic'],
      preview: [],
    },
  ];
}

// Annual Revenue Data - Realistic campsite in Provence
// Based on 85 units, Mediterranean seasonal patterns
// Shows clear advantage of Jengu dynamic pricing vs static/manual pricing
export const DEMO_ANNUAL_REVENUE = {
  // 2024 Actual Performance (completed year with Jengu)
  year2024: {
    totalRevenue: 487650,
    staticPricingRevenue: 374350, // What competitors earn with static pricing
    dynamicPricingGain: 113300, // +30.3% improvement
    dynamicPricingPercent: 30.3,
    avgOccupancy: 68,
    avgPrice: 89,
    peakSeasonRevenue: 285400,
    shoulderSeasonRevenue: 142800,
    lowSeasonRevenue: 59450,
    bookingsCount: 5478,
    revenuePerUnit: 5737, // €5,737 per unit per year
    monthlyBreakdown: [
      { month: 'Jan', revenue: 8200, staticRevenue: 6400, occupancy: 28 },
      { month: 'Feb', revenue: 9100, staticRevenue: 7100, occupancy: 32 },
      { month: 'Mar', revenue: 14800, staticRevenue: 11400, occupancy: 38 },
      { month: 'Apr', revenue: 32400, staticRevenue: 24900, occupancy: 52 },
      { month: 'May', revenue: 48200, staticRevenue: 37100, occupancy: 62 },
      { month: 'Jun', revenue: 72500, staticRevenue: 55800, occupancy: 78 },
      { month: 'Jul', revenue: 108400, staticRevenue: 83400, occupancy: 94 },
      { month: 'Aug', revenue: 104500, staticRevenue: 80400, occupancy: 92 },
      { month: 'Sep', revenue: 42800, staticRevenue: 32900, occupancy: 65 },
      { month: 'Oct', revenue: 19400, staticRevenue: 14900, occupancy: 45 },
      { month: 'Nov', revenue: 14850, staticRevenue: 11400, occupancy: 32 },
      { month: 'Dec', revenue: 12500, staticRevenue: 8650, occupancy: 28 },
    ],
  },
  // 2025 Projections (current year - YTD actual + forecast)
  year2025: {
    projectedRevenue: 542800,
    staticPricingProjection: 398200,
    dynamicPricingGain: 144600, // +36.3% improvement (improved algorithm)
    dynamicPricingPercent: 36.3,
    yearOverYearGrowth: 11.3,
    targetOccupancy: 72,
    targetAvgPrice: 96,
    ytdRevenue: 205500, // Jan-Jun actual
    ytdStaticRevenue: 150700,
    remainingForecast: 337300,
    confidenceLevel: 'high',
    monthlyForecast: [
      { month: 'Jan', revenue: 9200, staticRevenue: 6800, occupancy: 30, actual: true },
      { month: 'Feb', revenue: 10400, staticRevenue: 7600, occupancy: 34, actual: true },
      { month: 'Mar', revenue: 16800, staticRevenue: 12300, occupancy: 42, actual: true },
      { month: 'Apr', revenue: 36500, staticRevenue: 26800, occupancy: 56, actual: true },
      { month: 'May', revenue: 54200, staticRevenue: 39800, occupancy: 66, actual: true },
      { month: 'Jun', revenue: 78400, staticRevenue: 57400, occupancy: 82, actual: true },
      { month: 'Jul', revenue: 118500, staticRevenue: 86900, occupancy: 96, actual: false },
      { month: 'Aug', revenue: 114200, staticRevenue: 83700, occupancy: 94, actual: false },
      { month: 'Sep', revenue: 48600, staticRevenue: 35600, occupancy: 68, actual: false },
      { month: 'Oct', revenue: 22400, staticRevenue: 16400, occupancy: 48, actual: false },
      { month: 'Nov', revenue: 17200, staticRevenue: 12600, occupancy: 35, actual: false },
      { month: 'Dec', revenue: 16400, staticRevenue: 12300, occupancy: 32, actual: false },
    ],
  },
  // Compelling Key Metrics
  summary: {
    totalAdditionalRevenue2024: '€113,300',
    totalAdditionalRevenue2025: '€144,600',
    averageGain: '33%',
    peakSeasonOptimization: '42%',
    lowSeasonRecovery: '28%',
    avgPriceOptimization: '22%',
    occupancyImprovement: '8%',
    competitorComparison: '+€1,334/unit vs area average',
  },
};

// Export all demo data
export const DEMO_DATA = {
  business: DEMO_BUSINESS,
  pricingData: generatePricingData(),
  competitors: generateCompetitorData(),
  files: generateFiles(),
  insights: generateInsights(),
  priceRecommendations: generatePriceRecommendations(),
  annualRevenue: DEMO_ANNUAL_REVENUE,
};

// Computed data (generated once)
export const DEMO_KPI = generateKPISummary(DEMO_DATA.pricingData);
export const DEMO_REVENUE_CHART = generateRevenueChartData(DEMO_DATA.pricingData);
export const DEMO_OCCUPANCY_CHART = generateOccupancyChartData(DEMO_DATA.pricingData);
export const DEMO_ACCOMMODATION_BREAKDOWN = generateAccommodationBreakdown(DEMO_DATA.pricingData);

// Demo user
export const DEMO_USER = {
  id: 'demo-user-001',
  email: 'demo@campazuretoiles.fr',
  name: 'Marie Dubois',
  role: 'Property Manager',
  avatar: null,
  user_metadata: {
    name: 'Marie Dubois',
    full_name: 'Marie Dubois',
    avatar_url: null,
  },
};

// Helper to simulate API delay
export const simulateDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms + Math.random() * 200));
