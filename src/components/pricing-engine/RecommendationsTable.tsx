import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Download } from 'lucide-react'
import { PriceRecommendation } from './types'

interface RecommendationsTableProps {
  recommendations: PriceRecommendation[]
  onExportCSV: () => void
}

export const RecommendationsTable: React.FC<RecommendationsTableProps> = ({
  recommendations,
  onExportCSV,
}) => {
  if (recommendations.length === 0) return null

  return (
    <Card data-tour="recommendations" variant="elevated">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text">Daily Pricing Recommendations</h2>
            <p className="mt-1 text-sm text-muted">Room/Pitch-level pricing for each day</p>
          </div>
          <Button variant="outline" size="sm" onClick={onExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">
                  Day
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted">
                  Current Price
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted">
                  Recommended
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted">
                  Occupancy
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted">
                  Impact
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted">
                  Confidence
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recommendations.map((rec, index) => {
                const date = new Date(rec.date)
                const dateStr = date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
                const priceDiff = rec.recommended_price - rec.current_price

                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="transition-colors hover:bg-elevated/50"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-text">{dateStr}</td>
                    <td className="px-4 py-3 text-sm text-muted">{rec.day}</td>
                    <td className="px-4 py-3 text-right text-sm text-muted">€{rec.current_price}</td>
                    <td className="px-4 py-3 text-right text-sm">
                      <span className="font-semibold text-primary">€{rec.recommended_price}</span>
                      <span
                        className={`ml-2 text-xs ${priceDiff >= 0 ? 'text-success' : 'text-error'}`}
                      >
                        {priceDiff >= 0 ? '+' : ''}€{priceDiff}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      <Badge
                        variant={
                          rec.expected_occupancy > 85
                            ? 'success'
                            : rec.expected_occupancy > 70
                              ? 'default'
                              : 'warning'
                        }
                        size="sm"
                      >
                        {rec.expected_occupancy}%
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      <span
                        className={`font-medium ${rec.revenue_impact >= 0 ? 'text-success' : 'text-error'}`}
                      >
                        {rec.revenue_impact >= 0 ? '+' : ''}
                        {rec.revenue_impact}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      <Badge
                        variant={
                          rec.confidence === 'high'
                            ? 'success'
                            : rec.confidence === 'medium'
                              ? 'default'
                              : 'warning'
                        }
                        size="sm"
                      >
                        {rec.confidence}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  )
}
