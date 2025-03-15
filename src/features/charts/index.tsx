import React from 'react'
import { useGraph } from './contexts/useGraph'
import MultipleLineLabGraph from './multiple-line'
import LabGraph from './single-line'
import { SingleLineGraphProps } from './types/Chart'

const GraphWrapper: React.FC<SingleLineGraphProps> = ({ testList, analyticsType, levelListSize }) => {
  const { viewMode } = useGraph()

  const Graph = viewMode === 'single' ? LabGraph : MultipleLineLabGraph

  return <Graph levelListSize={levelListSize} testList={testList} analyticsType={analyticsType} />
}

export default GraphWrapper
