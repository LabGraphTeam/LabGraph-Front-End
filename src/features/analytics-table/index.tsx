import { useAnalyticsData } from '@/features/analytics-table/hooks/useAnalyticsData'
import { useCallback, useEffect, useState } from 'react'
import { useAnalyticsOptions } from '../shared/hooks/useAnalyticsOptions'
import useDateSelector from '../shared/hooks/useDateSelector'
import useWindowDimensions from '../shared/hooks/useWindowDimensions'
import MainLayout from './layouts/MainLayout'
import ListingTable from './listing-table'
import AnalyticsFilters from './util/AnalyticsFilters'
import AnalyticsPagination from './util/AnalyticsPagination'

const AnalyticsTableIndex = () => {
  const dateSelector = useDateSelector()
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [analyticsType, setAnalyticsType] = useState('biochemistry-analytics')
  const [level, setLevel] = useState(0)
  const [isFiltered, setIsFiltered] = useState(false)
  const [url, setUrl] = useState('')

  const { width } = useWindowDimensions()
  const { analyticsOptions, levelOptions } = useAnalyticsOptions(analyticsType)

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
    analyticsDataList: dataFetched,
    isLoading,
    isTokenLoading,
    fetchData,
    buildUrl,
    totalPages
  } = useAnalyticsData({
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
    [fetchData]
  )

  useEffect(() => {
    setUrl(buildUrl(isFiltered))
  }, [buildUrl, isFiltered])

  useEffect(() => {
    if (url) {
      fetchData(url)
    }
  }, [url, isLoading, isTokenLoading])

  useEffect(() => {
    setItemsPerPage(width >= 1800 ? 14 : 8)
  }, [width])

  return (
    <MainLayout title={`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}>
      <AnalyticsFilters
        dateSelector={dateSelector}
        analyticsOptions={analyticsOptions}
        analyticsType={analyticsType}
        setAnalyticsType={setAnalyticsType}
        levelOptions={levelOptions}
        level={level}
        setLevel={setLevel}
        setFiltered={setIsFiltered}
      />
      <ListingTable items={dataFetched} isLoading={isLoading} onPageChange={handlePageChange} />
      <AnalyticsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        analyticsListData={dataFetched}
        setCurrentPage={setCurrentPage}
      />
    </MainLayout>
  )
}

export default AnalyticsTableIndex
