import React from 'react'
import { Card } from '../ui/Card'
import {
  LineChart,
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts'
import { PricingData } from './types'

interface PricingChartsProps {
  data: PricingData[]
}

const chartTooltipStyle = {
  backgroundColor: '#1A1A1A',
  border: '1px solid #2A2A2A',
  borderRadius: '8px',
}

export const PriceTimelineChart: React.FC<PricingChartsProps> = ({ data }) => {
  return (
    <Card variant="elevated">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text">Price Optimization Timeline</h2>
            <p className="mt-1 text-sm text-muted">Current vs. Optimized pricing strategy</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-400" />
              <span className="text-xs text-muted">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-xs text-muted">Optimized</span>
            </div>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="optimizedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EBFF57" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EBFF57" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend />
            <Area
              type="monotone"
              dataKey="optimized_price"
              stroke="#EBFF57"
              strokeWidth={3}
              fill="url(#optimizedGradient)"
              name="Optimized Price"
            />
            <Line
              type="monotone"
              dataKey="current_price"
              stroke="#9CA3AF"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Current Price"
            />
            <Bar
              dataKey="demand_forecast"
              fill="#10B981"
              fillOpacity={0.2}
              name="Demand Forecast"
              yAxisId="right"
            />
            <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  )
}

export const RevenueForecastChart: React.FC<PricingChartsProps> = ({ data }) => {
  return (
    <Card variant="default">
      <Card.Header>
        <h2 className="text-lg font-semibold text-text">Revenue Forecast</h2>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend />
            <Bar
              dataKey="revenue_current"
              fill="#9CA3AF"
              name="Current Revenue"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="revenue_optimized"
              fill="#EBFF57"
              name="Optimized Revenue"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  )
}

export const OccupancyForecastChart: React.FC<PricingChartsProps> = ({ data }) => {
  return (
    <Card variant="default">
      <Card.Header>
        <h2 className="text-lg font-semibold text-text">Occupancy Forecast</h2>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" domain={[0, 100]} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend />
            <Line
              type="monotone"
              dataKey="occupancy_current"
              stroke="#9CA3AF"
              strokeWidth={2}
              dot={{ fill: '#9CA3AF', r: 4 }}
              name="Current Occupancy"
            />
            <Line
              type="monotone"
              dataKey="occupancy_optimized"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', r: 4 }}
              name="Optimized Occupancy"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  )
}
