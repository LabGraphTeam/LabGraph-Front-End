import { useState } from 'react'
import ThemeToggle from '../../theme'
import MobileMenu from './components/MobileMenu'
import NavLinksComponent from './components/NavLinksComponent'
import NavLogo from './components/NavLogo'
import handleLogout from './constants/handleLogout'
import { NavBarProps } from './types/NavigationBar'

const getMenuBarClass = (isOpen: boolean, index: number): string => {
  if (isOpen && index === 0) return 'translate-y-2.5 rotate-45'
  if (isOpen && index === 1) return 'opacity-0'
  if (isOpen && index === 2) return '-translate-y-2.5 -rotate-45'
  return ''
}

const NavBar: React.FC<NavBarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const onLogout = () => handleLogout()

  return (
    <nav className='fixed left-0 top-0 z-50 w-full bg-navbar shadow-xl shadow-overlay'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between sm:h-20'>
          <NavLogo />
          <NavLinksComponent onLogout={onLogout} />
          <div className='flex items-center gap-2 lg:hidden'>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='p-2'
              aria-label='Toggle menu'
            >
              <div className='space-y-2'>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`block h-0.5 w-6 bg-textSecondary transition-all duration-300 ${getMenuBarClass(isMenuOpen, i)}`}
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
