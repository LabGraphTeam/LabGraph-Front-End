import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { PUBLIC_ROUTES_HOME, PUBLIC_ROUTES_LIST } from '@/features/shared/routes/routes'
import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { TokenContextProps, TokenProviderProps } from '@/types/Auth'

const TokenContext = createContext<TokenContextProps>({
  token: null,
  isLoading: true,
  refreshToken: async () => null
})

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const refreshToken = useCallback(async () => {
    const isPublicRoute = PUBLIC_ROUTES_LIST.includes(router.pathname)
    const isHomeRoute = router.pathname === PUBLIC_ROUTES_HOME

    if (isPublicRoute || isHomeRoute) {
      setIsLoading(false)
      return
    }

    const tokenResponse = await fetchWrapper({
      route: '/api/get-token',
      method: 'GET'
    })

    setToken(tokenResponse.token)
    setIsLoading(false)
    return tokenResponse.token
  }, [router.pathname])

  useEffect(() => {
    refreshToken()
  }, [refreshToken, router.pathname])

  const value = useMemo(
    () => ({ token, isLoading, refreshToken }),
    [token, isLoading, refreshToken]
  )

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
}

export const useToken = () => useContext(TokenContext)
