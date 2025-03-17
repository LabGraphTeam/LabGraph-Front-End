import { AnalyticWithValidatedUser } from './AnalyticsTable'

export interface PageLinks {
  first?: { href: string }
  next?: { href: string }
  last?: { href: string }
  'current-page'?: { href: string }
  currentPage?: { href: string }
  totalPages?: { href: string }
  prev?: { href: string }
}

export interface ListingTableProps {
  items: AnalyticWithValidatedUser[]
  onPageChange: (url: string) => Promise<void>
  onValidate?: (id: number) => Promise<boolean>
  isLoading: boolean
  onUpdateDescription?: (id: number, description: string) => Promise<boolean>
}
