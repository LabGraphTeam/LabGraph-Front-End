import { useToken } from '@/features/authentication/contexts/TokenContext'
import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { AnalyticGroupedData } from '@/types/Chart'
import { useCallback, useEffect, useState } from 'react'

const useFetchAnalyticsGrouped = (route: string) => {
  const [listing, setListing] = useState<AnalyticGroupedData[]>([])
  const [unitValues, setUnitValues] = useState<string | null>(null)
  const [error, setError] = useState<string>()
  const { token, isLoading } = useToken()

  const fetchData = useCallback(async () => {
    try {
      if (!isLoading && token) {
        const data = await fetchWrapper({
          route: route,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        return data as AnalyticGroupedData[]
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }, [route, token, isLoading])

  useEffect(() => {
    const getData = async () => {
      const listingData = await fetchData()
      if (listingData) {
        setListing(listingData)

        if (listingData.length > 0 && listingData[0].groupedValuesByLevelDTO.values.length > 0) {
          setUnitValues(listingData[0].groupedValuesByLevelDTO.values[0].unit_value)
        }
      }
    }

    getData()
  }, [isLoading, token, fetchData])

  return {
    listing,
    unitValues,
    isLoading,
    error
  }
}

export default useFetchAnalyticsGrouped
