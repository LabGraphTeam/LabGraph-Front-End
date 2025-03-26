import { CHARTS, MISC, PUBLIC_ROUTES } from '@/features/shared/routes/routes'
import type { NavLinkProps } from '@/types/NavigationBar'

const navLinks: NavLinkProps[] = [
  {
    id: 'biochemistry',
    text: 'BIOCHEMISTRY',
    url: CHARTS.BIOCHEMISTRY,
    title: 'BIOCHEMISTRY CHARTS'
  },
  {
    id: 'coagulation',
    text: 'COAGULATION',
    url: CHARTS.COAGULATION,
    title: 'COAGULATION CHARTS'
  },
  {
    id: 'hematology',
    text: 'HEMATOLOGY',
    url: CHARTS.HEMATOLOGY,
    title: 'HEMATOLOGY CHARTS'
  },
  {
    id: 'tables',
    text: 'TABLES',
    url: MISC.ANALYTICS_TABLE,
    title: 'TABLES'
  },
  {
    id: 'about',
    text: 'ABOUT',
    url: PUBLIC_ROUTES.ABOUT_US,
    title: 'ABOUT'
  }
]

export default navLinks
