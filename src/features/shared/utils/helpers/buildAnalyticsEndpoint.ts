import BuildAnalyticsEndpointProps from '@/types/BuildAnalyticsEndpointProps'
import {
  formatDateWithTime,
  formatEndDateWithTime
} from '../../ui/date-selectors/constants/formatDateWithTime'
import analyticNameFormatFix from './analyticNameFormatFix'

const buildAnalyticsEndpoint = (props: BuildAnalyticsEndpointProps) => {
  const { analyticsType, name, level, date } = props

  const baseEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/name-and-level-date-range?name=`

  const startDate = formatDateWithTime(date.startYear, date.startMonth, date.startDay)
  const endDate = formatEndDateWithTime(date.endYear, date.endMonth, date.endDay)

  return `${baseEndPoint}${analyticNameFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`

}

export default buildAnalyticsEndpoint
