import { useContext } from 'react';
import { GraphContext } from '../contexts/GraphContext';

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (!context) throw new Error('useGraph must be used within a GraphProvider');
  return context;
};
