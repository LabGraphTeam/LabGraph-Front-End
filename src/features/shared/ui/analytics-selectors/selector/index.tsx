import MeanAndDeviationDisplay from '@/features/analytics-charts/components/MeanAndDeviationDisplay'
import useFetchAnalytics from '@/features/analytics-charts/hooks/useFetchAnalytics'
import ErrorMessage from '@/features/shared/utils/components/error-message'
import buildAnalyticsEndpoint from '@/features/shared/utils/helpers/buildAnalyticsEndpoint'
import { CommonTestSelectorProps } from '@/types/SelectorProps'
import React, { useEffect, useMemo, useState } from 'react'
import { useAnalyticsOptions } from '../../../hooks/useAnalyticsOptions'
import useDateSelector from '../../../hooks/useDateSelector'
import DateSelector from '../../date-selectors'
import TestSelectorActions from '../components/TestSelectorActions'

const TestSelectorWithLevel: React.FC<CommonTestSelectorProps> = ({
  availableTestNames: testNameList,
  analyticsType,
  analyticName: name,
  analyticLevel: level,
  setAnalyticListData,
  setIsLoading
}) => {
  const { levelOptions } = useAnalyticsOptions(analyticsType)
  const GOOGLE_SHEET_URL = useMemo(() => process.env.NEXT_PUBLIC_API_GOOGLE_SHEETS_LINK, [])
  const [testName, setTestName] = useState<string>(name)
  const [testLevel, setTestLevel] = useState<number>(level ?? 1)

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
    handleEndMonthChange
  } = useDateSelector()

  const props = useMemo(
    () =>
      buildAnalyticsEndpoint({
        analyticsType,
        analyticName: testName,
        analyticsLevel: testLevel,
        analyticsMeasurementPeriod: {
          startDay,
          startMonth,
          startYear,
          endDay,
          endMonth,
          endYear
        }
      }),
    [analyticsType, testName, testLevel, startDay, startMonth, startYear, endDay, endMonth, endYear]
  )
  const { data, isLoading, error } = useFetchAnalytics(props)

  useEffect(() => {
    if (!error && !isLoading && data && data?.analyticsDTO?.length > 0) {
      setAnalyticListData(data)
      setIsLoading(false)
    }
  }, [data, isLoading, setAnalyticListData, setIsLoading])

  return (
    <div className='mt-12 grid place-content-center items-center text-textSecondary md:mt-0 md:flex md:w-full md:justify-around'>
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
        handleEndYearChange={handleEndDayChange}
      />
      <div className='grid grid-cols-1 gap-1'>
        <TestSelectorActions
          availableTestNames={testNameList}
          analyticName={testName}
          setTestName={setTestName}
          levelOptions={levelOptions}
          testLevel={testLevel}
          setTestLevel={setTestLevel}
          analyticsType={analyticsType}
          googleSheetUrl={GOOGLE_SHEET_URL ?? ''}
        />
        <MeanAndDeviationDisplay
          mean={data?.analyticsDTO[0]?.mean ?? 0}
          sd={data?.analyticsDTO[0]?.sd ?? 0}
          ownMean={data?.calcMeanAndStdDTO.mean ?? 0}
          ownSd={data?.calcMeanAndStdDTO.standardDeviation ?? 0}
          unitValue={data?.analyticsDTO[0]?.unit_value ?? ''}
        />
      </div>
    </div>
  )
}
export default TestSelectorWithLevel
