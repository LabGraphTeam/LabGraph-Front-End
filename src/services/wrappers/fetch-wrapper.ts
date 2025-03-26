import { FetchOptions } from '@/types/FetchOptions'

export const fetchWrapper = async (options: FetchOptions) => {
  const { route, method = 'GET', body, headers = {}, isLogin = false } = options

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    next: options.next,
    cache: options.cache
  }
  if (body) {
    fetchOptions.body = JSON.stringify(body)
  }

  const response = await fetch(`${route}`, fetchOptions)

  if (!response.ok || response.status === 403) {
    let errorMessage = response.statusText || 'Unknown error'

    const errorData = await response.json().catch(() => null)

    if (errorData?.details) {
      errorMessage = errorData.details
    }

    if (response.status === 401 && !isLogin) {
      return await fetch('/api/logout', { method: 'POST' })
    }

    const contentType = response.headers.get('content-type')
    if (response.status === 204 || !contentType?.includes('application/json')) {
      return {
        message: 'Success'
      }
    }

    throw new Error(`${response.status} - ${errorMessage}`)
  }
  return await response.json()
}
