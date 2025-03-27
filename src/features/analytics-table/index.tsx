import { useEffect, useMemo, useState } from 'react'

import GeneratePdf from '@/features/analytics-reports/generate-pdf'
import AnalyticsFilters from '@/features/analytics-table/components/AnalyticsFilters'
import AnalyticsPagination from '@/features/analytics-table/components/AnalyticsPagination'
import AnalyticsTable from '@/features/analytics-table/components/AnalyticsTable'
import useFetchAnalyticsTable from '@/features/analytics-table/hooks/useFetchAnalyticsTable'
import { useAnalyticsOptions } from '@/shared/hooks/useAnalyticsOptions'
import useDateSelector from '@/shared/hooks/useDateSelector'
import useWindowDimensions from '@/shared/hooks/useWindowDimensions'
import MainLayout from '@/shared/ui/layouts/MainLayout'
import ErrorMessage from '@/shared/utils/components/error-message'
import { buildAnalyticsValidationWithFiltersEndpoint } from '@/shared/utils/helpers/buildAnalyticsTableEndpoint'
import { AnalyticWithValidatedUser, UseFetchAnalyticsTableProps } from '@/types/AnalyticsTable'
import BuildAnalyticsEndpointProps from '@/types/BuildAnalyticsEndpointProps'

const AnalyticsTableIndex = () => {
  const [analyticsType, setAnalyticsType] = useState('biochemistry-analytics')
  const [analyticData, setAnalyticData] = useState<AnalyticWithValidatedUser[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(7)
  const [analyticsLevel, setAnalyticsLevel] = useState(0)
  const [isFiltered, setIsFiltered] = useState(false)
  const { analyticsOptions, levelOptions, filters } = useAnalyticsOptions(analyticsType)
  const [unValidatedFilter, setUnValidatedFilter] = useState(false)
  const { windowWidth: width } = useWindowDimensions()

  const { combinedDateAndHandlersProps, combinedDateProps, dateValues } = useDateSelector()

  const endPointProps = useMemo(
    () =>
      ({
        analyticsType,
        analyticsLevel,
        analyticsMeasurementPeriod: {
          ...dateValues
        },
        isFiltered,
        itemsPerPage,
        currentPage,
        unValidatedFilter
      }) as BuildAnalyticsEndpointProps,
    [
      analyticsType,
      analyticsLevel,
      dateValues,
      isFiltered,
      itemsPerPage,
      currentPage,
      unValidatedFilter
    ]
  )

  const endPoint: string = buildAnalyticsValidationWithFiltersEndpoint(endPointProps)

  const useFetchAnalyticsTableProps: UseFetchAnalyticsTableProps = {
    endPoint,
    analyticsType,
    level: analyticsLevel,
    ...combinedDateProps,
    itemsPerPage,
    currentPage,
    setAnalyticData,
    analyticData
  }

  const { isLoading, validateAnalytics, updateDescription, error, data } = useFetchAnalyticsTable(
    useFetchAnalyticsTableProps
  )

  const getItemsPerPage = (screenWidth: number) => {
    if (screenWidth >= 1800) return 10
    if (screenWidth < 768) return 6
    return 7
  }

  useEffect(() => {
    if (!error && !isLoading && data && data?.content?.length > 0) {
      setTotalPages(data.page.totalPages)
      setItemsPerPage(getItemsPerPage(width))
      setAnalyticData(data.content)
    }

    if (error) {
      setTotalPages(0)
      setAnalyticData([])
    }
  }, [data, width, error, isLoading])

  return (
    <MainLayout title='Analytics-Table 🥼🔬'>
      {error ? <ErrorMessage message={error.toString()} /> : null}
      <AnalyticsFilters
        analyticsOptions={analyticsOptions}
        analyticsType={analyticsType}
        dateSelector={combinedDateAndHandlersProps}
        filters={filters}
        level={analyticsLevel}
        levelOptions={levelOptions}
        setAnalyticsType={setAnalyticsType}
        setFiltered={setIsFiltered}
        setLevel={setAnalyticsLevel}
        setUnValidatedFilter={setUnValidatedFilter}
        unValidFilter={unValidatedFilter}
      />
      <span className='hidden justify-end md:flex'>
        <GeneratePdf
          analyticsType={analyticsType}
          buttonText='Generate Report'
          endDate={combinedDateProps.endDate}
          fileName={analyticsType}
          reportMonth={combinedDateProps.startDate.month.toString()}
          reportYear={combinedDateProps.startDate.year}
          startDate={combinedDateProps.startDate}
        />
      </span>

      <AnalyticsTable
        isLoading={isLoading}
        items={analyticData}
        onUpdateDescription={updateDescription}
        onValidate={validateAnalytics}
      />

      <AnalyticsPagination
        analyticsData={analyticData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </MainLayout>
  )
}

export default AnalyticsTableIndex
