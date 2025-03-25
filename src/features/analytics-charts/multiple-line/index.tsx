import MultipleLineControlChart from '@/features/analytics-charts/multiple-line/components/MultipleLineControlChart'
import TestSelectorWithoutLevel from '@/shared/ui/analytics-selectors/custom-selector'
import MainLayout from '@/shared/ui/layouts/MainLayout'
import Loading from '@/shared/utils/components/loading'
import { GroupedAnalyticData, MultipleLineGraphProps } from '@/types/Chart'
import React, { useState } from 'react'

const MultipleLineLabGraph: React.FC<MultipleLineGraphProps> = ({ testList, analyticsType }) => {
  const [analyticsGroupData, setAnalyticsGroupData] = useState<GroupedAnalyticData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <MainLayout title={`LabGraph - ${'Analytics Table'}`}>
      <div className='flex flex-col'>
        <div className='mb-8 mt-14 flex justify-evenly md:mt-28 xl:mt-36'>
          <TestSelectorWithoutLevel
            analyticName={testList[0]}
            analyticsType={analyticsType}
            availableTestNames={testList}
            setAnalyticGroupedData={setAnalyticsGroupData}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className='flex min-h-full w-full flex-col items-center justify-evenly'>
          {isLoading ? (
            <Loading />
          ) : (
            <MultipleLineControlChart groupedAnalysisData={analyticsGroupData} />
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default MultipleLineLabGraph
