import { BiHelpCircle } from 'react-icons/bi';

import { FAQProps } from '@/features/about/types/about';

export const FAQ_ITEMS: FAQProps[] = [
  {
    id: 1,
    title: 'What is Quality Control in Laboratory?',
    description:
      'Laboratory Quality Control is a set of procedures designed to monitor and evaluate testing processes to ensure accurate and reliable test results.',
    icon: <BiHelpCircle size={24} />,
  },
  {
    id: 2,
    title: 'What are Westgard Rules?',
    description:
      'Westgard Rules are a set of statistical rules used to validate quality control data in clinical laboratories, helping detect both random and systematic errors.',
    icon: <BiHelpCircle size={24} />,
  },
  {
    id: 3,
    title: 'How often should QC be performed?',
    description:
      'QC should be performed at least once every 24 hours, before patient testing begins, after major maintenance, or when accuracy of results is questioned.',
    icon: <BiHelpCircle size={24} />,
  },
  {
    id: 4,
    title: 'What is a Levey-Jennings chart?',
    description:
      'A Levey-Jennings chart is a graphical tool that plots quality control values over time, helping visualize trends and shifts in laboratory testing processes.',
    icon: <BiHelpCircle size={24} />,
  },
  {
    id: 5,
    title: 'How do I interpret control limits?',
    description:
      'Control limits typically represent ±2SD and ±3SD from the mean. Values outside these limits may indicate problems with the testing process.',
    icon: <BiHelpCircle size={24} />,
  },
  {
    id: 6,
    title: 'Can I export my QC data?',
    description:
      'Yes, our system allows you to export quality control data in various formats for further analysis or documentation purposes.',
    icon: <BiHelpCircle size={24} />,
  },
] as const;
