import useFetchAnalyticsGrouped from '@/features/analytics-charts/hooks/useFetchAnalyticsGrouped'
import useDateSelector from '@/shared/hooks/useDateSelector'
import TestSelectorActions from '@/shared/ui/analytics-selectors/components/TestSelectorActions'
import DateSelector from '@/shared/ui/date-selectors'
import ErrorMessage from '@/shared/utils/components/error-message'
import buildAnalyticsEndpointByNameAndDate from '@/shared/utils/helpers/buildAnalyticsEndpointByNameAndDate'
import { BuildAnalyticsEndpointByNameAndDateProps } from '@/types/BuildAnalyticsEndpointByNameAndDateProps'
import { TestSelectorProps } from '@/types/SelectorProps'
import React, { useEffect, useState } from 'react'

const TestSelectorWithoutLevel: React.FC<TestSelectorProps> = ({
  availableTestNames,
  analyticsType,
  analyticName,
  setAnalyticGroupedData,
  setIsLoading
}) => {
  const [testName, setTestName] = useState<string>(analyticName)

  const { dateValues, combinedDateAndHandlersProps } = useDateSelector()

  const propsEndpoint: BuildAnalyticsEndpointByNameAndDateProps = {
    analyticName: testName,
    analyticsMeasurementPeriod: {
      ...dateValues
    },
    analyticsType
  }

  const endPoint = buildAnalyticsEndpointByNameAndDate(propsEndpoint)

  const { data, error } = useFetchAnalyticsGrouped(endPoint)

  useEffect(() => {
    setIsLoading(true)
    if (data && data.length > 0) {
      setIsLoading(false)
    }
    setAnalyticGroupedData(data || [])
  }, [endPoint, data, setAnalyticGroupedData, setIsLoading])

  return (
    <div className='mt-12 grid content-center items-center text-textSecondary md:mt-4 lg:mt-4 xl:flex xl:w-full xl:justify-around'>
      {error ? <ErrorMessage message={error.toString()} /> : null}
      <DateSelector {...combinedDateAndHandlersProps} />
      <div className='flex flex-row content-center items-center justify-between gap-3'>
        <div className='grid grid-cols-1 gap-1'>
          <TestSelectorActions
            analyticName={testName}
            analyticsType={analyticsType}
            availableTestNames={availableTestNames}
            isMultiSelect={true}
            levelOptions={[]}
            setTestLevel={() => {}}
            setTestName={setTestName}
            testLevel={0}
            validationUrl="/misc/analytics-table"
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(TestSelectorWithoutLevel)
