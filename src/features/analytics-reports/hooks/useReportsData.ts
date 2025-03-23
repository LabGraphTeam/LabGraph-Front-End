import { useFetchSWR } from '@/features/shared/hooks/useFetchSWR'
import { AnalyticData } from '@/types/Chart'
import { UseReportsDataProps } from '@/types/Reports'

const useReportsData = ({ url }: UseReportsDataProps) => {
  const { data: dataFetched = [] } = useFetchSWR<AnalyticData[]>({
    url,
    method: 'GET',
    contentType: 'application/json',
    immediate: true,
    authenticated: true
  })

  return { dataFetched }
}

export default useReportsData
