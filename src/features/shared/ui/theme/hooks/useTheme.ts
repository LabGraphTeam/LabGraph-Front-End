import getStatusMessage from '@/features/shared/utils/helpers/getStatusMessage';
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeConfig {
  storageKey?: string;
  defaultTheme?: Theme;
}

export interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isLight: boolean;
  isLoaded: boolean;
}

const useTheme = (config: ThemeConfig = {}): UseThemeReturn => {
  const { storageKey = 'theme', defaultTheme = 'light' } = config;

  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const getSystemPreference = useCallback((): Theme => {
    if (typeof window === 'undefined') return defaultTheme;

    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error: Error | any) {
      console.warn('Error detecting system theme preference:', getStatusMessage(error.status));
      return defaultTheme;
    }
  }, [defaultTheme]);

  const getSavedTheme = useCallback((): Theme | null => {
    if (typeof window === 'undefined') return null;

    try {
      return localStorage.getItem(storageKey) as Theme | null;
    } catch (error: Error | any) {
      console.warn('Error reading theme from localStorage:', getStatusMessage(error.status));
      return null;
    }
  }, [storageKey]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      try {
        setThemeState(newTheme);
        if (typeof window !== 'undefined') {
          localStorage.setItem(storageKey, newTheme);
        }
      } catch (error: Error | any) {
        console.error('Error setting theme:', getStatusMessage(error.status));
      }
    },
    [storageKey]
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);

  useEffect(() => {
    const savedTheme = getSavedTheme();
    const initialTheme = savedTheme || getSystemPreference();
    setTheme(initialTheme);
    setIsLoaded(true);

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (!getSavedTheme()) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [getSystemPreference, getSavedTheme, setTheme]);

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isLoaded,
  };
};

export default useTheme;
