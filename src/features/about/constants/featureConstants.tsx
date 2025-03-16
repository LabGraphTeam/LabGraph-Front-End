import { BiLineChart, BiMailSend, BiTable, BiTestTube } from 'react-icons/bi'
import { MdDarkMode, MdOutlineRule } from 'react-icons/md'

import { FeatureProps } from '@/types/About'

export const FEATURE_ITEMS: FeatureProps[] = [
  {
    id: 1,
    title: 'Westgard Rules',
    description:
      'Automated quality control validation with real-time violation detection and statistical process control monitoring.',
    icon: <MdOutlineRule size={24} />
  },
  {
    id: 2,
    title: 'Interactive Charts',
    description:
      'Levey-Jennings charts with dynamic visualizations for trend analysis and control limit calculations.',
    icon: <BiLineChart size={24} />
  },
  {
    id: 3,
    title: 'Test Categories',
    description: 'Comprehensive support for Hematology, Coagulation, and Biochemistry QC analysis.',
    icon: <BiTestTube size={24} />
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description:
      'Advanced filtering, statistical metrics, and performance tracking for quality control data.',
    icon: <BiTable size={24} />
  },
  {
    id: 5,
    title: 'Email Alerts',
    description:
      'Automated warning system for immediate notification of quality control violations.',
    icon: <BiMailSend size={24} />
  },
  {
    id: 6,
    title: 'Theme Support',
    description: 'Dark and light mode options for comfortable viewing in any environment.',
    icon: <MdDarkMode size={24} />
  }
] as const
