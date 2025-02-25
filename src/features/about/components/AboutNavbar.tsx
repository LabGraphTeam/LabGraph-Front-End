import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useCallback, useState } from 'react';

import { NAVIGATION_ITEMS } from '@/features/about/constants/navigationConstants';
import NavLogo from '@/features/shared/navigation-bar/components/NavLogo';
import ThemeToggle from '@/features/shared/ui/theme';

const AboutNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }, []);

  return (
    <nav className='sticky top-0 z-50 border-b border-borderColor bg-navbar italic backdrop-blur-sm'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex items-center justify-between py-8'>
          <div className='flex flex-col'>
            <NavLogo />
          </div>

          {/* Desktop Navigation */}
          <div className='hidden items-center gap-6 lg:flex'>
            <ul className='flex items-center space-x-6 text-sm sm:text-base'>
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className='whitespace-nowrap italic text-textSecondary transition-colors hover:text-primary hover:underline hover:decoration-primary hover:decoration-1'
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href='/auth/signup'
                  className='rounded-lg bg-secondary px-4 py-2 font-light italic text-white transition-colors duration-300 hover:bg-secondaryHover'
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
              href='/auth/signup'
              className='rounded-lg bg-secondary px-3 py-1.5 text-sm font-light italic text-white transition-colors duration-300 hover:bg-secondaryHover'
            >
              DEMO
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='p-2 text-textSecondary hover:text-primary'
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
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className='text-left text-sm font-normal text-textSecondary hover:text-primary'
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AboutNavbar;
