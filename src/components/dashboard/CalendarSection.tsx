import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Calendar } from 'lucide-react'
import { PriceDemandCalendar } from '../pricing/PriceDemandCalendar'
import type { DayData } from '../pricing/PriceDemandCalendar'

interface CalendarSectionProps {
  calendarData: DayData[]
}

export const CalendarSection = ({ calendarData }: CalendarSectionProps) => {
  const navigate = useNavigate()

  if (!calendarData || calendarData.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card data-tour="calendar" variant="default">
        <Card.Header>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text">Price & Demand Calendar</h2>
                <p className="mt-1 text-sm text-muted">
                  Interactive calendar showing pricing and demand patterns from your data
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/pricing/calendar')}>
              Full View →
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <PriceDemandCalendar
            data={calendarData}
            currency="€"
            onDateClick={date => {
              console.log('Selected date:', date)
            }}
          />
        </Card.Body>
      </Card>
    </motion.div>
  )
}
