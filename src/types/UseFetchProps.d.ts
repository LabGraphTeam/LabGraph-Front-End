export interface UseFetchProps<T, D = unknown> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: Record<string, string>
  contentType?: string
  immediate?: boolean
  transform?: (data: D) => T
  authenticated?: boolean
  headers?: Record<string, string>
}
