/**
 * Demo API Client
 *
 * This is a mock API client that returns demo data instead of making real API calls.
 * All endpoints return pre-configured demo responses.
 */

import { DEMO_DATA, DEMO_BUSINESS, simulateDelay } from '../mockData';

// Mock competitor campsites near Bandol, France
function generateMockCampsites() {
  return [
    {
      id: 'camp-001',
      name: 'Camping Les Palmiers',
      url: 'https://camping-and-co.com/camping-les-palmiers',
      photoUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
      photos: [],
      distance: 3.2,
      distanceText: '3.2 km',
      address: '123 Route de la Plage',
      town: 'Sanary-sur-Mer',
      region: 'Provence-Alpes-Côte d\'Azur',
      coordinates: { latitude: 43.1167, longitude: 5.8000 },
      rating: 4,
      reviewCount: 287,
      amenities: ['Pool', 'WiFi', 'Beach Access', 'Restaurant', 'Kids Club'],
      description: 'Family-friendly campsite with direct beach access',
      pricePreview: { amount: 89, period: 'night' },
    },
    {
      id: 'camp-002',
      name: 'Camping Côte Bleue',
      url: 'https://camping-and-co.com/camping-cote-bleue',
      photoUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=300&fit=crop',
      photos: [],
      distance: 5.8,
      distanceText: '5.8 km',
      address: '45 Avenue du Littoral',
      town: 'Bandol',
      region: 'Provence-Alpes-Côte d\'Azur',
      coordinates: { latitude: 43.1350, longitude: 5.7530 },
      rating: 5,
      reviewCount: 412,
      amenities: ['Swimming Pool', 'Spa', 'WiFi', 'Mini Golf', 'Bar'],
      description: 'Premium 4-star campsite overlooking the Mediterranean',
      pricePreview: { amount: 125, period: 'night' },
    },
    {
      id: 'camp-003',
      name: 'Camping La Pinède',
      url: 'https://camping-and-co.com/camping-la-pinede',
      photoUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=400&h=300&fit=crop',
      photos: [],
      distance: 7.1,
      distanceText: '7.1 km',
      address: '89 Chemin des Pins',
      town: 'Le Castellet',
      region: 'Provence-Alpes-Côte d\'Azur',
      coordinates: { latitude: 43.2028, longitude: 5.7775 },
      rating: 4,
      reviewCount: 156,
      amenities: ['Pool', 'Hiking Trails', 'WiFi', 'Pet Friendly'],
      description: 'Peaceful campsite nestled in pine forest',
      pricePreview: { amount: 72, period: 'night' },
    },
    {
      id: 'camp-004',
      name: 'Camping Domaine du Soleil',
      url: 'https://camping-and-co.com/camping-domaine-soleil',
      photoUrl: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=400&h=300&fit=crop',
      photos: [],
      distance: 9.4,
      distanceText: '9.4 km',
      address: '200 Route de Toulon',
      town: 'La Cadière-d\'Azur',
      region: 'Provence-Alpes-Côte d\'Azur',
      coordinates: { latitude: 43.1900, longitude: 5.7600 },
      rating: 4,
      reviewCount: 203,
      amenities: ['Vineyard Tours', 'Pool', 'Restaurant', 'WiFi', 'Tennis'],
      description: 'Charming campsite in the heart of wine country',
      pricePreview: { amount: 95, period: 'night' },
    },
    {
      id: 'camp-005',
      name: 'Camping Les Calanques',
      url: 'https://camping-and-co.com/camping-les-calanques',
      photoUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&h=300&fit=crop',
      photos: [],
      distance: 12.3,
      distanceText: '12.3 km',
      address: '15 Boulevard Maritime',
      town: 'Cassis',
      region: 'Provence-Alpes-Côte d\'Azur',
      coordinates: { latitude: 43.2144, longitude: 5.5372 },
      rating: 5,
      reviewCount: 521,
      amenities: ['Sea View', 'Kayak Rental', 'Diving Center', 'WiFi', 'Beach Shuttle'],
      description: 'Stunning location near the famous Calanques',
      pricePreview: { amount: 145, period: 'night' },
    },
    {
      id: 'camp-006',
      name: 'Camping Provence Nature',
      url: 'https://camping-and-co.com/camping-provence-nature',
      photoUrl: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=400&h=300&fit=crop',
      photos: [],
      distance: 8.7,
      distanceText: '8.7 km',
      address: '67 Chemin des Lavandes',
      town: 'Le Beausset',
      region: 'Provence-Alpes-Côte d\'Azur',
      coordinates: { latitude: 43.1978, longitude: 5.8036 },
      rating: 3,
      reviewCount: 89,
      amenities: ['Natural Pool', 'Organic Garden', 'WiFi', 'Yoga Classes'],
      description: 'Eco-friendly campsite surrounded by lavender fields',
      pricePreview: { amount: 65, period: 'night' },
    },
    {
      id: 'camp-007',
      name: 'Camping Port de Plaisance',
      url: 'https://camping-and-co.com/camping-port-plaisance',
      photoUrl: 'https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=400&h=300&fit=crop',
      photos: [],
      distance: 4.5,
      distanceText: '4.5 km',
      address: '8 Quai des Yachts',
      town: 'Bandol',
      region: 'Provence-Alpes-Côte d\'Azur',
      coordinates: { latitude: 43.1356, longitude: 5.7517 },
      rating: 4,
      reviewCount: 334,
      amenities: ['Marina Access', 'Pool', 'Boat Rental', 'WiFi', 'Restaurant'],
      description: 'Premium campsite next to Bandol marina',
      pricePreview: { amount: 118, period: 'night' },
    },
    {
      id: 'camp-008',
      name: 'Camping Famille Bonheur',
      url: 'https://camping-and-co.com/camping-famille-bonheur',
      photoUrl: 'https://images.unsplash.com/photo-1496545672447-f699b503d270?w=400&h=300&fit=crop',
      photos: [],
      distance: 6.2,
      distanceText: '6.2 km',
      address: '34 Avenue des Familles',
      town: 'Six-Fours-les-Plages',
      region: 'Provence-Alpes-Côte d\'Azur',
      coordinates: { latitude: 43.0972, longitude: 5.8200 },
      rating: 4,
      reviewCount: 267,
      amenities: ['Water Park', 'Kids Club', 'Animation Team', 'WiFi', 'Mini Market'],
      description: 'Perfect for families with young children',
      pricePreview: { amount: 82, period: 'night' },
    },
  ];
}

