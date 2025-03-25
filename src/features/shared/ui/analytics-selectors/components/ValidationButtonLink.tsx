import { ValidationButtonLinkProps } from '@/types/SelectorProps'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ValidationButtonLink: React.FC<ValidationButtonLinkProps> = ({ validationUrl }) => {
  return (
    <Link
      className='flex items-center justify-center rounded-md border border-borderColor px-2 py-0.5 text-sm font-medium text-textSecondary transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 md:px-2 md:py-1'
      href={validationUrl}
      target='_blank'
    >
      <span className='md:hidden'>
        <CheckCircle size={17} />
      </span>
      <span className='hidden md:inline'>
        <CheckCircle size={17} />
      </span>
    </Link>
  )
}

export default ValidationButtonLink
