import { useToken } from '@/features/authentication/contexts/TokenContext'
import { AnalyticWithStatsData } from '@/types/Chart'
import { useCallback, useEffect, useState } from 'react'
import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'

const useFetchAnalytics = (route: string) => {
  const [analyticsListData, setAnalyticsListData] = useState<AnalyticWithStatsData>()

  const { token, isLoading } = useToken()

  const fetchData = useCallback(async (): Promise<AnalyticWithStatsData> => {
    if (!isLoading && token) {
      const data = await fetchWrapper({
        route: route,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data as AnalyticWithStatsData
    }
    return {} as AnalyticWithStatsData
  }, [route, token, isLoading])

  useEffect(() => {
    if (!isLoading && token) {
      const handleFetchData = async () => {
        const data = await fetchData()
        setAnalyticsListData(data)
      }
      handleFetchData()
    }
  }, [isLoading, token, fetchData])

  return {
    analyticsListData,
    url: route,
    isLoading
  }
}

export default useFetchAnalytics
