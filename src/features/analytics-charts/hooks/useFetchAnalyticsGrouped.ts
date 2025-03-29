import { useFetchSWR } from '@/shared/hooks/useFetchSWR'
import { GroupedAnalyticData } from '@/types/Chart'

const useFetchAnalyticsGrouped = (url: string) => {
  const { data, error, isLoading } = useFetchSWR<GroupedAnalyticData[]>({
    url: url,
    method: 'GET',
    immediate: true,
    authenticated: true
  })

  return {
    data,
    isLoading,
    error
  }
}

export default useFetchAnalyticsGrouped
