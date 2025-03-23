import { formatDateWithTime, formatEndDateWithTime } from "@/features/shared/ui/date-selectors/constants/formatDateWithTime"
import BuildAnalyticsEndpointProps from "@/types/BuildAnalyticsEndpointProps"

export const buildAnalyticsValidationEndpoint = (props: BuildAnalyticsEndpointProps): string => {

    const { analyticsType, analyticsLevel: level, analyticsMeasurementPeriod: date, itemsPerPage, currentPage, isFiltered, unValidatedFilter } = props

    const baseEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}`

    const startDate = formatDateWithTime(date.startYear, date.startMonth, date.startDay)
    const endDate = formatEndDateWithTime(date.endYear, date.endMonth, date.endDay)

    if (isFiltered) {

        if (unValidatedFilter) {
            return `${baseEndPoint}/level-date-range/unvalid?level=${level}&startDate=${startDate}&endDate=${endDate}&size=${itemsPerPage}&page=${currentPage}&sort=date,desc`
        }

        return `${baseEndPoint}/level-date-range?level=${level}&startDate=${startDate}&endDate=${endDate}&size=${itemsPerPage}&page=${currentPage}&sort=date,desc`
    }

    if (unValidatedFilter) {
        return `${baseEndPoint}/date-range/unvalid?startDate=${startDate}&endDate=${endDate}&size=${itemsPerPage}&page=${currentPage}&sort=date,desc`
    }

    return `${baseEndPoint}/date-range?startDate=${startDate}&endDate=${endDate}&size=${itemsPerPage}&page=${currentPage}&sort=date,desc`
}