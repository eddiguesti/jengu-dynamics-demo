// Demo API Service - Simulates backend responses with mock data
import {
  DEMO_DATA,
  DEMO_KPI,
  DEMO_REVENUE_CHART,
  DEMO_OCCUPANCY_CHART,
  DEMO_ACCOMMODATION_BREAKDOWN,
  DEMO_USER,
  DEMO_BUSINESS,
  simulateDelay,
} from '../mockData';

// Simulate successful API responses
const success = <T>(data: T) => ({ success: true, data });

export const demoService = {
  // Auth endpoints
  auth: {
    async login(_email: string, _password: string) {
      await simulateDelay(500);
      return {
        user: DEMO_USER,
        session: {
          access_token: 'demo-token-12345',
          expires_at: Date.now() + 86400000,
        },
      };
    },
    async logout() {
      await simulateDelay(200);
      return { success: true };
    },
    async getUser() {
      await simulateDelay(200);
      return DEMO_USER;
    },
  },

  // Files/Properties endpoints
  files: {
    async getFiles() {
      await simulateDelay(400);
      return success({ files: DEMO_DATA.files });
    },
    async getFile(id: string) {
      await simulateDelay(300);
      const file = DEMO_DATA.files.find((f) => f.id === id);
      return success({ file });
    },
    async uploadFile(_formData: FormData) {
      await simulateDelay(1500);
      return success({
        file: {
          id: 'file-new-' + Date.now(),
          name: 'uploaded_data.csv',
          uploadDate: new Date().toISOString(),
          recordCount: Math.floor(Math.random() * 500) + 100,
          status: 'processing',
          enrichmentStatus: 'pending',
        },
        message: 'File uploaded successfully! Processing will complete shortly.',
      });
    },
    async deleteFile(_id: string) {
      await simulateDelay(400);
      return success({ message: 'File deleted successfully' });
    },
  },

  // Pricing data endpoints
  pricing: {
    async getData(filters?: { startDate?: string; endDate?: string; accommodationType?: string }) {
      await simulateDelay(500);
      let data = [...DEMO_DATA.pricingData];

      if (filters?.startDate) {
        data = data.filter((d) => d.date >= filters.startDate!);
      }
      if (filters?.endDate) {
        data = data.filter((d) => d.date <= filters.endDate!);
      }
      if (filters?.accommodationType) {
        data = data.filter((d) => d.accommodationType === filters.accommodationType);
      }

      return success({ data });
    },
    async getRecommendations() {
      await simulateDelay(600);
      return success({ recommendations: DEMO_DATA.priceRecommendations });
    },
    async applyRecommendation(recommendationId: string) {
      await simulateDelay(400);
      return success({
        message: 'Price recommendation applied successfully',
        recommendationId,
      });
    },
  },

  // Analytics endpoints
  analytics: {
    async getKPIs() {
      await simulateDelay(400);
      return success(DEMO_KPI);
    },
    async getRevenueChart() {
      await simulateDelay(350);
      return success({ data: DEMO_REVENUE_CHART });
    },
    async getOccupancyChart() {
      await simulateDelay(350);
      return success({ data: DEMO_OCCUPANCY_CHART });
    },
    async getAccommodationBreakdown() {
      await simulateDelay(300);
      return success({ data: DEMO_ACCOMMODATION_BREAKDOWN });
    },
    async getInsights() {
      await simulateDelay(800);
      return success({ insights: DEMO_DATA.insights });
    },
    async getSeasonalAnalysis() {
      await simulateDelay(500);
      return success({
        data: {
          low: { avgPrice: 52, avgOccupancy: 38, revenue: 28500 },
          shoulder: { avgPrice: 89, avgOccupancy: 67, revenue: 78200 },
          high: { avgPrice: 156, avgOccupancy: 91, revenue: 142800 },
        },
      });
    },
    async getForecast(days: number = 30) {
      await simulateDelay(700);
      const forecast = [];
      const today = new Date();

      for (let i = 1; i <= days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        forecast.push({
          date: date.toISOString().split('T')[0],
          predictedOccupancy: Math.round(50 + Math.random() * 40),
          predictedRevenue: Math.round(2000 + Math.random() * 3000),
          confidence: Math.round(75 + Math.random() * 20),
        });
      }

      return success({ forecast });
    },
  },

  // Competitors endpoints
  competitors: {
    async getAll() {
      await simulateDelay(400);
      return success({ competitors: DEMO_DATA.competitors });
    },
    async getComparison() {
      await simulateDelay(500);
      return success({
        comparison: {
          yourPosition: 2,
          totalCompetitors: 4,
          priceIndex: 1.05,
          occupancyRank: 1,
          marketShare: 28,
        },
      });
    },
  },

  // Business settings
  business: {
    async getSettings() {
      await simulateDelay(300);
      return success({ settings: DEMO_BUSINESS });
    },
    async updateSettings(settings: Partial<typeof DEMO_BUSINESS>) {
      await simulateDelay(400);
      return success({
        settings: { ...DEMO_BUSINESS, ...settings },
        message: 'Settings updated successfully',
      });
    },
  },

  // AI Chat endpoints
  chat: {
    async sendMessage(message: string) {
      await simulateDelay(1200);

      // Contextual responses based on keywords
      const lowerMessage = message.toLowerCase();
      let response = '';

      if (lowerMessage.includes('price') || lowerMessage.includes('pricing')) {
        response = `Based on your current pricing data for Camp Azur Étoiles:

**Current Performance:**
- Your average price (€${DEMO_KPI.avgPrice.toFixed(2)}) is competitive for the Bandol area
- Weekend premiums are generating +15% additional revenue
- Glamping Pods have the highest profit margin at 42%

**Recommendations:**
1. Consider increasing Safari Tent prices by 8-10% during peak season - demand exceeds supply
2. Mobile Home Classic prices could be optimized for shoulder season
3. Enable weather-based dynamic pricing for opportunistic gains

Would you like me to elaborate on any of these points?`;
      } else if (lowerMessage.includes('occupancy') || lowerMessage.includes('booking')) {
        response = `Here's your occupancy analysis:

**Current Status:**
- Overall occupancy: ${DEMO_KPI.avgOccupancy}%
- Trend: ${DEMO_KPI.occupancyChange > 0 ? 'Up' : 'Down'} ${Math.abs(DEMO_KPI.occupancyChange)}% vs last period

**By Season:**
- High Season (Jul-Aug): 91% average
- Shoulder Season: 67% average
- Low Season: 38% average

**Quick Wins:**
1. Early-bird discounts for April could boost shoulder season by 10-15%
2. Weekend packages are underutilized in low season
3. Last-minute deals via social media could fill gaps

Need specific strategies for any accommodation type?`;
      } else if (lowerMessage.includes('competitor') || lowerMessage.includes('market')) {
        response = `Competitive analysis for the Bandol area:

**Your Market Position:**
- Ranked #2 out of 5 local competitors
- Price index: 1.05x market average (slightly premium)
- Market share: ~28%

**Key Competitors:**
1. Domaine des Oliviers - Higher rated but 12% more expensive
2. Camping du Soleil Levant - Larger capacity, aggressive pricing
3. Camping Mer et Vignes - Budget option, lower quality

**Opportunities:**
- Your Glamping offerings are unique in the area
- Domaine des Oliviers just raised prices - room to follow
- Gap in premium family packages in the market

Want me to dive deeper into any competitor?`;
      } else if (lowerMessage.includes('weather') || lowerMessage.includes('forecast')) {
        response = `Weather impact analysis for Bandol:

**Climate Advantage:**
Mediterranean climate = 300+ sunny days/year

**Weather-Price Correlation:**
- Sunny days: +8-12% willingness to pay
- Rainy periods: -15% bookings (but you can offset with indoor activities)

**Seasonal Patterns:**
- July-August: Consistently hot (26-30°C)
- June & September: Perfect weather, underpriced opportunity
- Winter: Mild, potential for "off-season escapes" positioning

**Automation Opportunity:**
Enable weather-based pricing to automatically:
- Increase prices 48hrs before sunny weekends
- Offer flash sales during predicted rain

Shall I help set up weather-based pricing rules?`;
      } else {
        response = `I'm your AI pricing assistant for Camp Azur Étoiles! I can help you with:

**What I can analyze:**
- 📊 Pricing optimization and recommendations
- 📈 Occupancy trends and forecasting
- 🏕️ Competitor analysis and market positioning
- 🌤️ Weather impact on bookings
- 💰 Revenue maximization strategies

**Quick Stats:**
- Current occupancy: ${DEMO_KPI.avgOccupancy}%
- Avg. price: €${DEMO_KPI.avgPrice.toFixed(2)}
- Revenue trend: ${DEMO_KPI.revenueChange > 0 ? '+' : ''}${DEMO_KPI.revenueChange}%

What would you like to explore? Just ask me anything about your pricing strategy!`;
      }

      return success({
        message: response,
        timestamp: new Date().toISOString(),
      });
    },
  },
};

export default demoService;
