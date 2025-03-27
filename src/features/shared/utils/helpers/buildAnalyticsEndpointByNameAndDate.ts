import {
  formatDateWithTime,
  formatEndDateWithTime
} from '@/shared/ui/date-selectors/constants/formatDateWithTime'
import analyticNameFormatFix from '@/shared/utils/helpers/analyticNameFormatFix'
import { BuildAnalyticsEndpointByNameAndDateProps } from '@/types/BuildAnalyticsEndpointByNameAndDateProps'

const buildAnalyticsEndpointByNameAndDate = (props: BuildAnalyticsEndpointByNameAndDateProps) => {
  const { analyticName: name, analyticsMeasurementPeriod: date, analyticsType } = props

  const startDate = formatDateWithTime(date.startYear, date.startMonth, date.startDay)
  const endDate = formatEndDateWithTime(date.endYear, date.endMonth, date.endDay)

  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${process.env.NEXT_PUBLIC_API_BASE_URL_RESULTS_GROUPED}${analyticNameFormatFix(name)}&startDate=${startDate}&endDate=${endDate}&pageSize=200&sort=date,asc`
}

export default buildAnalyticsEndpointByNameAndDate
