// Dashboard Types

export interface ProcessedDashboardData {
  totalRecords: number
  avgPrice: number
  avgOccupancy: number
  revenueData: RevenueDataPoint[]
  occupancyByDay: OccupancyByDayPoint[]
  priceTimeSeries: PriceTimeSeriesPoint[]
  calendarData: import('../pricing/PriceDemandCalendar').DayData[]
  metrics: import('./MetricsBar').MetricsData | null
}

export interface RevenueDataPoint {
  month: string
  revenue: number
  avgRevenue: number
}

export interface OccupancyByDayPoint {
  day: string
  occupancy: number
}

export interface PriceTimeSeriesPoint {
  date: string
  price: number
}

export const EMPTY_PROCESSED_DATA: ProcessedDashboardData = {
  totalRecords: 0,
  avgPrice: 0,
  avgOccupancy: 0,
  revenueData: [],
  occupancyByDay: [],
  priceTimeSeries: [],
  calendarData: [],
  metrics: null,
}
