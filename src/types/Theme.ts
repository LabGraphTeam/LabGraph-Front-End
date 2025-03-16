export type Theme = 'light' | 'dark'

export interface ThemeConfig {
  storageKey?: string
  defaultTheme?: Theme
}

export interface UseThemeReturn {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  isDark: boolean
  isLight: boolean
  isLoaded: boolean
}
