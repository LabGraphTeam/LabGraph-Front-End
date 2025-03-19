import { useAuthenticatedFetch } from '@/features/shared/hooks/useAuthenticatedFetch'
import { AnalyticGroupedData } from '@/types/Chart'
import { useEffect, useState } from 'react'

const useFetchAnalyticsGrouped = (route: string) => {
  const [unitValues, setUnitValues] = useState<string | null>(null)

  const {
    data: listing = [],
    error,
    isLoading
  } = useAuthenticatedFetch<AnalyticGroupedData[]>({
    url: route,
    method: 'GET',
    immediate: true
  })

  useEffect(() => {
    if (listing && listing.length > 0 && listing[0].groupedValuesByLevelDTO.values.length > 0) {
      setUnitValues(listing[0].groupedValuesByLevelDTO.values[0].unit_value)
    }
  }, [listing])

  return {
    listing,
    unitValues,
    isLoading,
    error
  }
}

export default useFetchAnalyticsGrouped
