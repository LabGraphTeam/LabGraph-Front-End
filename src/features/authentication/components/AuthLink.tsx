import Link from 'next/link'

import { AuthLinkProps } from '@/types/Auth'

const AuthLink = ({ text, linkText, href }: AuthLinkProps) => (
  <p className='text-center text-xs text-textSecondary sm:text-sm'>
    {text}{' '}
    <Link className='font-medium text-textPrimary transition-colors duration-200' href={href}>
      {linkText}
    </Link>
  </p>
)

export default AuthLink
