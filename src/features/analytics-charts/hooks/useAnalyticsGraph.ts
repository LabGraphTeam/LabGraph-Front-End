import { useContext } from 'react'
import { GraphContext } from '../contexts/AnalyticsGraphContext'

export const useGraph = () => {
  const context = useContext(GraphContext)
  if (!context) throw new Error('useGraph must be used within a GraphProvider')
  return context
}
