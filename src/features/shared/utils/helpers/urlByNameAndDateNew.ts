import {
  formatDateWithTime,
  formatEndDateWithTime
} from '../../ui/date-selectors/constants/formatDateWithTime'
import { UrlAnalyticsByNameAndDatePropsNew } from '../types/urlAnalyticsByNameAndDateProps'
import testFormatFix from './testFormatFix'

const urlByNameAndDateNew = (props: UrlAnalyticsByNameAndDatePropsNew) => {
  const { name, date, analyticsType } = props

  const startDate = formatDateWithTime(date.startYear, date.startMonth, date.startDay)
  const endDate = formatEndDateWithTime(date.endYear, date.endMonth, date.endDay)

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${process.env.NEXT_PUBLIC_API_BASE_URL_RESULTS_GROUPED}${testFormatFix(name)}&startDate=${startDate}&endDate=${endDate}`

  return { url }
}

export default urlByNameAndDateNew
