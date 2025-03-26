import { BuildAnalyticsValidationParamsProps } from '@/types/BuildAnalyticsEndpointProps'

export const buildAnalyticsValidationEndpoint = (
  props: BuildAnalyticsValidationParamsProps
): string => {
  const { analyticsType, analyticsId, isUpdateDescription } = props
  if (!isUpdateDescription) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${analyticsId}/validate`
  }
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${analyticsId}/description`
}
