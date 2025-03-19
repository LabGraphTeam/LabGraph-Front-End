import { useAuthenticatedFetch } from '@/features/shared/hooks/useAuthenticatedFetch'
import { AnalyticWithStatsData } from '@/types/Chart'

const useFetchAnalytics = (route: string) => {
  const {
    data: analyticsListData,
    error,
    isLoading
  } = useAuthenticatedFetch<AnalyticWithStatsData>({
    url: route
  })

  return {
    analyticsListData,
    url: route,
    isLoading,
    error
  }
}

export default useFetchAnalytics
