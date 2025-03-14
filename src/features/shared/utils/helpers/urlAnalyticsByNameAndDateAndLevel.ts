import {
  formatDateWithTime,
  formatEndDateWithTime
} from '../../ui/date-selectors/constants/formatDateWithTime'
import UrlAnalyticsByNameAndDateLevelProps from '../types/urlAnalyticsByNameAndDateLevelProps'
import testFormatFix from './testFormatFix'

const urlAnalyticsByNameAndDateAndLevel = (props: UrlAnalyticsByNameAndDateLevelProps) => {
  const { analyticsType, name, level, date } = props

  const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/name-and-level-date-range?name=`

  const startDate = formatDateWithTime(date.startYear, date.startMonth, date.startDay)
  const endDate = formatEndDateWithTime(date.endYear, date.endMonth, date.endDay)

  const url = `${baseUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`

  return { url }
}

export default urlAnalyticsByNameAndDateAndLevel
