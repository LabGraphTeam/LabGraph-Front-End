import ThemeToggle from '@/shared/theme'
import MobileMenu from '@/shared/ui/nav-bar/components/MobileMenu'
import NavLinksComponent from '@/shared/ui/nav-bar/components/NavLinksComponent'
import NavLogo from '@/shared/ui/nav-bar/components/NavLogo'
import handleLogout from '@/shared/ui/nav-bar/constants/handleLogout'
import { useState } from 'react'

const getMenuBarClass = (isOpen: boolean, index: number): string => {
  if (isOpen && index === 0) return 'translate-y-2.5 rotate-45'
  if (isOpen && index === 1) return 'opacity-0'
  if (isOpen && index === 2) return '-translate-y-2.5 -rotate-45'
  return ''
}

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const onLogout = () => handleLogout()

  return (
    <nav className='fixed left-0 top-0 z-50 w-full bg-navbar shadow-xl shadow-overlay'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between sm:h-32'>
          <NavLogo
            className='mt-2 w-12 italic opacity-100 md:w-20'
            h1Style='hidden mt-[1px] text-xs font-semibold italic text-textPrimary opacity-95 sm:text-regular md:text-regular'
            h2Style='hidden text-[5px] text-textPrimary italic opacity-70 md:text-[8px]'
          />
          <NavLinksComponent onLogout={onLogout} />
          <div className='flex items-center gap-2 lg:hidden'>
            <ThemeToggle />
            <button
              aria-label='Toggle menu'
              className='p-2'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className='space-y-2'>
                {[0, 1, 2].map((i) => (
                  <span
                    className={`block h-0.5 w-6 bg-textSecondary transition-all duration-300 ${getMenuBarClass(isMenuOpen, i)}`}
                    key={i}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} onLogout={onLogout} />
    </nav>
  )
}

export default NavBar
