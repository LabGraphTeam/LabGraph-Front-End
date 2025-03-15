import { fetchWrapper } from '@/services/fetch-wrapper'

export const handleResponseError = async (response: Response) => {

  try {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const errorMessage = errorData?.details || response.statusText || 'Unknown error'

      if (response.status === 401 || response.status === 403) {
        await fetchWrapper({ route: 'api/logout', method: 'POST' })
      }

      throw Error(`${response.status} - ${errorMessage}`)
    }
    return response
  } catch (error) {
    console.error('Error handling response:', error)
    throw error instanceof Error ? error : new Error('Unknown error occurred')
  }
}
