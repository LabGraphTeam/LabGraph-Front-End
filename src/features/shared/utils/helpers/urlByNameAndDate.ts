import {
  formatDateWithTime,
  formatEndDateWithTime
} from '../../ui/date-selectors/constants/formatDateWithTime'
import { UrlAnalyticsByNameAndDateProps } from '../types/urlAnalyticsByNameAndDateProps'
import testFormatFix from './testFormatFix'

const urlByNameAndDate = (props: UrlAnalyticsByNameAndDateProps) => {
  const { analyticsType, name, date, levelSize } = props

  const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/name-and-level-date-range?name=`
  const meanAndDeviationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/mean-standard-deviation?name=`

  const startDate = formatDateWithTime(date.startYear, date.startMonth, date.startDay)
  const endDate = formatEndDateWithTime(date.endYear, date.endMonth, date.endDay)

  const urls: string[] = []
  const meanDeviationUrls: string[] = []

  for (let level = 1; level <= levelSize; level++) {
    urls.push(
      `${baseUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`
    )
    meanDeviationUrls.push(
      `${meanAndDeviationUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`
    )
  }

  return { urls, meanDeviationUrls }
}

export default urlByNameAndDate
