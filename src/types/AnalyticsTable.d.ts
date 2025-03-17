import { AnalyticItem } from './Chart'

export interface UseAnalyticsDataProps {
    analyticsType: string
    level: string
    startDate: {
        year: number
        month: number
        day: number
    }
    endDate: {
        year: number
        month: number
        day: number
    }
    itemsPerPage: number
    currentPage: number
}

export interface AnalyticsDataReturn {
    analyticsDataList: AnalyticItem[]
    isLoading: boolean
    isTokenLoading: boolean
    fetchData: (url: string) => Promise<void>
    buildUrl: (isFiltered: boolean) => string
    validateAnalytics: (analyticsId: number) => Promise<boolean>
    totalPages: number
    totalElements: number
}

export interface TableRowProps {
    analyticItem: AnalyticItem
    onValidate?: (id: number) => void
}
