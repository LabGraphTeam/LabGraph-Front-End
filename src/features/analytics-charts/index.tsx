import React, { useMemo } from 'react'

import { useAnalyticsGraph } from '@/features/analytics-charts/hooks/useAnalyticsGraph'
import MultipleLineLabGraph from '@/features/analytics-charts/multiple-line'
import LabGraph from '@/features/analytics-charts/single-line'
import { SingleLineGraphProps } from '@/types/Chart'

const GraphWrapper: React.FC<SingleLineGraphProps> = ({
  availableAnalyticsNames,
  defaultAnalyticsType,
  size
}) => {
  const { viewMode } = useAnalyticsGraph()

  const graphProps = useMemo(
    () => ({ size, availableAnalyticsNames, defaultAnalyticsType }),
    [size, availableAnalyticsNames, defaultAnalyticsType]
  )

  const SingleGraph = useMemo(() => <LabGraph {...graphProps} />, [graphProps])

  const MultiGraph = useMemo(() => <MultipleLineLabGraph {...graphProps} />, [graphProps])

  return <div>{viewMode === 'single' ? SingleGraph : MultiGraph}</div>
}

export default GraphWrapper
