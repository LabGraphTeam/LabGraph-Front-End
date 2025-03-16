import { AiOutlineSafety } from 'react-icons/ai'
import { BiTargetLock } from 'react-icons/bi'
import { MdOutlineAnalytics, MdOutlineHealthAndSafety } from 'react-icons/md'
import { RiToolsFill } from 'react-icons/ri'
import { TbClipboardData } from 'react-icons/tb'

import { OverviewProps } from '@/types/About'

export const OVERVIEW_ITEMS: OverviewProps[] = [
  {
    id: 1,
    title: 'Purpose',
    description:
      'Empowering clinical laboratories with advanced quality control monitoring to ensure accurate and reliable test results.',
    icon: <BiTargetLock size={24} />
  },
  {
    id: 2,
    title: 'Quality Assurance',
    description:
      'Maintaining high standards in laboratory testing through continuous monitoring and statistical analysis.',
    icon: <AiOutlineSafety size={24} />
  },
  {
    id: 3,
    title: 'Clinical Impact',
    description:
      'Supporting healthcare decision-making with reliable laboratory data and comprehensive quality metrics.',
    icon: <MdOutlineHealthAndSafety size={24} />
  },
  {
    id: 4,
    title: 'Data Management',
    description:
      'Streamlined organization and tracking of quality control data across multiple laboratory departments.',
    icon: <TbClipboardData size={24} />
  },
  {
    id: 5,
    title: 'Performance Monitoring',
    description:
      'Real-time tracking and analysis of laboratory performance indicators for optimal operation.',
    icon: <MdOutlineAnalytics size={24} />
  },
  {
    id: 6,
    title: 'Efficiency Tools',
    description:
      'Comprehensive suite of tools designed to simplify quality control processes and enhance workflow.',
    icon: <RiToolsFill size={24} />
  }
] as const
