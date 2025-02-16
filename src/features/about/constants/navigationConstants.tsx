import { NavigationProps } from '@/features/about/types/about';

export const NAVIGATION_ITEMS: NavigationProps[] = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'features', label: 'FEATURES' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'faq', label: 'FAQ' },
  { id: 'team', label: 'TEAM' },
] as const;
