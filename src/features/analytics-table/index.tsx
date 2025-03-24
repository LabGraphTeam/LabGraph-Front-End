import { AnalyticWithValidatedUser } from '@/types/AnalyticsTable'
import { useEffect, useMemo, useState } from 'react'
import GeneratePdf from '../analytics-reports/generate-pdf'
import { useAnalyticsOptions } from '../shared/hooks/useAnalyticsOptions'
import useDateSelector from '../shared/hooks/useDateSelector'
import useWindowDimensions from '../shared/hooks/useWindowDimensions'
import ErrorMessage from '../shared/utils/components/error-message'
import { buildAnalyticsValidationEndpoint } from '../shared/utils/helpers/buildAnalyticsTableEndpoint'
import AnalyticsFilters from './components/AnalyticsFilters'
import AnalyticsPagination from './components/AnalyticsPagination'
import AnalyticsTable from './components/AnalyticsTable'
import { useFetchAnalyticsTable } from './hooks/useFetchAnalyticsTable'
import MainLayout from './layouts/MainLayout'

const AnalyticsTableIndex = () => {
  const [analyticsType, setAnalyticsType] = useState('biochemistry-analytics')
  const [analyticData, setAnalyticData] = useState<AnalyticWithValidatedUser[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(7)
  const [level, setLevel] = useState(0)
  const [isFiltered, setIsFiltered] = useState(false)
  const { analyticsOptions, levelOptions, filters } = useAnalyticsOptions(analyticsType)
  const [unValidatedFilter, setUnValidatedFilter] = useState(false)
  const { width } = useWindowDimensions()

  const { dateValues, dateHandlers, startDate, endDate } = useDateSelector()

  const dateValuesAndHandlers = {
    ...dateValues,
    ...dateHandlers
  }

  const endPoint = useMemo(
    () =>
      buildAnalyticsValidationEndpoint({
        analyticsType,
        analyticsLevel: level,
        analyticsMeasurementPeriod: {
          ...dateValues
        },
        isFiltered,
        itemsPerPage,
        currentPage,
        analyticName: '-',
        unValidatedFilter
      }),
    [
      analyticsType,
      level,
      isFiltered,
      itemsPerPage,
      currentPage,
      unValidatedFilter,
      startDate,
      endDate,
      width
    ]
  )

  const { isLoading, validateAnalytics, updateDescription, error, data } = useFetchAnalyticsTable({
    endPoint,
    analyticsType,
    level,
    startDate,
    endDate,
    itemsPerPage,
    currentPage,
    setAnalyticData,
    analyticData
  })

  useEffect(() => {
    if (!error && !isLoading && data && data?.content?.length > 0) {
      setTotalPages(data.page.totalPages)
      setItemsPerPage(width >= 1800 ? 10 : 6)
      setAnalyticData(data.content)
    }

    if (error) {
      setTotalPages(0)
      setAnalyticData([])
    }
  }, [data, isLoading, setAnalyticData, width, setItemsPerPage])

  return (
    <MainLayout title={`LabGraph - ${'Analytics Table'}`}>
      {error && <ErrorMessage message={error.toString()} />}
      <AnalyticsFilters
        dateSelector={dateValuesAndHandlers}
        analyticsOptions={analyticsOptions}
        analyticsType={analyticsType}
        setAnalyticsType={setAnalyticsType}
        levelOptions={levelOptions}
        level={level}
        unValidFilter={unValidatedFilter}
        setLevel={setLevel}
        setFiltered={setIsFiltered}
        setUnValidatedFilter={setUnValidatedFilter}
        filters={filters}
      />
      <span className='hidden justify-end md:flex'>
        <GeneratePdf
          fileName={analyticsType}
          reportMonth={startDate.month.toString()}
          reportYear={startDate.year}
          buttonText={'Generate Report'}
          analyticsType={analyticsType}
          startDate={{
            day: startDate.day,
            month: startDate.month,
            year: startDate.year
          }}
          endDate={{
            day: endDate.day,
            month: endDate.month,
            year: endDate.year
          }}
        />
      </span>

      <AnalyticsTable
        items={analyticData}
        isLoading={isLoading}
        onValidate={validateAnalytics}
        onUpdateDescription={updateDescription}
      />

      <AnalyticsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        analyticsData={analyticData}
        setCurrentPage={setCurrentPage}
      />
    </MainLayout>
  )
}

export default AnalyticsTableIndex
