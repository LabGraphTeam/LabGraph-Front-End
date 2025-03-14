import type { NavLinkProps } from '../types/NavigationBar';

const navLinks: NavLinkProps[] = [
  {
    id: 'biochemistry',
    text: 'BIOCHEMISTRY',
    url: '/charts/biochemistry',
    title: 'BIOCHEMISTRY CHARTS',
  },
  {
    id: 'coagulation',
    text: 'COAGULATION',
    url: '/charts/coagulation',
    title: 'COAGULATION CHARTS',
  },
  { id: 'hematology', text: 'HEMATOLOGY', url: '/charts/hematology', title: 'HEMATOLOGY CHARTS' },
  { id: 'reports', text: 'REPORTS', url: '/misc/reports', title: 'REPORTS' },
  { id: 'tables', text: 'TABLES', url: '/misc/analytics-table', title: 'TABLES' },
  { id: 'about', text: 'ABOUT', url: '/about-us', title: 'ABOUT' },
];

export default navLinks;