// Generate mock monitored competitors with pricing history (API format with snake_case)
function generateMonitoredCompetitors() {
  const baseDate = new Date();
  const generatePriceHistory = (basePrice: number) => {
    const history = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - i);
      const variance = (Math.random() - 0.5) * 20;
      history.push({
        price: Math.round(basePrice + variance),
        scraped_at: date.toISOString(),
      });
    }
    return history;
  };

  return [
    {
      id: 'mon-001',
      name: 'Camping Les Palmiers',
      url: 'https://camping-and-co.com/camping-les-palmiers',
      photo_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
      town: 'Sanary-sur-Mer',
      region: 'Provence-Alpes-Côte d\'Azur',
      latitude: 43.1167,
      longitude: 5.8000,
      rating: 4,
      review_count: 287,
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      last_scraped_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      is_monitoring: true,
      latest_pricing: { price: 89, scraped_at: new Date().toISOString() },
      price_history: generatePriceHistory(89),
    },
    {
      id: 'mon-002',
      name: 'Camping Côte Bleue',
      url: 'https://camping-and-co.com/camping-cote-bleue',
      photo_url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=300&fit=crop',
      town: 'Bandol',
      region: 'Provence-Alpes-Côte d\'Azur',
      latitude: 43.1350,
      longitude: 5.7530,
      rating: 5,
      review_count: 412,
      created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      last_scraped_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      is_monitoring: true,
      latest_pricing: { price: 125, scraped_at: new Date().toISOString() },
      price_history: generatePriceHistory(125),
    },
    {
      id: 'mon-003',
      name: 'Camping Les Calanques',
      url: 'https://camping-and-co.com/camping-les-calanques',
      photo_url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&h=300&fit=crop',
      town: 'Cassis',
      region: 'Provence-Alpes-Côte d\'Azur',
      latitude: 43.2144,
      longitude: 5.5372,
      rating: 5,
      review_count: 521,
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      last_scraped_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      is_monitoring: true,
      latest_pricing: { price: 145, scraped_at: new Date().toISOString() },
      price_history: generatePriceHistory(145),
    },
    {
      id: 'mon-004',
      name: 'Camping Port de Plaisance',
      url: 'https://camping-and-co.com/camping-port-plaisance',
      photo_url: 'https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=400&h=300&fit=crop',
      town: 'Bandol',
      region: 'Provence-Alpes-Côte d\'Azur',
      latitude: 43.1356,
      longitude: 5.7517,
      rating: 4,
      review_count: 334,
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      last_scraped_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      is_monitoring: true,
      latest_pricing: { price: 118, scraped_at: new Date().toISOString() },
      price_history: generatePriceHistory(118),
    },
    {
      id: 'mon-005',
      name: 'Camping Famille Bonheur',
      url: 'https://camping-and-co.com/camping-famille-bonheur',
      photo_url: 'https://images.unsplash.com/photo-1496545672447-f699b503d270?w=400&h=300&fit=crop',
      town: 'Six-Fours-les-Plages',
      region: 'Provence-Alpes-Côte d\'Azur',
      latitude: 43.0972,
      longitude: 5.8200,
      rating: 4,
      review_count: 267,
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      last_scraped_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      is_monitoring: true,
      latest_pricing: { price: 82, scraped_at: new Date().toISOString() },
      price_history: generatePriceHistory(82),
    },
  ];
}

