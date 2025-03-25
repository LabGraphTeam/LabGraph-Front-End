import { GraphProvider } from '@/features/analytics-charts/contexts/AnalyticsGraphContext'
import { TokenProvider } from '@/features/authentication/contexts/TokenContext'
import ErrorBoundary from '@/shared/utils/components/error-message/ErrorBoundary'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { IBM_Plex_Sans } from 'next/font/google'

const IBM = IBM_Plex_Sans({
  weight: ['400', '700'],
  subsets: ['latin']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider>
      <GraphProvider>
        <main className={IBM.className}>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </main>
      </GraphProvider>
    </TokenProvider>
  )
}
