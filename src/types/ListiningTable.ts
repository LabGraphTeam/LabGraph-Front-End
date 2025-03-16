import { AnalyticItem } from '@/types/Chart'

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
  items: AnalyticItem[]
  onPageChange: (url: string) => Promise<void>
  isLoading: boolean
}
