import { AnalyticItem } from '@/types/Chart'
import { DateSelectorProps } from '@/types/DateSelectorProps'
import { ReactNode } from 'react'

export interface MobileItemCardProps {
  analyticItem: AnalyticItem
}

export interface AnalyticWithValidatedUser extends AnalyticItem {
  validator_user: string
}

export interface TableRowProps {
  analyticItem: AnalyticWithValidatedUser,
  onValidate?: (id: number) => Promise<boolean>,
  onUpdateDescription?: (id: number, description: string) => Promise<boolean>
}
export interface MainLayoutProps {
  children: ReactNode
  title: string
}

export interface AnalyticsDataReturn {
  analyticsDataList: AnalyticWithValidatedUser[]
  isLoading: boolean
  isTokenLoading: boolean
  fetchData: (url: string) => Promise<void>
  validateAnalytics: (analyticsId: number) => Promise<boolean>
  updateDescription: (analyticsId: number, description: string) => Promise<boolean>
  buildUrl: (isFiltered: boolean) => string
  totalPages: number
  totalElements: number
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
}

export interface AnalyticsPaginationProps {
  currentPage: number
  totalPages: number | undefined
  analyticsListData: AnalyticItem[]
  setCurrentPage: (setter: (prev: number) => number) => void
}

export interface PageButtonsProps {
  totalPages: number | undefined
  currentPage: number
  setCurrentPage: (setter: (prev: number) => number) => void
}

export interface PaginatedResponse {
  content: AnalyticItem[]
  page: {
    size: number
    totalElements: number
    totalPages: number
    number: number
  }
}

export interface UseAnalyticsDataProps {
  analyticsType: string
  level: number
  startDate: { day: number; month: number; year: number }
  endDate: { day: number; month: number; year: number }
  itemsPerPage: number
  currentPage: number
}
