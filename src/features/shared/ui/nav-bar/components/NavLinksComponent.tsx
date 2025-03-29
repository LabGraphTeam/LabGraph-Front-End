import Link from 'next/link'

import ThemeToggle from '@/features/shared/ui/layouts/ThemeToggle'
import ViewToggleButton from '@/shared/ui/nav-bar/components/ViewToggleButton'
import navLinks from '@/shared/ui/nav-bar/constants/navLinks'
import { NavLinksComponentProps } from '@/types/NavigationBar'

const NavLinksComponent: React.FC<NavLinksComponentProps> = ({ onLogout }) => {
  return (
    <div className='hidden items-center gap-4 px-4 py-3 italic lg:flex xl:gap-4'>
      {[...navLinks, { id: 'exit', text: 'EXIT', url: '#', onClick: onLogout }].map((link) => (
        <Link
          className='group relative px-3 py-2 text-xs font-medium text-textPrimary transition-all duration-300 ease-in-out hover:scale-110 xl:text-sm'
          href={link.url}
          key={link.id}
          onClick={link.onClick}
        >
          {link.text}
          <span className='absolute bottom-0 left-1/2 h-0.5 w-0 bg-primary transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full' />
        </Link>
      ))}
      <span className='hidden md:flex'>
        <ThemeToggle />
      </span>
      <div className='border-l border-border pl-2'>
        <ViewToggleButton />
      </div>
    </div>
  )
}

export default NavLinksComponent
