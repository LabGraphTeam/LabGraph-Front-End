import { AnalyticItem } from '@/types/Chart'
import { DateSelectorProps } from '@/types/DateSelectorProps'

export interface ReportsHeaderProps {
  analyticsType: string
  dataFetched?: AnalyticItem[]
}

export interface UseReportsDataProps {
  url: string
}

export interface ReportsControlsProps extends DateSelectorProps {
  analyticsType: string
  onAnalyticsTypeChange: (value: string) => void
  dataFetched: AnalyticItem[]
  dateSelectorProps: DateSelectorProps
  reportMonth?: string
  reportYear?: number
}

export interface AnalyticsTypeSelectorProps {
  analyticsType: string
  onChange: (value: string) => void
}
