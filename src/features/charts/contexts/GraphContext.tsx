import React, { createContext, useState } from 'react';
import { GraphContextType, ViewMode } from '../types/Chart';

export const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('single');

  const toggleView = () => {
    setViewMode((current) => (current === 'single' ? 'dual' : 'single'));
  };

  return (
    <GraphContext.Provider value={{ viewMode, toggleView, setViewMode }}>
      {children}
    </GraphContext.Provider>
  );
};
