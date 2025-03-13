import { fetchWrapper } from '@/services/fetch-wrapper';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TokenContextProps, TokenProviderProps } from '../types/Auth';

const TokenContext = createContext<TokenContextProps>({
  token: null,
  isLoading: true,
});

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true);

        if (
          router.pathname === '/auth/login' ||
          router.pathname === '/auth/signup' ||
          router.pathname === '/auth/forgot-password' ||
          router.pathname === '/about-us' ||
          router.pathname === '/'
        ) {
          return;
        }
        
        if(token !== null) {
          setIsLoading(false);
          return;
        }

        const tokenResponse = await fetchWrapper({
          route: '/api/get-token',
          method: 'GET',
        });

        if(await tokenResponse.valid) {
            setToken(tokenResponse.token);
            setIsLoading(false);
            return;
        }
      } catch (err) {
        console.error(`'token provider error - '${err}`);
        setToken(null);
      }
    };

    fetchToken();
  }, [router]);

  const value = useMemo(() => ({ token, isLoading }), [token, isLoading]);
  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

export const useToken = () => useContext(TokenContext);
