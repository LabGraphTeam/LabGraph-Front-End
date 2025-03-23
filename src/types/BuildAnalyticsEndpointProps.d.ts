import IntervalDates from './IntervalDates'

export default interface BuildAnalyticsEndpointProps {
  analyticsType: string
  analyticName: string
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