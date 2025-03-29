import React, { useState } from 'react'

import MultipleLineControlChart from '@/features/analytics-charts/multiple-line/components/MultipleLineControlChart'
import TestSelectorWithoutLevel from '@/shared/ui/analytics-selectors/custom-selector'
import MainLayout from '@/shared/ui/layouts/MainLayout'
import Loading from '@/shared/utils/components/loading'
import { GroupedAnalyticData, MultipleLineGraphProps } from '@/types/Chart'

const MultipleLineLabGraph: React.FC<MultipleLineGraphProps> = ({
  availableAnalyticsNames,
  defaultAnalyticsType
}) => {
  const [analyticsGroupData, setAnalyticsGroupData] = useState<GroupedAnalyticData[]>([])
  const [analyticsType, setAnalyticsType] = useState<string>(defaultAnalyticsType)
  const [analyticsName, setAnalyticsName] = useState<string>(availableAnalyticsNames[0])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <MainLayout title={`LabGraph - ${'Analytics Table'}`}>
      <div className='flex flex-col'>
        <div className='mb-8 mt-14 md:mt-28 xl:mt-36'>
          <TestSelectorWithoutLevel
            analyticsName={analyticsName}
            analyticsType={analyticsType}
            availableAnalyticsNames={availableAnalyticsNames}
            setAnalyticsName={setAnalyticsName}
            setAnalyticsType={setAnalyticsType}
            setGroupedAnalyticData={setAnalyticsGroupData}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className='flex min-h-full w-full flex-col items-center justify-center'>
          {isLoading ? (
            <Loading />
          ) : (
            <MultipleLineControlChart groupedAnalysisData={analyticsGroupData ?? []} />
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default MultipleLineLabGraph
