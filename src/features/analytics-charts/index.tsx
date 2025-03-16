import { SingleLineGraphProps } from '@/types/Chart'
import React, { useMemo } from 'react'
import { useGraph } from './hooks/useAnalyticsGraph'
import MultipleLineLabGraph from './multiple-line'
import LabGraph from './single-line'

const GraphWrapper: React.FC<SingleLineGraphProps> = ({
  testList,
  analyticsType,
  levelListSize
}) => {
  const { viewMode } = useGraph()

  const graphProps = { levelListSize, testList, analyticsType }

  const SingleGraph = useMemo(
    () => <LabGraph {...graphProps} />,
    [testList, analyticsType, levelListSize]
  )

  const MultiGraph = useMemo(
    () => <MultipleLineLabGraph {...graphProps} />,
    [testList, analyticsType, levelListSize]
  )

  return <div>{viewMode === 'single' ? SingleGraph : MultiGraph}</div>
}

export default GraphWrapper
