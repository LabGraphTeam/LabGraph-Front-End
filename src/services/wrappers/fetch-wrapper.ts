import { FetchOptions } from '@/types/FetchOptions'

export const fetchWrapper = async (options: FetchOptions) => {
  const { route, method = 'GET', body, headers = {} } = options
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

  if (headers.Authorization) {
    const payload = JSON.parse(Buffer.from(headers.Authorization.split('.')[1], 'base64').toString())
    if (Date.now() >= payload.exp * 1000) {
      await fetch('/api/logout', { method: 'POST' })
        .then(() => {
          throw new Error('Your session has expired. You will be redirected to the login page.')
        })
    }
  }

  const response = await fetch(`${route}`, fetchOptions)

  if (!response.ok && response.status === 403) {
    const errorMessage = 'Authentication failed. Your session may have expired or you lack sufficient permissions.'
    throw new Error(`${response.status}: ${errorMessage}`)
  }

  if (!response.ok && response.status !== 403) {
    const errorResponse = await response.json()
    throw new Error(`${response.status}: ${errorResponse.message}`)
  }

  const contentType = response.headers.get('content-type')
  if (response.status === 204 || !contentType?.includes('application/json')) {
    return {
      message: 'Success'
    }
  }
  return await response.json()
}
