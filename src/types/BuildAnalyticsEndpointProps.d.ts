import IntervalDates from './IntervalDates'

export default interface BuildAnalyticsEndpointProps {
  analyticsType: string
  name: string
  level: number
  date: IntervalDates
}
