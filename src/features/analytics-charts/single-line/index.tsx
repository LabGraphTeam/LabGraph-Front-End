import { useState } from 'react'

import ControlChart from '@/features/analytics-charts/single-line/components/ControlChart'
import { useAnalyticsOptions } from '@/features/shared/hooks/useAnalyticsOptions'
import TestSelectorWithLevel from '@/shared/ui/analytics-selectors/selector'
import MainLayout from '@/shared/ui/layouts/MainLayout'
import Loading from '@/shared/utils/components/loading'
import { AnalyticWithStatsData, SingleLineGraphProps } from '@/types/Chart'

const LabGraph: React.FC<SingleLineGraphProps> = ({
  availableAnalyticsNames,
  defaultAnalyticsType
}) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticWithStatsData>()
  const [analyticsType, setAnalyticsType] = useState<string>(defaultAnalyticsType)
  const [analyticsName, setAnalyticsName] = useState<string>(availableAnalyticsNames[0])
  const [analyticsLevel, setAnalyticsLevel] = useState<number>(1)

  const [isLoading, setIsLoading] = useState(true)

  const { levelOptions } = useAnalyticsOptions(analyticsType)

  return (
    <MainLayout title={` Analytics-Charts 🥼🔬`}>
      <div className='mb-4 mt-16 flex justify-start md:mt-44'>
        <TestSelectorWithLevel
          analyticsType={analyticsType}
          availableAnalyticsNames={availableAnalyticsNames}
          analyticsLevel={analyticsLevel}
          analyticsName={analyticsName}
          setAnalyticsType={setAnalyticsType}
          setAnalyticsName={setAnalyticsName}
          setAnalyticsLevel={setAnalyticsLevel}
          setAnalyticsData={setAnalyticsData}
          setIsLoading={setIsLoading}
          levelOptions={levelOptions}
        />
      </div>
      <div className='flex min-h-full w-full items-center justify-center'>
        {isLoading ? (
          <Loading />
        ) : (
          <ControlChart
            analyticsDTO={analyticsData?.analyticsDTO ?? []}
            calcMeanAndStdDTO={{
              mean: analyticsData?.calcMeanAndStdDTO.mean ?? 0,
              standardDeviation: analyticsData?.calcMeanAndStdDTO.standardDeviation ?? 0
            }}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default LabGraph
