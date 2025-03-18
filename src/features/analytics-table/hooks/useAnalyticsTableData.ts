import { useToken } from '@/features/authentication/contexts/TokenContext'

import {
  formatDateWithTime,
  formatEndDateWithTime
} from '@/features/shared/ui/date-selectors/constants/formatDateWithTime'
import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { AnalyticsDataReturn, AnalyticWithValidatedUser, UseAnalyticsDataProps } from '@/types/AnalyticsTable'
import { useState } from 'react'

export const useAnalyticsData = ({
  analyticsType,
  level,
  startDate,
  endDate,
  itemsPerPage,
  currentPage
}: UseAnalyticsDataProps): AnalyticsDataReturn => {
  const [analyticData, setAnalyticData] = useState<AnalyticWithValidatedUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalElements, setTotalElements] = useState<number>(0)
  const { token, isLoading: isTokenLoading } = useToken()
  const [error, setError] = useState<string | null>(null)

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
      })

      setAnalyticData(response.content || [])
      setTotalPages(response.page?.totalPages || 0)
      setTotalElements(response.page?.totalElements || 0)

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const validateAnalytics = async (analyticsId: number): Promise<void> => {
    if (isTokenLoading) {
      return
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${analyticsId}/validate`
      const response = await fetchWrapper({
        route: url,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (await !response.ok) {
        throw Error('Insuficient Authorization Error occurred :(')
      }

      setAnalyticData(prevData =>
        prevData.map(item =>
          item.id === analyticsId
            ? { ...item, ...response }
            : item
        )
      )
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Insuficient Authorization Error occurred :(')
    }
  }

  const updateDescription = async (analyticsId: number, description: string): Promise<void> => {
    if (isTokenLoading) {
      return
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${analyticsId}/description`
      const response = await fetchWrapper({
        route: url,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(description)
      })

      if (await !response.ok) {
        throw Error('Authorization Error Occurred :(' + response.statusText)
      }

      setAnalyticData(prevData =>
        prevData.map(item =>
          item.id === analyticsId
            ? { ...item, ...response }
            : item
        )
      )
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  return {
    analyticsDataList: analyticData,
    isLoading,
    isTokenLoading,
    validateAnalytics,
    updateDescription,
    fetchData,
    buildUrl,
    totalPages,
    totalElements,
    error
  }
}
