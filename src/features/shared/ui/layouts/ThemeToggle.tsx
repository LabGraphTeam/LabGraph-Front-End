import { CloudSun, Moon } from 'lucide-react'

import useTheme from '@/shared/hooks/useTheme'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      aria-label='Toggle theme'
      className='rounded-full p-2 hover:bg-surface focus:outline-none'
      onClick={toggleTheme}
      title='Toggle theme'
    >
      {theme === 'light' ? (
        <CloudSun className='size-7 text-textPrimary opacity-80' strokeWidth='1.5' />
      ) : (
        <Moon className='size-7 text-textPrimary opacity-90' strokeWidth='1.5' />
      )}
    </button>
  )
}

export default ThemeToggle
