import { useToken } from '@/features/authentication/contexts/TokenContext'
import { ListingItem } from '@/features/charts/types/Chart'

import {
  formatDateWithTime,
  formatEndDateWithTime
} from '@/features/shared/ui/date-selectors/constants/formatDateWithTime'
import { fetchWrapper } from '@/services/fetch-wrapper'
import { useState } from 'react'
import { UseAnalyticsDataProps, UseAnalyticsDataReturn } from '../types/AnalyticsTable'

export const useAnalyticsData = ({
  analyticsType,
  level,
  startDate,
  endDate,
  itemsPerPage,
  currentPage
}: UseAnalyticsDataProps): UseAnalyticsDataReturn => {
  const [data, setData] = useState<ListingItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalElements, setTotalElements] = useState<number>(0)
  const { token, isLoading: isTokenLoading } = useToken()

  const buildUrl = (isFiltered: boolean): string => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}`
    const startDateFormatted = formatDateWithTime(startDate.year, startDate.month, startDate.day)
    const endDateFormatted = formatEndDateWithTime(endDate.year, endDate.month, endDate.day)

    if (isFiltered) {
      return `${baseUrl}/level-date-range?level=${level}&startDate=${startDateFormatted}&endDate=${endDateFormatted}&size=${itemsPerPage}&page=${currentPage}&sort=date,desc`
    }
    return `${baseUrl}/date-range?startDate=${startDateFormatted}&endDate=${endDateFormatted}&size=${itemsPerPage}&page=${currentPage}&sort=date,desc`
  }

  const fetchData = async (url: string): Promise<void> => {
    if (isTokenLoading) {
      return
    }

    try {
      const response = await fetchWrapper({
        route: url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
        next: { revalidate: 60 },
        cache: 'force-cache'
      })

      setData(response.content || [])
      setTotalPages(response.page?.totalPages || 0)
      setTotalElements(response.page?.totalElements || 0)
    } catch (error) {
      console.error('Error fetching analytics data:', error)
      setData([])
      setTotalPages(0)
      setTotalElements(0)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data,
    isLoading,
    isTokenLoading,
    fetchData,
    buildUrl,
    totalPages,
    totalElements
  }
}
