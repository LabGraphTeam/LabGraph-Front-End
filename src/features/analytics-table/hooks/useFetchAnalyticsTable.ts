import { useToken } from '@/features/authentication/contexts/TokenContext'

import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { AnalyticsDataReturn, AnalyticWithValidatedUser, UseAnalyticsDataProps } from '@/types/AnalyticsTable'
import { useState } from 'react'
import { buildAnalyticsValidationEndpoint } from '../../shared/utils/helpers/buildAnalyticsValidationEndpoint'

export const useFetchAnalyticsTable = ({
  analyticsType,
}: UseAnalyticsDataProps): AnalyticsDataReturn => {
  const [analyticData, setAnalyticData] = useState<AnalyticWithValidatedUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalElements, setTotalElements] = useState<number>(0)
  const { token, isLoading: isTokenLoading } = useToken()
  const [error, setError] = useState<string | null>(null)


  const fetchData = async (apiEndpoint: string): Promise<void> => {
    if (isTokenLoading) {
      return
    }

    try {
      const response = await fetchWrapper({
        route: apiEndpoint,
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
      const response = await fetchWrapper({
        route: buildAnalyticsValidationEndpoint({
          analyticsType,
          analyticsId
        }),
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })


      setAnalyticData(prevData =>
        prevData.map(item =>
          item.id === analyticsId
            ? { ...item, ...response }
            : item
        )
      )
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Insufficient permissions to perform this action')
    }
  }

  const updateDescription = async (analyticsId: number, description: string): Promise<void> => {
    if (isTokenLoading) {
      return
    }

    try {
      const response = await fetchWrapper({
        route: buildAnalyticsValidationEndpoint({
          analyticsType,
          analyticsId,
          isUpdateDescription: true
        }),
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(description)
      })

      setAnalyticData(prevData =>
        prevData.map(item =>
          item.id === analyticsId
            ? { ...item, ...response }
            : item
        )
      )
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Insufficient permissions to perform this action')
    }
  }


  return {
    analyticData,
    isLoading,
    isTokenLoading,
    validateAnalytics,
    updateDescription,
    fetchData,
    totalPages,
    totalElements,
    error,

  }
}
