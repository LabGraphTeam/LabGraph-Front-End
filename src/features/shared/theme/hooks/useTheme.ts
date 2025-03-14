import getStatusMessage from '@/features/shared/utils/helpers/getStatusMessage'
import { useCallback, useEffect, useState } from 'react'
import { Theme, ThemeConfig, UseThemeReturn } from '../types/Theme'

const useTheme = (config: ThemeConfig = {}): UseThemeReturn => {
  const { storageKey = 'theme', defaultTheme = 'light' } = config

  const [themeState, setThemeState] = useState<Theme>(defaultTheme)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (themeState === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [themeState])

  const getSystemPreference = useCallback((): Theme => {
    if (typeof window === 'undefined') return defaultTheme

    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch (error: unknown) {
      console.warn(
        'Error detecting system theme preference:',
        error instanceof Error
          ? error.message
          : getStatusMessage((error as { status?: number }).status ?? 500)
      )
      return defaultTheme
    }
  }, [defaultTheme])

  const getSavedTheme = useCallback((): Theme | null => {
    if (typeof window === 'undefined') return null

    try {
      const theme = localStorage.getItem(storageKey)
      return theme as Theme | null
    } catch (error: unknown) {
      console.warn(
        'Error reading theme from localStorage:',
        error instanceof Error
          ? error.message
          : getStatusMessage((error as { status?: number }).status ?? 500)
      )
      return null
    }
  }, [storageKey])

  const setTheme = useCallback(
    (newTheme: Theme): void => {
      try {
        setThemeState(newTheme)
        if (typeof window !== 'undefined') {
          localStorage.setItem(storageKey, newTheme)
        }
      } catch (error: unknown) {
        console.error(
          'Error setting theme:',
          error instanceof Error
            ? error.message
            : getStatusMessage((error as { status?: number }).status ?? 500)
        )
      }
    },
    [storageKey]
  )

  const toggleTheme = useCallback((): void => {
    const newTheme = themeState === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }, [themeState, setTheme])

  useEffect(() => {
    const savedTheme = getSavedTheme()
    const initialTheme = savedTheme ?? getSystemPreference()
    setTheme(initialTheme)
    setIsLoaded(true)

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent): void => {
        if (!getSavedTheme()) {
          setTheme(e.matches ? 'dark' : 'light')
        }
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [getSystemPreference, getSavedTheme, setTheme])

  return {
    theme: themeState,
    toggleTheme,
    setTheme,
    isDark: themeState === 'dark',
    isLight: themeState === 'light',
    isLoaded
  }
}

export default useTheme
