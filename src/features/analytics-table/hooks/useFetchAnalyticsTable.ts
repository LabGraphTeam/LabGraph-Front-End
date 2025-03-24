import { AnalyticsDataReturn, PaginatedAnalyticsResponse, UseAnalyticsDataProps } from '@/types/AnalyticsTable'
import { buildAnalyticsValidationEndpoint } from '../../shared/utils/helpers/buildAnalyticsValidationEndpoint'
import { useFetchSWR } from '@/features/shared/hooks/useFetchSWR'
import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { useToken } from '@/features/authentication/contexts/TokenContext'

export const useFetchAnalyticsTable = ({
  analyticsType, endPoint, analyticData, setAnalyticData
}: UseAnalyticsDataProps): AnalyticsDataReturn => {
  const { token } = useToken();

  const {
    data,
    error,
    isLoading,
    mutate
  } = useFetchSWR<PaginatedAnalyticsResponse>({
    url: endPoint,
    method: 'GET',
    immediate: true,
    authenticated: true
  })

  const validateAnalytics = async (analyticsId: number): Promise<void> => {
    try {
      const response = await fetchWrapper({
        route: buildAnalyticsValidationEndpoint({
          analyticsType,
          analyticsId
        }),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedData = analyticData.map(item =>
        item.id === analyticsId
          ? { ...item, ...response }
          : item
      )

      setAnalyticData(updatedData);
      mutate();
    } catch (error) {
      console.error("Error validating analytics:", error);
    }
  }

  const updateDescription = async (analyticsId: number, description: string): Promise<void> => {
    try {
      const response = await fetchWrapper({
        route: buildAnalyticsValidationEndpoint({
          analyticsType,
          analyticsId,
          isUpdateDescription: true
        }),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ description })
      });

      const updatedData = analyticData.map(item =>
        item.id === analyticsId
          ? { ...item, ...response }
          : item
      )

      setAnalyticData(updatedData);
      mutate();
    } catch (error) {
      console.error("Error updating description:", error);
    }
  }

  return {
    isLoading,
    validateAnalytics,
    updateDescription,
    error,
    data,
  }
}
export default useFetchAnalyticsTable

