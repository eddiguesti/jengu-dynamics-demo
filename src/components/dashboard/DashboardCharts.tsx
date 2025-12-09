import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { RevenueDataPoint, OccupancyByDayPoint, PriceTimeSeriesPoint } from './types'

interface RevenueChartProps {
  data: RevenueDataPoint[]
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  if (data.length === 0) return null

  return (
    <Card variant="default">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">Revenue Performance</h2>
            <p className="mt-1 text-sm text-muted">Monthly revenue (last 6 months)</p>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EBFF57" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EBFF57" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: '#FAFAFA',
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#EBFF57"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  )
}

interface OccupancyChartProps {
  data: OccupancyByDayPoint[]
}

export const OccupancyChart = ({ data }: OccupancyChartProps) => {
  if (data.length === 0) return null

  return (
    <Card variant="default">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">Weekly Occupancy</h2>
            <p className="mt-1 text-sm text-muted">Average occupancy by day</p>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: '#FAFAFA',
              }}
            />
            <Bar dataKey="occupancy" fill="#EBFF57" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  )
}

interface PriceTrendChartProps {
  data: PriceTimeSeriesPoint[]
  avgPrice: number
}

export const PriceTrendChart = ({ data, avgPrice }: PriceTrendChartProps) => {
  if (data.length === 0) return null

  return (
    <Card variant="default">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">Price Trend</h2>
            <p className="mt-1 text-sm text-muted">Last {data.length} days</p>
          </div>
          <Badge variant="default">€{avgPrice} Avg</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: '#FAFAFA',
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  )
}
