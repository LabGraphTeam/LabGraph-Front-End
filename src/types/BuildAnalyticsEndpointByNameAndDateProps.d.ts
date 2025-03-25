import IntervalDates from '@/types/IntervalDates'

export interface BuildAnalyticsEndpointByNameAndDateProps {
  analyticsType: string
  analyticName: string
  analyticsMeasurementPeriod: IntervalDates
}
