import { SingleLineGraphProps } from '@/types/Chart'
import React, { useMemo } from 'react'
import { useGraph } from './hooks/useAnalyticsGraph'
import MultipleLineLabGraph from './multiple-line'
import LabGraph from './single-line'

const GraphWrapper: React.FC<SingleLineGraphProps> = ({ testList, analyticsType, size }) => {
  const { viewMode } = useGraph()

  const graphProps = { size, testList, analyticsType }

  const SingleGraph = useMemo(() => <LabGraph {...graphProps} />, [testList, analyticsType, size])

  const MultiGraph = useMemo(
    () => <MultipleLineLabGraph {...graphProps} />,
    [testList, analyticsType, size]
  )

  return <div>{viewMode === 'single' ? SingleGraph : MultiGraph}</div>
}

export default GraphWrapper
