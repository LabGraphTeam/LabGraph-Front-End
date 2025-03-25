import { useCallback, useState } from 'react'

import { Menu } from 'lucide-react'
import Link from 'next/link'

import { NAVIGATION_ITEMS } from '@/features/about/constants/navigationConstants'
import ThemeToggle from '@/shared/theme'
import NavLogo from '@/shared/ui/nav-bar/components/NavLogo'

import styles from './AboutNavBar.module.css'

const AboutNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }, [])

  return (
    <nav className='sticky top-0 z-50 border-b border-borderColor bg-navbar italic backdrop-blur-sm'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex items-center justify-between py-8'>
          <div className='flex flex-col rounded-xl p-4'>
            <NavLogo
              className='w-12'
              h1Style='font-extrabold text-textPrimary opacity-95 text-xl md:text-2xl'
              h2Style='hidden md:block text-textPrimary opacity-70 md:text-xs'
            />
          </div>

          {/* Desktop Navigation */}
          <div className='hidden items-center gap-6 lg:flex'>
            <ul className='sm:text-sms flex items-center space-x-6 text-sm'>
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    className={`${styles.aboutNavBar}`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  className='rounded-lg bg-secondary px-4 py-2 font-light italic text-white transition-colors duration-300 hover:bg-secondaryHover'
                  href='/auth/signup'
                >
                  TRY DEMO
                </Link>
              </li>
            </ul>
            <div className='border-l border-borderColor pl-6'>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className='flex items-center gap-4 lg:hidden'>
            <Link
              className='rounded-lg bg-secondary px-3 py-1.5 text-sm font-light italic text-white transition-colors duration-300 hover:bg-secondaryHover'
              href='/auth/signup'
            >
              DEMO
            </Link>
            <ThemeToggle />
            <button
              className='p-2 text-textSecondary hover:text-primary'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-28 bg-surface p-4 shadow-xl shadow-shadow lg:hidden ${
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        } transition-all duration-300`}
      >
        <div className='flex flex-col space-y-4'>
          {NAVIGATION_ITEMS.map((item) => (
            <button
              className='text-left text-sm font-normal text-textSecondary hover:text-primary'
              key={item.id}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default AboutNavbar
