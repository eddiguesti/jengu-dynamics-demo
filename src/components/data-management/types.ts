// Types for Data Management
import { Cloud, Calendar, Clock } from 'lucide-react'

export interface UploadedFile {
  name: string
  size: number
  type: string
  status: 'pending' | 'processing' | 'success' | 'error'
  rows?: number
  columns?: number
  preview?: any[]
  uniqueId?: string
}

export interface EnrichmentFeature {
  id: string
  name: string
  description: string
  icon: React.ElementType
  status: 'idle' | 'running' | 'complete' | 'error'
  progress: number
  fields: string[]
}

export type Step = 'upload' | 'enrichment'

export const DEFAULT_ENRICHMENT_FEATURES: EnrichmentFeature[] = [
  {
    id: 'weather',
    name: 'Weather Data',
    description: 'Temperature, precipitation, sunshine hours',
    icon: Cloud,
    status: 'idle',
    progress: 0,
    fields: ['temperature', 'precipitation', 'sunshine_hours', 'weather_condition'],
  },
  {
    id: 'holidays',
    name: 'Holidays & Events',
    description: 'Public holidays, school breaks, local events',
    icon: Calendar,
    status: 'idle',
    progress: 0,
    fields: ['is_holiday', 'holiday_name', 'is_school_break'],
  },
  {
    id: 'temporal',
    name: 'Temporal Features',
    description: 'Day of week, season, weekend indicators',
    icon: Clock,
    status: 'idle',
    progress: 0,
    fields: ['day_of_week', 'month', 'season', 'is_weekend'],
  },
]

// Enriched columns to highlight in preview
export const ENRICHED_COLUMNS = [
  'temperature',
  'precipitation',
  'weathercondition',
  'sunshinehours',
  'isholiday',
  'holidayname',
  'dayofweek',
  'month',
  'season',
  'isweekend',
]

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
