import IntervalDates from '@/types/IntervalDates'

export default interface BuildAnalyticsEndpointProps {
  analyticsType: string
  analyticsName: string
  analyticsLevel?: number
  analyticsMeasurementPeriod: IntervalDates
  isFiltered?: boolean
  itemsPerPage?: number
  currentPage?: number
  unValidatedFilter?: boolean
}


export interface BuildAnalyticsValidationParamsProps {
  analyticsType: string,
  analyticsId: number
  isUpdateDescription?: boolean
}