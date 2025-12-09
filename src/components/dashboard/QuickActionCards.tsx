import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Zap, Database, BarChart3, Activity, ArrowUpRight } from 'lucide-react'
import { staggerContainer, staggerItem, spring } from '@/lib/motion'

export const QuickActionCards = () => {
  const navigate = useNavigate()

  const actions = [
    {
      title: 'Get Price Quote',
      subtitle: 'AI-powered pricing recommendation',
      label: 'Open Optimizer',
      icon: Zap,
      color: '#EBFF57',
      path: '/pricing/optimizer',
    },
    {
      title: 'Upload Data',
      subtitle: 'Add new CSV files to analyze',
      label: 'Manage Files',
      icon: Database,
      color: 'rgb(59, 130, 246)', // blue-500
      path: '/data-sources',
    },
    {
      title: 'View Analytics',
      subtitle: 'Deep dive into trends & insights',
      label: 'Explore Charts',
      icon: BarChart3,
      color: 'rgb(168, 85, 247)', // purple-500
      path: '/analytics',
    },
    {
      title: 'Ask AI',
      subtitle: 'Get instant answers & advice',
      label: 'Open Assistant',
      icon: Activity,
      color: 'rgb(34, 197, 94)', // green-500
      path: '/tools/assistant',
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {actions.map(action => {
        const Icon = action.icon
        return (
          <motion.div
            key={action.path}
            variants={staggerItem}
            whileHover={{ scale: 1.02, y: -4, transition: spring.snappy }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              variant="elevated"
              className="group cursor-pointer p-6 transition-all hover:shadow-xl"
              style={{ borderLeftWidth: '4px', borderLeftColor: action.color }}
              onClick={() => navigate(action.path)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400">Quick Action</p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-100">{action.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{action.subtitle}</p>
                </div>
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: `${action.color}10` }}
                >
                  <Icon className="h-6 w-6" style={{ color: action.color }} />
                </div>
              </div>
              <div
                className="mt-4 flex items-center text-sm font-medium"
                style={{ color: action.color }}
              >
                {action.label}
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
