import { useToken } from '@/features/authentication/contexts/TokenContext'
import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { UseFetchProps } from '@/types/UseFetchProps'
import useSWR from 'swr'



export function useFetchSWR<T>({
    url,
    method = 'GET',
    body = undefined,
    contentType = 'application/json',
    immediate = true,
    transform = (data) => data as T,
    authenticated = false,
    headers: customHeaders = {}
}: UseFetchProps<T>) {
    const { token, isLoading: isTokenLoading } = useToken()

    const needsToken = authenticated && (isTokenLoading || !token)

    const fetchKey = immediate && (!authenticated || (authenticated && token && !isTokenLoading)) ?
        [url, method, body ? JSON.stringify(body) : undefined] : null

    const fetcher = async () => {
        if (authenticated && !token) {
            throw new Error('Token is not available')
        }

        const headers: Record<string, string> = {
            ...customHeaders
        }

        if (authenticated && token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        if (contentType) {
            headers['Content-Type'] = contentType
        }

        const response = await fetchWrapper({
            route: url,
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        })

        return transform(response)
    }

    const { data, error, isLoading, mutate, isValidating } = useSWR(
        fetchKey,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateIfStale: true,
            shouldRetryOnError: true
        }
    )

    const fetchData = async () => {
        if (authenticated && (isTokenLoading || !token)) return null
        try {
            return await mutate()
        } catch (err) {
            return null
        }
    }

    return {
        data: data ?? null,
        error: error?.message || null,
        isLoading: isLoading || isValidating,
        isTokenLoading: authenticated ? isTokenLoading : false,
        needsToken,
        fetchData,
        mutate
    }
}