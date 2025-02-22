import { ListingItem } from '@/features/charts/types/Chart';

export interface ReportsHeaderProps {
  analyticsType: string;
  dataFetched?: ListingItem[];
}

export interface UseReportsDataProps {
  url: string;
}
