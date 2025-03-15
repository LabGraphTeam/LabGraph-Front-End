import useFetchListeningGrouped from '@/features/charts/multiple-line/hooks/useFetchListiningGrouped'
import UpdateResults from '@/features/miscs/upload-results'
import buildAnalyticsEndpointByNameAndDate from '@/features/shared/utils/helpers/buildAnalyticsEndpointByNameAndDate'
import React, { useEffect, useState } from 'react'
import DateSelector from '../../date-selectors'
import useDateSelector from '../../date-selectors/hooks/useDateSelector'
import GoogleSheetLink from '../components/GoogleSheetLink'
import TestNameSelector from '../components/TestNameSelector'
import { TestSelectorProps } from '../types/SelectorProps'

const TestSelectorWithoutLevel: React.FC<TestSelectorProps> = ({
  testNameList: list,
  analyticsType,
  name,
  setAnalyticItemList: setListing,
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

  const { url } = buildAnalyticsEndpointByNameAndDate({
    name: testName,
    date: { startDay, startMonth, startYear, endDay, endMonth, endYear },
    analyticsType
  })

  const { listing } = useFetchListeningGrouped(url)

  useEffect(() => {
    setIsLoading(true)
    if (listing && listing.length > 0) {
      setIsLoading(false)
    }
    setListing(listing)
  }, [url, listing, setListing, setIsLoading])

  const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_API_GOOGLE_SHEETS_LINK

  return (
    <div className='mt-12 grid content-center items-center gap-4 text-textSecondary md:mt-4 lg:mt-4 xl:flex xl:w-full xl:justify-around'>
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
        <TestNameSelector testName={testName} setTestName={setTestName} testNameList={list} />
        <GoogleSheetLink googleSheetUrl={GOOGLE_SHEET_URL} />
        <div className='hidden w-full md:flex'>
          <UpdateResults analyticsType={analyticsType} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(TestSelectorWithoutLevel)
