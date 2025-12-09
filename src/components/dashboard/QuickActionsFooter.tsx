import { useNavigate } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { BarChart3, Activity, TrendingUp } from 'lucide-react'

export const QuickActionsFooter = () => {
  const navigate = useNavigate()

  const actions = [
    {
      title: 'Upload Data',
      description: 'Import your historical booking data',
      buttonText: 'Go to Data',
      buttonVariant: 'secondary' as const,
      icon: BarChart3,
      iconBg: 'bg-primary/10',
      iconHoverBg: 'group-hover:bg-primary/20',
      iconColor: 'text-primary',
      path: '/data',
    },
    {
      title: 'Enrich Dataset',
      description: 'Add weather, holidays, and features',
      buttonText: 'Go to Enrichment',
      buttonVariant: 'secondary' as const,
      icon: Activity,
      iconBg: 'bg-success/10',
      iconHoverBg: 'group-hover:bg-success/20',
      iconColor: 'text-success',
      path: '/enrichment',
    },
    {
      title: 'View Insights',
      description: 'Explore pricing patterns and trends',
      buttonText: 'Go to Insights',
      buttonVariant: 'primary' as const,
      icon: TrendingUp,
      iconBg: 'bg-warning/10',
      iconHoverBg: 'group-hover:bg-warning/20',
      iconColor: 'text-warning',
      path: '/insights',
    },
  ]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-text">Quick Actions</h2>
        <p className="text-sm text-muted">Manage your pricing intelligence</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {actions.map(action => {
          const Icon = action.icon
          return (
            <Card
              key={action.path}
              variant="default"
              className="group cursor-pointer transition-all hover:border-primary hover:shadow-lg"
              onClick={() => navigate(action.path)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-xl p-3 transition-colors ${action.iconBg} ${action.iconHoverBg}`}
                >
                  <Icon className={`h-6 w-6 ${action.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-semibold text-text">{action.title}</h3>
                  <p className="mb-4 text-sm text-muted">{action.description}</p>
                  <Button variant={action.buttonVariant} size="sm">
                    {action.buttonText} →
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
