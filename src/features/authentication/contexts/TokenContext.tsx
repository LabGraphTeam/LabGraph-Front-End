import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { TokenContextProps, TokenProviderProps } from '@/types/Auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const TokenContext = createContext<TokenContextProps>({
  token: null,
  isLoading: true
})

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true)

        if (
          router.pathname === '/auth/login' ||
          router.pathname === '/auth/signup' ||
          router.pathname === '/auth/forgot-password' ||
          router.pathname === '/about-us' ||
          router.pathname === '/'
        ) {
          return
        }

        const tokenResponse = await fetchWrapper({
          route: '/api/get-token',
          method: 'GET'
        })

        if (tokenResponse.valid) {
          setToken(tokenResponse.token)
          setIsLoading(false)
        }
      } catch (err) {
        console.error(`'token provider error - '${err}`)
        setToken(null)
      }
    }

    fetchToken()
  }, [router])

  const value = useMemo(() => ({ token, isLoading }), [token, isLoading])
  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
}

export const useToken = () => useContext(TokenContext)
