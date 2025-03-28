import { useFetchSWR } from '@/shared/hooks/useFetchSWR'
import { PaginatedAnalyticsResponse } from '@/types/AnalyticsTable'
import { UseReportsDataProps } from '@/types/Reports'

const useReportsData = ({ url }: UseReportsDataProps) => {
  const { data: dataFetched = [] } = useFetchSWR<PaginatedAnalyticsResponse>({
    url,
    method: 'GET',
    contentType: 'application/json',
    immediate: true,
    authenticated: true
  })

  return { dataFetched }
}

export default useReportsData
