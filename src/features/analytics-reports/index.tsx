import useReportsData from '@/features/analytics-reports/hooks/useReportsData'
import ReportsHeader from '@/features/analytics-reports/ui/header'
import ReportImage from '@/features/analytics-reports/ui/image'
import ReportsControls from '@/features/analytics-reports/ui/report-controls'
import useDateSelector from '@/features/shared/hooks/useDateSelector'
import {
  formatDateWithTime,
  formatEndDateWithTime
} from '@/features/shared/ui/date-selectors/constants/formatDateWithTime'
import Footer from '@/features/shared/ui/footer'
import { DateSelectorProps } from '@/types/DateSelectorProps'
import { useState } from 'react'

const Reports = () => {
  const [analyticsType, setAnalyticsType] = useState<string>('biochemistry-analytics')

  const dateSelector = useDateSelector()

  const { startDay, startMonth, startYear, endDay, endMonth, endYear } =
    dateSelector as DateSelectorProps

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${
    process.env.NEXT_PUBLIC_API_BASE_URL_REPORTS
  }startDate=${formatDateWithTime(startYear, startMonth, startDay)}&endDate=${formatEndDateWithTime(
    endYear,
    endMonth,
    endDay
  )}&pageSize=2500&sort=date,asc`

  // Create a formatted month string for reports
  const getMonthName = (month: number) => {
    const date = new Date()
    date.setMonth(month - 1) // month is 1-indexed in the app, but 0-indexed in Date
    return date.toLocaleString('default', { month: 'long' })
  }

  const reportMonth = getMonthName(startMonth)

  const { dataFetched } = useReportsData({ url })

  return (
    <div className='flex min-h-screen flex-col justify-evenly'>
      <ReportsHeader analyticsType={analyticsType} dataFetched={dataFetched} />
      <main className='mt-16 flex grow flex-col items-center justify-evenly bg-background xl:mt-16'>
        <ReportsControls
          analyticsType={analyticsType}
          onAnalyticsTypeChange={setAnalyticsType}
          dataFetched={dataFetched}
          dateSelectorProps={dateSelector}
          reportMonth={reportMonth}
          reportYear={startYear}
          {...dateSelector}
        />
        <ReportImage />
        <div className='mt-16 flex flex-col place-content-end items-center'>
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default Reports
