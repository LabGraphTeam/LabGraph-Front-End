import IntervalDates from './IntervalDates'

export interface BuildAnalyticsEndpointByNameAndDateProps {
  analyticsType: string
  analyticName: string
  analyticsMeasurementPeriod: IntervalDates
}
