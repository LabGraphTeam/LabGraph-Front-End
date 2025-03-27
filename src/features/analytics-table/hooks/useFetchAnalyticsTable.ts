import { useToken } from '@/features/authentication/contexts/TokenContext'
import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { useFetchSWR } from '@/shared/hooks/useFetchSWR'
import { buildAnalyticsValidationEndpoint } from '@/shared/utils/helpers/buildAnalyticsValidationEndpoint'
import {
  AnalyticsDataReturn,
  PaginatedAnalyticsResponse,
  UseFetchAnalyticsTableProps
} from '@/types/AnalyticsTable'

export const useFetchAnalyticsTable = ({
  analyticsType,
  endPoint
}: UseFetchAnalyticsTableProps): AnalyticsDataReturn => {
  const { token } = useToken()

  const { data, error, isLoading, mutate } = useFetchSWR<PaginatedAnalyticsResponse>({
    url: endPoint,
    method: 'GET',
    immediate: true,
    authenticated: true
  })


  const validateAnalytics = async (analyticsId: number): Promise<void> => {
    const response = await fetchWrapper({
      route: buildAnalyticsValidationEndpoint({
        analyticsType,
        analyticsId
      }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })

    if (data) {
      const updatedContent = data.content.map((item: { id: number }) =>
        item.id === analyticsId ? { ...item, ...response } : item
      )
      mutate({ ...data, content: updatedContent }, false)
    }
  }




  const updateDescription = async (analyticsId: number, description: string): Promise<void> => {
    const response = await fetchWrapper({
      route: buildAnalyticsValidationEndpoint({
        analyticsType,
        analyticsId,
        isUpdateDescription: true
      }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ description })
    })

    if (data) {
      const updatedContent = data.content.map((item: { id: number }) =>
        item.id === analyticsId ? { ...item, ...response } : item
      )
      mutate({ ...data, content: updatedContent }, false)
    }
  }

  return {
    isLoading,
    validateAnalytics,
    updateDescription,
    error,
    data
  }
}
export default useFetchAnalyticsTable
