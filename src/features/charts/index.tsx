import { useGraph } from '@/features/charts/contexts/GraphContext';
import React from 'react';
import MultipleLineLabGraph from './multiple-line';
import LabGraph from './single-line';
import { LabGraphProps } from './types/Chart';

const GraphWrapper: React.FC<LabGraphProps> = ({ testList, analyticsType, levelListSize }) => {
  const { viewMode } = useGraph();

  const Graph = viewMode === 'single' ? LabGraph : MultipleLineLabGraph;

  return <Graph levelListSize={levelListSize} testList={testList} analyticsType={analyticsType} />;
};

export default GraphWrapper;
