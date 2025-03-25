import ControlChart from '@/features/analytics-charts/single-line/components/ControlChart'
import TestSelectorWithLevel from '@/shared/ui/analytics-selectors/selector'
import MainLayout from '@/shared/ui/layouts/MainLayout'
import Loading from '@/shared/utils/components/loading'
import { AnalyticWithStatsData, SingleLineGraphProps } from '@/types/Chart'
import { useState } from 'react'

const LabGraph: React.FC<SingleLineGraphProps> = ({ testList, analyticsType }) => {
  const [dataFetched, setDataFetched] = useState<AnalyticWithStatsData>()
  const [isLoading, setIsLoading] = useState(true)

  return (
    <MainLayout title={` Analytics-Charts 🥼🔬`}>
      <div className='mb-4 mt-16 flex justify-start md:mt-44'>
        <TestSelectorWithLevel
          analyticsType={analyticsType}
          availableTestNames={testList}
          defaultAnalyticsLevel={1}
          defaultAnalyticsName={testList[0]}
          setAnalyticListData={setDataFetched}
          setIsLoading={setIsLoading}
        />
      </div>
      <div className='flex min-h-full w-full items-center justify-center'>
        {isLoading ? (
          <Loading />
        ) : (
          <ControlChart
            analyticsDTO={dataFetched?.analyticsDTO ?? []}
            calcMeanAndStdDTO={{
              mean: dataFetched?.calcMeanAndStdDTO.mean ?? 0,
              standardDeviation: dataFetched?.calcMeanAndStdDTO.standardDeviation ?? 0
            }}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default LabGraph
