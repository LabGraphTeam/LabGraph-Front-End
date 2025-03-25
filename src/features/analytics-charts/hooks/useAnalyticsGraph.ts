import { GraphContext } from '@/features/analytics-charts/contexts/AnalyticsGraphContext'
import { useContext } from 'react'

export const useAnalyticsGraph = () => {
  const context = useContext(GraphContext)
  if (!context) throw new Error('useGraph must be used within a GraphProvider')
  return context
}
