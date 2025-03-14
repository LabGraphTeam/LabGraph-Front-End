import { fetchWrapper } from '@/services/fetch-wrapper'
import { useRouter } from 'next/router'

export const handleResponseError = async (response: Response) => {
  const router = useRouter()

  try {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const errorMessage = errorData?.details || response.statusText || 'Unknown error'
      console.error('API handleResponseError:', {
        status: response.status,
        message: errorMessage,
        url: response.url
      })

      if (response.status === 401 || response.status === 403) {
        await fetchWrapper({ route: 'api/logout', method: 'POST' })

        return router.push('/auth/login')
      }
      throw Error(`${response.status} - ${errorMessage}`)
    }
    return response
  } catch (error) {
    console.error('Error handling response:', error)
    throw error instanceof Error ? error : new Error('Unknown error occurred')
  }
}
