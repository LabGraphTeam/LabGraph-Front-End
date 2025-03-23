import { AnalyticData } from '@/types/Chart'
import { DateSelectorProps } from '@/types/DateSelectorProps'
import { ReactNode } from 'react'

export interface MobileItemCardProps {
  analyticData: AnalyticData
}

export interface AnalyticWithValidatedUser extends AnalyticData {
  validator_user: string
}

export interface TableRowProps {
  analyticData: AnalyticWithValidatedUser,
  onValidate?: (id: number) => Promise<void>,
  onUpdateDescription?: (id: number, description: string) => Promise<void>
}
export interface MainLayoutProps {
  children: ReactNode
  title: string
}

export interface AnalyticsDataReturn {
  analyticData: AnalyticWithValidatedUser[]
  isLoading: boolean
  isTokenLoading: boolean
  fetchData: (url: string) => Promise<void>
  validateAnalytics: (analyticsId: number) => Promise<void>
  updateDescription: (analyticsId: number, description: string) => Promise<void>
  totalPages: number
  totalElements: number
  error: Error | string | null
}

export interface AnalyticsFiltersProps {
  dateSelector: DateSelectorProps
  analyticsOptions: { value: string; label: string }[]
  analyticsType: string
  setAnalyticsType: (value: string) => void
  levelOptions: { value: number; label: string }[]
  level: number
  setLevel: (value: number) => void
  setFiltered: (setter: (prev: boolean) => boolean) => void
  unValidFilter: boolean
  setUnValidatedFilter: (setter: (prev: boolean) => boolean) => void

  filters: { value: boolean; label: string }[]
}

export interface AnalyticsPaginationProps {
  currentPage: number
  totalPages: number | undefined
  analyticsListData: AnalyticData[]
  setCurrentPage: (setter: (prev: number) => number) => void
}

export interface PageButtonsProps {
  totalPages: number | undefined
  currentPage: number
  setCurrentPage: (setter: (prev: number) => number) => void
}

export interface UseAnalyticsDataProps {
  analyticsType: string
  level: number
  startDate: { day: number; month: number; year: number }
  endDate: { day: number; month: number; year: number }
  itemsPerPage: number
  currentPage: number
}
export interface AnalyticsTableProps {
  items: AnalyticWithValidatedUser[]
  onPageChange: (url: string) => Promise<void>
  onValidate?: (id: number) => Promise<void>
  isLoading: boolean
  onUpdateDescription?: (id: number, description: string) => Promise<void>
}