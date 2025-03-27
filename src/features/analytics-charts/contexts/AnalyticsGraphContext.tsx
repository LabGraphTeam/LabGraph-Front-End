import React, { createContext, useMemo, useState } from 'react'

import { GraphContextType, ViewMode } from '@/types/Chart'

export const GraphContext = createContext<GraphContextType | undefined>(undefined)

export const GraphProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('single')

  const toggleView = () => {
    setViewMode((current) => (current === 'single' ? 'dual' : 'single'))
  }

  const value = useMemo(() => ({ viewMode, toggleView, setViewMode }), [viewMode])

  return <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
}
