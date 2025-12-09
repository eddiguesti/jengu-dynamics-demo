import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Calendar } from 'lucide-react'
import { PriceDemandCalendar } from '../pricing/PriceDemandCalendar'
import type { DayData } from '../pricing/PriceDemandCalendar'
import { useLanguageStore } from '@/stores/useLanguageStore'

const translations = {
  en: {
    title: 'Price & Demand Calendar',
    description: 'Interactive calendar showing pricing and demand patterns from your data',
    fullView: 'Full View',
  },
  fr: {
    title: 'Calendrier Prix & Demande',
    description: 'Calendrier interactif affichant les prix et la demande de vos données',
    fullView: 'Vue Complète',
  },
}

interface CalendarSectionProps {
  calendarData: DayData[]
}

export const CalendarSection = ({ calendarData }: CalendarSectionProps) => {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]

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
                <h2 className="text-xl font-semibold text-text">{t.title}</h2>
                <p className="mt-1 text-sm text-muted">
                  {t.description}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/pricing/calendar')}>
              {t.fullView} →
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
