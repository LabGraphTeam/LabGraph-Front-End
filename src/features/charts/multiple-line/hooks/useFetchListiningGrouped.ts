import { useToken } from '@/features/authentication/contexts/TokenContext'
import { fetchWrapper } from '@/services/fetch-wrapper'
import { useCallback, useEffect, useState } from 'react'
import { AnalyticGroupedData } from '../../types/Chart'

const useFetchListeningGrouped = (url: string) => {
  const [listing, setListing] = useState<AnalyticGroupedData[]>([])
  const [unitValues, setUnitValues] = useState<string | null>(null)
  const { token, isLoading } = useToken()

  const fetchData = useCallback(async (): Promise<AnalyticGroupedData[] | []> => {
    if (!isLoading && token) {
      const data = await fetchWrapper({
        route: url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data as AnalyticGroupedData[]
    }
    return []
  }, [url, token, isLoading])

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
    isLoading
  }
}

export default useFetchListeningGrouped
