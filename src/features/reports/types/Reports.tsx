import { ListingItem } from '@/features/charts/types/Chart'
import { DateSelectorProps } from '@/features/shared/ui/date-selectors/types/dateSelectorProps'

export interface ReportsHeaderProps {
  analyticsType: string
  dataFetched?: ListingItem[]
}

export interface UseReportsDataProps {
  url: string
}

export interface ReportsControlsProps extends DateSelectorProps {
  analyticsType: string
  onAnalyticsTypeChange: (value: string) => void
  dataFetched: ListingItem[]
  dateSelectorProps: DateSelectorProps
  reportMonth?: string
  reportYear?: number
}

export interface AnalyticsTypeSelectorProps {
  analyticsType: string
  onChange: (value: string) => void
}
