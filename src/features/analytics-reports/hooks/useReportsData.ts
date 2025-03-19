import { useAuthenticatedFetch } from '@/features/shared/hooks/useAuthenticatedFetch'
import { AnalyticItem } from '@/types/Chart'
import { UseReportsDataProps } from '@/types/Reports'

const useReportsData = ({ url }: UseReportsDataProps) => {
  const { data: dataFetched = [] } = useAuthenticatedFetch<AnalyticItem[]>({
    url,
    method: 'GET',
    contentType: 'application/json',
    immediate: true
  })

  return { dataFetched }
}

export default useReportsData
