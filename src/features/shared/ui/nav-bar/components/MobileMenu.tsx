import ViewToggleButton from '@/shared/ui/nav-bar/components/ViewToggleButton'
import navLinks from '@/shared/ui/nav-bar/constants/navLinks'
import { MobileMenuProps } from '@/types/NavigationBar'
import Link from 'next/link'

const MobileMenu = ({ isMenuOpen, onLogout }: MobileMenuProps) => (
  <div
    className={`fixed inset-x-0 top-16 bg-surface p-2 shadow-xl shadow-shadow sm:top-20 lg:hidden ${
      isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
    }`}
  >
    <div className='flex flex-col space-y-2'>
      {[...navLinks, { id: 'exit', text: 'EXIT', url: '/auth/login', onClick: onLogout }].map(
        (link) => (
          <Link
            className='text-sm font-normal text-textSecondary hover:text-primary'
            href={link.url}
            key={link.id}
            onClick={link.onClick}
          >
            {link.text}
          </Link>
        )
      )}
      <hr className='border-t-[0.5px] border-textSecondary' />
      <span className='flex w-full flex-col'>
        <ViewToggleButton />
      </span>
    </div>
  </div>
)

export default MobileMenu
