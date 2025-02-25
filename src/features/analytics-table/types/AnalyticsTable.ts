import { ListingItem } from '@/features/charts/types/Chart';
import { ReactNode } from 'react';

export interface MobileItemCardProps {
  item: ListingItem;
}

export interface TableRowProps {
  item: ListingItem;
}
export interface MainLayoutProps {
  children: ReactNode;
  title: string;
}

export interface AnalyticsFiltersProps {
  dateSelector: any;
  analyticsOptions: { value: string; label: string }[];
  analyticsType: string;
  setAnalyticsType: (value: string) => void;
  levelOptions: { value: number; label: string }[];
  level: number;
  setLevel: (value: number) => void;
  setFiltered: (setter: (prev: boolean) => boolean) => void;
}

export interface AnalyticsPaginationProps {
  currentPage: number;
  totalPages: number | undefined;
  dataFetched: any[];
  setCurrentPage: (setter: (prev: number) => number) => void;
}

export interface PageButtonsProps {
  totalPages: number | undefined;
  currentPage: number;
  setCurrentPage: (setter: (prev: number) => number) => void;
}

export interface PaginatedResponse {
  content: ListingItem[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface UseAnalyticsDataProps {
  analyticsType: string;
  level: number;
  startDate: { day: number; month: number; year: number };
  endDate: { day: number; month: number; year: number };
  itemsPerPage: number;
  currentPage: number;
}
