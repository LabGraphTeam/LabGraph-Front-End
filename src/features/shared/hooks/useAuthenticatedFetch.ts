import { useToken } from '@/features/authentication/contexts/TokenContext'
import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { useState, useCallback, useEffect, useRef } from 'react'

interface UseAuthenticatedFetchProps<T> {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: any
    contentType?: string
    immediate?: boolean
    transform?: (data: any) => T
}

interface UseAuthenticatedFetchReturn<T> {
    data: T | null
    error: string | null
    isLoading: boolean
    isTokenLoading: boolean
    fetchData: () => Promise<T | null>
    mutate: (newData: T | ((prev: T | null) => T)) => void
}

export function useAuthenticatedFetch<T>({
    url,
    method = 'GET',
    body = undefined,
    contentType = 'application/json',
    immediate = true,
    transform = (data) => data as T
}: UseAuthenticatedFetchProps<T>): UseAuthenticatedFetchReturn<T> {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(immediate)
    const { token, isLoading: isTokenLoading } = useToken()

    // Create refs to track the latest values
    const urlRef = useRef(url)
    const methodRef = useRef(method)
    const bodyRef = useRef(body)
    const contentTypeRef = useRef(contentType)
    const transformRef = useRef(transform)

    // Track if this is the first mount
    const initialMountRef = useRef(true)
    // Track if URL has changed from previous render
    const prevUrlRef = useRef(url)

    // This effect only updates the refs without triggering fetches
    useEffect(() => {
        urlRef.current = url
        methodRef.current = method
        bodyRef.current = body
        contentTypeRef.current = contentType
        transformRef.current = transform
    }, [url, method, body, contentType, transform])

    const fetchData = useCallback(async (): Promise<T | null> => {
        if (isTokenLoading) {
            return null
        }

        setIsLoading(true)
        setError(null)

        try {
            const headers: Record<string, string> = {
                Authorization: `Bearer ${token}`
            }

            if (contentTypeRef.current) {
                headers['Content-Type'] = contentTypeRef.current
            }

            const response = await fetchWrapper({
                route: urlRef.current,
                method: methodRef.current,
                headers,
                body: bodyRef.current ? JSON.stringify(bodyRef.current) : undefined
            })

            const transformedData = transformRef.current(response)
            setData(transformedData)
            return transformedData
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('An unexpected error occurred')
            }
            return null
        } finally {
            setIsLoading(false)
        }
    }, [token, isTokenLoading])

    // Function to manually update the data (useful for optimistic updates)
    const mutate = useCallback((newData: T | ((prev: T | null) => T)) => {
        setData(prev => typeof newData === 'function' ? (newData as Function)(prev) : newData)
    }, [])

    // This effect handles URL changes and initial fetch
    useEffect(() => {
        // If token is still loading, don't do anything yet
        if (isTokenLoading) {
            return
        }

        // Check if we should fetch data
        const shouldFetch =
            // First mount and immediate is true
            (initialMountRef.current && immediate) ||
            // Not first mount and URL has changed
            (!initialMountRef.current && url !== prevUrlRef.current)

        // Update prevUrl for next comparison
        prevUrlRef.current = url

        // First mount is done
        if (initialMountRef.current) {
            initialMountRef.current = false
        }

        // Fetch if needed
        if (shouldFetch && token) {
            fetchData()
        }
    }, [isTokenLoading, token, fetchData, immediate, url])

    return {
        data,
        error,
        isLoading,
        isTokenLoading,
        fetchData,
        mutate
    }
}