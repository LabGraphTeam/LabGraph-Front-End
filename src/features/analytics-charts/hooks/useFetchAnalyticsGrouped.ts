import { useFetchSWR } from '@/shared/hooks/useFetchSWR'
import { GroupedAnalyticData } from '@/types/Chart'

const useFetchAnalyticsGrouped = (route: string) => {
  const { data, error, isLoading } = useFetchSWR<GroupedAnalyticData[]>({
    url: route,
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
