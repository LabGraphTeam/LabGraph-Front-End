import { useFetchSWR } from "@/features/shared/hooks/useFetchSWR"
import { buildAnalyticsValidationEndpoint } from "@/features/shared/utils/helpers/buildAnalyticsValidationEndpoint"
import { UseValidationAnalyticsProps } from "@/types/AnalyticsTable"

export const useAnalyticsValidation = ({ analyticsType, analyticsId }: UseValidationAnalyticsProps) => {

    const { error, isLoading, mutate } = useFetchSWR<Promise<void>>({
        url: buildAnalyticsValidationEndpoint({
            analyticsType,
            analyticsId
        }),
        method: 'PATCH',
        immediate: true,
        authenticated: true
    })

    return { error, isLoading, mutate }

}
