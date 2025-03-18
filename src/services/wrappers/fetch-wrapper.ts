import { FetchOptions } from '@/services/types/FetchOptions'
import { handleResponseError } from '@/services/utils/handleResponseError'

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

  if (!response.ok) {
    return await handleResponseError(response, isLogin)
  }

  const contentType = response.headers.get('content-type')
  if (response.status === 204 || !contentType?.includes('application/json')) {
    return {
      message: 'Success'
    }
  }

  return await response.json()
}
