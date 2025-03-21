import { useCallback, useEffect, useState } from 'react'
import { useAnalyticsOptions } from '../shared/hooks/useAnalyticsOptions'
import useDateSelector from '../shared/hooks/useDateSelector'
import useWindowDimensions from '../shared/hooks/useWindowDimensions'
import ErrorMessage from '../shared/utils/components/error-message'
import Loading from '../shared/utils/components/loading'
import { buildAnalyticsValidationEndpoint } from '../shared/utils/helpers/buildAnalyticsTableEndpoint'
import AnalyticsFilters from './components/AnalyticsFilters'
import AnalyticsPagination from './components/AnalyticsPagination'
import AnalyticsTable from './components/AnalyticsTable'
import { useFetchAnalyticsTable } from './hooks/useFetchAnalyticsTable'
import MainLayout from './layouts/MainLayout'

const AnalyticsTableIndex = () => {
  const dateSelector = useDateSelector()
  const [analyticsType, setAnalyticsType] = useState('biochemistry-analytics')
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(7)
  const [level, setLevel] = useState(0)
  const [isFiltered, setIsFiltered] = useState(false)
  const { analyticsOptions, levelOptions, filters } = useAnalyticsOptions(analyticsType)
  const [unValidatedFilter, setUnValidatedFilter] = useState(false)

  const { width } = useWindowDimensions()

  const startDate = {
    day: dateSelector.startDay,
    month: dateSelector.startMonth,
    year: dateSelector.startYear
  }

  const endDate = {
    day: dateSelector.endDay,
    month: dateSelector.endMonth,
    year: dateSelector.endYear
  }

  const {
    analyticData,
    isLoading,
    isTokenLoading,
    fetchData,
    totalPages,
    validateAnalytics,
    updateDescription,
    error
  } = useFetchAnalyticsTable({
    analyticsType,
    level,
    startDate,
    endDate,
    itemsPerPage,
    currentPage
  })

  const handlePageChange = useCallback(
    async (url: string): Promise<void> => {
      await fetchData(url)
    },
    [isFiltered, analyticsType, level, itemsPerPage, currentPage]
  )

  const getParams = useCallback(() => {
    return buildAnalyticsValidationEndpoint({
      analyticsType,
      level,
      date: {
        startDay: dateSelector.startDay,
        startMonth: dateSelector.startMonth,
        startYear: dateSelector.startYear,
        endDay: dateSelector.endDay,
        endMonth: dateSelector.endMonth,
        endYear: dateSelector.endYear
      },
      isFiltered,
      itemsPerPage,
      currentPage,
      name: '-',
      unValidatedFilter
    })
  }, [
    analyticsType,
    level,
    dateSelector.startDay,
    dateSelector.startMonth,
    dateSelector.startYear,
    dateSelector.endDay,
    dateSelector.endMonth,
    dateSelector.endYear,
    isFiltered,
    itemsPerPage,
    currentPage,
    unValidatedFilter
  ])

  useEffect(() => {
    fetchData(getParams())
  }, [getParams, isTokenLoading])

  useEffect(() => {
    setItemsPerPage(width >= 1800 ? 13 : 7)
  }, [width])

  return (
    <MainLayout title={`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}>
      {error && <ErrorMessage message={error.toString()} />}
      <AnalyticsFilters
        dateSelector={dateSelector}
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
      {isLoading ? (
        <Loading />
      ) : (
        <AnalyticsTable
          items={analyticData}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          onValidate={validateAnalytics}
          onUpdateDescription={updateDescription}
        />
      )}

      <AnalyticsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        analyticsListData={analyticData}
        setCurrentPage={setCurrentPage}
      />
    </MainLayout>
  )
}

export default AnalyticsTableIndex
