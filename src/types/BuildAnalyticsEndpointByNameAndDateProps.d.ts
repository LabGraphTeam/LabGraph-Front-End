import IntervalDates from '@/types/IntervalDates'

export interface BuildAnalyticsEndpointByNameAndDateProps {
  analyticsType: string
  analyticsName: string
  analyticsMeasurementPeriod: IntervalDates
}