// Mock axios-like response structure
interface MockResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: any;
}

// Generate mock response
const mockResponse = <T>(data: T): MockResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
});

// Mock API client that intercepts all calls and returns demo data
const apiClient = {
  async get<T = any>(url: string, _config?: any): Promise<MockResponse<T>> {
    await simulateDelay(300);

    // Monitored competitors list - return mock data with pricing history
    if (url.includes('/competitor/monitor/list')) {
      await simulateDelay(400);
      return mockResponse({
        success: true,
        data: {
          competitors: generateMonitoredCompetitors(),
          total: 5,
          monitoring: 5,
        },
      } as T);
    }

    // Route mock responses based on URL
    if (url.includes('/competitor-data')) {
      return mockResponse({
        success: true,
        data: DEMO_DATA.competitors.map((c) => ({
          date: new Date().toISOString().split('T')[0],
          priceP50: Math.round(80 + Math.random() * 60),
          competitorId: c.id,
          competitorName: c.name,
        })),
      } as T);
    }

    if (url.includes('/analytics')) {
      return mockResponse({
        success: true,
        insights: DEMO_DATA.insights,
        kpis: {
          totalRevenue: 142800,
          avgOccupancy: 67,
          avgPrice: 95,
          totalBookings: 2150,
        },
      } as T);
    }

    if (url.includes('/files') || url.includes('/properties')) {
      return mockResponse({
        success: true,
        files: DEMO_DATA.files,
        data: DEMO_DATA.pricingData.slice(0, 100),
      } as T);
    }

    if (url.includes('/business') || url.includes('/settings')) {
      return mockResponse({
        success: true,
        settings: DEMO_BUSINESS,
      } as T);
    }

    if (url.includes('/competitors')) {
      return mockResponse({
        success: true,
        competitors: DEMO_DATA.competitors,
      } as T);
    }

    // Default mock response
    return mockResponse({
      success: true,
      message: 'Demo mode - this endpoint returns mock data',
      data: {},
    } as T);
  },

  async post<T = any>(url: string, _data?: any, _config?: any): Promise<MockResponse<T>> {
    await simulateDelay(500);

    // Competitor Discovery - return mock campsites near Bandol
    if (url.includes('/competitor/discover')) {
      await simulateDelay(1500); // Simulate longer search time
      return mockResponse({
        success: true,
        data: {
          campsites: generateMockCampsites(),
        },
      } as T);
    }

    // Start Monitoring
    if (url.includes('/competitor/monitor/start')) {
      await simulateDelay(800);
      return mockResponse({
        success: true,
        message: 'Now monitoring this campsite (demo mode)',
      } as T);
    }

    if (url.includes('/upload')) {
      return mockResponse({
        success: true,
        file: {
          id: 'demo-file-' + Date.now(),
          name: 'demo_upload.csv',
          rows: Math.floor(Math.random() * 500) + 100,
          status: 'processed',
        },
        message: 'File uploaded successfully (demo mode)',
      } as T);
    }

    if (url.includes('/chat') || url.includes('/assistant')) {
      return mockResponse({
        success: true,
        message: `This is a demo response. In the live version, you'd get AI-powered insights about your pricing strategy for ${DEMO_BUSINESS.name}.`,
      } as T);
    }

    // Default mock response
    return mockResponse({
      success: true,
      message: 'Demo mode - operation simulated successfully',
    } as T);
  },

  async put<T = any>(_url: string, _data?: any, _config?: any): Promise<MockResponse<T>> {
    await simulateDelay(400);
    return mockResponse({
      success: true,
      message: 'Demo mode - update simulated successfully',
    } as T);
  },

  async patch<T = any>(_url: string, _data?: any, _config?: any): Promise<MockResponse<T>> {
    await simulateDelay(400);
    return mockResponse({
      success: true,
      message: 'Demo mode - patch simulated successfully',
    } as T);
  },

  async delete<T = any>(_url: string, _config?: any): Promise<MockResponse<T>> {
    await simulateDelay(300);
    return mockResponse({
      success: true,
      message: 'Demo mode - delete simulated successfully',
    } as T);
  },

  // Support for axios interceptors (no-op in demo mode)
  interceptors: {
    request: {
      use: () => 0,
      eject: () => {},
    },
    response: {
      use: () => 0,
      eject: () => {},
    },
  },
};

export default apiClient;
