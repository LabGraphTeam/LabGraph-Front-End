import { useAnalyticsGraph } from '@/features/analytics-charts/hooks/useAnalyticsGraph'
import MultipleLineLabGraph from '@/features/analytics-charts/multiple-line'
import LabGraph from '@/features/analytics-charts/single-line'
import { SingleLineGraphProps } from '@/types/Chart'
import React, { useMemo } from 'react'

const GraphWrapper: React.FC<SingleLineGraphProps> = ({ testList, analyticsType, size }) => {
  const { viewMode } = useAnalyticsGraph()

  const graphProps = { size, testList, analyticsType }

  const SingleGraph = useMemo(() => <LabGraph {...graphProps} />, [testList, analyticsType, size])

  const MultiGraph = useMemo(
    () => <MultipleLineLabGraph {...graphProps} />,
    [testList, analyticsType, size]
  )

  return <div>{viewMode === 'single' ? SingleGraph : MultiGraph}</div>
}

export default GraphWrapper
