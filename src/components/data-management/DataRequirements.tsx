import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Card } from '../ui'

export const DataRequirements: React.FC = () => {
  return (
    <Card variant="default">
      <Card.Header>
        <h3 className="text-lg font-semibold text-text">Data Requirements</h3>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-text">Required Columns</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                <span>Date column (booking_date, check_in, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                <span>Price column (price, rate, amount, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                <span>Demand indicator (bookings, occupancy, etc.)</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-text">Best Practices</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Include at least 6-12 months of data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Use consistent date formats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Remove sensitive customer information</span>
              </li>
            </ul>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
