import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

import { ContactItemProps } from '@/types/About'

export const CONTACT_ITEMS: ContactItemProps[] = [
  { id: 1, title: 'Phone', content: '+55 (85) 98992-4491', icon: <FiPhone /> },
  { id: 2, title: 'Email', content: 'leomeireles55@outlook.com', icon: <FiMail /> },
  {
    id: 3,
    title: 'Address',
    content: '123 Lab Street, Science City, ST 12345',
    icon: <FiMapPin />
  }
] as const
