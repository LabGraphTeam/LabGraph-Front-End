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
  availableTestNames: list,
  analyticsType,
  analyticName: name,
  setAnalyticGroupedData: setdata,
  setIsLoading
}) => {
  const [testName, setTestName] = useState<string>(name)
  const {
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    handleStartDayChange,
    handleStartMonthChange,
    handleStartYearChange,
    handleEndDayChange,
    handleEndMonthChange,
    handleEndYearChange
  } = useDateSelector()

  const endPoint = buildAnalyticsEndpointByNameAndDate({
    analyticName: testName,
    analyticsMeasurementPeriod: { startDay, startMonth, startYear, endDay, endMonth, endYear },
    analyticsType
  })

  const { data, error } = useFetchAnalyticsGrouped(endPoint)

  useEffect(() => {
    setIsLoading(true)
    if (data && data.length > 0) {
      setIsLoading(false)
    }
    setdata(data || [])
  }, [endPoint, data, setdata, setIsLoading])

  const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_API_GOOGLE_SHEETS_LINK

  return (
    <div className='mt-12 grid content-center items-center text-textSecondary md:mt-4 lg:mt-4 xl:flex xl:w-full xl:justify-around'>
      {error && <ErrorMessage message={error.toString()} />}
      <DateSelector
        startDay={startDay}
        startMonth={startMonth}
        startYear={startYear}
        endDay={endDay}
        endMonth={endMonth}
        endYear={endYear}
        handleStartDayChange={handleStartDayChange}
        handleStartMonthChange={handleStartMonthChange}
        handleStartYearChange={handleStartYearChange}
        handleEndDayChange={handleEndDayChange}
        handleEndMonthChange={handleEndMonthChange}
        handleEndYearChange={handleEndYearChange}
      />
      <div className='flex flex-row content-center items-center justify-between gap-3'>
        <TestNameSelector
          analyticName={testName}
          setTestName={setTestName}
          availableTestNames={list}
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
