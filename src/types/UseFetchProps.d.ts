export interface UseFetchProps<T> {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: Record<string, any>
    contentType?: string
    immediate?: boolean
    transform?: (data: any) => T
    authenticated?: boolean
    headers?: Record<string, string>
}