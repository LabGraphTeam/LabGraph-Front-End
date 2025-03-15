import {
  formatDateWithTime,
  formatEndDateWithTime
} from '../../ui/date-selectors/constants/formatDateWithTime'
import { BuildAnalyticsEndpointByNameAndDateProps } from '../types/urlAnalyticsByNameAndDateProps'
import analyticNameFormatFix from './analyticNameFormatFix'

const buildAnalyticsEndpointByNameAndDate = (props: BuildAnalyticsEndpointByNameAndDateProps) => {
  const { name, date, analyticsType } = props

  const startDate = formatDateWithTime(date.startYear, date.startMonth, date.startDay)
  const endDate = formatEndDateWithTime(date.endYear, date.endMonth, date.endDay)

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${process.env.NEXT_PUBLIC_API_BASE_URL_RESULTS_GROUPED}${analyticNameFormatFix(name)}&startDate=${startDate}&endDate=${endDate}&pageSize=200&sort=date,asc`

  return { url }
}

export default buildAnalyticsEndpointByNameAndDate
