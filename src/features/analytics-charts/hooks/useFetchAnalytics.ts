import { useFetchSWR } from '@/shared/hooks/useFetchSWR'
import { AnalyticWithStatsData } from '@/types/Chart'

const useFetchAnalytics = (url: string) => {

  const {
    data,
    error,
    isLoading
  } = useFetchSWR<AnalyticWithStatsData>({
    url,
    method: 'GET',
    immediate: true,
    authenticated: true
  })


  return {
    data,
    url,
    isLoading,
    error,
  }
}

export default useFetchAnalytics
