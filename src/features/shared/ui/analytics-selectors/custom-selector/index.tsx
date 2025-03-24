import useFetchAnalyticsGrouped from '@/features/analytics-charts/hooks/useFetchAnalyticsGrouped'
import UpdateResults from '@/features/analytics-upload-files'
import ErrorMessage from '@/features/shared/utils/components/error-message'
import buildAnalyticsEndpointByNameAndDate from '@/features/shared/utils/helpers/buildAnalyticsEndpointByNameAndDate'
import { TestSelectorProps } from '@/types/SelectorProps'
import React, { useEffect, useState } from 'react'
import useDateSelector from '../../../hooks/useDateSelector'
import DateSelector from '../../date-selectors'
import GoogleSheetLink from '../components/GoogleSheetLink'
import TestNameSelector from '../components/TestNameSelector'

const TestSelectorWithoutLevel: React.FC<TestSelectorProps> = ({
  availableTestNames,
  analyticsType,
  analyticName,
  setAnalyticGroupedData,
  setIsLoading
}) => {
  const [testName, setTestName] = useState<string>(analyticName)

  const { dateValues, dateHandlers: handlers } = useDateSelector()

  const dateValuesAndHandlers = {
    ...dateValues,
    ...handlers
  }

  const endPoint = buildAnalyticsEndpointByNameAndDate({
    analyticName: testName,
    analyticsMeasurementPeriod: {
      ...dateValues
    },
    analyticsType
  })

  const { data, error } = useFetchAnalyticsGrouped(endPoint)

  useEffect(() => {
    setIsLoading(true)
    if (data && data.length > 0) {
      setIsLoading(false)
    }
    setAnalyticGroupedData(data || [])
  }, [endPoint, data, setAnalyticGroupedData, setIsLoading])

  const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_API_GOOGLE_SHEETS_LINK

  return (
    <div className='mt-12 grid content-center items-center text-textSecondary md:mt-4 lg:mt-4 xl:flex xl:w-full xl:justify-around'>
      {error && <ErrorMessage message={error.toString()} />}
      <DateSelector {...dateValuesAndHandlers} />
      <div className='flex flex-row content-center items-center justify-between gap-3'>
        <TestNameSelector
          analyticName={testName}
          setTestName={setTestName}
          availableTestNames={availableTestNames}
        />
        <GoogleSheetLink googleSheetUrl={GOOGLE_SHEET_URL} />
        <div className='hidden w-full md:flex'>
          <UpdateResults analyticsType={analyticsType} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(TestSelectorWithoutLevel)
