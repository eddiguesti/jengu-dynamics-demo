import { useNavigate } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Database, BarChart3, TrendingUp, Activity, Zap } from 'lucide-react'

export const EmptyState = () => {
  const navigate = useNavigate()

  return (
    <Card variant="elevated" className="py-20 text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <div className="rounded-full bg-primary/10 p-6">
          <Database className="h-16 w-16 text-primary" />
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-text">
            Add Data to See Your Complete Dashboard
          </h2>
          <p className="mb-6 text-lg text-muted">
            Upload your historical booking data to unlock powerful insights, analytics, and
            AI-powered pricing recommendations.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button variant="primary" size="lg" onClick={() => navigate('/data')}>
            <Database className="mr-2 h-5 w-5" />
            Upload Data Now
          </Button>
          <Button variant="ghost" size="lg" onClick={() => navigate('/assistant')}>
            Learn How It Works
          </Button>
        </div>

        {/* Preview of what they'll get */}
        <div className="mt-8 w-full border-t border-border pt-8">
          <p className="mb-4 text-sm text-muted">Once you upload data, you&apos;ll see:</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-elevated p-4">
              <BarChart3 className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-xs font-medium text-text">Revenue Charts</p>
            </div>
            <div className="rounded-lg border border-border bg-elevated p-4">
              <TrendingUp className="mx-auto mb-2 h-6 w-6 text-success" />
              <p className="text-xs font-medium text-text">Occupancy Trends</p>
            </div>
            <div className="rounded-lg border border-border bg-elevated p-4">
              <Activity className="mx-auto mb-2 h-6 w-6 text-warning" />
              <p className="text-xs font-medium text-text">Price Analytics</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export const WelcomeBanner = () => {
  const navigate = useNavigate()

  return (
    <Card
      variant="elevated"
      className="border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-primary/10 p-4">
          <Zap className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-semibold text-text">
            Welcome to Jengu Dynamic Pricing
          </h3>
          <p className="mb-4 text-muted">
            Start by uploading your booking data, then enrich it with weather and competitor
            intelligence. Our ML models will help you optimize pricing for maximum revenue and
            occupancy.
          </p>
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => navigate('/data')}>
              Get Started
            </Button>
            <Button variant="ghost" onClick={() => navigate('/assistant')}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
